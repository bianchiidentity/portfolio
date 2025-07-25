import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals }) => {
  const { DB } = (locals as any).runtime?.env || {};
  if (!DB) {
    return new Response(JSON.stringify({ error: "DB接続エラー" }), {
      status: 500,
    });
  }
  const result = await DB.prepare(
    "SELECT * FROM output ORDER BY date DESC LIMIT 30"
  ).all();
  return new Response(JSON.stringify(result.results || []), { status: 200 });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const { DB } = (locals as any).runtime?.env || {};
  if (!DB) {
    return new Response(JSON.stringify({ error: "DB接続エラー" }), {
      status: 500,
    });
  }
  const body = await request.json();
  const { date, type, chars = 0, is_tech = false } = body;
  if (!date || !type) {
    return new Response(JSON.stringify({ error: "日付と種類は必須です" }), {
      status: 400,
    });
  }
  await DB.prepare(
    `INSERT INTO output (date, type, chars, is_tech, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`
  )
    .bind(date, type, chars, is_tech ? 1 : 0)
    .run();
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
