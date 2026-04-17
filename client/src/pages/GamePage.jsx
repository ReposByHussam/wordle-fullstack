import {useState} from "react";
import GameSettings  from "../components/GameSettings";
import GuessForm from "../components/GuessForm";
import GuessList from "../components/GuessList";
import { startGame, submitGuess } from "../services/api";

function GamePage() {
    const [gameId, setGameId] = useState(null);
    const [settings, setSettings] = useState(null);
    const [guesses, setGuesses] = useState([]);
    const [gameStatus, setGameStatus] = useState("idle");
    const [errorMessage, setErrorMessage] = useState("");
    
    async function handleStartGame(newSettings) {
        try {
            setErrorMessage("");
            setGameStatus("starting");

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
                setGameStatus("Won");
            }else {
                setGameStatus("playing");
            }

            }catch (error) {
                setErrorMessage(error.message);
                setGameStatus("error");
            }
        }
    
    return (
        <div>
            <h1>Wordle</h1>
            <GameSettings onStartGame={handleStartGame} 
            disabled={gameStatus === "starting"} />
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
                    disabled = {gameStatus === "staring" || gameStatus === "won"}
                    wordLength={settings.wordLength}
                />
                <GuessList guesses={guesses} />
                </>
                )}
        </div>
    );
}
export default GamePage;
