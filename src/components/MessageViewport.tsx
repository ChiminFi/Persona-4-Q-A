"use client";

import { Message, MessageContent } from "@/components/ui/message";

import EmptyCard from "@/components/EmptyCard";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Spinner } from "@/components/ui/spinner";
import { ChatMessage, ChatStatus } from "@/types/chat";
import type { UIEvent } from "react";
import { Suspense, useRef, useState } from "react";
import styles from "./message-viewport.module.css";
import MessageItem from "@/components/MessageItem";

interface MessageViewportProps {
  visibleMessages: ChatMessage[];
  status: ChatStatus;
  onRetry: (key: string) => void;
}

function MessageViewport({
  visibleMessages,
  onRetry,
  status,
}: MessageViewportProps) {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function onScroll(event: UIEvent<HTMLDivElement>) {
    // Ignore scroll events from other descendants, such as nested code blocks.
    if (
      !(event.target instanceof HTMLElement) ||
      !event.target.classList.contains(styles["scroll-area"])
    )
      return;

    setIsScrolling(true);

    if (scrollTimer.current) clearTimeout(scrollTimer.current);

    scrollTimer.current = setTimeout(() => {
      setIsScrolling(false);
    }, 600);
  }

  return (
    <MessageScrollerProvider autoScroll>
      {/* 等于0 时 显示占位符标志 */}
      {visibleMessages.length === 0 ? (
        <div className="inset-0">
          <Suspense fallback={null}>
            <EmptyCard />
          </Suspense>
        </div>
      ) : (
        // 捕获, scroll 不冒泡
        <MessageScroller
          className={styles["message-viewport"]}
          onScrollCapture={onScroll}
        >
          <MessageScrollerViewport
            className={`${styles["scroll-area"]} ${
              isScrolling ? styles["is-scrolling"] : ""
            }`}
          >
            <MessageScrollerContent className="gap-8 p-4 pr-1.5">
              {visibleMessages.map((message) => (
                <MessageItem
                  key={message.key}
                  message={message}
                  status={status}
                  onRetry={onRetry}
                />
              ))}

              {/* Loading */}
              {status === "loading" && (
                <MessageScrollerItem key="loading" messageId="loading">
                  <Message>
                    <MessageContent>
                      <Spinner />
                      <span>Thinking...</span>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              )}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton
            direction="end"
            className={styles["scroll-button"]}
          />
        </MessageScroller>
      )}
    </MessageScrollerProvider>
  );
}

export default MessageViewport;
