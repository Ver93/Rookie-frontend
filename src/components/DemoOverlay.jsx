import { useState, useMemo } from "react";
import styles from "./DemoOverlay.module.css";

export default function DemoOverlay({ onStart }) {
    const [hide, setHide] = useState(false);
    const [finished, setFinished] = useState(false);

    const text = "Rookie GUI";

    const letters = useMemo(() => {
        return text.split("").map((char, i) => ({
            char,
            key: i,
            delay: `${i * 0.08}s`
        }));
    }, [text]);

    function startDemo() {
        onStart();
        setHide(true);

        setTimeout(() => {
            setFinished(true);
        }, 550);
    }

    if (finished) return null;

    return (
        <button
            className={`${styles.demoOverlay} ${hide ? styles.slideUp : ""}`}
            onClick={startDemo}
        >
            <div className={styles.titleWrapper}>
                <h1 className={styles.title}>
                    {letters.map(({ char, key, delay }) =>
                        char === " " ? (
                            <span key={key} className={styles.space}>&nbsp;</span>
                        ) : (
                            <span
                                key={key}
                                className={styles.letter}
                                style={{ "--delay": delay }}
                            >
                                {char}
                            </span>
                        )
                    )}
                </h1>
            </div>

            <p className={styles.pressText}>Press to start demo</p>

            {/* <div className={styles.circleIcon}></div> */}
        </button>
    );
}
