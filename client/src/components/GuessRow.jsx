function GuessRow({ guess, feedback }) {
    return (
        <li>
            <strong>{guess}</strong> - {feedback.join(", ")}
        </li>
    );
}
export default GuessRow;