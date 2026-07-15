import { useState, useRef, useEffect } from "react";
import styles from "./Terminal.module.css";

export default function Terminal({ log, onSend }) {
    const [input, setInput] = useState("");
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [log]);

    function handleSubmit(e) {
        e.preventDefault();
        if (!input.trim()) return;

        onSend(input);
        setInput("");
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.output} ref={ref}>
                {log.map((line, i) => (
                    <div key={i} className={styles.line}>{line}</div>
                ))}
            </div>

            <form className={styles.inputRow} onSubmit={handleSubmit}>
                <span className={styles.prompt}></span>
                <input
                    className={styles.input}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter command..."
                />
            </form>
        </div>
    );
}
