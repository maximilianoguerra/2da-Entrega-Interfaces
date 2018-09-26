"use strict"
class Casillero {
  constructor(paramPosX,paramPosY) {
    this.cuadrado = new Rectangle(paramPosX,paramPosY,50,50,'#005dda');
    this.circulo = new Circle(paramPosX+25,paramPosY+25,20,'#89AC76');
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
