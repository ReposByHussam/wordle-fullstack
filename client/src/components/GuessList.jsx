import GuessRow from "./GuessRow";

function GuessList({ guesses }) {
    if(!guesses.length) {
        return <p>Inga gissningar än</p>;
    }
    
    return (
        <ul>
            {guesses.map((entry, index) =>(
                <GuessRow
                key={`${entry.guess}-${index}`}
                guess={entry.guess}
                feedback={entry.feedback}
                />
            ))}
        </ul>
    );
}
export default GuessList;