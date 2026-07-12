import styles from "./GameMenuPanel.module.css";

export default function GameMenuPanel({
    onClose,    
    playerColor, 
    setPlayerColor,
    timeControl, 
    setTimeControl,
    fenInput,
    setFenInput,
    goToFEN
}) {
    return (
        <div className={styles.panel}>
            <button className={styles.closeButton} onClick={onClose}>
            ✕
            </button>

            <h2 className={styles.title}>Game Settings</h2>

            <div className={styles.section}>
                <label className={styles.label}>Player Color</label>
        
                <div className={styles.colorRow}>
                <button
                    className={`${styles.colorButton} ${playerColor === "white" ? styles.active : ""}`}
                    onClick={() => setPlayerColor("white")}
                >
                    White
                </button>
        
                <button
                    className={`${styles.colorButton} ${playerColor === "black" ? styles.active : ""}`}
                    onClick={() => setPlayerColor("black")}
                >
                    Black
                </button>
                </div>
            </div>

            <div className={styles.section}>
                <label className={styles.label}>Time Control</label>
        
                <div className={styles.timeRow}>
                    {["1+0", "3+0", "3+2", "5+0", "10+0"].map(tc => (
                    <button
                        key={tc}
                        className={`${styles.timeButton} ${timeControl === tc ? styles.active : ""}`}
                        onClick={() => setTimeControl(tc)}
                    >
                        {tc}
                    </button>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <label className={styles.label}>Load FEN</label>
        
                <input
                    className={styles.textInput}
                    type="text"
                    value={fenInput}
                    onChange={(e) => setFenInput(e.target.value)}
                    placeholder="Paste FEN string..."
                />
        
                <button
                    className={styles.loadButton}
                    onClick={() => {
                        if (goToFEN(fenInput)) {
                            setFenInput("");
                            onClose();
                        }
                    }}
                >
                    Load Position
                </button>
            </div>
        </div>
    );
}
