import { useState } from "react";
import styles from "./FlipButton.module.css";

export default function FlipButton({
    onFlip,
    animate = true,
    invert = true,
    icon = "",
    title
}) {
    const [rotation, setRotation] = useState(0);
    const [inverted, setInverted] = useState(false);
    const [mirrored, setMirrored] = useState(false);

    const handleClick = () => {
        if (animate) {
            setRotation(r => (r === 0 ? 360 : 0));
            setMirrored(m => !m);
        }

        if (invert) {
            setInverted(i => !i);
        }

        onFlip?.();
    };

    return (
        <button
            className={styles.flipButton}
            onClick={handleClick}
            title={title}
            style={{
                transform: `rotate(${rotation}deg)`,
                filter: inverted ? "invert(1)" : "invert(0)"
            }}
        >
            <span
                className={styles.knight}
                style={{ transform: mirrored ? "scaleX(-1)" : "scaleX(1)" }}
            >
                {icon}
            </span>
        </button>
    );
}
