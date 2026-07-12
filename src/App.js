import { useEffect, useState } from "react";

import Header from "./components/Header";
import SettingsPanel from "./components/SettingsPanel";
import GameMenuPanel from "./components/GameMenuPanel";
import GameOverOverlay from "./components/GameOverOverlay";

import ChessBoard from "./components/ChessBoard";
import ChessClock from "./components/ChessClock";
import Terminal from "./components/Terminal";

import useEngine from "./hooks/useEngine";
import useUIState from "./hooks/useUIState";
import useTerminal from "./hooks/useTerminal";

import { parseTimeControl } from "./components/TimeControl";
import styles from "./App.module.css";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 900);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth > 900);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop;
}

function App() {
  const ui = useUIState();
  const terminal = useTerminal();
  const isDesktop = useIsDesktop();

  const {
    position,
    squareStyles,
    onPlayerMove,
    gameTurn,
    gameInstance,
    lastMove,
    loadFEN
  } = useEngine(ui.depth, ui.playerColor, {
    highlightLegal: ui.highlightLegal,
    highlightLast: ui.highlightLast,
    highlightChecks: ui.highlightChecks
  });

  // Rensa highlights när inställningar ändras
  useEffect(() => {
  }, [ui.highlightLast, ui.highlightChecks, ui.highlightLegal]);

  const tc = parseTimeControl(ui.timeControl);

  // Lite mer rimlig storlek på desktop
  const boardSize = isDesktop ? 700 : 350;

  return (
    <div className={styles.appWrapper}>
      <Header 
        onOpenSettings={() => ui.setSettingsOpen(true)}
        onOpenGameMenu={() => ui.setGameMenuOpen(true)}
      />

      {gameInstance.isCheckmate() && <GameOverOverlay />}

      <div className={styles.mainLayout}>
        
        {(ui.settingsOpen || isDesktop) && (
          <div className={styles.leftPanel}>
            <SettingsPanel 
              onClose={() => ui.setSettingsOpen(false)}
              {...ui}
            />
          </div>
        )}

        <div className={styles.centerColumn}>
          <div className={styles.clockRow}>
            <ChessClock 
              active={gameTurn === "black"}
              initialTime={tc.initial}
              increment={tc.inc}
            />
          </div>

          <div className={styles.chessboardContainer}>
            <ChessBoard
              boardWidth={boardSize}
              position={position}
              playerColor={ui.playerColor}
              squareStyles={squareStyles}
              onPlayerMove={onPlayerMove}
              highlightLegal={ui.highlightLegal}
              gameInstance={gameInstance}
              lastMove={lastMove}
            />
          </div>

          <div className={styles.clockRow}>
            <ChessClock 
              active={gameTurn === "white"}
              initialTime={tc.initial}
              increment={tc.inc}
            />
          </div>

          {ui.openTerminal && (
            <Terminal 
              log={terminal.terminalLog}
              onSend={terminal.sendToBackend}
            />
          )}
        </div>

        {(ui.gameMenuOpen || isDesktop) && (
          <div className={styles.rightPanel}>
            <GameMenuPanel
              onClose={() => ui.setGameMenuOpen(false)}
              playerColor={ui.playerColor}
              setPlayerColor={ui.setPlayerColor}
              timeControl={ui.timeControl}
              setTimeControl={ui.setTimeControl}
              fenInput={ui.fenInput}
              setFenInput={ui.setFenInput}
              goToFEN={loadFEN}
            />
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
