let score1 = 0;
let score2 = 0;

function vibrate(ms){
if(navigator.vibrate){
navigator.vibrate(ms);
}
}

/* ---------------- SCREENS ---------------- */

function go(n){
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
document.getElementById("s"+n).classList.add("active");
vibrate(30);
}

/* ---------------- NO BUTTON ---------------- */

const noBtn = document.getElementById("noBtn");

noBtn.addEventListener("click", ()=>{
noBtn.style.left=Math.random()*70+"%";
noBtn.style.top=Math.random()*60+"%";
vibrate(20);
});

/* ---------------- GAME 1 (HEARTS) ---------------- */

function startHearts(){
go(3);

const g=document.getElementById("game1");

setInterval(()=>{

const h=document.createElement("div");
h.className="heart";
h.innerHTML="❤️";

h.style.left=Math.random()*90+"%";
h.style.top="-30px";

g.appendChild(h);

let y=-30;

let fall=setInterval(()=>{

y+=4;
h.style.top=y+"px";

if(y>600){
h.remove();
clearInterval(fall);
}

},30);

function hit(){
score1++;
document.getElementById("score1").innerText=score1+" / 15";
h.remove();
vibrate(30);

if(score1>=15){
startTicTacToe();
}
}

h.onclick=hit;
h.ontouchstart=hit;

},500);
}

/* ---------------- TIC TAC TOE ---------------- */

let board = Array(9).fill("");
let current = "X";
let gameActive = true;

function startTicTacToe(){
go(4);

board = Array(9).fill("");
current = "X";
gameActive = true;

const b=document.getElementById("board");
b.innerHTML="";

for(let i=0;i<9;i++){
const c=document.createElement("div");
c.className="cell";

c.onclick=()=>move(i,c);

b.appendChild(c);
}
}

function move(i,cell){

if(!gameActive || board[i] !== "") return;

board[i]=current;
cell.innerText=current;

vibrate(20);

if(checkWin(current)){
win();
return;
}

if(board.every(x=>x!=="")){
lose();
return;
}

current = current==="X"?"O":"X";

/* простая AI логика */
setTimeout(()=>{
aiMove();
},300);
}

function aiMove(){

if(!gameActive) return;

let empty=[];
board.forEach((v,i)=>{if(v==="") empty.push(i);});

if(empty.length===0) return;

let i = empty[Math.floor(Math.random()*empty.length)];

board[i]="O";

document.querySelectorAll(".cell")[i].innerText="O";

if(checkWin("O")){
lose();
}
}

function checkWin(p){
const w=[
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]
];

return w.some(c=>c.every(i=>board[i]===p));
}

/* ---------------- FINAL ---------------- */

function win(){
gameActive=false;
go(5);

document.getElementById("finalTitle").innerText="умничка зайка";
document.getElementById("finalText").innerText="система подтверждает победу";

vibrate([80,40,80]);
kiss();
}

function lose(){
gameActive=false;
go(5);

document.getElementById("finalTitle").innerText="иди грей нос";
document.getElementById("finalText").innerText="система тебя победила";
}

/* ---------------- KISS ---------------- */

function kiss(){
const k=document.getElementById("kiss");
k.classList.add("show");

setTimeout(()=>{
k.classList.remove("show");
},1200);
}

/* ---------------- RESTART ---------------- */

function restart(){
location.reload();
}
