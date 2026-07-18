import styles from "./TopControls.module.css";

import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";
import SoundOnIcon from "./icons/SoundOnIcon";
import SoundOffIcon from "./icons/SoundOffIcon";
import HighlightIcon from "./icons/HighlightIcon";

import ThemeButton from "./buttons/ThemeButton";
import SoundButton from "./buttons/SoundButton";
import HighlightButton from "./buttons/HighlightButton";

import ChessTurn from "./ChessTurn";
import ChessClock from "./ChessClock";

import { useGameContext } from "../contexts/GameContext";

export default function TopControls({ settings, audio, clock }) {
    const game = useGameContext();
    const opponentColor = settings.playerColor === "white" ? "black" : "white";

    return (
        <div className={styles.displayWrapper}>
            <div className={styles.topDisplay}>

                <div className={styles.buttonGroup}>
                    <ThemeButton
                        title={settings.isDark ? "Dark mode" : "Light mode"}
                        invert={settings.isDark}
                        active={!settings.isDark}
                        icon={settings.isDark ? <SunIcon className="theme-icon" /> : <MoonIcon className="theme-icon" />}
                        onClick={settings.toggleMode}
                    />

                    <SoundButton
                        title={audio.soundEnabled ? "Disable sound" : "Enable sound"}
                        active={audio.soundEnabled}
                        invert
                        icon={audio.soundEnabled ? <SoundOnIcon className="theme-icon" /> : <SoundOffIcon className="theme-icon" />}
                        onClick={audio.toggleSound}
                    />

                    <HighlightButton
                        title="Highlights"
                        active={settings.highlightSettings.enabled}
                        invert
                        icon={<HighlightIcon className="theme-icon" />}
                        onClick={settings.toggleHighlights}
                    />
                </div>

                <div className={styles.center}>
                    <ChessTurn
                        gameStarted={game.gameStarted}
                        turn={game.gameTurn}
                        playerColor={settings.playerColor}
                        isPlayer={false}
                        isThinking={game.isThinking}
                        difficulty={settings.depth}
                        onDifficultyChange={settings.setDepth}
                        canConfigure={true}
                    />
                </div>

                <div className={styles.right}>
                    <ChessClock
                        active={game.gameStarted && !game.isAnalysisMode && game.gameTurn === opponentColor}
                        initialTime={clock.initial}
                        increment={clock.inc}
                        resetKey={game.clockResetKey}
                    />
                </div>

            </div>
        </div>
    );
}
