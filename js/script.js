const wordInput = document.getElementById('word-input');
const checkButton = document.getElementById('check-button');
const result = document.getElementById('result');
const wordListSelect = document.getElementById('word-list-select');

let wordListComment = [];
let wordListPost = [];

fetch('https://raw.githubusercontent.com/narendnp/kblb-banned-words/main/wordlist-comment.txt')
    .then(response => response.text()) 
    .then(data => {
        wordListComment = data.split('\n');
        checkButton.disabled = !wordListPost;
    });

fetch('https://raw.githubusercontent.com/narendnp/kblb-banned-words/main/wordlist-post.txt')
    .then(response => response.text())
    .then(data => {
        wordListPost = data.split('\n');
        checkButton.disabled = !wordListComment;
    });

checkButton.addEventListener('click', () => {
    const text = wordInput.value;
    const selectedWordList = wordListSelect.value === 'list1' ? wordListComment : wordListPost;
    
    let foundWords = [];

    selectedWordList.forEach(wordOrPhrase => {
        if (text.includes(wordOrPhrase)) {
            foundWords.push(wordOrPhrase);
        }
    });

    if (foundWords.length > 0) {
        result.innerHTML = 'Kata yang dilarang digunakan: <strong>' + foundWords.join(', ') + '</strong>.';
        result.classList.add('alert-warning');
        result.classList.remove('alert-success');
    } else {
        result.innerHTML = 'Tidak terdapat kata yang dilarang digunakan.';
        result.classList.add('alert-success');
        result.classList.remove('alert-warning');
    }
});

function copyText() {
  const cb = navigator.clipboard;
  cb.writeText(wordInput.value);
  alert("Teks telah di salin ke clipboard");
}

function pasteText() {
  if (navigator.clipboard && navigator.clipboard.readText) {
    navigator.clipboard.readText()
      .then(text => {
        wordInput.focus();
        wordInput.value = text;
      })
      .catch(err => {
        console.log('Failed to read clipboard contents: ', err);
      });
  } else {
    wordInput.focus();
    document.execCommand("paste");
  }
}

function updatePlaceholderText() {
  const inputElement = document.getElementById("word-input");
  const placeholderTexts = [
    "Jadi gini le...",
    "Stress le dikejer pinjol...",
    "Kalian lagi ngapain le...",
    "Kok belum tidur le...",
    "Gabut le...",
    "Saran parfum budget under 200k le...",
    "Le keluh kesah pake iphone gimana le...",
    "Le tutor convert dosa ke saldo dana...",
    "Umur segini temen udah pada nikah tapi gw masih segini2 aja le...",
    "Le aku mau cerita barusan tante aku dateng ke rumah...",
    "Gini amat le jadi anak, nasib dibanding2in sama tetangga...",
    "Saran usaha modal dana 1jt le...",
    // Add more texts as needed
  ];

  let placeholderIndex = 0;
  let previousIndex = -1; 

  function typeWriter() {
    if (placeholderIndex < placeholderTexts.length) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * placeholderTexts.length);
      } while (randomIndex === previousIndex); 
      previousIndex = randomIndex;

      const currentPlaceholderText = placeholderTexts[randomIndex];
      let currentIndex = 0;

      function typeCharacter() {
        if (currentIndex < currentPlaceholderText.length) {
          const currentPlaceholder = currentPlaceholderText.substring(0, currentIndex + 1);
          inputElement.setAttribute("placeholder", currentPlaceholder);
          currentIndex++;
          setTimeout(typeCharacter, 100);
        } else {
          setTimeout(() => {
            inputElement.setAttribute("placeholder", "");
            placeholderIndex = 0;
            typeWriter();
          }, 1500); 
        }
      }

      typeCharacter();
    }
  }

  typeWriter();
}

window.onload = function () {
  updatePlaceholderText();
};