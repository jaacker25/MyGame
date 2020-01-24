//Where's Dad?
//by:jaacker25 | Jorge Aguilar
//January 2020.

const bod=document.querySelector('.bod');
const canvas=document.querySelector('canvas');
const ctx=canvas.getContext('2d');
const btnVsPc=document.querySelector(".btn-vs-pc");
const btnPvsP=document.querySelector(".btn-pvsp");
const btnS=document.querySelector(".btn-s");
let fullScreen=false;
let frames=0;
let drawDad=false;//animacion de caminar
let drawP1=0;//animacion de caminar
let drawP2=0;//animacion de caminar
let viewHunter=true;//saber a que lado mira el cazador
let viewP1=true;//saber a que lado esta volteando el jugador
let viewP2=true;//saber a que lado esta volteando el jugador
let gameOver1stage=false; //saber si ya termino el juego en primer escenario
let gameOver2stage=false; //saber si ya termino el juego en segundo escenario
let ins=false;//saber si nos encontramos en la pagina de instrucciones
let secondFrame=0;
let countFrames=0; //para hacer delays de tiempo
let menuIntro=true;
let firstStage=false; //saber si nos encontramos en el primer escenario
let secondStage=false; //saber si nos encontramos en el segundo escenario
let scoreP1=100;//valores iniciales para vida de jugador 1
let scoreP2=100;//valores iniciales para vida de jugador 2
let fireVelocity=10;//velocidad de bolas de ataque aumenta cada cierto tiempo
let preventMultiShootH=true;
let preventMultiShootP1=true;
let preventMultiShootP2=true;
const keys=[];//lee las teclas pulsadas
const gunShoots=[];
const shootsP1=[];
const shootsP2=[];
const ships=[];
const planesR=[];
const planesL=[];
const missilesR=[];
const missilesL=[];
const hearts=[];

let carga=0;


const images={
fakeBackground:'./images/fake_menu.png',
crocBackground: './images/crocBackground.png',
btnSprite:'./images/buttons.png',
back1stStageColor: './images/1stStage_color.png',
back1stStageGray: './images/1stStage_gray.png',
back1stStageBlack: './images/1stStage_black.png',
hunter: './images/spritesheet_han.png',
bullets: './images/bullets.png',
controls: './images/controls.png',
boats: './images/spritesheet_boats.png',
croc3: './images/spritesheet_croc3.png',
youLose: './images/youLose.png',
backPvsP: './images/backPvsP.png',
wavesPvsP: './images/backWaves.png',
pvspImages: './images/sprite-PvsP.png',
croc1: './images/spritesheet_croc1.png',
croc2: './images/spritesheet_croc2.png',
heart: './images/heart.png',
rocketMini: './images/rocketMini.png',
winnerP1: './images/winnerP1.png',
winnerP2: './images/winnerP2.png',
instructions: './images/instructions.png'

}
//Cargamos Audios
const audio1stStage=new Audio('./audio/1stStage.mp3');
const audioMenu=new Audio('./audio/audioMenu.mp3');
const audioCrocDadKilled=new Audio('./audio/crocDadKilled.mp3');
const shootGunAudio=new Audio('./audio/shootGun.mp3');
const audioPunch=new Audio('./audio/punch.mp3');
const longShootGunAudio=new Audio('./audio/longShootGun.mp3');
const audioBtn=new Audio('./audio/audio-btn.mp3');
const audio2ndStage=new Audio('./audio/audioStage2.mp3');
const audioP1=new Audio('./audio/audioP1.mp3');
const audioP2=new Audio('./audio/audioP2.mp3');
const audioHit=new Audio('./audio/hit.mp3');
const levelUp=new Audio('./audio/levelUp.mp3');
const audioFinal=new Audio('./audio/audioFinal.mp3');

//Cargamos Imagenes
const instructions=new Image()
instructions.src=images.instructions;
instructions.onload=()=>{
  carga++;
  return;
}
const winnerP2=new Image()
winnerP2.src=images.winnerP2;
winnerP2.onload=()=>{
  carga++;
  return;
}
const winnerP1=new Image()
winnerP1.src=images.winnerP1;
winnerP1.onload=()=>{
  carga++;
  return;
}
const rocketMini=new Image()
rocketMini.src=images.rocketMini;
rocketMini.onload=()=>{
  carga++;
  return;
}
const heart=new Image()
heart.src=images.heart;
heart.onload=()=>{
  carga++;
  return;
}
const pvspImages=new Image()
pvspImages.src=images.pvspImages;
pvspImages.onload=()=>{
  carga++;
  return;
}
const wavesPvsP=new Image()
wavesPvsP.src=images.wavesPvsP;
wavesPvsP.onload=()=>{
  carga++;
  return;
}
const backPvsP=new Image()
backPvsP.src=images.backPvsP;
backPvsP.onload=()=>{
  carga++;
  return;
}
const crocBackground=new Image()
crocBackground.src=images.crocBackground;
crocBackground.onload=()=>{
  carga++;
  return;
}
const youLose=new Image()
youLose.src=images.youLose;
youLose.onload=()=>{
  carga++;
  return;
}
const back1stStageBlack=new Image()
back1stStageBlack.src=images.back1stStageBlack;
back1stStageBlack.onload=()=>{
  carga++;
  return;
}
const back1stStageGray=new Image()
back1stStageGray.src=images.back1stStageGray;
back1stStageGray.onload=()=>{
  carga++;
  return;
}
const croc1=new Image()
croc1.src=images.croc1;
croc1.onload=()=>{
  carga++;
  return;
}
const croc2=new Image()
croc2.src=images.croc2;
croc2.onload=()=>{
  carga++;
  return;
}
const croc3=new Image()
croc3.src=images.croc3;
croc3.onload=()=>{
  carga++;
  return;
}
const boats=new Image()
boats.src=images.boats;
boats.onload=()=>{
  carga++;
  return;
}
const controls=new Image()
controls.src=images.controls;
controls.onload=()=>{
  carga++;
  return;
}
const bullets=new Image()
bullets.src=images.bullets;
bullets.onload=()=>{
  carga++;
  return;
}
const hunter=new Image()
hunter.src=images.hunter;
hunter.onload=()=>{
  carga++;
  return;
}
const back1stStageColor=new Image()
back1stStageColor.src=images.back1stStageColor;
back1stStageColor.onload=()=>{
  carga++;
  return;
}
const btnSprite=new Image()
btnSprite.src=images.btnSprite;
btnSprite.onload=()=>{
  carga++;
  return;
}

const fBackground = new Image()
fBackground.src = images.fakeBackground;
fBackground.onload = () => {
  carga++;

}

function waitResult(){
  if (carga===22) {
    //goMenu();
    fakeStart();//------------------------------------------AQUI INICIA TODO
  } else {
       setTimeout(waitResult, 250);
  }
}

waitResult();

//Declaramos las clases
//------------------------------CLASE HUNTER
class Hunter{
  constructor(){
    this.x=62;
    this.y=475;
    this.sx=5;
    this.sy=5;
    this.width=117;
    this.height=200;
  }
draw(){
  if(this.y<475){
      this.y+=10;
  }
  ctx.drawImage(hunter,this.sx,
                      this.sy,
                      this.width,
                      this.height,
                      this.x,
                      this.y,
                      this.width,
                      this.height);
       }
jump(){
  this.y=475;
  this.width=128;
  this.height=200;
  if(viewHunter){
    this.sx=1067;
    }else{
      this.sx=929;
    }
  this.y-=250;
  
}
goRight(){
  if(this.x<400){
  this.y=475;
  this.sx=5;
  this.width=117;
  this.height=200;
  this.x+=10;
  
  }

  viewHunter=true;
}
goLeft(){
  if(this.x>0){
  this.y=475;
  this.sx=132;
  this.width=117;
  this.height=200;
  this.x-=10;
  }
  viewHunter=false;
}
goDown(){
  this.y=515;
  if(viewHunter){
    this.sx=790;
    }else{
      this.sx=651;
    }
  this.width=129;
  this.height=160;
  return;
}
attack(){
  this.y=475;
  this.sx=455;
  this.width=186;
  this.height=200;
  shootGun();

}
}
const hunterHan=new Hunter();
///-----------------------------CLASE BULLET
class Bullet{
constructor(x){
  this.x=x;
  this.y=545;
  this.sx=67;
  this.sy=5;
  this.width=52;
  this.height=20;
}
draw(){
  this.x+=10;
  ctx.drawImage(bullets,this.sx,
    this.sy,
    this.width,
    this.height,
    this.x,
    this.y,
    this.width,
    this.height);
}

}
///-----------------------------CLASE SHIPS

class Ships{
  constructor(){
    this.x=-311;
    this.y=427;
    this.sx=5;
    this.sy=5;
    this.width=311;
    this.height=118;
  }
  draw(){
    
    this.x+=2;
  
    ctx.drawImage(boats,this.sx,
      this.sy,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height);
  }

}
///-----------------------------CLASE DADCROC
class DadCroc{
constructor(){
  this.x=1200;
  this.y=465;
  this.sx=545;
  this.sy=5;
  this.width=200;
  this.height=210;
}
draw(){
  
  ctx.drawImage(croc3,this.sx,
    this.sy,
    this.width,
    this.height,
    this.x,
    this.y,
    this.width,
    this.height);
}
goLeft(){
  if(this.x>880){
    if(drawDad){
      this.sx=545;
      drawDad=false;
    }else{
      this.sx=965;
      drawDad=true;
    } 
   this.x-=4;
   }
}

isTouch(bullet){
  return(
       this.x < bullet.x + bullet.width &&
       this.x + this.width > bullet.x &&
       this.y < bullet.y + bullet.height &&
       this.y + this.height > bullet.y
 
  )
  }

}
const crocDad=new DadCroc();


//Lo primero que aparecera, al moneto de cargar la pagina
function fakeStart(){
ctx.strokeStyle = "white";
ctx.strokeRect(0,0,canvas.width,canvas.height);
//Dibuja fondo
ctx.drawImage(fBackground,0,0,canvas.width,canvas.height);

}
//-------------------------------------------------first STAGE-------------------
//El primer escenario del juego con el tutorial de inicio
function goFirstStage(){
//Borramos la pantalla de inicio

ctx.clearRect(0,0,canvas.width,canvas.height);
//Cargamos el nuevo escenario
ctx.drawImage(back1stStageGray,0,0,canvas.width,canvas.height);
interval = setInterval(update1stStage, 1000 / 60)

//reproducimos musica de fondo
audio1stStage.play();
frames=0;
countFrames=0;

}


function update1stStage(){
frames++;

if(!gameOver1stage){
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.drawImage(back1stStageColor,0,0,canvas.width,canvas.height);

drawShips();
}else{
 if((frames-secondFrame)>180){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(back1stStageBlack,0,0,canvas.width,canvas.height);
  ctx.drawImage(youLose,334,10,532,186);
  ctx.textAlign = "center";
  ctx.font = '40px Ubuntu';
  ctx.fillStyle='white';
  ctx.fillText('Press Enter to Continue',600,235,200)
 }else{
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(back1stStageGray,0,0,canvas.width,canvas.height);
 }

}

ctx.drawImage(boats,324,5,444,450,717,118,444,450);


//despliega por 15 segundos las instrucciones
if(frames<60*10){
ctx.strokeStyle='white'
ctx.strokeRect(334,10,532,186)
ctx.drawImage(controls,334,10,532,186);
ctx.font = 'bold 40px Ubuntu';
ctx.textAlign = "center";
ctx.fillStyle='white';
ctx.fillText(`Welcome friend, you are the hunter!`,600,235,500)
}
if(frames>60*12){
  if(!gameOver1stage&&frames%8===0){
    crocDad.goLeft();
    }
  crocDad.draw();
}

if(crocDad.x<=880&&!gameOver1stage){
  ctx.fillStyle='#A5DC27';
  ctx.fillText('HI!',845,477)
}

hunterHan.draw();
gunShoots.forEach((bullets,index)=>{
  if(bullets.x>1200){
    gunShoots.splice(index,1)//----------------------------------Colisiones
  }else{                
  bullets.draw()}})
  if(crocDad.x<1000&&!gameOver1stage){
  checkColisionCrocBullet();
  }
}

function checkColisionCrocBullet(){
  gunShoots.forEach(bullets=>{
    if(crocDad.isTouch(bullets)){
      audioPunch.play();
      gameOverStage1();
  
    }
  })
}

function gameOverStage1(){
  gameOver1stage=true;
  secondFrame=frames;
  audio1stStage.pause();
  audioCrocDadKilled.play();
  //drawKilledCROC
  crocDad.y=530;
  crocDad.sx=5;
  crocDad.sy=5;
  crocDad.width=260;
  crocDad.height=165;
  crocDad.draw();
   
}

function shootGun(){
  if(gunShoots.length<3){
  shootGunAudio.play();
  gunShoots.push (new Bullet(hunterHan.x+180))
  }  
}

function drawShips(){

  let rnd;
  rnd=Math.floor(Math.random() * (canvas.width-500 - 100)) + 100;
if(frames%rnd===0){
ships.push (new Ships())
}

  ships.forEach((ship,index)=>{
    if(ship.x>1200){
      ships.splice(index,1)
    }else{                
    ship.draw()}})
}



//-------------------------------------------------first STAGE-------------------


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Second Stage <<<<<<<<<<<<<<<<<<<<<<
class Board {
  constructor() {
    this.x = 0
    this.y = 588
    this.width = 2*canvas.width
    this.height = 132
  }
  draw() {
    this.x--
    if (this.x < -(2*canvas.width)) this.x = 0
    ctx.drawImage(wavesPvsP, this.x, this.y, this.width, this.height)
    ctx.drawImage(wavesPvsP, this.x + (2*canvas.width), this.y, this.width, this.height)
  }
}
const backGamepp=new Board();
//ccccccccccccccccccccccccccccccccccccccccccccccccccccccc
class Planes{
  constructor(direction){
    this.direction=direction;
    if(this.direction==='r'){
    this.x=-120;
    this.y=110;
    this.width=60;
    this.height=78;
    }else{
      this.x=1200;
      this.y=140;
    this.width=40;
    this.height=58;
    }
    
    this.sx=1000;
    this.sy=5;

  }
  draw(){
    if(this.direction==='r'){
    this.x+=6;
  
    ctx.drawImage(pvspImages,1000,
      this.sy,
      119,
      156,
      this.x,
      this.y,
      this.width,
      this.height);
    }else{
      this.x-=4;
  
      ctx.drawImage(pvspImages,871,
        this.sy,
        119,
        156,
        this.x,
        this.y,
        this.width,
        this.height);

    }

  }

}


 
//ccccccccccccccccccccccccccccccccccccccccccccccccccccccc
class Player1{
  constructor(){
    this.x=25;
    this.y=410;
    this.sx=1793;
    this.sy=5;
    this.width=160;
    this.height=168;
    this.limitY=410;
  }
draw(){
  if(this.y<this.limitY){
      this.y+=13;//10
      if(this.y>=this.limitY){
        this.y=this.limitY;
      }
   }
  ctx.drawImage(croc1,this.sx,
                      this.sy,
                      this.width,
                      this.height,
                      this.x,
                      this.y,
                      this.width,
                      this.height);
       }
jump(){
  this.y=410;
  this.width=168;
  this.height=168;
  this.y-=300;//250
  if(viewP1){
  this.sx=1437;
  }else{
    this.sx=1615;
  }
  this.limitY=410;
}
goRight(){
  if(this.x<210){
  this.y=410;
  this.width=160;
  this.height=168;
  this.x+=10;
  
  switch (drawP1){
    case 0:
      this.sx=5;
      drawP1=1;
      break;
    case 1:
      this.sx=1793;
      drawP1=2;
      break;
    case 2:
      this.sx=345;
      drawP1=3;
      break;
    default:
      this.sx=1793;
      drawP1=0;
      break;
  }

  }
  this.limitY=410;
   viewP1=true;
}
goLeft(){
  if(this.x>0){
    this.y=410;
    this.width=160;
    this.height=168;
    this.x-=10;
    
    switch (drawP1){
      case 0:
        this.sx=175;
        drawP1=1;
        break;
      case 1:
        this.sx=1963;
        drawP1=2;
        break;
      case 2:
        this.sx=515;
        drawP1=3;
        break;
      default:
        this.sx=1963;
        drawP1=0;
        break;
    }

    }
   //  this.x-=4;
   this.limitY=410;
   viewP1=false;
}
goDown(){
  this.y=466;
  this.width=200;
  this.height=112;
  if(viewP1){
    this.sx=1017;
    }else{
      this.sx=1227;
    }
}
attack(){
  this.y=398;
  this.width=156;
  this.height=180;
    this.sx=685;
this.limitY=398
shootFireP1();
}
isTouch(element){
  return(
       this.x < element.x + element.width &&
       this.x + this.width > element.x &&
       this.y < element.y + element.height &&
       this.y + this.height > element.y
 
  )
  }
}
const player1=new Player1();
const playerSuper=new Player1();
//ccccccccccccccccccccccccccccccccccccccccccccccccccccccc
class Player2{
  constructor(){
    this.x=1015;
    this.y=410;
    this.sx=1963;
    this.sy=5;
    this.width=160;
    this.height=168;
    this.limitY=410;
  }
draw(){
  if(this.y<this.limitY){
      this.y+=13;//10
      if(this.y>=this.limitY){
        this.y=this.limitY;
      }
  }
  ctx.drawImage(croc2,this.sx,
                      this.sy,
                      this.width,
                      this.height,
                      this.x,
                      this.y,
                      this.width,
                      this.height);
       }
jump(){
  this.y=410;
  this.width=168;
  this.height=168;
  this.y-=300;//250
  if(viewP2){
  this.sx=1437;
  }else{
    this.sx=1615;
  }
  this.limitY=410;
}
goRight(){
  if(this.x<1040){
  this.y=410;
  this.width=160;
  this.height=168;
  this.x+=10;
  
  switch (drawP2){
    case 0:
      this.sx=5;
      drawP2=1;
      break;
    case 1:
      this.sx=1793;
      drawP2=2;
      break;
    case 2:
      this.sx=345;
      drawP2=3;
      break;
    default:
      this.sx=1793;
      drawP2=0;
      break;
  }

  }
  this.limitY=410;
   viewP2=true;
}
goLeft(){
  if(this.x>830){
    this.y=410;
    this.width=160;
    this.height=168;
    this.x-=10;
    
    switch (drawP2){
      case 0:
        this.sx=175;
        drawP2=1;
        break;
      case 1:
        this.sx=1963;
        drawP2=2;
        break;
      case 2:
        this.sx=515;
        drawP2=3;
        break;
      default:
        this.sx=1963;
        drawP2=0;
        break;
    }

    }
   //  this.x-=4;
   this.limitY=410;
   viewP2=false;
}
goDown(){
  this.y=466;
  this.width=200;
  this.height=112;
  if(viewP2){
    this.sx=1017;
    }else{
      this.sx=1227;
    }
}
attack(){
  this.y=398;
  this.width=156;
  this.height=180;
    this.sx=851;
this.limitY=398
shootFireP2();
}
isTouch(element){
  return(
       this.x < element.x + element.width &&
       this.x + this.width > element.x &&
       this.y < element.y + element.height &&
       this.y + this.height > element.y
 
  )
  }
}
const player2=new Player2();
//ccccccccccccccccccccccccccccccccccccccccccccccccccccccc
class BallFireP1{
  constructor(x){
    this.x=x;
    this.y=415;
    this.sx=239;
    this.sy=5;
    this.width=68;
    this.height=40;
  }
  draw(){
    this.x+=fireVelocity;
    ctx.drawImage(pvspImages,this.sx,
      this.sy,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height);
  }
  
  }
  //ccccccccccccccccccccccccccccccccccccccccccccccccccccccc
  class BallFireP2{
    constructor(x){
      this.x=x;
      this.y=415;
      this.sx=5;
      this.sy=5;
      this.width=68;
      this.height=40;
    }
    draw(){
      this.x-=fireVelocity;
      ctx.drawImage(pvspImages,this.sx,
        this.sy,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height);
    }
    
    }


//ccccccccccccccccccccccccccccccccccccccccccccccccccccccc
class Hearts{
  constructor(x){
    this.x=x;
    this.y=110;
    this.width=42;
    this.height=36;
  }
  draw(){
    
    this.y+=6;
  
    ctx.drawImage(heart,
      this.x,
      this.y,
      this.width,
      this.height);
  }

}
//ccccccccccccccccccccccccccccccccccccccccccccccccccccccc
class Missile{
  constructor(direction){
    this.direction=direction;
    this.y=565;
    this.width=89;
    this.height=19;
    this.sy=5;
    if(this.direction==='r'){
    this.x=-89;
    this.sx=5;
    }else{
    this.x=1200;
    this.sx=104;
    }
    

  }
  draw(){
    
    if(this.direction==='r'){
      this.x+=15;
  
    ctx.drawImage(rocketMini,5,
      this.sy,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height);
    }else{  
      this.x-=15;
      ctx.drawImage(rocketMini,104,
        this.sy,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height);

    }

  }

}
//ccccccccccccccccccccccccccccccccccccccccccccccccccccccc

function goMenu(){
  audioCrocDadKilled.pause();
 clearInterval(interval); //comentado momentaneo!!!!!!
  firstStage=false;
  frames=0;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(crocBackground,0,0,canvas.width,canvas.height);
  if(!ins){
  audioMenu.loop=true;
  audioMenu.currentTime = 0;
  audioMenu.play();
  }
  ins=false;
 //habilita botones
 btnVsPc.setAttribute("style", "display:block");
 btnPvsP.setAttribute("style", "display:block");
 btnS.setAttribute("style", "display:block");

}

function instructive(){
//Borramos la pantalla de inicio y botones
btnVsPc.setAttribute("style", "display:none");
btnPvsP.setAttribute("style", "display:none");
btnS.setAttribute("style", "display:none");
ctx.clearRect(0,0,canvas.width,canvas.height);
//Cargamos el nuevo escenario
ctx.drawImage(instructions,0,0,canvas.width,canvas.height);
ins=true;
}

function goGamePvsP(){
//Borramos la pantalla de inicio y botones
btnVsPc.setAttribute("style", "display:none");
btnPvsP.setAttribute("style", "display:none");
btnS.setAttribute("style", "display:none");
ctx.clearRect(0,0,canvas.width,canvas.height);
//Cargamos el nuevo escenario
ctx.drawImage(backPvsP,0,0,canvas.width,canvas.height);
intervale = setInterval(updatePP, 1000 / 60)
secondStage=true;


//reproducimos musica de fondo
audio2ndStage.loop=true;
audio2ndStage.currentTime = 0;
audio2ndStage.play();
frames=0;
scoreP1=100;
scoreP2=100;
gameOver2stage=false;

}

function drawPlanesR(){

  let rnd;
  rnd=Math.floor(Math.random() * (canvas.width-500 - 100)) + 100;
if(frames%rnd===0){
planesR.push (new Planes('r'))
}

  planesR.forEach((planeR,index)=>{
    if(planeR.x>1200){
      planesR.splice(index,1)
    }else{                
    planeR.draw()}})
}

function drawPlanesL(){

  let rnd;
  rnd=Math.floor(Math.random() * (canvas.width-500 - 100)) + 100;
if(frames%rnd===0){
planesL.push (new Planes('l'))
}

  planesL.forEach((planeL,index)=>{
    if(planeL.x<-120){
      planesL.splice(index,1)
    }else{                
    planeL.draw()}})
}

function drawMissiles(rnd){

if(frames%250===0){
  if(rnd){
  missilesR.push (new Missile('r'))
  }else{
  missilesL.push (new Missile('l'))
  }
}

  missilesR.forEach((miR,index)=>{
    if(miR.x>1200){
      missilesR.splice(index,1)
    }else{                
    miR.draw()}})

  missilesL.forEach((miL,index)=>{
     if(miL.x<-267){
       missilesL.splice(index,1)
     }else{                
     miL.draw()}})
}


function shootFireP1(){
  if(shootsP1.length<2){
  audioP1.play();
  shootsP1.push (new BallFireP1(player1.x+130))
  }  
}
function shootFireP2(){
  if(shootsP2.length<2){
  audioP2.play();
  shootsP2.push (new BallFireP2(player2.x-45))  
  }
}

function drawShootsP1(){
  shootsP1.forEach((shootP1,index)=>{
    if(shootP1.x>1200){
      shootsP1.splice(index,1)//----------------------------------Colisiones
    }else{                
    shootP1.draw()}})
}

function drawShootsP2(){
  shootsP2.forEach((shootP2,index)=>{
    if(shootP2.x<-68){
      shootsP2.splice(index,1)//----------------------------------Colisiones
    }else{                
    shootP2.draw()}})
}

function drawHearts(){

  let rnd;
  rnd=Math.floor(Math.random()*canvas.width);
if(frames%400===0){
hearts.push (new Hearts(rnd))
}

  hearts.forEach((heart,index)=>{
    if(heart.y>720){
      hearts.splice(index,1)
    }else{                
    heart.draw()}})
}

function checkColisionPlayerBall(){
  shootsP2.forEach((ball,index)=>{
    if(player1.isTouch(ball)){
      audioPunch.play();
      scoreP1-=5;
      shootsP2.splice(index,1);  
    }
  })
  shootsP1.forEach((ball,index)=>{
    if(player2.isTouch(ball)){
      audioPunch.play();
      scoreP2-=5;
      shootsP1.splice(index,1);  
    }
  })
}

function checkColisionPlayerMissile(){
  missilesL.forEach((rocket,index)=>{
    if(player1.isTouch(rocket)){
      audioPunch.play();
      scoreP1-=3;
      missilesL.splice(index,1);  
    }
  })
  missilesR.forEach((rocket,index)=>{
    if(player2.isTouch(rocket)){
      audioPunch.play();
      scoreP2-=3;
      missilesR.splice(index,1);  
    }
  })
}

function checkColisionPlayerHeart(){
  hearts.forEach((redheart,index)=>{
    if(player1.isTouch(redheart)){
      levelUp.play();
      scoreP1+=5;
      if(scoreP1>100){
      scoreP1=100;
      }
      hearts.splice(index,1);  
    }
    if(player2.isTouch(redheart)){
      levelUp.play();
      scoreP2+=5;
      if(scoreP2>100){
      scoreP2=100;
      }
      hearts.splice(index,1);  
    }
  })
}

function checkScore(){
  ctx.font = 'bold 35px Ubuntu';
  ctx.fillStyle='white';
  ctx.fillText(scoreP1,249,83,250);
  ctx.fillText(scoreP2,1080,83,250);

  if(scoreP1<=0||scoreP2<=0){
    clearInterval(intervale);
    setTimeout(function(){
      gameOver2s();
    }, 1000); 
    
  }

}

function gameOver2s(){
  frames=0;
  secondStage=false;
  gameOver2stage=true;
  audio2ndStage.pause();

//Clear all elements
shootsP1.splice(0,shootsP1.length);
shootsP2.splice(0,shootsP2.length);
planesL.splice(0,planesL.length);
planesR.splice(0,planesR.length);
missilesL.splice(0,missilesL.length);
missilesR.splice(0,missilesR.length);
hearts.splice(0,hearts.length);

  audioFinal.play();
  ctx.clearRect(0,0,canvas.width,canvas.height);
if(scoreP1<=0){
  ctx.drawImage(winnerP2,0,0,canvas.width,canvas.height);
}else{
  ctx.drawImage(winnerP1,0,0,canvas.width,canvas.height);
}


}

function updatePP(){
frames++;
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.drawImage(backPvsP,0,0,canvas.width,canvas.height);
drawHearts();
backGamepp.draw();

drawPlanesR();
drawPlanesL();
  player1.draw();
  player2.draw();
  //up shoot velocity 
  if(frames%2000===0){
    fireVelocity+=10;
  }

  drawShootsP1();
  drawShootsP2();

  const rand = Math.random() < 0.5;
  drawMissiles(rand);

  checkColisionPlayerBall();
  checkColisionPlayerHeart();
  checkColisionPlayerMissile();
  checkScore();


}


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Second Stage <<<<<<<<<<<<<<<<<<<<<<


function fullfScreen(){
  if (bod.webkitRequestFullScreen) {
      bod.webkitRequestFullScreen()
    } else {
      bod.mozRequestFullScreen()
    }
}



window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);

function keysPressed(e) {
  keys[e.keyCode] = true
  if (keys[39]) {
    if(secondStage){
    player2.goRight();
    }
    if(firstStage){
    hunterHan.goRight()
   }
  }
  if (keys[32]) {
    if(firstStage&&preventMultiShootH){
    hunterHan.attack()
    if(keyCode===81){
    preventMultiShootH=false;
    }
    }
  }

  if (keys[38]) {
    if(firstStage){
    if(hunterHan.y>=475)
    hunterHan.jump()
    }
    if(secondStage){
    if(player2.y>=player2.limitY){
    player2.jump();
    }
  }
}
  if (keys[37]) {
    if(firstStage){
    hunterHan.goLeft()
    }
    if(secondStage){
    player2.goLeft();
    }
  }
  if (keys[40]) {
    if(firstStage){
    hunterHan.goDown()
    }
    if(secondStage){
    return player2.goDown();
    }
  }
  if (keys[70]) {
    if(firstStage||secondStage){
    fullfScreen();
    }
  }
  if (keys[77]) {
    if(secondStage&&preventMultiShootP2){
    player2.attack();
    preventMultiShootP2=false;
    }
  }
  if (keys[13]) {
    if(firstStage){
      if(gameOver1stage){
      goMenu();
      }
    }
      if(gameOver2stage){
      goMenu();
      
    }
    if(menuIntro){
      btnStart();

    }
    if(ins){
      audioBtn.play();
      goMenu();
    }
  }
  if (keys[87]) {
    if(secondStage){
      if(player1.y>=player1.limitY){
      player1.jump();
      }
    }
  }
  if (keys[68]) {
    if(secondStage){
      player1.goRight();
    }
  }
  if (keys[65]) {
    if(secondStage){
      player1.goLeft();
    }
  }
  if (keys[83]) {
    if(secondStage){
      player1.goDown();
      }
  }

  if (keys[81]) {
    if(secondStage&&preventMultiShootP1){
      player1.attack();
      preventMultiShootP1=false;
      }
  }
  
  e.preventDefault();
}

function keysReleased(e) {
  keys[e.keyCode] = false;
}

document.addEventListener('keyup', ({ keyCode }) => {
if(keyCode===81){
  preventMultiShootP1=true;
}
if(keyCode===77){
  preventMultiShootP2=true;
}
if(keyCode===32){
  preventMultiShootH=true;
}


})

//LEE boton de inicio en fakeInicio
    function btnStart(){
    longShootGunAudio.play();
    firstStage=true;
   
    menuIntro=false;
    setTimeout(function(){
      fullfScreen();
      goFirstStage();
    }, 1000); 
    
  };


  //LEE boton de PvsP
  btnPvsP.onclick = function() {
    audioBtn.play();
    audioMenu.pause();
    setTimeout(function(){
      goGamePvsP();
    }, 1000); 
    
  };

 //LEE boton de Instructions
 btnVsPc.onclick = function() {
  audioBtn.play();
  //audioMenu.pause();
  setTimeout(function(){
    instructive();
  }, 1000); 
  
};

 //LEE boton de SuperGame
 btnS.onclick = function() {
  audioBtn.play();
 // audioMenu.pause();
 // setTimeout(function(){
 //   goGameSuper();
 // }, 1000); 
  
};

