import {useState} from "react";
import GameSettings  from "../components/GameSettings";
import { startGame } from "../services/api";

function GamePage() {
    const [gameId, setGameId] = useState(null);
    const [settings, setSettings] = useState(null);
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
    
    return (
        <div>
            <h1>Wordle</h1>
            <GameSettings onStartGame={handleStartGame} 
            disabled={gameStatus === "starting"} />
            {errorMessage && <p> Fel: {errorMessage}</p>}
            {gameId && <p>Game ID: {gameId}</p>}

            {settings && (
                <div>
                    <p>Ordlängd: {settings.wordLength}</p>
                    <p>Tillåt dubbletter: {settings.allowDuplicateLetters ? "Ja" : "Nej"}</p>
                </div>
            )}
        </div>
    );
}
export default GamePage;
