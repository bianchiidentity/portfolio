export interface Exercise {
  id: number;
  date: string;
  exercise_name: string;
  count: number;
  weight: number;
  created_at: string;
  updated_at: string;
}

export interface Book {
  id: number;
  date: string;
  title: string;
  pages_read: number;
  created_at: string;
  updated_at: string;
}

export interface Output {
  id: number;
  date: string;
  type: string;
  chars: number;
  is_tech: boolean;
  created_at: string;
  updated_at: string;
}

export interface Sleep {
  id: number;
  date: string;
  hours: number;
  created_at: string;
  updated_at: string;
} 