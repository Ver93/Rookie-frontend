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
                        <ChessTurn
                            turn={engine.gameTurn}
                            playerColor={opponentColor}
                            isPlayer={false}
                            isThinking={
                                engine.isThinking &&
                                engine.gameTurn === opponentColor &&
                                !engine.isAnalysisMode
                            }
                        />

                        <ChessClock
                            active={
                                engine.gameStarted &&
                                !engine.isAnalysisMode &&
                                engine.gameTurn === opponentColor
                            }
                            initialTime={clock.initial}
                            increment={clock.inc}
                        />
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
                        <ChessTurn
                            turn={engine.gameTurn}
                            playerColor={playerColor}
                            isPlayer={true}
                            isThinking={false}
                        />

                        <ChessClock
                            active={
                                engine.gameStarted &&
                                !engine.isAnalysisMode &&
                                engine.gameTurn === playerColor
                            }
                            initialTime={clock.initial}
                            increment={clock.inc}
                        />
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
                    highlightLegal={ui.highlightLegal}
                    setHighlightLegal={ui.setHighlightLegal}
                    highlightLast={ui.highlightLast}
                    setHighlightLast={ui.setHighlightLast}
                    highlightChecks={ui.highlightChecks}
                    setHighlightChecks={ui.setHighlightChecks}
                />
            )}

            {ui.gameMenuOpen && (
                <GameMenuPanel
                    onClose={() => ui.setGameMenuOpen(false)}
                    playerColor={ui.playerColor}
                    setPlayerColor={ui.setPlayerColor}
                    timeControl={ui.timeControl}
                    setTimeControl={ui.setTimeControl}
                    fenInput={ui.fenInput}
                    setFenInput={ui.setFenInput}
                    goToFEN={engine.goToFEN}
                />
            )}
        </div>
    );
}

export default App;
