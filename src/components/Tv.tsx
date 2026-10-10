import MessageViewport from "@/components/MessageViewport";
import styles from "./tv.module.css";
import SpeakerNDials from "@/components/SpeakerNDials";

function Tv() {
  return (
    <div className={styles["tv"]}>
      <div className={styles["scene"]}>
        <div className={styles["soft-ground-shadow"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1008 57"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M503.875 56.9514C782.157 56.9514 1007.75 44.2024 1007.75 28.4757C1007.75 12.749 782.157 0 503.875 0C225.592 0 0 12.749 0 28.4757C0 44.2024 225.592 56.9514 503.875 56.9514Z"
              fill="#15150B"
            />
          </svg>
        </div>
        <div className={styles["angled-wood"]} />
        <div className={styles["twin-telescopic-metal"]} />
        <div className={styles["original-rectangle"]} />
        <div className={styles["deep-recess"]}>
          <div className={styles["convex-rounded-CRT"]}>
            <div className={styles["wood-chat-panel"]}>
              <div className="w-full h-[83.9%]">
                <MessageViewport />
              </div>

              <div className="px-[1%] h-[12%] flex justify-between">
                <div className={styles["input-div"]}>
                  <input
                    className={styles["input"]}
                    type="text"
                    aria-label="信息输入"
                    placeholder="请输入文本..."
                  />
                </div>
                <button className={styles["send-button"]} aria-label="发送信息">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={styles["send-icon"]}
                  >
                    <path d="M3 3L21 12L3 21L6.17647 12L3 3Z" fill="#0B0B09" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles["speaker-n-dials-property"]}>
          <SpeakerNDials />
        </div>
      </div>
    </div>
  );
}

export default Tv;
