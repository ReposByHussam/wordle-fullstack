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