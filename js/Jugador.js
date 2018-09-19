class Jugador {
  constructor(paramNombre,paramCirculo,paramTurno) {
    this.nombre = paramNombre;
    this.circulo = paramCirculo;
    this.turno = paramTurno;
  }
  setTurno(){
    this.turno = !this.turno;
  }
}
