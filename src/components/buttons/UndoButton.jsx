import { useState } from "react";
import styles from "./UndoButton.module.css";

export default function UndoButton({ onUndo }) {

    const [rotate, setRotate] = useState(false);

    const handleClick = () => {
        onUndo();

        setRotate(true);

        setTimeout(() => {
            setRotate(false);
        }, 600);
    };

    return (
        <button className={styles.undoButton} onClick={handleClick}>
            <span className={rotate ? styles.iconRotate : styles.icon}>
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M9 14l-5-5 5-5" />
                    <path d="M4 9h8a7 7 0 1 1 0 14" />
                </svg>
            </span>
        </button>
    );
}
