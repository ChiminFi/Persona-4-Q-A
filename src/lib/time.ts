export type TimeOfDay =
  | "morning"
  | "noon"
  | "afternoon"
  | "evening"
  | "night"
  | "hello";

export function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 13) return "noon";
  if (hour >= 13 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";

  return "night";
}
