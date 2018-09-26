"Use Strict"
let j1;
let j2;
let srcImagej1;
let srcImagej2;
let imagenMuestra1;
let imagenMuestra2;
let imageFichaj1=new Image();
let imageFichaj2=new Image();
$('.mostrar').hide();
$(document).ready(function()
  {
  $(".checkj1").click(function () {
    srcImagej1=$('input:radio[name=avatar1]:checked').val();
    imagenMuestra1=$('input:radio[name=avatar1]:checked').attr('step');
    imageFichaj1.src=srcImagej1;
    jugador1.setImage=imageFichaj1;
    });
    $(".checkj2").click(function () {
      srcImagej2=$('input:radio[name=avatar2]:checked').val();
      imagenMuestra2=$('input:radio[name=avatar2]:checked').attr('step');
      imageFichaj2.src=srcImagej2;
      jugador2.setImage=imageFichaj2;
      });
   });

$(document).on('click','#jugar',function (event) {
  event.preventDefault();
  if (($('#readyj1').is(':checked')) && ($('#readyj2').is(':checked'))) {
    if ($('#j1').val()!="") {
      jugador1.nombre=$('#j1').val();
    }
    if ($('#j2').val()!="") {
      jugador2.nombre=$('#j2').val();
    }
    actualizar(imageFichaj1,imageFichaj2);
    actualizarTurno();
    $('#nombrePlayer1').append(jugador1.nombre);
    $('#nombrePlayer2').append(jugador2.nombre);
    $('#imagenFicha1').attr('src',imagenMuestra1);
    $('#imagenFicha2').attr('src',imagenMuestra2);
    $('.ocultar').hide();
    $('.mostrar').show();
  }
});
let ctx = document.getElementById('canvas').getContext('2d');
let moverFicha = false;
let image1 = new Image();
let tablero = new Tablero();
let circuloParam;
let nombre;
let circulo5 = new Circle(100,600,40,'#ff0000');
let circulo6 = new Circle(900,600,40,'#ffcd00');
let jugador1 = new Jugador("jugador1",true,'#ff0000',100,50);
let jugador2 = new Jugador("jugador2",false,'#ffcd00',600,550);
// tablero.setNombreJugadores(jugador1.nombre,jugador2.nombre);
let backupj1posX;
let backupj1posY;
let backupj2posY;
let backupj2posX;
canvasFondo();
jugador1.cargarFichas();
jugador2.cargarFichas();
jugador1.dibujarFichas();
jugador2.dibujarFichas();
jugador1.escribirNombreYcantidadFichas(ctx);
jugador2.escribirNombreYcantidadFichas(ctx);
let controlCirculo5;
let controlCirculo6;
let imageData = ctx.createImageData(1000,700);
tablero.dibujar();

canvas.addEventListener('mousedown', function(event) {

  backupj1posX = jugador1.fichas[jugador1.fichas.length-1].posX;
  backupj1posY = jugador1.fichas[jugador1.fichas.length-1].posY;
  backupj2posX = jugador2.fichas[jugador2.fichas.length-1].posX;
  backupj2posY = jugador2.fichas[jugador2.fichas.length-1].posY;

  controlCirculo5 = jugador1.ultimaFichaIsClicked(event.layerX,event.layerY);
  controlCirculo6 = jugador2.ultimaFichaIsClicked(event.layerX,event.layerY);
  if (controlCirculo5||controlCirculo6) {
    moverFicha=true;
    canvas.addEventListener('mousemove', translateFicha);
  }

});
canvas.addEventListener('mouseup',function (event) {
  moverFicha=false;
  let winner;
  let seAgrego;
  if(controlCirculo5||controlCirculo6){
   seAgrego=tablero.agregarFicha(event.layerX,event.layerY,circuloParam);
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
  actualizar(imageFichaj1,imageFichaj2);
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
      circuloParam=jugador1.fichas[jugador1.fichas.length-1];
      nombre=jugador1.nombre;
    }else if ((controlCirculo6)&&(jugador2.turno)) {
      jugador2.fichas[jugador2.fichas.length-1].posX=event.layerX;
      jugador2.fichas[jugador2.fichas.length-1].posY=event.layerY;
      circuloParam=jugador2.fichas[jugador2.fichas.length-1];
      nombre=jugador2.nombre;
    }
  }
  actualizar(imageFichaj1,imageFichaj2);
}

function canvasWithe(imageData) {
  for (var x = 0; x < imageData.width; x++) {
    for (var y = 0; y < imageData.width; y++) {
      setPixel(imageData,x,y,255,255,255,255);
    }
  }
  ctx.putImageData(imageData,0,0);
}


function actualizar(imagej1,imagej2) {
  canvasFondo();
  tablero.actualizarTablero(imagej1,imagej2);
  jugador1.escribirNombreYcantidadFichas(ctx);
  jugador2.escribirNombreYcantidadFichas(ctx);
  if (imagej1!=null&&imagej2!=null) {
    jugador1.dibujarFichasConImagen(imagej1);
    jugador2.dibujarFichasConImagen(imagej2);
  }else {
    jugador1.dibujarFichas();
    jugador2.dibujarFichas();
  }
  actualizarTurno();
}

function canvasFondo() {
  let gradient = ctx.createLinearGradient(350,1000,350,0);
  gradient.addColorStop(0,'white')
  gradient.addColorStop(1,'grey')
  ctx.beginPath();
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1000, 700)
  ctx.fill();
  ctx.closePath();
}
function actualizarTurno(){
  ctx.beginPath();
  ctx.font = "italic 25px verdana";
  ctx.fillStyle = "black";
  if (jugador1.turno) {
    ctx.fillText("Turno "  +jugador1.nombre,250,100);
  }
  if(jugador2.turno){
    ctx.fillText("Turno "  +jugador2.nombre,250,100);
  }

  ctx.fill();
  ctx.closePath();
}
