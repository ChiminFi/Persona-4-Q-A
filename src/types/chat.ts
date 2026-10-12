export type ChatStatus = "idle" | "loading" | "streaming" | "error";

type ChatSource = {
  title: string;
  href: string;
};

export type ChatMessage = {
  key: string;
  role: "user" | "assistant";
  content: string;
  kind?: "normal" | "error";
  sources?: ChatSource[];
};
