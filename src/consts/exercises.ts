export const EXERCISE_LIST = [
  { id: 1, name: "ベンチプレス", displayOrder: 1, icon: "💪" },
  { id: 2, name: "チェストプレス", displayOrder: 2, icon: "🏋️‍♂️" },
  { id: 3, name: "ペックフライ", displayOrder: 3, icon: "🦋" },
  { id: 4, name: "ショルダープレス", displayOrder: 4, icon: "🤲" },
  { id: 5, name: "リアデルト", displayOrder: 5, icon: "🦅" },
  { id: 6, name: "チンニング", displayOrder: 6, icon: "🧗" },
  { id: 7, name: "ラットプル", displayOrder: 7, icon: "🎯" },
  { id: 8, name: "ケーブルローイング", displayOrder: 8, icon: "🚣" },
  { id: 9, name: "スクワット", displayOrder: 9, icon: "🦵" },
  { id: 10, name: "レッグプレス", displayOrder: 10, icon: "🦿" },
  { id: 11, name: "レッグカール", displayOrder: 11, icon: "🦵" },
  { id: 12, name: "レッグエクステンション", displayOrder: 12, icon: "🦵" },
  { id: 13, name: "アダクター", displayOrder: 13, icon: "🦵" },
  { id: 14, name: "アブダクター", displayOrder: 14, icon: "🦵" },
  { id: 15, name: "ダンベルカール", displayOrder: 15, icon: "💪" },
  { id: 16, name: "デッドリフト", displayOrder: 16, icon: "🏋️" },
  { id: 17, name: "ネックエクステンション", displayOrder: 17, icon: "🦒" },
  { id: 18, name: "トルソーローテーション", displayOrder: 18, icon: "🔄" },
  { id: 19, name: "アブドミナルクランチ", displayOrder: 19, icon: "🤸" },
  { id: 20, name: "パワーミル", displayOrder: 20, icon: "⚡" },
  { id: 21, name: "トレッドミル", displayOrder: 21, icon: "🏃" },
].sort((a, b) => a.displayOrder - b.displayOrder);

// 種目名からアイコンを取得する関数
export function getExerciseIcon(exerciseName: string): string {
  const exercise = EXERCISE_LIST.find((ex) => ex.name === exerciseName);
  return exercise?.icon || "🏋️";
}
