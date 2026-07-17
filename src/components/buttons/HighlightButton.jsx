import styles from "./HighlightButton.module.css";

export default function HighlightButton({
    onClick,
    invert = true,
    icon = "",
    title,
    active = true
}) {
    const inverted = invert && !active;

    return (
        <button
            className={`${styles.highlightButton} ${active ? styles.active : ""}`}
            onClick={onClick}
            title={title}
            style={{ filter: inverted ? "invert(0)" : "invert(1)" }}
        >
            {icon}
        </button>
    );
}
