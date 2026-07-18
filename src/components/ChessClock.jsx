import { useState, useEffect } from "react";
import { Zap, Flame, Brain, ChevronDown } from "lucide-react";
import styles from "./ChessClock.module.css";

const TIME_CONTROLS = [
    { group: "Bullet", icon: Zap, items: [
        { value: "1+0", label: "1 min" },
        { value: "2+1", label: "2 min + 1s" }
    ]},
    { group: "Blitz", icon: Flame, items: [
        { value: "3+0", label: "3 min" },
        { value: "3+2", label: "3 min + 2s" },
        { value: "5+0", label: "5 min" }
    ]},
    { group: "Rapid", icon: Brain, items: [
        { value: "10+0", label: "10 min" },
        { value: "15+10", label: "15 min + 10s" }
    ]}
];

const formatTime = sec => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;

export default function ChessClock({
    active,
    initialTime,
    increment,
    onFlag,
    onTimeControlChange,
    canConfigure = false,
    gameActive = false,
    timeControl,
    resetKey,
    icon
}) {
    const [time, setTime] = useState(initialTime);
    const [editing, setEditing] = useState(false);
    const [openGroup, setOpenGroup] = useState(null);

    useEffect(() => { setTime(initialTime); }, [initialTime, timeControl, resetKey]);

    useEffect(() => {
        if (!active) return;
        const interval = setInterval(() => {
            setTime(t => {
                if (t <= 0) {
                    clearInterval(interval);
                    onFlag?.();
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [active, onFlag]);

    const applyTimeControl = tc => {
        onTimeControlChange?.(tc);
        setEditing(false);
    };

    const toggleGroup = group => {
        setOpenGroup(g => (g === group ? null : group));
    };

    return (
        <div className={styles.clockWrapper}>
            <div className={`${styles.clockButton} ${active ? styles.active : ""}`}>
                <div className={`${styles.time} ${gameActive && canConfigure ? styles.timeCenter : ""}`}>
                    {formatTime(time)}
                </div>

                {canConfigure && (
                    <button
                        className={`${styles.settingsButton} ${gameActive ? styles.hideSettings : ""}`}
                        onClick={() => setEditing(e => !e)}
                        aria-label="Configure time control"
                        title="Configure time control"
                    >
                        {icon}
                    </button>
                )}
            </div>

            <div className={`${styles.clockMenu} ${editing ? styles.open : ""}`}>
                <div className={styles.menuHeader}>
                    <div className={styles.menuTitle}>Time Control</div>
                    <div className={styles.menuSubtitle}>Choose game speed</div>
                </div>

                {TIME_CONTROLS.map(section => {
                    const Icon = section.icon;
                    const isOpen = openGroup === section.group;

                    return (
                        <div key={section.group} className={styles.timeGroup}>
                            <button className={styles.groupButton} onClick={() => toggleGroup(section.group)}>
                                <span className={styles.groupLeft}>
                                    <Icon size={16} />
                                    {section.group}
                                </span>
                                <ChevronDown size={16} className={isOpen ? styles.rotate : ""} />
                            </button>

                            <div className={`${styles.timeRow} ${isOpen ? styles.expand : styles.collapse}`}>
                                {section.items.map(item => (
                                    <button
                                        key={item.value}
                                        className={`${styles.timeButton} ${timeControl === item.value ? styles.selected : ""}`}
                                        onClick={() => applyTimeControl(item.value)}
                                    >
                                        <strong>{item.value}</strong>
                                        <span className={styles.tcExplain}>{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
