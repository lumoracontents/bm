import { timingSafeEqual } from "crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BACKUP_TABLES = [
  "profiles",
  "products",
  "orders",
  "entitlements",
  "lessons",
  "resources",
  "assignments",
  "posts",
  "comments",
  "consulting_bookings",
] as const;

const PAGE_SIZE = 1000;

const SENSITIVE_COLUMNS: Partial<Record<(typeof BACKUP_TABLES)[number], string[]>> = {
  orders: ["payment_key"],
};

type BackupRequestBody = {
  token?: string;
};

function safeEquals(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function getToken(request: Request, body: BackupRequestBody | null) {
  return request.headers.get("x-admin-backup-token") ?? body?.token ?? "";
}

async function isAdminBySession(
  serviceClient: SupabaseClient,
): Promise<boolean> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return false;
    }

    const { data, error } = await serviceClient
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      return false;
    }

    const profile = data as { role?: string } | null;
    return profile?.role === "admin";
  } catch {
    return false;
  }
}

async function isAuthorized(
  request: Request,
  body: BackupRequestBody | null,
  serviceClient: SupabaseClient,
) {
  const configuredToken = process.env.ADMIN_BACKUP_TOKEN?.trim();
  const requestToken = getToken(request, body).trim();

  if (configuredToken && requestToken && safeEquals(requestToken, configuredToken)) {
    return true;
  }

  return isAdminBySession(serviceClient);
}

async function fetchTableRows(
  serviceClient: SupabaseClient,
  table: (typeof BACKUP_TABLES)[number],
) {
  const rows: unknown[] = [];
  let offset = 0;

  while (true) {
    const { data, error } = await serviceClient
      .from(table)
      .select("*")
      .range(offset, offset + PAGE_SIZE - 1);

    if (error) {
      throw error;
    }

    const chunk = data ?? [];
    rows.push(...chunk);

    if (chunk.length < PAGE_SIZE) {
      break;
    }

    offset += PAGE_SIZE;
  }

  return rows;
}

function removeSensitiveColumns(table: (typeof BACKUP_TABLES)[number], rows: unknown[]) {
  const columns = SENSITIVE_COLUMNS[table] ?? [];

  if (columns.length === 0) {
    return rows;
  }

  return rows.map((row) => {
    if (!row || typeof row !== "object" || Array.isArray(row)) {
      return row;
    }

    const sanitized = { ...(row as Record<string, unknown>) };

    for (const column of columns) {
      delete sanitized[column];
    }

    return sanitized;
  });
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "DB 백업을 실행하려면 서버 환경변수 NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY가 필요합니다.",
      },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as BackupRequestBody | null;
  const serviceClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const authorized = await isAuthorized(request, body, serviceClient);

  if (!authorized) {
    return NextResponse.json(
      {
        ok: false,
        message: "DB 백업 권한이 없습니다. 관리자 계정으로 로그인하거나 백업 토큰을 입력해 주세요.",
      },
      { status: 401 },
    );
  }

  const generatedAt = new Date().toISOString();
  const data: Record<string, unknown[]> = {};
  const rowCounts: Record<string, number> = {};
  const errors: Array<{ table: string; message: string; code?: string }> = [];

  for (const table of BACKUP_TABLES) {
    try {
      const rows = removeSensitiveColumns(table, await fetchTableRows(serviceClient, table));
      data[table] = rows;
      rowCounts[table] = rows.length;
    } catch (error) {
      data[table] = [];
      rowCounts[table] = 0;
      errors.push({
        table,
        message: error instanceof Error ? error.message : "테이블 백업 중 오류가 발생했습니다.",
        code:
          typeof error === "object" && error !== null && "code" in error
            ? String(error.code)
            : undefined,
      });
    }
  }

  const payload = {
    ok: errors.length === 0,
    backup: {
      app: "ScriptWizard",
      schema: "public",
      generatedAt,
      format: "json",
      version: 1,
      tables: BACKUP_TABLES,
      rowCounts,
      excludedColumns: SENSITIVE_COLUMNS,
    },
    data,
    errors,
  };

  const filename = `scriptwizard-db-backup-${generatedAt.replace(/[:.]/g, "-")}.json`;

  return new NextResponse(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
