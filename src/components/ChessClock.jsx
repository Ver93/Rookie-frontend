import { useState, useEffect } from "react";
import styles from "./ChessClock.module.css";

export default function ChessClock({ active, initialTime, increment, onFlag }) {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        setTime(initialTime);
    }, [initialTime, onFlag]);

    useEffect(() => {
        if (!active) return;

        const interval = setInterval(() => {
            setTime(t => {
                if (t <= 0) {
                    clearInterval(interval);
                    onFlag && onFlag();   // ← SIGNALERA TIDEN ÄR SLUT
                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [active]);

    useEffect(() => {
        if (active) {
            setTime(t => Math.min(t + increment, initialTime));
        }
    }, [active, increment, initialTime, onFlag]);

    const format = (t) => {
        const m = Math.floor(t / 60);
        const s = t % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    const low = time <= 10;
    const critical = time <= 5;
    const flag = time <= 0;

    return (
        <div
            className={[
                styles.clock,
                active ? styles.active : "",
                low ? styles.low : "",
                critical ? styles.critical : "",
                flag ? styles.flag : ""
            ].join(" ")}
        >
            {format(time)}
        </div>
    );
}
