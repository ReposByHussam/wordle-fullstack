import {useState} from "react";

function guessForm ({onSubmitGuess, disabled, wordLength}) {
    const [guessInput, setGuessInput] = useState("");

    function handleSubmit(event){
        event.preventDefault();

        const trimmedGuess = guessInput.trim().toLowerCase();

        if (!trimmedGuess){
            return
        }
        onSubmitGuess(trimmedGuess);
        setGuessInput("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="guessInput">Din gissning:</label>
                <input
                    id="guessInput"
                    type="text"
                    value={guessInput}
                    onChange={(event) => setGuessInput(event.target.value)}
                    disabled={disabled}
                    maxLength={wordLength || undefined}
                />

            </div>
            <button type="submit" disabled={disabled}>
                Skicka gissning
            </button>
        </form>
    );
}
export default guessForm;