
import { useState } from "react";

export default function useTerminal() {
  const [terminalLog, setTerminalLog] = useState([]);

  async function sendToBackend(text) {
    setTerminalLog(prev => [...prev, "> " + text]);

    try {
      const res = await fetch("http://localhost:3001/api/engine/terminal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: text })
      });

      const data = await res.json();
      setTerminalLog(prev => [...prev, data.output]);
    } catch (err) {
      setTerminalLog(prev => [...prev, "ERROR: " + err.message]);
    }
  }

  return { terminalLog, sendToBackend };
}
