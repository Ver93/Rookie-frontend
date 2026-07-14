import { useState, useEffect } from "react";
import styles from "./ChessClock.module.css";

export default function ChessClock({ active, initialTime, increment }) {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        setTime(initialTime);
    }, [initialTime]);

    useEffect(() => {
        if (!active) return;

        const interval = setInterval(() => {
            setTime(t => Math.max(t - 1, 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [active]);

    useEffect(() => {
        if (active) {
            setTime(t => Math.min(t + increment, initialTime));
        }
    }, [active, increment, initialTime]);

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
