import { useState } from "react";
import styles from "./EngineButton.module.css";

export default function EngineButton({
    onClick,
    invert = true,
    icon = "",
    title,
    active = true,
    difficulty = "normal",
    onDifficultyChange
}) {

    const [open, setOpen] = useState(false);


    const selectDifficulty = (value) => {
        onDifficultyChange(value);
        setOpen(false);
    };


    return (
        <div className={styles.engineWrapper}>

            <button
                className={`${styles.engineButton} ${active ? styles.active : ""}`}
                onClick={() => setOpen(!open)}
                title={title}
                style={{
                    filter: invert && !active ? "invert(1)" : "invert(0)"
                }}
            >
                {icon}
            </button>


            <div
                className={`${styles.engineMenu} ${open ? styles.open : ""}`}
            >

                <div className={styles.menuTitle}>
                    Engine difficulty
                </div>


                <div className={styles.difficultyRow}>

            <button
                className={`${styles.difficultyButton} ${
                    difficulty === 2 ? styles.selected : ""
                }`}
                onClick={() => selectDifficulty(2)}
            >
                🐣 Easy
            </button>


            <button
                className={`${styles.difficultyButton} ${
                    difficulty === 4 ? styles.selected : ""
                }`}
                onClick={() => selectDifficulty(4)}
            >
                ⚙️ Normal
            </button>


            <button
                className={`${styles.difficultyButton} ${
                    difficulty === 6 ? styles.selected : ""
                }`}
                onClick={() => selectDifficulty(6)}
            >
                ⚔️ Hard
            </button>


            <button
                className={`${styles.difficultyButton} ${
                    difficulty === 8 ? styles.selected : ""
                }`}
                onClick={() => selectDifficulty(8)}
            >
                🔥 Expert
            </button>

                </div>

            </div>

        </div>
    );
}