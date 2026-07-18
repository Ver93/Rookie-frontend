import useTheme from "./useTheme";
import useUIState from "./useUIState";

export default function useGameSettings() {
    const { isDark, toggleMode } = useTheme();


    const {
        playerColor, setPlayerColor,
        depth, setDepth,
        timeControl, setTimeControl,
        highlightSettings, setHighlightSettings,
        soundEnabled, setSoundEnabled
    } = useUIState();
    
    const opponentColor = playerColor === "white" ? "black" : "white";

    const toggleSound = () => setSoundEnabled(v => !v);

    const toggleHighlights = () => {
        const enabled = !highlightSettings.enabled;
        setHighlightSettings({
            enabled,
            legal: enabled,
            checks: enabled,
            last: enabled
        });
    };

    return {
        isDark,
        toggleMode,

        soundEnabled,
        toggleSound,

        playerColor,
        setPlayerColor,
        opponentColor,

        depth,
        setDepth,

        timeControl,
        setTimeControl,

        highlightSettings,
        toggleHighlights
    };
}
