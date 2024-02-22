let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let btns = ["red", "yellow", "green", "blue"];
let highScore = 0;

document.addEventListener("keypress", function(){
    if(started == false) {
        console.log("Game is started!");
        started = true;
        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 400);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 200);
}


function levelUp(){
 userSeq = [];
 level++;
 h2.innerText = `Level ${level}`;
 let randomIndex = Math.floor(Math.random() * 3);
 let randomColor = btns[randomIndex];
 let randomButton = document.querySelector(`.${randomColor}`);
 gameSeq.push(randomColor);
 console.log(gameSeq);
 btnFlash(randomButton);

//  console.log(randomIndex);
//  console.log(randomColor);
//  console.log(randomButton);
}
function check(idx){
    if(userSeq[idx] === gameSeq[idx] ){
        // console.log("correct");
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game over! Your score is <b> ${level} </b>  <br> Press any key to restart`
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "#EEE7DA";
        },100);
        if(level > highScore){
            highScore = level;
        }
        reset();
    }
}

function btnPress (){
    let btn = this;
    userFlash(btn);
    usercolor = btn.getAttribute("id");
    // console.log(usercolor);
    userSeq.push(usercolor);
    check(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = [];
    h3.innerText = `Highest Score: ${highScore}`;
}