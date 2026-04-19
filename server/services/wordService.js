const words = require("../data/words");

function hasOnlyUniqueLetters(word) {
  const letters = word.split("");
  const uniqueLetters = new Set(letters);
  return letters.length === uniqueLetters.size;
}

function getWordsByLength(wordLength) {
  return words.filter((word) => word.length === Number(wordLength));
}

function filterWordsByDuplicateSetting(wordsList, allowDuplicateLetters) {
  if (allowDuplicateLetters) {
    return wordsList;
  }

  return wordsList.filter((word) => hasOnlyUniqueLetters(word));
}

function getRandomItem(items) {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

function getRandomWord(settings) {
  const { wordLength, allowDuplicateLetters } = settings;

  const wordsWithCorrectLength = getWordsByLength(wordLength);
  const validWords = filterWordsByDuplicateSetting(
    wordsWithCorrectLength,
    allowDuplicateLetters
  );

  if (validWords.length === 0) {
    throw new Error("Det finns inga ord som matchar de valda inställningarna.");
  }

  return getRandomItem(validWords);
}

module.exports = {
  getRandomWord,
};