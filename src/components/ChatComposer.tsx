"use client";

import { useEffect, useRef } from "react";
import {
  PromptInput,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import styles from "./chat-composer.module.css";
import tvStyles from "./tv.module.css";
import { ChatStatus } from "@/types/chat";

interface ChatComposerProps {
  onSendMessage: (message: string) => void;
  status: ChatStatus;
}

const MAX_CHAT_HEIGHT_PERCENT = 20;

function ChatComposer({ onSendMessage, status }: ChatComposerProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    // 通过该scope 向上找到 chatView
    const chatViewport = scope?.closest(`.${tvStyles["wood-chat-panel"]}`);
    if (!scope || !chatViewport) return;

    // 设置scope 的自定义变量为chatView 的指定百分之高度
    const updateMaxHeight = () => {
      scope.style.setProperty(
        "--composer-max-height",
        // 获取view 高度
        `${(chatViewport.getBoundingClientRect().height * MAX_CHAT_HEIGHT_PERCENT) / 100}px`,
      );
    };
    const observer = new ResizeObserver(updateMaxHeight);
    // 观察 view 变化
    observer.observe(chatViewport);

    // 初次计算
    updateMaxHeight();
    return () => observer.disconnect();
  }, []);

  const handleSubmit = ({ text }: { text: string }) => {
    if (!text.length) return;
    onSendMessage(text);
  };

  return (
    <div ref={scopeRef} className={styles["composer-scope"]}>
      <PromptInput className={styles["composer"]} onSubmit={handleSubmit}>
        <PromptInputBody>
          <PromptInputTextarea
            className={styles["input"]}
            rows={1}
            aria-label="消息输入"
            placeholder="请输入文本..."
          />
        </PromptInputBody>

        <PromptInputSubmit
          disabled={status == "loading" || status === "streaming"}
          className={styles["send-button"]}
          size="icon-xs"
          variant="outline"
          aria-label="提交信息"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className={styles["send-icon"]}
          >
            <path d="M3 3L21 12L3 21L6.17647 12L3 3Z" fill="#0B0B09" />
          </svg>
        </PromptInputSubmit>
      </PromptInput>
    </div>
  );
}

export default ChatComposer;
