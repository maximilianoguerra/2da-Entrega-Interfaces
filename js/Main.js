"Use Strict"
let ctx = document.getElementById('canvas').getContext('2d');
let moverFicha = false;
let image1 = new Image();
let tablero = new Tablero();
let color;
let nombre;
let circulo5 = new Circle(100,600,40,'#ff0000');
let circulo6 = new Circle(900,600,40,'#ffcd00');
let jugador1 = new Jugador("Maxi",true,'#ff0000',100);
let jugador2 = new Jugador("More",false,'#ffcd00',900);
let backupj1posX;
let backupj1posY;
let backupj2posY;
let backupj2posX;
jugador1.cargarFichas();
jugador2.cargarFichas();
jugador1.dibujarFichas();
jugador2.dibujarFichas();
let controlCirculo5;
let controlCirculo6;
let imageData = ctx.createImageData(1000,700);
// ctx.font = "bold 22px sans-serif";
// ctx.fillText(jugador1.nombre,100,500);
// ctx.fillText(jugador2.nombre+"asd",900,500);
tablero.dibujar();
canvas.addEventListener('mousedown', function(event) {
  moverFicha=true;
  backupj1posX = jugador1.fichas[jugador1.fichas.length-1].posX;
  backupj1posY = jugador1.fichas[jugador1.fichas.length-1].posY;
  backupj2posX = jugador2.fichas[jugador2.fichas.length-1].posX;
  backupj2posY = jugador2.fichas[jugador2.fichas.length-1].posY;
  controlCirculo5 = jugador1.ultimaFichaIsClicked(event.layerX,event.layerY);
  controlCirculo6 = jugador2.ultimaFichaIsClicked(event.layerX,event.layerY);
  if (controlCirculo5||controlCirculo6) {
    canvas.addEventListener('mousemove', translateFicha);
  }

});
canvas.addEventListener('mouseup',function (event) {
  moverFicha=false;
  let winner;
  let seAgrego;
  if(controlCirculo5||controlCirculo6){
   seAgrego=tablero.agregarFicha(event.layerX,event.layerY,color,nombre);
   console.log(seAgrego);
  }
  if(seAgrego){

    jugador1.setTurno();
    jugador2.setTurno();
      if (controlCirculo5) {
        jugador1.fichas.pop();
      }else if (controlCirculo6) {
        jugador2.fichas.pop();
      }
      winner = tablero.controlarGanador();
  }else {
    jugador1.fichas[jugador1.fichas.length-1].posX=backupj1posX ;
    jugador1.fichas[jugador1.fichas.length-1].posY=backupj1posY ;
    jugador2.fichas[jugador2.fichas.length-1].posX=backupj2posX ;
    jugador2.fichas[jugador2.fichas.length-1].posY=backupj2posY ;
  }
  actualizar();
  if(winner){
    canvasWithe(imageData);
  };
  canvas.removeEventListener('mousemove',translateFicha);
});
canvas.addEventListener('mouseout',function (event) {
  moverFicha=false;
});
function translateFicha(event) {
  if (moverFicha) {
    if((controlCirculo5)&&(jugador1.turno)){
      jugador1.fichas[jugador1.fichas.length-1].posX=event.layerX;
      jugador1.fichas[jugador1.fichas.length-1].posY=event.layerY;
      color=circulo5;
      nombre=jugador1.nombre;
    }else if ((controlCirculo6)&&(jugador2.turno)) {
      jugador2.fichas[jugador2.fichas.length-1].posX=event.layerX;
      jugador2.fichas[jugador2.fichas.length-1].posY=event.layerY;
      color=circulo6;
      nombre=jugador2.nombre;
    }
  }
  actualizar();
}

function canvasWithe(imageData) {
  for (var x = 0; x < imageData.width; x++) {
    for (var y = 0; y < imageData.width; y++) {
      setPixel(imageData,x,y,255,255,255,255);
    }
  }
  ctx.putImageData(imageData,0,0);
}


function actualizar() {
  canvasWithe(imageData);
  tablero.actualizarTablero();
  jugador1.dibujarFichas();
  jugador2.dibujarFichas();
}
function cargarimagen2() {
  let canvas2 = document.getElementById('canvas2');
  let image3 = convertCanvasToImage(canvas2);
  $('#imagen').attr('src',image3.src);
  circulo4.dibujarConImagen(image3);
}

function convertCanvasToImage(canvas) {
  var image = new Image();
  image.src = canvas2.toDataURL();
  return image;
}
function mantenerPropImg(image) {

  let ctx2 = document.getElementById('canvas2').getContext('2d');

  let anchoImg = image.width;
  let altoImg = image.height;
  let anchoCanvas= circulo4.radio*2;
  let altoCanvas= circulo4.radio*2;
  let aspectRatio = image.width/image.height;
  if(anchoImg>altoImg){
    $('#canvas2').attr("width",anchoCanvas);
    $('#canvas2').attr("height",altoCanvas);
    ctx2.drawImage(image,0,0,anchoCanvas,altoCanvas);
  }
  else{
    ctx2.drawImage(image, 0, 0, altoCanvas*aspectRatio, altoCanvas);
  }
}
function cloneImage(imageData){
  let copia= ctx.createImageData(imageData.width,imageData.height);
  for (var x = 0; x < imageData.width; x++) {
    for (var y = 0; y < imageData.height; y++) {
      let rgb =getPixel(imageData ,x,y);
      setPixel(copia,x,y,rgb[0],rgb[1],rgb[2],255)
    }
  }
  return copia;
}
function getPixel(imageData,x,y) {
  let index = (x + y * imageData.width) * 4;
  let red = imageData.data[index+0];
  let green = imageData.data[index+1];
  let blue = imageData.data[index+2];
  return [red,green,blue];
}
function setPixel(imageData,x,y,r,g,b,a) {
  index = (x + y * imageData.width) * 4;
  imageData.data[index+0]=r;
  imageData.data[index+1]=g;
  imageData.data[index+2]=b;
  imageData.data[index+3]=a;

};
