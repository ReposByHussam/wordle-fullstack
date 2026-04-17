function GuessRow({ guess, feedback }) {
    const letters = guess.split("");
    return (
        <li className="guess-row">
            {letters.map((letter, index) => {
                const status = feedback[index];
                return (
                    <span key={`${letter}-${index}`}
                    className={`letter-box ${status}`}
                    >
                        {letter.toUpperCase()}
                    </span>
                );
            })}
        </li>
    );
}
export default GuessRow;