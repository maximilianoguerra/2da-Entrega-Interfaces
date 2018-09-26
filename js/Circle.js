"use strict"
class Circle {
  constructor(paramPosX,paramPosY,paramRadio,paramColor) {
    this.posX = paramPosX;
    this.posY = paramPosY;
    this.radio = paramRadio;
    this.color = paramColor;
    this.image;
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
    if (this.image!=null) {
      ctx.globalCompositeOperation = "source-atop";
      ctx.drawImage(this.image,this.posX-20,this.posY-20);
    }
    ctx.closePath();
  }

  dibujarConImagen(image1){
    let ctx = document.getElementById('canvas').getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.posX,this.posY,this.radio,0,Math.PI*2);
    ctx.lineWidth=3;
    ctx.lineCap="round";
    ctx.strokeStyle="black";
    ctx.stroke();
    ctx.fill();
    ctx.globalCompositeOperation = "source-atop";
    ctx.drawImage(image1,this.posX-20,this.posY-20);
    ctx.closePath();
  }

  setColor(paramColor){
    this.color=paramColor;
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
