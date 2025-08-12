// ダッシュボード用の型定義

export type ExerciseItem = {
  exercise_name: string;
  count: number;
  weight: number;
  date: string;
};

export type BookItem = {
  title: string;
  pages_read: number;
  date: string;
  book_url?: string | null;
  comment?: string | null;
  source_url?: string | null;
  source_name?: string | null;
};

export type OutputItem = {
  type: string;
  chars: number;
  is_tech: boolean;
  date: string;
};

export type ExerciseStats = {
  [key: string]: {
    name: string;
    totalCount: number;
    totalWeight: number;
    sessions: number;
    lastDate: string | null;
  };
};

export type BookStats = {
  [key: string]: {
    title: string;
    totalPages: number;
    sessions: number;
    lastDate: string | null;
  };
};

export type OutputStats = {
  [key: string]: {
    type: string;
    totalChars: number;
    sessions: number;
    techCount: number;
    lastDate: string | null;
  };
};

export type ExerciseMaxRecords = {
  [key: string]: {
    maxWeight: number;
    maxCount: number;
  };
};
