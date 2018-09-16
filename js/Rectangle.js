class Rectangle {
  // constructor() {
  //   this.posX = 20;
  //   this.posY = 20;
  //   this.width = 30;
  //   this.height = 30;
  //   this.color = '#8673A1'
  // }
  constructor(paramPosX,paramPosY,paramWidth,paramHeight,paramColor) {
    this.posX = paramPosX;
    this.posY = paramPosY;
    this.width = paramWidth;
    this.height = paramHeight;
    this.color = paramColor;
  }
  setValues(paramPosX,paramPosY,paramWidth,paramHeight,paramColor) {
    this.posX = paramPosX;
    this.posY = paramPosY;
    this.width = paramWidth;
    this.height = paramHeight;
    this.color = paramColor;
  }
  dibujarCuadrado(){
    let ctx = document.getElementById('canvas').getContext('2d');
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(this.posX, this.posY, this.width, this.height)
    ctx.fill();
    ctx.closePath();
  }
}
