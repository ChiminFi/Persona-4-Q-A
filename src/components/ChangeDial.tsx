import styles from "./change-dial.module.css";

function ChangeDial() {
  return (
    <div className={styles["change-dial"]}>
      <svg className={styles.pointer} viewBox="0 0 3 37" fill="none">
        <g clipPath="url(#clip0_77_368)">
          <path
            d="M1.33337 36.2667V0.711121"
            stroke="#EBDCB1"
            strokeWidth="1.4222"
            strokeLinecap="round"
          />
          <path
            d="M1.33337 36.2666V9.24438"
            stroke="#090A06"
            strokeWidth="3.5556"
          />
        </g>

        <defs>
          <clipPath id="clip0_77_368">
            <rect width="3" height="37" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default ChangeDial;
