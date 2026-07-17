import Header from "./components/Header";
import ChessBoard from "./components/ChessBoard";
import ChessLog from "./components/ChessLog";
import DemoOverlay from "./components/DemoOverlay";
import TopControls from "./components/TopControls";
import BottomControls from "./components/BottomControls";

import useGameSettings from "./hooks/useGameSettings";
import useGameController from "./hooks/useGameController";
import useGameAudio from "./hooks/useGameAudio";
import useHighlights from "./hooks/useHighlights";
import { parseTimeControl } from "./hooks/useClock";



import { GameProvider } from "./contexts/GameContext";
import styles from "./App.module.css";

function App() {
    const settings = useGameSettings();
    const audio = useGameAudio();
    const game = useGameController({
        settings,
        audio,
    });

    const clock = parseTimeControl(settings.timeControl);

    const squareStyles = useHighlights(
        game.gameInstance,
        game.lastMove,
        {
            highlightLast:
                settings.highlightSettings.enabled &&
                settings.highlightSettings.last,

            highlightChecks:
                settings.highlightSettings.enabled &&
                settings.highlightSettings.checks,
        }
    );

    return (
        <GameProvider value={game}>
            <div className={styles.appWrapper}>
                <DemoOverlay onStart={audio.enableAudio} />

                <div className={styles.mainLayout}>
                    <Header onReset={game.resetGame} />

                    <TopControls settings={settings} audio={audio} clock={clock} />

                    <ChessBoard
                        position={game.position}
                        playerColor={settings.playerColor}
                        squareStyles={squareStyles}
                        gameInstance={game.gameInstance}
                        lastMove={game.lastMove}
                        onPlayerMove={game.onPlayerMove}
                        highlightLegal={settings.highlightSettings.enabled && settings.highlightSettings.legal && !game.isAnalysisMode}
                        highlightLast={settings.highlightSettings.last}
                        highlightChecks={settings.highlightSettings.checks}
                        analysisMode={game.isAnalysisMode}
                    />

                    <BottomControls settings={settings} clock={clock} />

                    <div className={styles.chessLogBackground}>
                        <ChessLog
                            moves={game.log}
                            lastMove={game.lastMove}
                            onSelectMove={game.viewMove}
                            undoCounter={game.undoCounter}
                        />
                    </div>
                </div>
            </div>
        </GameProvider>
    );
}

export default App;
