import { useState } from "react";

function SaveScoreForm({ onSaveScore, disabled }) {
    const [nameInput, setNameInput] = useState("");
    
    function handleSubmit(event) {
        event.preventDefault();

        const trimmedName = nameInput.trim();

        if (!trimmedName) {
            return;
        }
        onSaveScore(trimmedName);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="playerName">Ditt namn: </label>
                <input
                    id="playerName"
                    type="text"
                    value={nameInput}
                    onChange={(event) => setNameInput(event.target.value)}
                    disabled={disabled}
                />
            </div>
            <button type="submit" disabled={disabled}>
                Spara poäng
            </button>
        </form>
    );
}
export default SaveScoreForm;