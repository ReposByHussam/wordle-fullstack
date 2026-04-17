import {useState} from "react";
import GameSettings  from "../components/GameSettings";
import GuessForm from "../components/GuessForm";
import GuessList from "../components/GuessList";
import SaveScoreForm from "../components/SaveScoreForm";
import { saveHighscore, startGame, submitGuess } from "../services/api";

function GamePage() {
    const [gameId, setGameId] = useState(null);
    const [settings, setSettings] = useState(null);
    const [guesses, setGuesses] = useState([]);
    const [gameStatus, setGameStatus] = useState("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [scoreSaved, setScoreSaved] = useState(false);
    const [savedHighscore, setSavedHighscore] = useState(null);

    
    async function handleStartGame(newSettings) {
        try {
            setErrorMessage("");
            setGameStatus("starting");
            setGuesses([]);
            setScoreSaved(false);
            setSavedHighscore(null);

            const createdGame = await startGame(newSettings);

            setGameId(createdGame.gameId);
            setSettings({
                wordLength: createdGame.wordLength,
                allowDuplicateLetters: createdGame.allowDuplicateLetters,
            });
            setGameStatus("playing");
        } catch (error) {
            setErrorMessage(error.message);
            setGameStatus("error");
        }
    }

    async function handleSubmitGuess(guess) {
        try {
            setErrorMessage("");

            const result = await submitGuess(gameId, guess);

            setGuesses(result.guesses);

            if(result.isFinished) {
                setGameStatus("won");
            }else {
                setGameStatus("playing");
            }

            }catch (error) {
                setErrorMessage(error.message);
                setGameStatus("error");
            }
        }
       
        async function handleSaveScore(name) {
            try {
                setErrorMessage("");
                setGameStatus("savingScore");

                const result = await saveHighscore(name, gameId);

                setSavedHighscore(result.highscore);
                setScoreSaved(true);
                setGameStatus("scoreSaved");
            } catch (error) {
                setErrorMessage(error.message);
                setGameStatus("error");
            }
            
        }
    
    return (
        <div>
            <h1>Wordle</h1>
            <GameSettings onStartGame={handleStartGame} 
            disabled={gameStatus === "starting" || gameStatus === "savingScore"} />
            <p>Status: {gameStatus}</p>
            {errorMessage && <p> Fel: {errorMessage}</p>}
            {gameId && <p>Game ID: {gameId}</p>}

            {settings && (
                <div>
                    <p>Ordlängd: {settings.wordLength}</p>
                    <p>Tillåt dubbletter: {settings.allowDuplicateLetters ? "Ja" : "Nej"}</p>
                </div>
            )}
            {gameId && settings && (
                <>
                <GuessForm
                    onSubmitGuess={handleSubmitGuess}
                    disabled = {gameStatus === "starting" ||
                                gameStatus === "won" ||
                                gameStatus === "savingScore" ||
                                gameStatus === "scoreSaved"}
                    wordLength={settings.wordLength}
                />
                <GuessList guesses={guesses} />
                </>
                )}
                {gameStatus === "won" && !scoreSaved && (
                    <SaveScoreForm
                    onSaveScore={handleSaveScore}
                    disabled={gameStatus === "savingScore"}
                    />
                )}
                {scoreSaved && savedHighscore && (
                    <div>
                        <h2>Highscore Sparad!</h2>
                        <p>Namn: {savedHighscore.name}</p>
                        <p>Antal gissningar: {savedHighscore.guessCount}</p>
                        <p>Tid (ms): {savedHighscore.durationMs}</p>
                        </div>
                        )}
        </div>
    );
}
export default GamePage;
