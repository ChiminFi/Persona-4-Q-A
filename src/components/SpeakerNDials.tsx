import DecorativeDial from "@/components/DecorativeDial";
import styles from "./speaker-n-dials.module.css";
import ChangeDial from "@/components/ChangeDial";

function SpeakerNDials() {
  return (
    <div className={styles["speaker-n-dials"]}>
      <div className={styles["large-horizontal-grille"]} />

      <div className={styles["control-plate"]}>
        <div className={styles["panel"]} />
        <div className="flex flex-col h-full pt-[20%] pb-[30%]">
          <div className="flex justify-between px-[8%] ">
            <DecorativeDial />
            <DecorativeDial />
          </div>

          <ChangeDial />
        </div>
      </div>
    </div>
  );
}

export default SpeakerNDials;
