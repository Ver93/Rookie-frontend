import styles from "./TopControls.module.css";

import EngineIcon from "./icons/EngineIcon";
import FlipButton from "./buttons/FlipButton";
import UndoButton from "./buttons/UndoButton";
import EngineButton from "./buttons/EngineButton";

import ChessTurn from "./ChessTurn";
import ChessClock from "./ChessClock";

import { useGameContext } from "../contexts/GameContext";

import { ChessKnight } from "lucide-react";
import { Timer } from "lucide-react";

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
                <div className={styles.buttonGroup}>
                    <FlipButton
                        playerColor={playerColor}
                        title="Switch Colors"
                        onFlip={switchColor}
                        icon={<ChessKnight size={20} strokeWidth={2} />}
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
                        gameStarted={game.gameStarted}
                        turn={game.gameTurn}
                        playerColor={settings.playerColor}
                        isPlayer={true}
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
                        increment={clock.inc}
                        resetKey={game.clockResetKey}
                        timeControl={settings.timeControl}
                        canConfigure
                        gameActive={game.gameStarted}
                        onTimeControlChange={settings.setTimeControl}
                        icon={<Timer size={18} strokeWidth={2} />}
                    />
                </div>

            </div>
        </div>
    );
}
