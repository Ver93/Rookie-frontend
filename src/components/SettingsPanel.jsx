
import styles from "./SettingsPanel.module.css";
import Tooltip from "./Tooltip";

export default function SettingsPanel({
    onClose,
    depth,
    setDepth,
    highlightLegal,
    setHighlightLegal,
    highlightLast,
    setHighlightLast,
    highlightChecks,
    setHighlightChecks,
}) {

    const difficultyLevels = [
        {
            name: "Beginner",
            depth: 3
        },
        {
            name: "Intermediate",
            depth: 5
        },
        {
            name: "Expert",
            depth: 7
        }
    ];

    return (
        <div className={styles.panel}>
            <button
                className={styles.closeButton}
                onClick={onClose}
            >
                ✕
            </button>

            <h2 className={styles.title}>
                Engine Settings
            </h2>

            <div className={styles.section}>
                <label className={styles.label}>
                    Difficulty
                    <Tooltip text="Controls how deep the engine searches." />
                </label>

                <div className={styles.toggleRow}>
                    {difficultyLevels.map(level => (
                        <button
                            key={level.name}
                            className={`${styles.toggleButton} ${
                                depth === level.depth
                                    ? styles.active
                                    : ""
                            }`}
                            onClick={() => setDepth(level.depth)}
                        >
                            {level.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <label className={styles.label}>
                    Highlights
                    <Tooltip text="Visual help for moves and checks." />
                </label>

                <div className={styles.toggleRow}>
                    <button
                        className={`${styles.toggleButton} ${
                            highlightLegal
                                ? styles.active
                                : ""
                        }`}
                        onClick={() =>
                            setHighlightLegal(!highlightLegal)
                        }
                    >
                        Legal Moves
                    </button>

                    <button
                        className={`${styles.toggleButton} ${
                            highlightLast
                                ? styles.active
                                : ""
                        }`}
                        onClick={() =>
                            setHighlightLast(!highlightLast)
                        }
                    >
                        Last Move
                    </button>

                    <button
                        className={`${styles.toggleButton} ${
                            highlightChecks
                                ? styles.active
                                : ""
                        }`}
                        onClick={() =>
                            setHighlightChecks(!highlightChecks)
                        }
                    >
                        Checks
                    </button>
                </div>
            </div>
        </div>
    );
}
