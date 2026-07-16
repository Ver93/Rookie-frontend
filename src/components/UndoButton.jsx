import { useState } from "react";
import styles from "./CustomButton.module.css";

export default function UndoButton({ fen }) {

    const [rotate, setRotate] = useState(false);

    const handleClick = () => {
        setRotate(true);

        setTimeout(() => {
            setRotate(false);
        }, 600);
    };

    return (
        <button 
            className={styles.undoButton}
            onClick={handleClick}
        >
            <span className={rotate ? styles.iconRotate : styles.icon}>
                <span>⟲</span>
            </span>
        </button>
    );
}