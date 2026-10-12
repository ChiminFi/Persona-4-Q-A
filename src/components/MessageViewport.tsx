"use client";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/sources";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ChatMessage, ChatStatus } from "@/types/chat";
import { AlertCircleIcon, MessageSquareIcon, RotateCcw } from "lucide-react";
import type { UIEvent } from "react";
import { useRef, useState } from "react";
import styles from "./message-viewport.module.css";

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

  // useEffect(
  //   () => () => {
  //     if (scrollTimer.current) clearTimeout(scrollTimer.current);
  //   },
  //   [],
  // );

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
    // 捕获, scroll 不冒泡
    <Conversation
      className={styles["message-viewport"]}
      onScrollCapture={onScroll}
    >
      <ConversationContent
        className="pr-1.5"
        scrollClassName={`${styles["scroll-area"]} ${isScrolling ? styles["is-scrolling"] : ""}`}
      >
        {visibleMessages.length === 0 ? (
          <ConversationEmptyState
            icon={<MessageSquareIcon className="size-6" />}
            title="Start a conversation"
          />
        ) : (
          visibleMessages.map(({ key, content, role, kind, sources }) => (
            // 对应 Message
            <Message from={role} key={key}>
              <MessageContent
                className={role === "user" ? styles["user-message"] : ""}
              >
                {/* 分辨 error */}
                {kind === "error" ? (
                  <div className="flex gap-2">
                    <Alert
                      variant="destructive"
                      className={styles["error-message"]}
                    >
                      <AlertCircleIcon />
                      <AlertTitle>Failed to generate response</AlertTitle>
                      <AlertDescription>{content}</AlertDescription>
                    </Alert>
                    <Button
                      variant="secondary"
                      className={styles["retry-button"]}
                      onClick={() => onRetry(key)}
                    >
                      <RotateCcw className="size-4" />
                      Retry
                    </Button>
                  </div>
                ) : // 分辨assistant 流式
                role === "assistant" ? (
                  <MessageResponse>{content}</MessageResponse>
                ) : (
                  // user
                  content
                )}
              </MessageContent>
              {sources?.length ? (
                <Sources>
                  <SourcesTrigger count={sources.length} />
                  <SourcesContent>
                    {sources.map((source) => (
                      <Source
                        key={source.href}
                        href={source.href}
                        title={source.title}
                      />
                    ))}
                  </SourcesContent>
                </Sources>
              ) : null}
            </Message>
          ))
        )}
        {/* Loading */}
        {status === "loading" && (
          <Message from="assistant">
            <MessageContent>
              <Spinner />
              <span>Thinking...</span>
            </MessageContent>
          </Message>
        )}
      </ConversationContent>

      <ConversationScrollButton className={styles["scroll-button"]} />
    </Conversation>
  );
}

export default MessageViewport;
