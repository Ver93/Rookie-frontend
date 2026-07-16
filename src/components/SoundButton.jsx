import styles from "./CustomButton.module.css";

export default function SoundButton({
    onClick,
    invert = true,
    icon = "",
    title,
    active = true
}) {

    return (
        <button
            className={`${styles.soundButton} ${active ? styles.active : ""}`}
            onClick={onClick}
            title={title}
            style={{
                filter: invert && !active ? "invert(0)" : "invert(1)"
            }}
        >
            {icon}
        </button>
    );
}