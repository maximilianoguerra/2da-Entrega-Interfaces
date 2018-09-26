class Rectangle {
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
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
    ctx.fillStyle = "black";
    ctx.strokeRect(this.posX, this.posY, this.width, this.height)
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
}
