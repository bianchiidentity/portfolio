import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals }) => {
  try {
    const { DB } = (locals as any).runtime?.env || {};

    if (!DB) {
      return new Response(JSON.stringify({ error: "データベース接続エラー" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await DB.prepare(
      `
      SELECT * FROM dashboard_data
      ORDER BY date DESC
      LIMIT 30
    `
    ).all();

    return new Response(
      JSON.stringify({
        success: true,
        data: result.results || [],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        error: "サーバーエラーが発生しました",
        details: (error as Error).message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
