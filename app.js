let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let btnes = ["red", "yellow", "green", "blue"];
let highScore = 0;
let playButton = document.getElementById("play");

playButton.addEventListener("click", function () {
    if (!started) {
        console.log("Game is started!");
        started = true;
        playButton.disabled = true; // Disable the play button
        playButton.innerText = "Playing"; // Change text to "Playing"
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 400);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randomIndex = Math.floor(Math.random() * 3);
    let randomColor = btnes[randomIndex];
    let randombtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    btnFlash(randombtn);
}
function check(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score is <b> ${level} </b>  <br> Press <button id="restart" class="button">RESTART</button> to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "#EEE7DA";
            restartButton = document.getElementById("restart"); // Corrected button ID
            restartButton.addEventListener("click", function () {
                if (!started) {
                    console.log("Game is started!");
                    started = true;                   
                    levelUp();
                }
            });
            if (level > highScore) {
                highScore = level;
            }
            reset();
        }, 100);
    }
}


function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    check(userSeq.length - 1);
}

let allbtnes = document.querySelectorAll(".btn");
for (btn of allbtnes) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    playButton.disabled = false; // Enable the play button
    playButton.innerText = "Play"; // Change text back to "Play"
    h3.innerText = `Highest Score: ${highScore}`;
}
