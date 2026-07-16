import { useState, useRef, useCallback } from "react";
import { Chess } from "chess.js";
import { runEngine } from "../utils/engineClient";
import useHighlights from "./useHighlights";
import { playMoveSound } from "../utils/sound";

export default function useEngine(depth, playerColor, settings, soundEnabled) {

    const gameRef = useRef(new Chess());
    const game = gameRef.current;

    const displayGameRef = useRef(new Chess());
    const displayGame = displayGameRef.current;


    const [position, setPosition] = useState(game.fen());
    const [displayPosition, setDisplayPosition] = useState(game.fen());

    const [log, setLog] = useState([]);
    const [lastMove, setLastMove] = useState(null);

    const [isThinking, setIsThinking] = useState(false);
    const [gameTurn, setGameTurn] = useState("white");
    const [gameStarted, setGameStarted] = useState(false);

    const [isAnalysisMode, setIsAnalysisMode] = useState(false);

    const [lastPlayedFen, setLastPlayedFen] = useState(game.fen());

    const [undoCounter, setUndoCounter] = useState(0);

    const [clockResetKey, setClockResetKey] = useState(0);


    const resetClock = useCallback(() => {
        setClockResetKey(v => v + 1);
    }, []);



    const squareStyles = useHighlights(
        displayGame,
        lastMove,
        {
            highlightLast: settings.highlightLast,
            highlightChecks: settings.highlightChecks
        }
    );



    const updateTurn = useCallback(() => {

        setGameTurn(
            game.turn() === "w"
                ? "white"
                : "black"
        );

    }, [game]);




    const logEvent = useCallback((san) => {

        const fen = game.fen();

        setLog(prev => {

            const last = prev[prev.length - 1];


            if (!last || last.black) {

                return [
                    ...prev,
                    {
                        number: prev.length + 1,
                        white: san,
                        whiteFen: fen,
                        black: null,
                        blackFen: null
                    }
                ];

            }


            return [
                ...prev.slice(0, -1),
                {
                    ...last,
                    black: san,
                    blackFen: fen
                }
            ];

        });


    }, [game]);






    const undoMove = useCallback(() => {

        if (game.history().length < 1)
            return;


        game.undo();


        const fen = game.fen();


        setPosition(fen);
        setDisplayPosition(fen);


        displayGame.load(fen);


        setLastMove(null);


        setLog(prev => {

            const copy = [...prev];

            const last = copy[copy.length - 1];


            if (!last)
                return copy;


            // Om svart drag finns, ta bort bara svart
            if (last.black) {

                copy[copy.length - 1] = {
                    ...last,
                    black: null,
                    blackFen: null
                };

            } 
            // Annars ta bort hela raden
            else {

                copy.pop();

            }


            return copy;

        });


        setLastPlayedFen(fen);


        setUndoCounter(v => v + 1);


        updateTurn();


    }, [
        game,
        displayGame,
        updateTurn
    ]);





    const syncGameState = useCallback(() => {

        const fen = game.fen();


        setPosition(fen);
        setDisplayPosition(fen);


        displayGame.load(fen);


        setLastMove(null);


        updateTurn();


    }, [
        game,
        displayGame,
        updateTurn
    ]);








    const playEngineMove = useCallback(async () => {


        const bestmove = await runEngine(depth, game);


        if (!bestmove)
            return;



        const result = game.move({

            from: bestmove.slice(0,2),

            to: bestmove.slice(2,4),

            promotion:"q"

        });



        setLastMove({

            from: bestmove.slice(0,2),

            to: bestmove.slice(2,4)

        });



        const fen = game.fen();


        setPosition(fen);
        setDisplayPosition(fen);


        setLastPlayedFen(fen);


        displayGame.load(fen);



        logEvent(result.san);


        playMoveSound(soundEnabled);


        updateTurn();



    }, [
        depth,
        game,
        displayGame,
        logEvent,
        updateTurn,
        soundEnabled
    ]);









    const onPlayerMove = useCallback(async (from,to)=>{


        if(isAnalysisMode)
            return false;



        let result;


        try {

            result = game.move({

                from,
                to,
                promotion:"q"

            });

        }

        catch {

            return false;

        }




        setGameStarted(true);



        setLastMove({

            from,
            to

        });



        const fen = game.fen();



        setPosition(fen);
        setDisplayPosition(fen);



        setLastPlayedFen(fen);


        displayGame.load(fen);



        logEvent(result.san);


        playMoveSound(soundEnabled);


        updateTurn();



        setIsThinking(true);



        await playEngineMove();



        setIsThinking(false);



        return true;



    },[
        game,
        displayGame,
        logEvent,
        playEngineMove,
        updateTurn,
        isAnalysisMode,
        soundEnabled
    ]);








    const viewMove = useCallback((fen)=>{


        displayGame.load(fen);


        setDisplayPosition(fen);



        setIsAnalysisMode(
            fen !== lastPlayedFen
        );


    },[
        displayGame,
        lastPlayedFen
    ]);









    const resetGame = useCallback(async(newColor)=>{


        game.reset();



        setGameStarted(false);

        setLog([]);

        setIsAnalysisMode(false);

        resetClock();

        syncGameState();



        setLastPlayedFen(game.fen());



        if(newColor==="black"){

            setGameStarted(true);

            await playEngineMove();

        }



    },[
        game,
        playEngineMove,
        syncGameState,
        resetClock
    ]);









    const loadFEN = useCallback(async(fen)=>{


        try {

            game.load(
                fen.trim()
            );

        }

        catch {

            return false;

        }



        syncGameState();



        return true;



    },[
        game,
        syncGameState
    ]);








    return {

        position: displayPosition,

        gamePosition: position,

        squareStyles,

        log,

        gameTurn,

        gameInstance: game,

        lastMove,

        isThinking,

        gameStarted,

        isAnalysisMode,

        undoCounter,

        clockResetKey,


        onPlayerMove,

        viewMove,

        resetGame,

        loadFEN,

        undoMove,

        resetClock,

    };

}