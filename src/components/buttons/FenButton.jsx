import { useState } from "react";
import { Copy, Upload } from "lucide-react";
import styles from "./FenButton.module.css";

export default function FenButton({
    fen,
    onLoadFen,
    onCopyFen,
}) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");

    const loadFen = () => {
        if (!input.trim()) return;

        onLoadFen?.(input.trim());
        setInput("");
        setOpen(false);
    };

    const copyFen = () => {
        navigator.clipboard.writeText(fen);
        onCopyFen?.();
    };

    return (
        <div className={styles.fenWrapper}>

            <button
                className={styles.fenButton}
                onClick={() => setOpen(o => !o)}
                title="FEN tools"
            >
                FEN
            </button>


            <div className={`${styles.fenMenu} ${open ? styles.open : ""}`}>

                <div className={styles.menuHeader}>
                    <div className={styles.menuTitle}>
                        FEN Tools
                    </div>

                    <div className={styles.menuSubtitle}>
                        Manage position
                    </div>
                </div>


                <button
                    className={styles.menuButton}
                    onClick={copyFen}
                >
                    <Copy size={16}/>
                    Copy FEN
                </button>


                <div className={styles.inputGroup}>

                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Paste FEN..."
                    />

                    <button
                        className={styles.loadButton}
                        onClick={loadFen}
                    >
                        <Upload size={16}/>
                        Load
                    </button>

                </div>


            </div>

        </div>
    );
}