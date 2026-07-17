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
    const inverted = invert && !active;

    const selectDifficulty = value => {
        onDifficultyChange(value);
        setOpen(false);
    };

    return (
        <div className={styles.engineWrapper}>
            <button
                className={`${styles.engineButton} ${active ? styles.active : ""}`}
                onClick={() => setOpen(o => !o)}
                title={title}
                style={{ filter: inverted ? "invert(1)" : "invert(0)" }}
            >
                {icon}
            </button>

            <div className={`${styles.engineMenu} ${open ? styles.open : ""}`}>
                <div className={styles.menuTitle}>Engine difficulty</div>

                <div className={styles.difficultyRow}>
                    <button
                        className={`${styles.difficultyButton} ${difficulty === 3 ? styles.selected : ""}`}
                        onClick={() => selectDifficulty(3)}
                    >
                        Easy
                    </button>

                    <button
                        className={`${styles.difficultyButton} ${difficulty === 5 ? styles.selected : ""}`}
                        onClick={() => selectDifficulty(5)}
                    >
                        Normal
                    </button>

                    <button
                        className={`${styles.difficultyButton} ${difficulty === 7 ? styles.selected : ""}`}
                        onClick={() => selectDifficulty(7)}
                    >
                        Hard
                    </button>

                    <button
                        className={`${styles.difficultyButton} ${difficulty === 9 ? styles.selected : ""}`}
                        onClick={() => selectDifficulty(9)}
                    >
                        Expert
                    </button>
                </div>
            </div>
        </div>
    );
}
