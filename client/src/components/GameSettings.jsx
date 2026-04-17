import {useState} from "react";

function GameSettings({onStartGame, disabled}) {
    const [wordLengthInput, setWordLengthInput] = useState(5);
    const [allowDuplicateLettersInput, setAllowDuplicateLettersInput] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        onStartGame({
            wordLength: wordLengthInput,
            allowDuplicateLetters: allowDuplicateLettersInput,
        });
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="wordLength">Ordlängd:</label>
                <input
                id="wordLength"
                    type="number"
                    min="1"
                    value={wordLengthInput}
                    onChange={(event)=> setWordLengthInput(event.target.value)}
                    disabled={disabled}
                />
            </div>
            <div>
                <label htmlFor="allowDuplicateLetters">Tillåt dubbletter:</label>
                <input
                    id="allowDuplicateLetters"
                    type="checkbox"
                    checked={allowDuplicateLettersInput}
                    onChange={(event) => setAllowDuplicateLettersInput(event.target.checked)}
                    disabled={disabled}
                />
            </div>
            
                <button type="submit" disabled={disabled}>
                    Starta spel
                    </button>
        </form>
    );
}
export default GameSettings;