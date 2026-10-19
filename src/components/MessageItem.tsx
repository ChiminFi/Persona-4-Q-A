import { MessageResponse } from "@/components/ai-elements/message";
import AlertCard from "@/components/AlertCard";
import Sources from "@/components/Sources";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Message, MessageContent } from "@/components/ui/message";
import { MessageScrollerItem } from "@/components/ui/message-scroller";
import { ChatMessage, ChatStatus } from "@/types/chat";
import { RotateCcw } from "lucide-react";

import styles from "./message-item.module.css";

interface MessageProps {
  message: ChatMessage;
  status: ChatStatus;
  onRetry: (key: string) => void;
}

function MessageItem({ message, status, onRetry }: MessageProps) {
  const isUser = message.role === "user";
  const align = isUser ? "end" : "start";

  if (message.kind === "error") {
    return (
      <MessageScrollerItem
        key={message.key}
        messageId={message.key}
        className="flex gap-2"
      >
        <AlertCard content={message.content} />
        <Button
          variant="secondary"
          className={styles["retry-button"]}
          disabled={status !== "idle"}
          onClick={() => onRetry(message.key)}
        >
          <RotateCcw className="size-4" />
          Retry
        </Button>
      </MessageScrollerItem>
    );
  }

  return (
    <MessageScrollerItem key={message.key} messageId={message.key}>
      <Message
        key={message.key}
        align={align}
        className={isUser ? "ml-auto max-w-[80%]" : "mr-auto max-w-[95%]"}
      >
        <MessageContent>
          {isUser ? (
            <Bubble align="end" variant="muted" className="max-w-full">
              <BubbleContent className={styles["user-message"]}>
                {message.content}
              </BubbleContent>
            </Bubble>
          ) : (
            <MessageResponse>{message.content}</MessageResponse>
          )}

          {/* Sources */}
          {message.sources?.length ? (
            <Sources sources={message.sources} />
          ) : null}
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  );
}

export default MessageItem;
