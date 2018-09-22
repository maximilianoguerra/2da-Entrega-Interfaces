"use strict"
class Circle {
  // constructor() {
  //   this.posX = 10;
  //   this.posY = 10;
  //   this.radio = 10;
  //   this.color = '#FF0000';
  // }
  constructor(paramPosX,paramPosY,paramRadio,paramColor) {
    this.posX = paramPosX;
    this.posY = paramPosY;
    this.radio = paramRadio;
    this.color = paramColor;
  }
  dibujar(){
    let ctx = document.getElementById('canvas').getContext('2d');
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.posX,this.posY,this.radio,0,Math.PI*2)
    ctx.lineWidth=3;
    ctx.lineCap="round";
    ctx.strokeStyle="black";
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
  dibujarConImagen(image1){
    // let ctx2 = document.getElementById('canvas2').getContext('2d');
    // let imageData =ctx2.getImageData(0,0,$('#canvas2').attr("width"),$('#canvas2').attr("height"));
    let ctx = document.getElementById('canvas').getContext('2d');
    let image = ctx.createPattern(image1,'repeat')
    ctx.beginPath();
    // ctx.save();
    // ctx.translate(this.posX,this.posY);
    ctx.arc(this.posX,this.posY,this.radio,0,Math.PI*2)
    ctx.fillStyle = image;
    ctx.fill();
    ctx.closePath();
  }
  setColor(paramColor){
    this.color=paramColor;
  }
  dibujarConGradiente(){
    let gradient = ctx.createLinearGradient(this.posX-this.radio,this.posY,this.posX+this.radio,this.posY);
    gradient.addColorStop(0,'black')
    gradient.addColorStop(1/2,'yellow')
    gradient.addColorStop(1,'red')
    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(this.posX,this.posY,this.radio,0,Math.PI*2)
    ctx.fill();
    ctx.closePath();
  }
  dibujarConGradienteRadial(){
    let gradient = ctx.createRadialGradient(this.posX,this.posY,this.radio/8,this.posX,this.posY,this.radio);
    gradient.addColorStop(0,'black')
    gradient.addColorStop(1/2,'yellow')
    gradient.addColorStop(1,'red')
    ctx.beginPath();
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("Texto en el Canvas",this.posX-this.radio,this.posY-(this.radio+10));
    ctx.fillStyle = gradient;
    ctx.arc(this.posX,this.posY,this.radio,0,Math.PI*2)
    ctx.fill();
    ctx.closePath();
  }
  isClicked(x,y){
    let d=Math.sqrt(Math.pow(this.posX-x,2)+Math.pow(this.posY-y,2))
    if(this.radio>d){
      return true;
    }else {
      return false;
    }

  }

}
