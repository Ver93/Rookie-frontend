import { useState } from "react";
import { Bot, User, Circle } from "lucide-react";
import styles from "./ChessTurn.module.css";

const DIFFICULTIES = [
    { id: 3, name: "Rookie", color: "#81c995" },
    { id: 5, name: "Beginner", color: "#a8d08d" },
    { id: 7, name: "Intermediate", color: "#f6d365" },
    { id: 8, name: "Advanced", color: "#f4b183" },
    { id: 9, name: "Master", color: "#e88b8b" }
];

export default function ChessTurn({
    gameStarted = false,
    turn,
    playerColor,
    isPlayer = false,
    isThinking = false,
    difficulty = 1,
    onDifficultyChange,
    canConfigure = false
}) {
    const [editing, setEditing] = useState(false);

    const isTurn = turn === playerColor;
    const currentDifficulty = DIFFICULTIES.find(d => d.id === difficulty) ?? DIFFICULTIES[0];

    const status = (() => {
        if (isThinking) return { text: "Thinking", icon: Bot, className: styles.thinking };
        if (!gameStarted && !isPlayer) return { text: "Rookie", icon: Bot, className: styles.ready };
        if (isTurn && isPlayer) return { text: "Your turn", icon: User, className: styles.playerTurn };
        return { text: "Waiting", icon: Circle, className: styles.waiting };
    })();

    const selectDifficulty = value => {
        onDifficultyChange?.(value);
        setEditing(false);
    };

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.chessTurn} ${status.className}`}>

                {gameStarted && !isPlayer && (
                    <div className={styles.leftIcon}>
                        <Bot
                            size={16}
                            color={currentDifficulty.color}
                            className={isThinking ? styles.spinIcon : ""}
                        />
                    </div>
                )}

                <div className={styles.statusContent}>
                    {isThinking ? (
                        <span>
                            Thinking<span className={styles.dots} />
                        </span>
                    ) : (
                        <span className={styles.statusText}>{status.text}</span>
                    )}
                </div>

                {!gameStarted && canConfigure && (
                    <button
                        className={styles.settingsButton}
                        onClick={() => setEditing(v => !v)}
                        title="Engine difficulty"
                    >
                        <Bot size={16} color={currentDifficulty.color} />
                    </button>
                )}
            </div>

            <div className={`${styles.menu} ${editing ? styles.open : ""}`}>
                <div className={styles.menuTitle}>Engine Difficulty</div>

                {DIFFICULTIES.map(level => (
                    <button
                        key={level.id}
                        className={`${styles.option} ${difficulty === level.id ? styles.selected : ""}`}
                        onClick={() => selectDifficulty(level.id)}
                    >
                        <span className={styles.optionLeft}>
                            <Bot size={16} color={level.color} />
                            {level.name}
                        </span>

                        {difficulty === level.id && <span>✓</span>}
                    </button>
                ))}
            </div>
        </div>
    );
}
