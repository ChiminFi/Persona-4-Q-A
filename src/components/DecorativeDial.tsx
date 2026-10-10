import styles from "./decorative-dials.module.css";

function DecorativeDial() {
  return (
    <div className={styles["dial"]}>
      <div className={styles["pointer-pivot"]}>
        <svg className={styles["small-pointer"]} viewBox="0 0 7 13" fill="none">
          <path
            d="M5.48277 11.8568L0.656372 0.273499L5.48277 11.8568Z"
            fill="black"
          />
          <path
            d="M5.48277 11.8568L0.656372 0.273499"
            stroke="#746951"
            strokeWidth="1.4222"
          />
        </svg>
      </div>
    </div>
  );
}

export default DecorativeDial;
