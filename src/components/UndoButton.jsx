import { useState } from "react";
import styles from "./CustomButton.module.css";

export default function UndoButton({ onUndo }) {

    const [rotate, setRotate] = useState(false);


    const handleClick = () => {

        onUndo();


        setRotate(true);


        setTimeout(() => {
            setRotate(false);
        },600);

    };


    return (
        <button
            className={styles.undoButton}
            onClick={handleClick}
        >

            <span
                className={
                    rotate
                    ? styles.iconRotate
                    : styles.icon
                }
            >
                ⟲
            </span>

        </button>
    );
}