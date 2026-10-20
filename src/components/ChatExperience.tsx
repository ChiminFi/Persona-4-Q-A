"use client";

import ChatPanel from "@/components/ChatPanel";
import Tv from "@/components/Tv";
import { ChatMessage, ChatStatus } from "@/types/chat";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";

const messages: ChatMessage[] = [
  {
    content: "Hello, how are you?",
    key: nanoid(),
    role: "user",
  },
  {
    content: "I'm good, thank you! How can I assist you today?",
    key: nanoid(),
    role: "assistant",
  },
  {
    content: "I'm looking for information about your services.",
    key: nanoid(),
    role: "user",
  },
  {
    content:
      "Sure! We offer a variety of AI solutions. What are you interested in?",
    key: nanoid(),
    role: "assistant",
    sources: [
      {
        title: "P4G Dungeon Guide",
        href: "https://example.com/guide",
      },
    ],
  },
  {
    content: "I'm interested in natural language processing tools.",
    key: nanoid(),
    role: "user",
  },
  {
    content: "Great choice! We have several NLP APIs. Would you like a demo?",
    key: nanoid(),
    role: "assistant",
  },
  {
    content: "Yes, a demo would be helpful.",
    key: nanoid(),
    role: "user",
  },
  {
    content: "Alright, I can show you a sentiment analysis example. Ready?",
    key: nanoid(),
    role: "assistant",
  },
  {
    content: "Yes, please proceed.",
    key: nanoid(),
    role: "user",
  },
  {
    content: "Here is a sample: 'I love this product!' → Positive sentiment.",
    key: nanoid(),
    role: "assistant",
  },
  {
    content: "Impressive! Can it handle multiple languages?",
    key: nanoid(),
    role: "user",
  },
  {
    content: "Absolutely, our models support over 20 languages.",
    key: nanoid(),
    role: "assistant",
  },
  {
    content: "How do I get started with the API?",
    key: nanoid(),
    role: "user",
  },
  {
    content: "You can sign up on our website and get an API key instantly.",
    key: nanoid(),
    role: "assistant",
  },
  {
    content: "Is there a free trial available?",
    key: nanoid(),
    role: "user",
  },
  {
    content: "Yes, we offer a 14-day free trial with full access.",
    key: nanoid(),
    role: "assistant",
  },
  {
    content: "What kind of support do you provide?",
    key: nanoid(),
    role: "user",
  },
  {
    content: "We provide 24/7 chat and email support for all users.",
    key: nanoid(),
    role: "assistant",
  },
  {
    content: "Thank you for the information!",
    key: nanoid(),
    role: "user",
  },
  {
    content: "You're welcome! Let me know if you have any more questions.",
    key: nanoid(),
    role: "assistant",
  },
];

const fakeReply =
  "Goho-M can be used to immediately leave a dungeon and return to the entrance.";

function ChatExperience() {
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");

  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const streamTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  function sendMessage(text: string) {
    if (status === "loading" || status === "streaming") return;
    replyTimer.current = null;

    const trimmed = text.trim();
    const assistantId = nanoid();
    if (!trimmed.length) return;

    setVisibleMessages((prev) => [
      ...prev,
      {
        key: nanoid(),
        content: text,
        role: "user",
      },
    ]);

    setStatus("loading");
    replyTimer.current = setTimeout(() => {
      if (trimmed.toLowerCase() === "error") {
        setStatus("error");

        setVisibleMessages((prev) => [
          ...prev,
          {
            key: nanoid(),
            role: "assistant",
            content: "Something went wrong. Please try again.",
            kind: "error",
          },
        ]);

        setStatus("idle");
        return;
      }
      // 空 assistant 信息
      setVisibleMessages((prev) => [
        ...prev,
        {
          key: assistantId,
          role: "assistant",
          content: "",
        },
      ]);

      streamingFakeReply(assistantId);
    }, 1700);
  }

  function streamingFakeReply(assistantId: string) {
    setStatus("streaming");

    // 分块
    const chunks = fakeReply.split(" ");
    // 对应文字分段
    let index = 0;

    streamTimer.current = setInterval(() => {
      index += 1;

      setVisibleMessages((prev) =>
        prev.map((message) =>
          // 对应当前信息
          message.key === assistantId
            ? {
                // 逐步缝合chunk
                ...message,
                content: chunks.slice(0, index).join(" "),
              }
            : message,
        ),
      );

      // 完成缝合后撤销Internal 并且设置idle
      if (index >= chunks.length) {
        if (streamTimer.current !== null) {
          clearInterval(streamTimer.current);
          streamTimer.current = null;
        }
        setStatus("idle");
      }
    }, 80);
  }

  function retry(key: string) {
    if (status !== "idle") return;
    if (!visibleMessages.length) return;
    const index = visibleMessages.findIndex((message) => message.key === key);

    if (index === -1) {
      console.error("Cant't find this message");
      return;
    }

    const previousUserMessage = [...visibleMessages]
      .slice(0, index)
      .reverse()
      .find((message) => message.role === "user");

    // setVisibleMessages((prev) => {
    //   const next = [...prev];
    //   next.splice(index, 1);
    //   return next;
    // });

    if (!previousUserMessage) return;

    sendMessage(previousUserMessage.content);
  }

  useEffect(() => {
    // 0.5s 显示一条信息 fake message
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < messages.length && messages[currentIndex]) {
        const currentMessage = messages[currentIndex];
        setVisibleMessages((prev) => [
          ...prev,
          {
            ...currentMessage,
          },
        ]);
        currentIndex += 1;
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // 卸载同步撤销
  useEffect(() => {
    return () => {
      if (replyTimer.current !== null) clearTimeout(replyTimer.current);
      if (streamTimer.current !== null) clearInterval(streamTimer.current);
    };
  }, []);

  return (
    <Tv>
      <ChatPanel
        visibleMessages={visibleMessages}
        status={status}
        draft={draft}
        onDraftChange={setDraft}
        onSendMessage={sendMessage}
        onRetry={retry}
      />
    </Tv>
  );
}

export default ChatExperience;
