import ChatPanel from "@/components/ChatPanel";
import SpeakerNDials from "@/components/SpeakerNDials";
import styles from "./tv.module.css";

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
              <ChatPanel />
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
