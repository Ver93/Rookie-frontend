import styles from "./ThinkingSpinner.module.css";

export default function ThinkingSpinner() {
    return (
        <div style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
 }}>
            
        <div className={styles.spinner} />
            <div style={{ marginTop: "8px", color: "#4caf50" }}>
                Rookie tänker...
            </div>
        </div>
    );
}
