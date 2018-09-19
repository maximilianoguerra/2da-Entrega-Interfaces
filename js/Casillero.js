"use strict"
class Casillero {
  constructor(paramPosX,paramPosY) {
    this.cuadrado = new Rectangle(paramPosX,paramPosY,100,100,'#005dda');
    this.circulo = new Circle(paramPosX+50,paramPosY+50,40,'#89AC76');
    this.ocupado=false;
    this.ocupadopor=null;
  }
  dibujarCasillero(){
    this.cuadrado.dibujarCuadrado();
    this.circulo.dibujar();
  }
  setDisponibilidad(){
    this.ocupado=true;
  }
}
