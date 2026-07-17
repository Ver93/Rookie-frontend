import { useState } from "react";
import styles from "./UndoButton.module.css";
import UndoIcon from "../icons/UndoIcon";

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
                <UndoIcon className="theme-icon"/>
            </span>
        </button>
    );
}
