    // <div className="flex justify-between h-full w-full">
    //   <div className={styles["input-div"]}>
    //     <input
    //       className={styles["input"]}
    //       type="text"
    //       aria-label="信息输入"
    //       placeholder="请输入文本..."
    //     />
    //   </div>

    //   <Button variant="outline" className={`${styles["send-button"]} p-0`}>
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       className={styles["send-icon"]}
    //     >
    //       <path d="M3 3L21 12L3 21L6.17647 12L3 3Z" fill="#0B0B09" />
    //     </svg>
    //   </Button>

<!-- .input-div {
  height: 100%;
  align-items: center;
  width: 90%;
} -->

<!-- .messages {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
}

.message-bubble {
  width: fit-content;
  max-width: 70%;
  padding: 2% 4%;

  opacity: 85%;

  word-break: break-word;

  border-radius: var(--radius-bubble);

  color: var(--color-ink);

  /* CRT / Body */
  font-family: var(--font-noto-sans-sc);
  font-size: clamp(0.8rem, 1.4vw, 1.3rem);
  line-height: 1.4;
  font-style: normal;
  font-weight: 400;
} -->

<!-- /* Approximate the cream screen color when backdrop blur is unavailable. */
/* @supports not (
  (backdrop-filter: blur(4px)) or (-webkit-backdrop-filter: blur(4px))
) {
  .message-viewport::before,
  .message-viewport::after {
    -webkit-mask-image: none;
    mask-image: none;
  }

  .message-viewport::before {
    background: linear-gradient(
      to bottom,
      var(--edge-fade-color, #f5eccb),
      transparent
    );
  }

  .message-viewport::after {
    background: linear-gradient(
      to top,
      var(--edge-fade-color, #f5eccb),
      transparent
    );
  }
} */ -->

    // <div
    //   className={`${styles["message-viewport"]} ${isScrolling && styles["is-scrolling"]}`}
    //   onScroll={onScroll}
    // >
    //   <div className={styles["messages"]}>
    //     <div
    //       className={`${styles["message-bubble"]} ${styles["message-row-assistant"]}`}
    //     >
    //       嘿, 快来询问我关于p4g 的任何事吧
    //     </div>
    //     <div
    //       className={`${styles["message-bubble"]} ${styles["message-row-user"]}`}
    //     >
    //       菜菜子超棒!
    //     </div>
    //   </div>
    // </div>
