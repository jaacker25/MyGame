const canvas=document.querySelector('canvas');
const ctx=canvas.getContext('2d');
const inputName=document.querySelector('.input-name');
const btnStart=document.querySelector(".start-button");
let inputText=inputName.value;
let fullScreen=false;
let frames=0;
const gunShoots=[]

images={
fakeBackground:'./images/fake_menu.png',
fakeName:'./images/fake_name.png',
btnPlay:'./images/play.png',
btnSprite:'./images/buttons.png',
back1stStage: './images/1stStage_color.png',
hunter: './images/spritesheet_han.png',
bullets: './images/bullets.png'

}
//Cargamos Audios
const audio1stStage=new Audio('./audio/1stStage.mp3');
const shootGunAudio=new Audio('./audio/shootGun.mp3');
const longShootGunAudio=new Audio('./audio/longShootGun.mp3');

//Cargamos Imagenes
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
  this.sx=5;
  this.sy=67;
  this.width=52;
  this.height=20;
}
draw(){
  this.x+=10;
  ctx.fillRect(this.x,this.y,10,10);
 /* ctx.drawImage(bullets,this.sx,
    this.sy,
    this.width,
    this.height,
    this.x,
    this.y,
    this.width,
    this.height);*/
}
isTouch(bullet){
  return(
       this.x >= canvas.width
 
  )
  }
}



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
ctx.drawImage(back1stStage,0,0,canvas.width,canvas.height);
interval = setInterval(update1stStage, 1000 / 60)

//reproducimos musica de fondo
audio1stStage.play();
frames=0;

}


function update1stStage(){
frames++;
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.drawImage(back1stStage,0,0,canvas.width,canvas.height);
hunterHan.draw();
gunShoots.forEach(bullets=>bullets.draw())
}

function shootGun(){
  shootGunAudio.play();
  gunShoots.push (new Bullet(hunterHan.x+180))

  
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