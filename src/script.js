const bod=document.querySelector('.bod');


const canvas=document.querySelector('canvas');
const ctx=canvas.getContext('2d');
const inputName=document.querySelector('.input-name');
const btnStart=document.querySelector(".start-button");
const btnVsPc=document.querySelector(".btn-vs-pc");
const btnPvsP=document.querySelector(".btn-pvsp");
const btnS=document.querySelector(".btn-s");
let inputText=inputName.value;
let fullScreen=false;
let frames=0;
let drawDad=false;//animacion
let drawP1=0;//animacion
let drawP2=0;//animacion
let viewP1=true;
let gameOver1s=false;
let secondFrame=0;
let countFrames=0;
let firstStage=true;
let secondStage=false;
const gunShoots=[];
const ships=[];
const planesR=[];
const planesL=[];

images={
fakeBackground:'./images/fake_menu.png',
crocBackground: './images/crocBackground.png',
fakeName:'./images/fake_name.png',
btnPlay:'./images/play.png',
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
croc2: './images/spritesheet_croc2.png'

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

//Cargamos Imagenes
const pvspImages=new Image()
pvspImages.src=images.pvspImages;
pvspImages.onload=()=>{
  return;
}
const wavesPvsP=new Image()
wavesPvsP.src=images.wavesPvsP;
wavesPvsP.onload=()=>{
  return;
}
const backPvsP=new Image()
backPvsP.src=images.backPvsP;
backPvsP.onload=()=>{
  return;
}
const crocBackground=new Image()
crocBackground.src=images.crocBackground;
crocBackground.onload=()=>{
  return;
}
const youLose=new Image()
youLose.src=images.youLose;
youLose.onload=()=>{
  return;
}
const back1stStageBlack=new Image()
back1stStageBlack.src=images.back1stStageBlack;
back1stStageBlack.onload=()=>{
  return;
}
const back1stStageGray=new Image()
back1stStageGray.src=images.back1stStageGray;
back1stStageGray.onload=()=>{
  return;
}
const croc1=new Image()
croc1.src=images.croc1;
croc1.onload=()=>{
  return;
}
const croc2=new Image()
croc2.src=images.croc2;
croc2.onload=()=>{
  return;
}
const croc3=new Image()
croc3.src=images.croc3;
croc3.onload=()=>{
  return;
}
const boats=new Image()
boats.src=images.boats;
boats.onload=()=>{
  return;
}
const controls=new Image()
controls.src=images.controls;
controls.onload=()=>{
  return;
}
const bullets=new Image()
bullets.src=images.bullets;
bullets.onload=()=>{
  return;
}
const hunter=new Image()
hunter.src=images.hunter;
hunter.onload=()=>{
  return;
}
const back1stStageColor=new Image()
back1stStageColor.src=images.back1stStageColor;
back1stStageColor.onload=()=>{
  return;
}
const btnSprite=new Image()
btnSprite.src=images.btnSprite;
btnSprite.onload=()=>{
  return;
}
const fName=new Image()
fName.src=images.fakeName;
fName.onload=()=>{
  return;
}
const btnPlay=new Image()
btnPlay.src=images.btnPlay;
btnPlay.onload=()=>{
  return;
}
const fBackground = new Image()
fBackground.src = images.fakeBackground;
fBackground.onload = () => {
fakeStart();//------------------------------------------AQUI INICIA TODO
//goFirstStage();
//goMenu();
}
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
  this.sx=1067;
  this.width=128;
  this.height=200;
    
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
}
goLeft(){
  if(this.x>0){
  this.y=475;
  this.sx=132;
  this.width=117;
  this.height=200;
  this.x-=10;
  }
}
goDown(){
  this.y=515;
  this.sx=790;
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
//Dibuja logo
ctx.drawImage(fName,500,550);
//Dibuja boton de Play
ctx.drawImage(btnPlay,950,325,179,197);
//Dibuja Check In (Ingresa tu nombre para continuar)
ctx.drawImage(btnSprite,0,200,413,138,800,50,380,80)
ctx.font = '45px Ubuntu';
ctx.fillStyle='white';
ctx.fillText("What's your name",860,105,250)
//Check Name 

}
//-------------------------------------------------first STAGE-------------------
//El primer escenario del juego con el tutorial de inicio
function goFirstStage(){
//Borramos la pantalla de inicio
inputName.setAttribute("style", "display:none");
btnStart.setAttribute("style", "display:none");
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

if(!gameOver1s){
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
if(frames<60*15){
ctx.strokeStyle='white'
ctx.strokeRect(334,10,532,186)
ctx.drawImage(controls,334,10,532,186);
ctx.font = '40px Ubuntu';
ctx.textAlign = "center";
ctx.fillStyle='white';
ctx.fillText(`Welcome ${inputText}.`,600,235,200)
}
if(frames>60*20){
  if(!gameOver1s&&frames%8===0){
    crocDad.goLeft();
    }
  crocDad.draw();
}

if(crocDad.x<=880&&!gameOver1s){
  ctx.fillStyle='#A5DC27';
  ctx.fillText('HI!',845,477)
}

hunterHan.draw();
gunShoots.forEach((bullets,index)=>{
  if(bullets.x>1200){
    gunShoots.splice(index,1)
  }else{                
  bullets.draw()}})
  if(crocDad.x<1000&&!gameOver1s){
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
  gameOver1s=true;
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
  shootGunAudio.play();
  gunShoots.push (new Bullet(hunterHan.x+180))  
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
    this.sx=5;
    this.sy=5;
    this.width=160;
    this.height=168;
    this.limitY=410;
  }
draw(){
  if(this.y<this.limitY){
      this.y+=10;//10
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
}
const player1=new Player1();
//ccccccccccccccccccccccccccccccccccccccccccccccccccccccc
class Player2{
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
  this.sx=1067;
  this.width=128;
  this.height=200;
    
  this.y-=250;
}
goRight(){
  if(this.x<400){
  this.y=410;
  this.sx=5;
  this.width=160;
  this.height=168;
  this.x+=10;
  }
}
goLeft(){
  if(this.x>0){
  this.y=475;
  this.sx=132;
  this.width=117;
  this.height=200;
  this.x-=10;
  }
}
goDown(){
  this.y=515;
  this.sx=790;
  this.width=129;
  this.height=160;
  return;
}
attack(){
  this.y=398;
  this.sx=455;
  this.width=186;
  this.height=200;
  shootGun();

}
}

const player2=new Player2();
//ccccccccccccccccccccccccccccccccccccccccccccccccccccccc

function goMenu(){
  audioCrocDadKilled.pause();
  clearInterval(interval); //comentado momentaneo!!!!!!
 //inputName.setAttribute("style", "display:none"); //agregado momentaneo!!!!!!
  firstStage=false;
  frames=0;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(crocBackground,0,0,canvas.width,canvas.height);
  audioMenu.loop=true;
  audioMenu.play();
 //habilita botones
 btnVsPc.setAttribute("style", "display:block");
 btnPvsP.setAttribute("style", "display:block");
 btnS.setAttribute("style", "display:block");

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
audio2ndStage.play();
frames=0;

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

function shootFireP1(){
  audioP1.play();
}

function updatePP(){
frames++;
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.drawImage(backPvsP,0,0,canvas.width,canvas.height);
backGamepp.draw();
drawPlanesR();
drawPlanesL();
  player1.draw();


}


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Second Stage <<<<<<<<<<<<<<<<<<<<<<


function fullfScreen(){
  if (bod.webkitRequestFullScreen) {
      bod.webkitRequestFullScreen()
    } else {
      bod.mozRequestFullScreen()
    }

}


document.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
      case 39:
        if(firstStage){
        return hunterHan.goRight()
        }
        break;
      case 32:
        if(firstStage){
        return hunterHan.attack()
        }
        break;
      case 38:
        if(firstStage){
        if(hunterHan.y===475)
        return hunterHan.jump()
        }
        break;    
      case 37:
        if(firstStage){
        return hunterHan.goLeft()
        }
        break;
      case 40:
        if(firstStage){
        return hunterHan.goDown()
        }
        break;
      case 70:
        fullfScreen();
      case 13:
        if(firstStage){
        if(gameOver1s){
        goMenu();
        }
      }
        break;
        case 87:
          if(secondStage){
            if(player1.y===player1.limitY){
            return player1.jump();
            }
          }
          break;
          case 68:
          if(secondStage){
            return player1.goRight();
            
          }
          break;
          case 65:
          if(secondStage){
            return player1.goLeft();
          }
          break;
          case 83:
          if(secondStage){
          return player1.goDown();
          }
          break;
          case 81:
          if(secondStage){
          return player1.attack();
          }
          break;
    }
  })
//LEE boton de inicio en fakeInicio
  btnStart.onclick = function() {
    inputText=inputName.value;
    longShootGunAudio.play();
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

 //LEE boton de vsPC
 btnVsPc.onclick = function() {
  audioBtn.play();
  audioMenu.pause();
  setTimeout(function(){
    //goGameVsPC();
  }, 1000); 
  
};

 //LEE boton de SuperGame
 btnS.onclick = function() {
  audioBtn.play();
  audioMenu.pause();
  setTimeout(function(){
    //goGameSuper();
  }, 1000); 
  
};








  //Se ejecuta apenas abre la pagina
//  fakeStart();


/*
let screenLog = document.querySelector('#screen-log');


function logKey(e) {

    ctx.fillStyle='white'
    ctx.fillRect(e.offsetX-50,e.offsetY,10,10);

}
*/
/*
document.addEventListener('mousemove', clickEvent);
function clickEvent(e) {
  // e = Mouse click event.
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left; //x position within the element.
  var y = e.clientY - rect.top;  //y position within the element.
  ctx.fillStyle='red'
  ctx.fillRect(x,y,10,10);
}*/