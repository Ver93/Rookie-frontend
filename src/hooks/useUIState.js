import { useState } from "react";

export default function useUIState() {
    const [depth, setDepth] = useState(4);
    const [playerColor, setPlayerColor] = useState("white");
    const [highlightLegal, setHighlightLegal] = useState(true);
    const [highlightLast, setHighlightLast] = useState(true);
    const [highlightChecks, setHighlightChecks] = useState(true);

    const [timeControl, setTimeControl] = useState("5+0");
    const [fenInput, setFenInput] = useState("");

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [gameMenuOpen, setGameMenuOpen] = useState(false);
    const [highlightsEnabled, setHighlightsEnabled] = useState(true);

    const setHighlights = useCallback((value) => {
        setHighlightsEnabled(value);
        setHighlightLegal(value);
        setHighlightChecks(value);
        setHighlightLast(value);
    }, []);

    return {
        depth,
        setDepth,
        playerColor,
        setPlayerColor,
        highlightLegal,
        setHighlightLegal,
        highlightLast,
        setHighlightLast,
        highlightChecks,
        setHighlightChecks,
        timeControl,
        setTimeControl,
        fenInput,
        setFenInput,
        settingsOpen,
        setSettingsOpen,
        gameMenuOpen,
        setGameMenuOpen,
        highlightsEnabled,
        setHighlightsEnabled
    };
}
