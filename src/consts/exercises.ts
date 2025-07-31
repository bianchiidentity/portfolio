// Exercise type definition
export type Exercise = {
  id: number;
  name: string;
  displayOrder: number;
  icon: string;
  exerciseFactor: number;
}

export const EXERCISE_LIST: Exercise[] = [
  {
    id: 1,
    name: "ベンチプレス",
    displayOrder: 1,
    icon: "💪",
    exerciseFactor: 1.2,
  },
  {
    id: 2,
    name: "チェストプレス",
    displayOrder: 2,
    icon: "🏋️‍♂️",
    exerciseFactor: 1.0,
  },
  {
    id: 3,
    name: "ペックフライ",
    displayOrder: 3,
    icon: "💪",
    exerciseFactor: 0.9,
  },
  {
    id: 4,
    name: "ショルダープレス",
    displayOrder: 4,
    icon: "💪",
    exerciseFactor: 1.1,
  },
  {
    id: 5,
    name: "リアデルト",
    displayOrder: 5,
    icon: "💪",
    exerciseFactor: 0.8,
  },
  {
    id: 6,
    name: "チンニング",
    displayOrder: 6,
    icon: "🧗",
    exerciseFactor: 1.3,
  },
  {
    id: 7,
    name: "ラットプル",
    displayOrder: 7,
    icon: "🎯",
    exerciseFactor: 1.1,
  },
  {
    id: 8,
    name: "ケーブルローイング",
    displayOrder: 8,
    icon: "🚣",
    exerciseFactor: 1.0,
  },
  {
    id: 9,
    name: "スクワット",
    displayOrder: 9,
    icon: "🦵",
    exerciseFactor: 1.5,
  },
  {
    id: 10,
    name: "レッグプレス",
    displayOrder: 10,
    icon: "🦿",
    exerciseFactor: 1.2,
  },
  {
    id: 11,
    name: "レッグカール",
    displayOrder: 11,
    icon: "🦵",
    exerciseFactor: 0.9,
  },
  {
    id: 12,
    name: "レッグエクステンション",
    displayOrder: 12,
    icon: "🦵",
    exerciseFactor: 0.8,
  },
  {
    id: 13,
    name: "アダクター",
    displayOrder: 13,
    icon: "🦵",
    exerciseFactor: 0.8,
  },
  {
    id: 14,
    name: "アブダクター",
    displayOrder: 14,
    icon: "🦵",
    exerciseFactor: 0.8,
  },
  {
    id: 15,
    name: "ダンベルカール",
    displayOrder: 15,
    icon: "💪",
    exerciseFactor: 0.7,
  },
  {
    id: 16,
    name: "デッドリフト",
    displayOrder: 16,
    icon: "🏋️",
    exerciseFactor: 1.5,
  },
  {
    id: 17,
    name: "ネックエクステンション",
    displayOrder: 17,
    icon: "🦒",
    exerciseFactor: 0.6,
  },
  {
    id: 18,
    name: "トルソーローテーション",
    displayOrder: 18,
    icon: "🔄",
    exerciseFactor: 0.7,
  },
  {
    id: 19,
    name: "アブドミナルクランチ",
    displayOrder: 19,
    icon: "🤸",
    exerciseFactor: 0.8,
  },
  {
    id: 20,
    name: "パワーミル",
    displayOrder: 20,
    icon: "⚡",
    exerciseFactor: 1.0,
  },
  {
    id: 21,
    name: "トレッドミル",
    displayOrder: 21,
    icon: "🏃",
    exerciseFactor: 0.9,
  },
].sort((a, b) => a.displayOrder - b.displayOrder);

// 種目名からアイコンを取得する関数
export function getExerciseIcon(exerciseName: string): string {
  const exercise = EXERCISE_LIST.find((ex) => ex.name === exerciseName);
  return exercise?.icon || "🏋️";
}

// 種目名からエクササイズファクターを取得する関数
export function getExerciseFactor(exerciseName: string): number {
  const exercise = EXERCISE_LIST.find((ex) => ex.name === exerciseName);
  return exercise?.exerciseFactor || 1.0;
}
