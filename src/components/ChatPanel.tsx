"use client";

import ChatComposer from "@/components/ChatComposer";
import MessageViewport from "@/components/MessageViewport";
import { ChatMessage, ChatStatus } from "@/types/chat";
import styles from "./chat-panel.module.css";

interface ChatPanelProps {
  visibleMessages: ChatMessage[];
  status: ChatStatus;
  draft: string;
  onSendMessage: (text: string) => void;
  onRetry: (key: string) => void;
  onDraftChange: (value: string) => void;
}

function ChatPanel({
  visibleMessages,
  status,
  draft,
  onDraftChange,
  onSendMessage,
  onRetry,
}: ChatPanelProps) {
  return (
    <div className={styles["chat-panel"]}>
      <div className={styles["message-viewport-container"]}>
        <MessageViewport
          visibleMessages={visibleMessages}
          onRetry={onRetry}
          status={status}
        />
      </div>

      <div className="px-[1%] shrink-0">
        <ChatComposer
          status={status}
          onSendMessage={onSendMessage}
          draft={draft}
          onDraftChange={onDraftChange}
        />
      </div>
    </div>
  );
}

export default ChatPanel;
