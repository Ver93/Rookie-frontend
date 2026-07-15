import styles from "./ChessTurn.module.css";

export default function ChessTurn({ turn }) {
    return (
        <span className={styles.chessTurn}>
            {turn}
        </span>
    );
}
