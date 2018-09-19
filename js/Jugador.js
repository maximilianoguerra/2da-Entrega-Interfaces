class Jugador {
  constructor(paramNombre,paramTurno,paramColor,paramPosX) {
    this.nombre = paramNombre;
    this.turno = paramTurno;
    this.posYFicha=615;
    this.posXFicha=paramPosX;
    this.color=paramColor
    this.fichas = new Array();
  }
  setTurno(){
    this.turno = !this.turno;
  }
  cargarFichas(){
    let posY=615;
    for (var i = 0; i < 21; i++) {
      this.posYFicha-=15;
      this.fichas[i]=new Circle(this.posXFicha,this.posYFicha,40,this.color);
    }
  }
  dibujarFichas(){
    console.log(this.fichas.length);
    for (var i = 0; i < this.fichas.length; i++) {
      this.fichas[i].dibujar();
    }
  }
  ultimaFichaIsClicked(x,y){
    return this.fichas[this.fichas.length-1].isClicked(x,y)
  }

}
