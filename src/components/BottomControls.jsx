import styles from "./BottomControls.module.css";

import EngineIcon from "./icons/EngineIcon";
import FlipButton from "./buttons/FlipButton";
import UndoButton from "./buttons/UndoButton";
import EngineButton from "./buttons/EngineButton";

import ChessTurn from "./ChessTurn";
import ChessClock from "./ChessClock";

import { useGameContext } from "../contexts/GameContext";

export default function BottomControls({ settings, clock }) {
    const game = useGameContext();

    const switchColor = async () => {
        const newColor = settings.playerColor === "white" ? "black" : "white";
        settings.setPlayerColor(newColor);
        await game.resetGame(newColor);
    };

    const playerColor = settings.playerColor === "white" ? "black" : "white";

    return (
        <div className={styles.displayWrapper}>
            <div className={styles.topDisplay}>
                <div className={styles.left}>
                    <FlipButton
                        playerColor={playerColor}
                        title="Switch Colors"
                        onFlip={switchColor}
                    />

                    <UndoButton onUndo={game.undoMove} />

                    <EngineButton
                        title="Engine"
                        difficulty={settings.depth}
                        onDifficultyChange={settings.setDepth}
                        icon={<EngineIcon className="theme-icon" />}
                    />
                </div>

                <div className={styles.center}>
                    <ChessTurn
                        turn={game.gameTurn}
                        playerColor={settings.playerColor}
                        isPlayer
                        isThinking={false}
                    />
                </div>

                <div className={styles.right}>
                    <ChessClock
                        active={
                            game.gameStarted &&
                            !game.isAnalysisMode &&
                            game.gameTurn === settings.playerColor
                        }
                        initialTime={clock.initial}
                        resetKey={game.clockResetKey}
                        increment={clock.inc}
                        timeControl={settings.timeControl}
                        canConfigure
                        gameActive={game.gameStarted}
                        onTimeControlChange={settings.setTimeControl}
                    />
                </div>
            </div>
        </div>
    );
}
