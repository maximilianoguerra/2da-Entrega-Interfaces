"Use Strict"
let ctx = document.getElementById('canvas').getContext('2d');
let moverFicha = false;
let image1 = new Image();
let tablero = new Tablero();
let color;
let circulo5 = new Circle(100,800,40,'#ff0000');
let circulo6 = new Circle(900,800,40,'#ffcd00');

tablero.dibujar();
circulo5.dibujar();
circulo6.dibujar();
canvas.addEventListener('mousedown', function(event) {
  moverFicha=true;
  canvas.addEventListener('mousemove', translateFicha);
});
canvas.addEventListener('mouseup',function (event) {
  console.log("entre");
  moverFicha=false;
  tablero.agregarFicha(event.layerX,event.layerY,color);
  circulo5 = new Circle(100,800,40,'#ff0000');
  circulo6 = new Circle(900,800,40,'#ffcd00');
  actualizar();
  canvas.removeEventListener('mousemove',translateFicha);
});
canvas.addEventListener('mouseout',function (event) {
  moverFicha=false;
});
function translateFicha(event) {
  if (moverFicha) {
    if(circulo5.isClicked(event.layerX,event.layerY)){
      circulo5.posX=event.layerX;
      circulo5.posY=event.layerY;
      color=circulo5;
    }else if (circulo6.isClicked(event.layerX,event.layerY)) {
      circulo6.posX=event.layerX;
      circulo6.posY=event.layerY;
      color=circulo6;
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
  let imageData = ctx.createImageData(1000,900);
  canvasWithe(imageData);
  tablero.actualizarTablero();
  circulo5.dibujar();
  circulo6.dibujar();
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
