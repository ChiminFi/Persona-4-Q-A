"use client";

import {
  InputGroup,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ChatStatus } from "@/types/chat";
import React from "react";
import styles from "./chat-composer.module.css";

interface ChatComposerProps {
  onSendMessage: (message: string) => void;
  onDraftChange: (value: string) => void;
  status: ChatStatus;
  draft: string;
}

function ChatComposer({
  onSendMessage,
  status,
  draft,
  onDraftChange,
}: ChatComposerProps) {
  const formRef = React.useRef<HTMLFormElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key !== "Enter" || e.shiftKey) return;
    // 输入法选词
    if (e.nativeEvent.isComposing) return;

    e.preventDefault();
    formRef.current?.requestSubmit();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim()) return;
    if (status === "loading" || status === "streaming") return;

    onSendMessage(draft);
    onDraftChange("");
  }

  return (
    <div className={styles["composer-scope"]}>
      <form
        className={styles["composer"]}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <InputGroup>
          <InputGroupTextarea
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles["input"]}
            rows={1}
            aria-label="消息输入"
            placeholder="请输入文本..."
          />
        </InputGroup>

        <InputGroupButton
          type="submit"
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
        </InputGroupButton>
      </form>
    </div>
  );
}

export default ChatComposer;
