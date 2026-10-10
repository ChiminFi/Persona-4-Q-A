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
          className={`${styles["message-bubble"]} ${styles["message-row-assistant"]}`}
        >
          嘿, 快来询问我关于p4g 的任何事吧
        </div>
        <div
          className={`${styles["message-bubble"]} ${styles["message-row-user"]}`}
        >
          菜菜子超棒!
        </div>
      </div>
    </div>
  );
}

export default MessageViewport;
