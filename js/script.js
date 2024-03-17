const wordInput = document.getElementById('word-input');
const checkButton = document.getElementById('check-button');
const result = document.getElementById('result');
const wordListSelect = document.getElementById('word-list-select');

let wordList1 = [];
let wordList2 = [];

// Fetch the word lists from the GitHub repo
fetch('https://raw.githubusercontent.com/narendnp/kblb-banned-words/main/wordlist-comment.txt')
    .then(response => response.text())
    .then(data => {
        wordList1 = data.split('\n'); // Assuming words are separated by newlines
        checkButton.disabled = !wordList2;
    });

fetch('https://raw.githubusercontent.com/narendnp/kblb-banned-words/main/wordlist-post.txt')
    .then(response => response.text())
    .then(data => {
        wordList2 = data.split('\n'); // Assuming words are separated by newlines
        checkButton.disabled = !wordList1;
    });

checkButton.addEventListener('click', () => {
    const text = wordInput.value;
    const selectedWordList = wordListSelect.value === 'list1' ? wordList1 : wordList2;
    
    let foundWords = [];

    selectedWordList.forEach(wordOrPhrase => {
        if (text.includes(wordOrPhrase)) {
            foundWords.push(wordOrPhrase);
        }
    });

    if (foundWords.length > 0) {
        result.innerHTML = 'Kata yang dilarang digunakan: <strong>' + foundWords.join(', ') + '</strong>.';
        result.classList.add('alert-warning'); // Add warning class
        result.classList.remove('alert-success'); // Remove success class if it exists
    } else {
        result.innerHTML = 'Tidak terdapat kata yang dilarang digunakan.';
        result.classList.add('alert-success'); // Add success class
        result.classList.remove('alert-warning'); // Remove warning class if it exists
    }
});

const placeholderTexts = [
    "Jadi gini le...",
    "Stress le dikejer pinjol...",
    "Kalian lagi ngapain le...",
    "Kok belum tidur le...",
    "Gabut le...",
    // Add more texts as needed
];

function updatePlaceholderText() {
   const inputElement = document.getElementById("word-input");
   const randomIndex = Math.floor(Math.random() * placeholderTexts.length);
    inputElement.placeholder = placeholderTexts[randomIndex];
}

const interval = 1500; // Keep the interval value
let timeoutId;

function frameLoop() {
  updatePlaceholderText();
  timeoutId = setTimeout(frameLoop, interval);
}

timeoutId = setTimeout(frameLoop, interval);