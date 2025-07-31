// Base type for all database entities
export type BaseEntity = {
  id: number;
  created_at: string;
  updated_at: string;
}

export type Exercise = BaseEntity & {
  date: string;
  exercise_name: string;
  count: number;
  weight: number;
}

export type Book = BaseEntity & {
  date: string;
  title: string;
  pages_read: number;
}

export type Output = BaseEntity & {
  date: string;
  type: string;
  chars: number;
  is_tech: boolean;
}

export type Sleep = BaseEntity & {
  date: string;
  hours: number;
}

// API response types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
}

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
} 