import { useState } from "react";
import styles from "./FenButton.module.css";

export default function FenButton({ fen }) {

    const [copied, setCopied] = useState(false);


    const handleClick = async () => {

        await navigator.clipboard.writeText(fen);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };


    return (
        <button
            className={styles.fenButton}
            onClick={handleClick}
        >
            {copied ? "✓" : "FEN"}
        </button>
    );
}