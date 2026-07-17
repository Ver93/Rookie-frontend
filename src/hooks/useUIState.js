import { useState } from "react";

export default function useUIState() {
    const [depth, setDepth] = useState(4);
    const [playerColor, setPlayerColor] = useState("white");

    const [highlightSettings, setHighlightSettings] = useState({
        enabled: true,
        legal: true,
        checks: true,
        last: true
    });

    const [timeControl, setTimeControl] = useState("5+0");
    const [fenInput, setFenInput] = useState("");

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [gameMenuOpen, setGameMenuOpen] = useState(false);

    return {
        depth,
        setDepth,

        playerColor,
        setPlayerColor,

        highlightSettings,
        setHighlightSettings,

        timeControl,
        setTimeControl,

        fenInput,
        setFenInput,

        settingsOpen,
        setSettingsOpen,

        gameMenuOpen,
        setGameMenuOpen
    };
}