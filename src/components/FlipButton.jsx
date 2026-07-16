import { useState } from "react";
import styles from "./FlipButton.module.css";

export default function FlipButton({ onFlip }) {
    const [rotation, setRotation] = useState(0);
    const [inverted, setInverted] = useState(false);
    const [mirrored, setMirrored] = useState(false);

    const handleClick = () => {
        setRotation(prev => prev === 0 ? 360 : 0);
        setInverted(prev => !prev);
        setMirrored(prev => !prev);

        onFlip?.();
    };

    return (
        <button
            className={styles.flipButton}
            onClick={handleClick}
            title="Vänd brädet"
            style={{
                transform: `rotate(${rotation}deg)`,
                filter: inverted ? "invert(1)" : "invert(0)"
            }}
        >
            <span
                className={styles.knight}
                style={{
                    transform: mirrored ? "scaleX(-1)" : "scaleX(1)"
                }}
            >
                ♞
            </span>
        </button>
    );
}