import ThinkingSpinner from "./components/ThinkingSpinner";

export default function ThinkingSpinner() {
  return (
    <div style={{
      marginTop: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <div style={{
        width: "40px",
        height: "40px",
        border: "4px solid #ccc",
        borderTopColor: "#4caf50",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite"
      }} />
      <div style={{ marginTop: "8px", color: "#4caf50" }}>
        Rookie tänker...
      </div>
    </div>
  );
}
