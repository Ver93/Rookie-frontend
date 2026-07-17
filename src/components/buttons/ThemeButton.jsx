import styles from "./ThemeButton.module.css";

export default function ThemeButton({
    onClick,
    invert = true,
    icon = "",
    title
}) {

    return (

        <button

            className={styles.themeButton}

            onClick={onClick}

            title={title}

            style={{

                filter:
                    invert
                        ? "invert(1)"
                        : "invert(0)"

            }}

        >

            {icon}

        </button>

    );
}