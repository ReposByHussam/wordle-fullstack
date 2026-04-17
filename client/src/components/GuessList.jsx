import GuessRow from "./GuessRow";

function GuessList({ guesses }) {
    if(!guesses.length) {
        return <p>Inga gissningar än</p>;
    }
    
    return (
        <div>
            <h2> Tidigare Gissningar</h2>
            <ul className="guess-list">
                {guesses.map((entry, index) =>(
                    <GuessRow 
                    key = {`${entry.guess} -${-index}`} 
                    guess={entry.guess}
                    feedback={entry.feedback}
                    />
                ))}
                </ul>
        </div>
     
    );
}
export default GuessList;