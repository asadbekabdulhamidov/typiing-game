const words = [
  "abreact",
  "abreacted",
  "abreacting",
  "abreaction",
  "abreactions",
  "paltrier",
  "paltriest",
  "paltrily",
  "paltriness",
  "paltrinesses",
  "paltry",
  "paludal",
  "paludism",
  "shiv",
  "shiva",
  "shivah",
  "shivahs",
  "shivaree",
  "shivareed",
  "shivareeing",
];

const randomText = document.querySelector(".random-text");
const input = document.querySelector(".input");
const time = document.querySelector(".time span");
const modal = document.querySelector(".modal");
const score = document.querySelector(".score");
const yourScore = document.querySelector(".modal h2 p");
const HighScore = document.querySelector(".HighScore");
const select = document.querySelector("select");

let HighScoreCount = localStorage.getItem("high")
  ? localStorage.getItem("high")
  : 0;

let selectValue = localStorage.getItem("level")
  ? localStorage.getItem("level")
  : "easy";

select.value = selectValue;

HighScore.textContent = HighScoreCount;
let count = 10;

let interval = setInterval(() => {
  if (count > 0) {
    count -= 1;
    time.textContent = count;
  } else {
    if (score.textContent > HighScoreCount) {
      HighScoreCount = parseInt(score.textContent);
      localStorage.setItem("high", HighScoreCount);
    }
    modal.classList.remove("hidden");
    input.classList.add("error");
    clearInterval(interval);
  }
}, 1000);

function randomWord() {
  let randomStr = Math.floor(Math.random() * words.length);
  return words[randomStr];
}

randomText.textContent = randomWord();
let textQiymat = randomText.textContent;

input.addEventListener("input", (e) => {
  if (e.target.value == textQiymat) {
    randomText.textContent = randomWord();
    textQiymat = randomText.textContent;
    score.textContent = parseInt(score.textContent) + 1;
    yourScore.textContent = parseInt(yourScore.textContent) + 1;

    switch (selectValue) {
      case "easy":
        count += 6;
        time.textContent += " +5";
        break;
      case "norm":
        count += 4;
        time.textContent += " +3";
        break;
      case "hard":
        count += 3;
        time.textContent += " +2";
        break;
    }

    input.classList.add("success");

    input.value = "";
    setTimeout(() => {
      input.classList.remove("success");
    }, 300);
  }
});

select.addEventListener("change", () => {
  localStorage.setItem("level", select.value);
});
