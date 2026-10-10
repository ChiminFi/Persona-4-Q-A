import styles from "./background.module.css";

function Background() {
  return (
    <div className={styles["background"]}>
      <div className={styles["warm-yellow"]}>
        <div
          className={styles["diagonal-cream-separator"]}
          aria-hidden="true"
        />
        <div className={styles["deep-black-olive"]} aria-hidden="true" />
        <div className={styles["halftone-upper-left"]} aria-hidden="true" />
        <div className={styles["halftone-lower-right"]} aria-hidden="true" />

        <div className={styles["floor-subtle-darkening"]} aria-hidden="true" />
      </div>
    </div>
  );
}

export default Background;
