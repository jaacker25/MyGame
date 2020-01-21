const canvas=document.querySelector('canvas');
const ctx=canvas.getContext('2d');
const inputName=document.querySelector('.input-name');
const btnStart=document.querySelector(".start-button");
let inputText=inputName.value;
let fullScreen=false;
let frames=0;
let drawDad=false;
let countFrames=0;
const gunShoots=[];
const ships=[];

images={
fakeBackground:'./images/fake_menu.png',
fakeName:'./images/fake_name.png',
btnPlay:'./images/play.png',
btnSprite:'./images/buttons.png',
back1stStage: './images/1stStage_color.png',
hunter: './images/spritesheet_han.png',
bullets: './images/bullets.png',
controls: './images/controls.png',
boats: './images/spritesheet_boats.png',
croc3: './images/spritesheet_croc3.png'

}
//Cargamos Audios
const audio1stStage=new Audio('./audio/1stStage.mp3');
const shootGunAudio=new Audio('./audio/shootGun.mp3');
const longShootGunAudio=new Audio('./audio/longShootGun.mp3');

//Cargamos Imagenes
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
const back1stStage=new Image()
back1stStage.src=images.back1stStage;
back1stStage.onload=()=>{
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
//fakeStart();//------------------------------------------AQUI INICIA TODO
goFirstStage();
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
  //ctx.fillRect(this.x,this.y,10,10);
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
  this.x=1300;
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
ctx.textAlign = "center";
ctx.font = '45px Ubuntu';
ctx.fillStyle='white';
ctx.fillText("What's your name",600,115,350)
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
ctx.drawImage(back1stStage,0,0,canvas.width,canvas.height);
interval = setInterval(update1stStage, 1000 / 60)

//reproducimos musica de fondo
audio1stStage.play();
frames=0;
countFrames=0;

}


function update1stStage(){
frames++;
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.drawImage(back1stStage,0,0,canvas.width,canvas.height);

drawShips();


ctx.drawImage(boats,324,5,444,450,717,118,444,450);


//despliega por 15 segundos las instrucciones
if(frames<60*15){
ctx.strokeStyle='white'
ctx.strokeRect(334,10,532,186)
ctx.drawImage(controls,334,10,532,186);
ctx.font = '40px Ubuntu';
ctx.fillStyle='white';
ctx.fillText('Welcome Player 1',500,235,200)
}
//if(frames>60*20){
  if(frames%8===0){
    crocDad.goLeft();
    }
  crocDad.draw();
//}

hunterHan.draw();
gunShoots.forEach((bullets,index)=>{
  if(bullets.x>1200){
    gunShoots.splice(index,1)
  }else{                
  bullets.draw()}})

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


function fullfScreen(){
    if (canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen()
      } else {
        canvas.mozRequestFullScreen()
      }

}

document.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
      case 39:
        return hunterHan.goRight()
      case 32:
        return hunterHan.attack()
      case 38:
        if(hunterHan.y===475)
        return hunterHan.jump()
        break;    
      case 37:
        return hunterHan.goLeft()
  
      case 40:
        return hunterHan.goDown()
  
      case 70:
        fullfScreen();
    }
  })
//LEE boton de inicio en fakeInicio
  btnStart.onclick = function() {
    inputText=inputName.value;
    longShootGunAudio.play();
    goFirstStage();
  };

  //Se ejecuta apenas abre la pagina
//  fakeStart();