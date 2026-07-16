import styles from "./SettingsPanel.module.css";
import Tooltip from "./Tooltip";

export default function SettingsPanel({
    onClose,
    depth, setDepth,
    highlightLegal, setHighlightLegal,
    highlightLast, setHighlightLast,
    highlightChecks, setHighlightChecks,
}) {

    const depthOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className={styles.panel}>

            <button className={styles.closeButton} onClick={onClose}>
                ✕
            </button>

            <h2 className={styles.title}>Engine Settings</h2>

            <div className={styles.section}>
                <label className={styles.label}>
                    Depth
                    <Tooltip text="Allows the engine to search deeper positions." />
                </label>

                <div className={styles.depthRow}>
                    {depthOptions.map((d) => (
                        <button
                            key={d}
                            className={`${styles.depthButton} ${depth === d ? styles.active : ""}`}
                            onClick={() => setDepth(d)}
                        >
                            {d}
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
                        className={`${styles.toggleButton} ${highlightLegal ? styles.active : ""}`}
                        onClick={() => setHighlightLegal(!highlightLegal)}
                    >
                        Legal Moves
                    </button>

                    <button
                        className={`${styles.toggleButton} ${highlightLast ? styles.active : ""}`}
                        onClick={() => setHighlightLast(!highlightLast)}
                    >
                        Last Move
                    </button>

                    <button
                        className={`${styles.toggleButton} ${highlightChecks ? styles.active : ""}`}
                        onClick={() => setHighlightChecks(!highlightChecks)}
                    >
                        Checks
                    </button>
                </div>
            </div>
        </div>
    );
}