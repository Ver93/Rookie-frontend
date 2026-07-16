import Header from "./components/Header";
import ChessBoard from "./components/ChessBoard";
import ChessClock from "./components/ChessClock";
import ChessTurn from "./components/ChessTurn";
import ChessLog from "./components/ChessLog";

import useEngine from "./hooks/useEngine";
import useUIState from "./hooks/useUIState";
import { parseTimeControl } from "./hooks/useClock";

import styles from "./App.module.css";


function App() {

    const playerColor = "white";

    const engine = useEngine(10, playerColor, true);

    const ui = useUIState();

    const clock = parseTimeControl(ui.timeControl);


    const opponentColor = playerColor === "white"
        ? "black"
        : "white";


    return (
        <div className={styles.appWrapper}>

            <div className={styles.mainLayout}>

                <Header />


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
                            highlightLegal={!engine.isAnalysisMode}
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


        </div>
    );
}


export default App;