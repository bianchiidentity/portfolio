import type { APIRoute } from "astro";
import type { Exercise, ApiResponse } from "../../types/database";

type ExerciseRequest = {
  date: string;
  exercise_name: string;
  count?: number;
  weight?: number;
};

type ExerciseResponse = ApiResponse<Exercise[]>;

type RuntimeEnv = {
  DB: any; // D1Database type
};

type Locals = {
  runtime?: {
    env: RuntimeEnv;
  };
};

export const GET: APIRoute = async ({ locals }) => {
  const { DB } = (locals as Locals).runtime?.env || {};

  if (!DB) {
    const errorResponse: ExerciseResponse = {
      success: false,
      error: "DB接続エラー",
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const result = await DB.prepare(
      "SELECT * FROM exercise ORDER BY date DESC LIMIT 30"
    ).all();

    const successResponse: ExerciseResponse = {
      success: true,
      data: result.results || [],
    };

    return new Response(JSON.stringify(successResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorResponse: ExerciseResponse = {
      success: false,
      error: "データ取得エラー",
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  const { DB } = (locals as Locals).runtime?.env || {};

  if (!DB) {
    const errorResponse: ExerciseResponse = {
      success: false,
      error: "DB接続エラー",
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body: ExerciseRequest = await request.json();
    const { date, exercise_name, count = 0, weight = 0 } = body;

    if (!date || !exercise_name) {
      const errorResponse: ExerciseResponse = {
        success: false,
        error: "日付と種目は必須です",
      };

      return new Response(JSON.stringify(errorResponse), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await DB.prepare(
      `INSERT INTO exercise (date, exercise_name, count, weight, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`
    )
      .bind(date, exercise_name, count, weight)
      .run();

    const successResponse: ExerciseResponse = {
      success: true,
    };

    return new Response(JSON.stringify(successResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorResponse: ExerciseResponse = {
      success: false,
      error: "データ保存エラー",
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
