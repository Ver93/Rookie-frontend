import { useState } from "react";
import styles from "./Tooltip.module.css";

export default function Tooltip({ text }) {
  const [open, setOpen] = useState(false);

  return (
    <span className={styles.wrapper}>
      <button
        className={styles.infoButton}
        onClick={() => setOpen(!open)}
      >
        i
      </button>

      {open && (
        <span className={styles.tooltip}>
          {text}
        </span>
      )}
    </span>
  );
}
