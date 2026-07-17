import styles from "./ThemeButton.module.css";

export default function ThemeButton({
    onClick,
    invert = false,
    icon = "",
    title,
    active = false
}) {

    return (
        <button
            className={`${styles.themeButton} ${
                invert ? styles.invert : ""
            } ${
                active ? styles.active : ""
            }`}
            onClick={onClick}
            title={title}
        >
            {icon}
        </button>
    );
}