import styles from "./ResignButton.module.css"

export default function ResignButton({
    onResign,
    disabled = false,
    icon,
}) {
    return (
        <button
            className={styles.resignButton}
            onClick={onResign}
            disabled={disabled}
            title="Resign game"
        >
            {icon}
        </button>
    );
}