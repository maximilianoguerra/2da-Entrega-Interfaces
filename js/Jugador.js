class Jugador {
  constructor(paramNombre,paramTurno,paramColor,paramPosX,paramPosTextoX) {
    this.nombre = paramNombre;
    this.turno = paramTurno;
    this.posYFicha=470;
    this.posXFicha=paramPosX;
    this.color=paramColor
    this.fichas = new Array();
    this.posTextoX=paramPosTextoX;
    this.posTextoY=200;
    this.imageCircle;
  }
  
  escribirNombreYcantidadFichas(ctx){
    ctx.beginPath();
    ctx.font = "italic 25px verdana";
    ctx.fillStyle = "black";
    ctx.fillText("Fichas "  +this.fichas.length,this.posTextoX,this.posTextoY+30);
    ctx.fill();
    ctx.closePath();

  }

  setTurno(){
    this.turno = !this.turno;
  }

  setNombre(paramNombre){
    this.nombre=paramNombre;
  }

  cargarFichas(){
    let posY=615;
    for (var i = 0; i < 21; i++) {
      this.posYFicha-=10;
      this.fichas[i]=new Circle(this.posXFicha,this.posYFicha,20,this.color);
    }
  }

  dibujarFichas(){
    for (var i = 0; i < this.fichas.length; i++) {
      this.fichas[i].dibujar();
    }
  }

  dibujarFichasConImagen(imageAvatar){
    for (var i = 0; i < this.fichas.length; i++) {
      this.fichas[i].image=imageAvatar;
      this.fichas[i].dibujarConImagen(imageAvatar);
    }
  }

  ultimaFichaIsClicked(x,y){
     if(this.turno){
       return this.fichas[this.fichas.length-1].isClicked(x,y)
     }
      return false;
  }

}
