"use client";
import { useRef, useState } from "react";
import styles from "./messageViewport.module.css";

function MessageViewport() {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  function onScroll() {
    setIsScrolling(true);

    if (scrollTimer.current) clearTimeout(scrollTimer.current);

    scrollTimer.current = setTimeout(() => {
      setIsScrolling(false);
    }, 600);
  }

  return (
    <div
      className={`${styles["message-viewport"]} ${isScrolling && styles["is-scrolling"]}`}
      onScroll={onScroll}
    >
      <div className={styles["messages"]}>
        <div
          className={`${styles["message-bubble"]} ${styles["message-row-user"]}`}
        >
          2333377777777777777777777777777777777777
        </div>
        <div
          className={`${styles["message-bubble"]} ${styles["message-row-assistant"]}`}
        >
          233377777777777777777777777777777777788888888888888888888888888888888
        </div>
      </div>
    </div>
  );
}

export default MessageViewport;
