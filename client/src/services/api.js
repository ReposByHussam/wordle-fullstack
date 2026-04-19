//starta ett nytt spel via backend API:t
export async function startGame(settings) {
    const response = await fetch("/api/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Ett fel inträffade när spelet skulle startas");
    }
    
    return data; 
}
export async function submitGuess(gameId, guess) {
    const response = await fetch(`api/games/${gameId}/guesses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ guess }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Ett fel inträffade när gissningen skulle skickas");
    }
    
    return data; 
}
export async function saveHighscore(name, gameId){
    const response = await fetch(`/api/highscores`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, gameId }),
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || "Ett fel inträffade när highscore skulle sparas");
    }
    return data;
}