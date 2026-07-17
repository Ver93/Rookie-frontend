import { useState, useRef, useMemo } from "react";
import { ChevronUp } from "lucide-react";
import styles from "./DemoOverlay.module.css";

export default function DemoOverlay({ onStart }) {
    const [hide, setHide] = useState(false);

    const startY = useRef(null);
    const started = useRef(false);

    const text = "Rookie GUI";

    const letters = useMemo(() => {
        return text.split("").map((char, i) => ({
            char,
            key: i,
            delay: `${i * 0.08}s`
        }));
    }, [text]);

    function startDemo() {
        if (started.current) return;

        started.current = true;
        setHide(true);

        setTimeout(() => {
            onStart();
        }, 450); // matchar slideUp-animationen
    }

    function handleTouchStart(e) {
        startY.current = e.touches[0].clientY;
    }

    function handleTouchEnd(e) {
        if (!startY.current) return;

        const endY = e.changedTouches[0].clientY;
        const distance = startY.current - endY;

        if (distance > 80) startDemo();

        startY.current = null;
    }

    // Ta bort overlayen helt efter animationen
    if (hide) return null;

    return (
        <div
            className={`${styles.demoOverlay} ${hide ? styles.slideUp : ""}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* TITLE */}
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

            {/* SWIPE TEXT */}
            <p className={styles.swipeText}>Swipe up to try demo</p>

            {/* BOTTOM CHEVRONS */}
            <div className={styles.bottomChevrons}>
                <ChevronUp className={styles.chevron1} />
                <ChevronUp className={styles.chevron2} />
                <ChevronUp className={styles.chevron3} />
            </div>
        </div>
    );
}
