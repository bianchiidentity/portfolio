import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals }) => {
  const { DB } = (locals as any).runtime?.env || {};
  if (!DB) {
    return new Response(JSON.stringify({ error: "DB接続エラー" }), {
      status: 500,
    });
  }
  const result = await DB.prepare(
    "SELECT * FROM exercise ORDER BY date DESC LIMIT 30"
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
  const { date, exercise_name, count = 0, weight = 0 } = body;
  if (!date || !exercise_name) {
    return new Response(JSON.stringify({ error: "日付と種目は必須です" }), {
      status: 400,
    });
  }
  await DB.prepare(
    `INSERT INTO exercise (date, exercise_name, count, weight, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`
  )
    .bind(date, exercise_name, count, weight)
    .run();
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
