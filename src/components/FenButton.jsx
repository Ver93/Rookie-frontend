import styles from "./FenButton.module.css";

export default function FenButton({ onFen }) {

    const handleClick = () => {
        if (onFen) {
            onFen();
        }
    };

    return (
        <button
            className={styles.fenButton}
            onClick={handleClick}
        >
            FEN
        </button>
    );
}