import { useState } from "react";
import styles from "./ResetButton.module.css";

export default function ResetButton({ onReset }) {
    const [rotate, setRotate] = useState(false);

    const handleClick = () => {
        onReset();
        setRotate(true);
        setTimeout(() => setRotate(false), 600);
    };

    return (
        <button className={styles.resetButton} onClick={handleClick}>
            <span className={rotate ? styles.iconRotate : styles.icon}>⟲</span>
        </button>
    );
}
