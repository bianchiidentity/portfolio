import type { APIRoute } from "astro";
import type { ApiResponse } from "../../types/database";

type DashboardData = {
  date: string;
  exercise_count: number;
  book_pages: number;
  output_chars: number;
  sleep_hours: number;
}

type DashboardResponse = ApiResponse<DashboardData[]>

type RuntimeEnv = {
  DB: any; // D1Database type
}

type Locals = {
  runtime?: {
    env: RuntimeEnv;
  };
}

export const GET: APIRoute = async ({ locals }) => {
  try {
    const { DB } = (locals as Locals).runtime?.env || {};

    if (!DB) {
      const errorResponse: DashboardResponse = {
        success: false,
        error: "データベース接続エラー",
      };

      return new Response(JSON.stringify(errorResponse), {
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

    const successResponse: DashboardResponse = {
      success: true,
      data: result.results || [],
    };

    return new Response(JSON.stringify(successResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API Error:", error);

    const errorResponse: DashboardResponse = {
      success: false,
      error: "サーバーエラーが発生しました",
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
