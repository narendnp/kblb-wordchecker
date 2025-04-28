const wordInput = document.getElementById("word-input");
const checkButton = document.getElementById("check-button");
const result = document.getElementById("result");
const addinfo = document.getElementById("addinfo");
const wordListSelect = document.getElementById("word-list-select");
const wordListCommentURL = "https://raw.githubusercontent.com/narendnp/kblb-banned-words/main/wordlist-comment.txt";
const wordListPostURL = "https://raw.githubusercontent.com/narendnp/kblb-banned-words/main/wordlist-post.txt";

let wordListComment = [];
let wordListPost = [];

fetch(wordListCommentURL)
  .then((response) => response.text())
  .then((data) => {
    wordListComment = data.split("\n").filter((word) => word.trim() !== "");
    checkButton.disabled = false;
    console.log("Comment word list loaded:", wordListComment.length, "words");
  })
  .catch((error) => {
    console.error("Error fetching comment word list:", error);
    checkButton.disabled = false;
  });

fetch(wordListPostURL)
  .then((response) => response.text())
  .then((data) => {
    wordListPost = data.split("\n").filter((word) => word.trim() !== "");
    checkButton.disabled = false;
    console.log("Post word list loaded:", wordListPost.length, "words");
  })
  .catch((error) => {
    console.error("Error fetching post word list:", error);
    checkButton.disabled = false;
  });

checkButton.addEventListener("click", () => {
  const text = wordInput.value.toLowerCase();
  const selectedWordList =
    wordListSelect.value === "list1" ? wordListComment : wordListPost;

  let foundWords = [];

  selectedWordList.forEach((wordOrPhrase) => {
    if (wordOrPhrase && text.includes(wordOrPhrase.toLowerCase())) {
      foundWords.push(wordOrPhrase);
    }
  });

  if (foundWords.length > 0) {
    result.innerHTML =
      "Kata yang dilarang digunakan: <strong>" +
      foundWords.join(", ") +
      "</strong>.";
    result.className =
      "p-4 rounded-md bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    addinfo.style.display = "none";
  } else {
    result.innerHTML = "Tidak terdapat kata yang dilarang digunakan.";
    result.className =
      "p-4 rounded-md bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    addinfo.style.display = "block";
  }
});

function showNotification(message) {
  const notification = document.getElementById("notification");
  const wordInput = document.getElementById("word-input");

  notification.textContent = message;

  const wordInputRect = wordInput.getBoundingClientRect();
  const centerX = wordInputRect.left + wordInputRect.width / 2;
  const centerY = wordInputRect.top + wordInputRect.height / 2;

  notification.style.left = `${centerX}px`;
  notification.style.top = `${centerY}px`;
  notification.classList.remove("hidden");

  setTimeout(() => {
    notification.classList.add("hidden");
  }, 3000);
}

function copyText() {
  const cb = navigator.clipboard;
  cb.writeText(wordInput.value).then(() => {
    showNotification("Teks telah disalin ke clipboard");
  });
}

function pasteText() {
  if (navigator.clipboard && navigator.clipboard.readText) {
    navigator.clipboard
      .readText()
      .then((text) => {
        wordInput.focus();
        wordInput.value = text;
      })
      .catch((err) => {
        console.log("Failed to read clipboard contents: ", err);
      });
  } else {
    wordInput.focus();
    document.execCommand("paste");
  }
  showNotification("Teks telah ditempel dari clipboard");
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
          const currentPlaceholder = currentPlaceholderText.substring(
            0,
            currentIndex + 1
          );
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

function initDarkMode() {
  const htmlElement = document.getElementById("html-element");
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleMobile = document.getElementById("theme-toggle-mobile");
  const savedTheme = localStorage.getItem("theme");

  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    htmlElement.classList.add("dark");
  } else {
    htmlElement.classList.remove("dark");
  }

  themeToggle.addEventListener("click", () => {
    htmlElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      htmlElement.classList.contains("dark") ? "dark" : "light"
    );
  });

  themeToggleMobile.addEventListener("click", () => {
    htmlElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      htmlElement.classList.contains("dark") ? "dark" : "light"
    );
  });
}

const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", function () {
  mobileMenu.classList.toggle("hidden");
});

window.addEventListener("resize", function () {
  if (window.innerWidth >= 640) {
    mobileMenu.classList.add("hidden");
  }
});

window.onload = function () {
  updatePlaceholderText();
  initDarkMode();
};
