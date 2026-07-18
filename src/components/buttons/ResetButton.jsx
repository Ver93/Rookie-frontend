import { useState } from "react";
import styles from "./ResetButton.module.css";
import ResetIcon from "../icons/ResetIcon";

export default function ResetButton({
    title,
    onReset,
    invert = false,
    animate = true
}) {
    const [rotate, setRotate] = useState(false);

    const handleClick = () => {
        if (onReset) onReset();
        if (animate) {
            setRotate(true);
            setTimeout(() => setRotate(false), 450);
        }
    };

    return (
        <button
            className={`${styles.resetButton} ${invert ? styles.invert : ""}`}
            title={title}
            onClick={handleClick}
        >
            <span className={rotate ? styles.iconRotate : styles.icon}>
                <ResetIcon />
            </span>
        </button>
    );
}
