import Header from "./components/Header";
import ChessBoard from "./components/ChessBoard";
import ChessClock from "./components/ChessClock";
import ChessTurn from "./components/ChessTurn";
import ChessLog from "./components/ChessLog";
import SettingsPanel from "./components/SettingsPanel";
import GameMenuPanel from "./components/GameMenuPanel";

import useEngine from "./hooks/useEngine";
import useUIState from "./hooks/useUIState";
import { parseTimeControl } from "./hooks/useClock";

import styles from "./App.module.css";
import FlipButton from "./components/FlipButton";
// import FenButton from "./components/FenButton";
import UndoButton from "./components/UndoButton";
import HighlightButton from "./components/HighlightButton";

function App() {
    const ui = useUIState();

    const playerColor = ui.playerColor;

    const engine = useEngine(
        ui.depth,
        playerColor,
        true
    );

    const clock = parseTimeControl(ui.timeControl);

    const opponentColor = playerColor === "white"
        ? "black"
        : "white";


    return (
        <div className={styles.appWrapper}>

            <div className={styles.mainLayout}>

                <Header
                    onOpenSettings={() => ui.setSettingsOpen(true)}
                    onOpenGameMenu={() => ui.setGameMenuOpen(true)}
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
                            <HighlightButton
                                title={"Highlights"}
                                active={ui.highlightsEnabled}
                                icon={
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                                    </svg>
                                }
                                invert={true}
                                onClick={() => {
                                    const value = !ui.highlightsEnabled;

                                    ui.setHighlightsEnabled(value);
                                    ui.setHighlightLegal(value);
                                    ui.setHighlightChecks(value);
                                    ui.setHighlightLast(value);
                                }}
                            />

                            <HighlightButton
                                title={"Highlights"}
                                active={ui.highlightsEnabled}
                                icon={
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                                    </svg>
                                }
                                invert={true}
                                onClick={() => {
                                    const value = !ui.highlightsEnabled;
                                    
                                    ui.setHighlightsEnabled(value);
                                    ui.setHighlightLegal(value);
                                    ui.setHighlightChecks(value);
                                    ui.setHighlightLast(value);
                                }}
                                />

                            <HighlightButton
                                title={"Highlights"}
                                active={ui.highlightsEnabled}
                                icon={
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="3"/>
                                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.08A1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.08a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                                    </svg>
                                }
                                invert={false}
                                onClick={() => {
                                    const value = !ui.highlightsEnabled;
                                    
                                    ui.setHighlightsEnabled(value);
                                    ui.setHighlightLegal(value);
                                    ui.setHighlightChecks(value);
                                    ui.setHighlightLast(value);
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
                                ui.highlightLegal &&
                                !engine.isAnalysisMode
                            }
                            highlightLast={ui.highlightLast}
                            highlightChecks={ui.highlightChecks}
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
                            <HighlightButton
                                title={"Highlights"}
                                active={ui.highlightsEnabled}
                                icon={
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 18h6"/>
                                        <path d="M10 22h4"/>
                                        <path d="M12 2a7 7 0 0 0-4 12c1 1 2 2 2 4h4c0-2 1-3 2-4a7 7 0 0 0-4-12z"/>
                                    </svg>
                                }
                                invert={true}
                                onClick={() => {
                                    const value = !ui.highlightsEnabled;

                                    ui.setHighlightsEnabled(value);
                                    ui.setHighlightLegal(value);
                                    ui.setHighlightChecks(value);
                                    ui.setHighlightLast(value);
                                }}
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
                    />

                </div>


            </div>



            {ui.settingsOpen && (

                <SettingsPanel
                    onClose={() => ui.setSettingsOpen(false)}
                    depth={ui.depth}
                    setDepth={ui.setDepth}
                />

            )}



            {ui.gameMenuOpen && (

                <GameMenuPanel
                    onClose={() => ui.setGameMenuOpen(false)}
                />

            )}

        </div>
    );
}

export default App;