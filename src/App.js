import Header from "./components/Header";
import ChessBoard from "./components/ChessBoard";
import ChessClock from "./components/ChessClock";
import ChessTurn from "./components/ChessTurn";
import ChessLog from "./components/ChessLog";

import useUIState from "./hooks/useUIState";
import useEngine from "./hooks/useEngine";
import useTheme from "./hooks/useTheme";

import { useState } from "react";
import { parseTimeControl } from "./hooks/useClock";

import styles from "./App.module.css";
// import { playMoveSound } from "./utils/sound";

import FlipButton from "./components/buttons/FlipButton";
import EngineButton from "./components/buttons/EngineButton";
import UndoButton from "./components/buttons/UndoButton";
import HighlightButton from "./components/buttons/HighlightButton";
import SoundButton from "./components/buttons/SoundButton";
import ThemeButton from "./components/buttons/ThemeButton";
import DemoOverlay from "./components/DemoOverlay";

function App() {
    const ui = useUIState();

    const playerColor = ui.playerColor;
    const [soundEnabled, setSoundEnabled] = useState(true);

    const theme = useTheme();

    const setHighlights = (value) => {
        ui.setHighlightSettings({
            enabled: value,
            legal: value,
            checks: value,
            last: value
        });
    };


    const engine = useEngine(
        ui.depth,
        playerColor,
        true,
        soundEnabled
    );

    const clock = parseTimeControl(ui.timeControl);
    
    const opponentColor = playerColor === "white"
        ? "black"
        : "white";

    return (
        
        <div className={styles.appWrapper}>

            <DemoOverlay onStart={() => {}} />


            <div className={styles.mainLayout}>
                <Header
                    engine={engine}
                />
                <div
                    className={`${styles.clockBackground} ${
                        engine.gameTurn === opponentColor
                            ? styles.activePlayer
                            : ""
                    }`}
                    >
                    <div className={styles.chessDisplay}>

                        <div className={styles.clockLeft}>

                        <ThemeButton
                            title={theme.isDark ? "Light mode" : "Dark mode"}
                            invert={theme.isDark}
                            active={!theme.isDark}
                            icon={
                                theme.isDark ? (
                                    // Sun
                                    <svg
                                        className="theme-icon"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1z"
                                        />
                                    </svg>
                                ) : (

                                    // Moon
                                    <svg
                                        className="theme-icon"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
                                    </svg>
                                )
                            }
                            onClick={theme.toggleMode}
                        />

                        <SoundButton
                            title={soundEnabled ? "Disable sound" : "Enable sound"}
                            active={soundEnabled}
                            invert={true}
                            icon={
                                soundEnabled
                                    ?
                                    <svg width="18" height="18" viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">

                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>

                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>

                                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>

                                    </svg>
                                    :
                                    <svg width="18" height="18" viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">

                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>

                                        <line x1="23" y1="9" x2="17" y2="15"/>

                                        <line x1="17" y1="9" x2="23" y2="15"/>

                                    </svg>
                            }
                            onClick={() => setSoundEnabled(v => !v)}
                        />


                            <HighlightButton
                                title={"Highlights"}
                                active={ui.highlightSettings.enabled}
                                icon={
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 18h6"/>
                                        <path d="M10 22h4"/>
                                        <path d="M12 2a7 7 0 0 0-4 12c1 1 2 2 2 4h4c0-2 1-3 2-4a7 7 0 0 0-4-12z"/>
                                    </svg>
                                }
                                invert={true}
                                onClick={() => {
                                    const value = !ui.highlightSettings.enabled;
                                    setHighlights(value);
                                }}
                            />

                            </div>

                        <div className={styles.clockCenter}>

                            <ChessTurn
                                turn={engine.gameTurn}
                                playerColor={opponentColor}
                                isPlayer={false}
                                isThinking={engine.isThinking}
                            />

                        </div>


                        <div className={styles.clockRight}>

                        <ChessClock
                            active={
                                engine.gameStarted &&
                                !engine.isAnalysisMode &&
                                engine.gameTurn === opponentColor
                            }
                            initialTime={clock.initial}
                            increment={clock.inc}
                            resetKey={engine.clockResetKey}
                        />

                        </div>

                    </div>

                </div>



                <div className={styles.chessBackground}>

                    <div className={styles.chessBoardContainer}>

                            <ChessBoard
                                position={engine.position}
                                playerColor={playerColor}
                                squareStyles={engine.squareStyles}
                                gameInstance={engine.gameInstance}
                                lastMove={engine.lastMove}
                                onPlayerMove={engine.onPlayerMove}

                                highlightLegal={
                                    ui.highlightSettings.legal &&
                                    !engine.isAnalysisMode
                                }

                                highlightLast={ui.highlightSettings.last}
                                highlightChecks={ui.highlightSettings.checks}
                                analysisMode={engine.isAnalysisMode}
                            />
                    </div>

                </div>



                <div
                    className={`${styles.clockBackground} ${
                        engine.gameTurn === playerColor
                            ? styles.activePlayer
                            : ""
                    }`}
                >

                    <div className={styles.chessDisplay}>

                    <div className={styles.clockLeft}>

                            <FlipButton
                                playerColor={playerColor}
                                title={"Switch Colors"}

                                onFlip={async () => {

                                    const newColor =
                                        playerColor === "white"
                                            ? "black"
                                            : "white";

                                    ui.setPlayerColor(newColor);

                                    await engine.resetGame(newColor);

                                }}
                            />

                            <UndoButton onUndo={engine.undoMove}/>
                            <EngineButton
                                title={"Engine"}
                                difficulty={ui.depth}
                                onDifficultyChange={ui.setDepth}
                                icon={
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="3"/>
                                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.08A1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.08a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                                    </svg>
                                }
                            />

                        </div>


                        <div className={styles.clockCenter}>

                            <ChessTurn
                                turn={engine.gameTurn}
                                playerColor={playerColor}
                                isPlayer={true}
                                isThinking={false}
                            />

                        </div>


                        <div className={styles.clockRight}>

                                <ChessClock
                                    active={
                                        engine.gameStarted &&
                                        !engine.isAnalysisMode &&
                                        engine.gameTurn === playerColor
                                    }
                                    initialTime={clock.initial}
                                    resetKey={engine.clockResetKey}
                                    increment={clock.inc}
                                    timeControl={ui.timeControl}
                                    canConfigure={true}
                                    gameActive={engine.gameStarted}
                                    onTimeControlChange={(tc) => {
                                        ui.setTimeControl(tc);
                                    }}
                                />
                        </div>
                    </div>
                </div>



                <div className={styles.chessLogBackground}>

                    <ChessLog
                        moves={engine.log}
                        lastMove={engine.lastMove}
                        onSelectMove={engine.viewMove}
                        undoCounter={engine.undoCounter}
                    />

                </div>


            </div>

        </div>
    );
}

export default App;