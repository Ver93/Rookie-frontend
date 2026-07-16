import { useState, useEffect } from "react";
import styles from "./ChessClock.module.css";

export default function ChessClock({
    active,
    initialTime,
    increment,
    onFlag,
    onTimeControlChange,
    clickable = true
}) {
    const [time, setTime] = useState(initialTime);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        setTime(initialTime);
    }, [initialTime]);

    useEffect(() => {
        if (!active) return;

        const interval = setInterval(() => {
            setTime(t => {
                if (t <= 0) {
                    clearInterval(interval);

                    if (onFlag) {
                        onFlag();
                    }

                    return 0;
                }

                return t - 1;
            });
        }, 1000);

        return () => clearInterval(interval);

    }, [active, onFlag]);


    useEffect(() => {
        if (active) {
            setTime(t =>
                Math.min(
                    t + increment,
                    initialTime
                )
            );
        }
    }, [active, increment, initialTime]);


    const format = (t) => {
        const minutes = Math.floor(t / 60);
        const seconds = t % 60;

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };


    const low = time <= 10;
    const critical = time <= 5;
    const flag = time <= 0;


    const timeControls = [
        "1+0",
        "3+0",
        "3+2",
        "5+0",
        "10+0"
    ];


    const applyTimeControl = (tc) => {
        onTimeControlChange(tc);
        setEditing(false);
    };


    return (
        <div className={styles.clockWrapper}>

            <div
                className={[
                    styles.clock,
                    active ? styles.active : "",
                    low ? styles.low : "",
                    critical ? styles.critical : "",
                    flag ? styles.flag : "",
                    editing ? styles.editing : "",
                    !clickable ? styles.disabled : ""
                ].join(" ")}

                onClick={
                    clickable
                        ? () => setEditing(e => !e)
                        : undefined
                }
            >
                {format(time)}
            </div>


            {clickable && (
                <div
                    className={[
                        styles.clockMenu,
                        editing ? styles.open : ""
                    ].join(" ")}
                >

                    <div className={styles.section}>

                        <label className={styles.label}>
                            Time Control
                        </label>

                        <div className={styles.timeRow}>

                            {timeControls.map(tc => (
                                <button
                                    key={tc}
                                    className={styles.timeButton}
                                    onClick={() =>
                                        applyTimeControl(tc)
                                    }
                                >
                                    {tc}
                                </button>
                            ))}

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}