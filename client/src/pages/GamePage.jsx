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
            <div className="page-wrapper">
              <div className="game-card">
                <header className="page-header">
                  <h1>Wordle Fullstack</h1>
                  <p className="subtitle">
                    Gissa ordet, få feedback och spara ditt resultat i highscore-listan.
                  </p>
                </header>
          
                <section className="panel">
                  <h2>Inställningar</h2>
                  <GameSettings
                    onStartGame={handleStartGame}
                    disabled={gameStatus === "starting" || gameStatus === "savingScore"}
                  />
                </section>
          
                <section className="panel">
                  <h2>Status</h2>
                  <p className="status-badge">Status: {gameStatus}</p>
          
                  {errorMessage && <p className="error-message">Fel: {errorMessage}</p>}
          
                  {gameId && <p><strong>Game ID:</strong> {gameId}</p>}
          
                  {settings && (
                    <div className="settings-summary">
                      <p><strong>Ordlängd:</strong> {settings.wordLength}</p>
                      <p>
                        <strong>Tillåt dubletter:</strong>{" "}
                        {settings.allowDuplicateLetters ? "Ja" : "Nej"}
                      </p>
                    </div>
                  )}
                </section>
          
                {gameId && settings && (
                  <section className="panel">
                    <h2>Spela</h2>
          
                    <GuessForm
                      onSubmitGuess={handleSubmitGuess}
                      disabled={
                        gameStatus === "starting" ||
                        gameStatus === "won" ||
                        gameStatus === "savingScore" ||
                        gameStatus === "scoreSaved"
                      }
                      wordLength={settings.wordLength}
                    />
          
                    <GuessList guesses={guesses} />
                  </section>
                )}
          
                {gameStatus === "won" && !scoreSaved && (
                  <section className="panel">
                    <h2>Du vann!</h2>
                    <p>Fyll i ditt namn för att spara resultatet.</p>
          
                    <SaveScoreForm
                      onSaveScore={handleSaveScore}
                      disabled={gameStatus === "savingScore"}
                    />
                  </section>
                )}
          
                {scoreSaved && savedHighscore && (
                  <section className="panel success-panel">
                    <h2>Highscore sparad!</h2>
                    <p><strong>Namn:</strong> {savedHighscore.name}</p>
                    <p><strong>Antal gissningar:</strong> {savedHighscore.guessCount}</p>
                    <p><strong>Tid (ms):</strong> {savedHighscore.durationMs}</p>
                  </section>
                )}
              </div>
            </div>
          );
}
export default GamePage;
