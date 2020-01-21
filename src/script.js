const canvas=document.querySelector('canvas');
const ctx=canvas.getContext('2d');
const inputName=document.querySelector('.input-name');
const btnStart=document.querySelector(".start-button");
let inputText=inputName.value;
let fullScreen=false;

images={
fakeBackground:'./images/fake_menu.png',
fakeName:'./images/fake_name.png',
btnPlay:'./images/play.png',
btnSprite:'./images/buttons.png',
back1stStage: './images/1stStage_color.png',
hunter: './images/spritesheet_han.png'

}
//Cargamos Audios
const audio1stStage=new Audio('./audio/1stStage.mp3');
const shootGun=new Audio('./audio/shootGun.mp3');
const longShootGun=new Audio('./audio/longShootGun.mp3');

//Cargamos Imagenes
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
fakeStart();
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
//El primer escenario del juego con el tutorial de inicio
function goFirstStage(){
//Borramos la pantalla e inicio
inputName.setAttribute("style", "display:none");
btnStart.setAttribute("style", "display:none");
ctx.clearRect(0,0,canvas.width,canvas.height);
//Cargamos el nuevo escenario
ctx.drawImage(back1stStage,0,0,canvas.width,canvas.height);
//interval = setInterval(update, 1000 / 60)
//reproducimos musica de fondo
audio1stStage.play();
ctx.drawImage(hunter,5,5,117,200,62,475,117,200);
}




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
        return player.goRight()
  
      case 38:
        return player.goUp()
  
      case 37:
        return player.goLeft()
  
      case 40:
        return player.goDown()
  
      case 70:
        fullfScreen();
    }
  })
//LEE boton de inicio en fakeInicio
  btnStart.onclick = function() {
    inputText=inputName.value;
    longShootGun.play();
    goFirstStage();
  };

  //Se ejecuta apenas abre la pagina
//  fakeStart();