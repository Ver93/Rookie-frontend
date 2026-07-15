import Header from "./components/Header";
import ChessBoard from "./components/ChessBoard";
import ChessClock from "./components/ChessClock";
import ChessTurn from "./components/ChessTurn";
import ChessLog from "./components/ChessLog";

import useEngine from "./hooks/useEngine";
import styles from "./App.module.css";

function App() {

    const engine = useEngine(10, "white", true);

    return (
        <div className={styles.appWrapper}>

            <div className={styles.mainLayout}>

                <Header />

                <div className={styles.clockBackground}>
                    <div className={styles.chessDisplay}>
                        <ChessTurn turn={engine.gameTurn} />
                        <ChessClock />
                    </div>
                </div>

                <div className={styles.chessBackground}>
                    <div className={styles.chessBoardContainer}>
                        <ChessBoard
                            position={engine.position}
                            playerColor="white"
                            squareStyles={engine.squareStyles}
                            gameInstance={engine.gameInstance}
                            lastMove={engine.lastMove}
                            onPlayerMove={engine.onPlayerMove}
                        />
                    </div>
                </div>

                <div className={styles.clockBackground}>
                    <div className={styles.chessDisplay}>
                        <ChessTurn turn={engine.gameTurn} />
                        <ChessClock />
                    </div>
                </div>


                <div className={styles.chessLogBackground}>
                    <div className={styles.chessLogContainer}>
                        <button className={styles.menuButton}>⏮</button>
                        <button className={styles.menuButton}>⏪</button>
                        <button className={styles.menuButton}>▶︎</button>
                        <button className={styles.menuButton}>⏭</button>
                    </div>
                </div>

            </div>

        </div>
    );
}

{/* <ChessLog 
    moves={engine.log}
    onSelectMove={(i) => console.log("Clicked move:", i)}
/> */}
export default App;
