
  class Tablero {

    constructor() {
      this.posX=180;
      this.posY=200;
      this.matTablero=new Array(7);
      this.matTablero[0]=new Array(6);
      this.matTablero[1]=new Array(6);
      this.matTablero[2]=new Array(6);
      this.matTablero[3]=new Array(6);
      this.matTablero[4]=new Array(6);
      this.matTablero[5]=new Array(6);
      this.matTablero[6]=new Array(6);
    }

    dibujar(){
      let paramPosX;
      let paramPosY;
      for (var x = 0; x < 7; x++) {
        for (var y = 0; y < 6; y++) {
            paramPosX = this.posX;
            paramPosY = this.posY;
            let casillero = new Casillero(paramPosX,paramPosY);
            this.matTablero[x][y]= casillero;
            casillero.dibujarCasillero();
            this.posY+=50;
            if (y==5) {
              this.posY=200;
              this.posX+=50;
            }
          }
        }
        this.posX=180;
        this.posy=200;
    }

    agregarFicha(paramPosX,paramPosY,paramCirculo,paramNombre){
      let x=0;
      let y=5;
      let radio =20;
      if ((this.posY>paramPosY)) {
        if((paramPosX+radio<this.posX+55)&&(this.posX-5<paramPosX-radio)){
            this.colocarFicha(0,5,paramCirculo,paramNombre);
            return true;
          }else if ((paramPosX+radio<this.posX+105)&&(this.posX+45<paramPosX-radio)) {
            this.colocarFicha(1,5,paramCirculo,paramNombre);
            return true;
          }else if ((paramPosX+radio<this.posX+155)&&(this.posX+95<paramPosX-radio)) {
          this.colocarFicha(2,5,paramCirculo,paramNombre);
            return true;
          }else if ((paramPosX+radio<this.posX+205)&&(this.posX+145<paramPosX-radio)) {
              this.colocarFicha(3,5,paramCirculo,paramNombre);
              return true;
          }else if ((paramPosX+radio<this.posX+255)&&(this.posX+195<paramPosX-radio)) {
            this.colocarFicha(4,5,paramCirculo,paramNombre);
            return true;
          }else if ((paramPosX+radio<this.posX+305)&&(this.posX+245<paramPosX-radio)) {
            this.colocarFicha(5,5,paramCirculo,paramNombre);
            return true;
          }else if ((paramPosX+radio<this.posX+355)&&(this.posX+295<paramPosX-radio)) {
            this.colocarFicha(6,5,paramCirculo,paramNombre);
            return true;
          }
        }
        return false;
      }

    actualizarTablero(){
      for (var x = 0; x < 7; x++) {
        for (var y = 0; y < 6; y++) {
            this.matTablero[x][y].dibujarCasillero();
          }
        }
    }
    colocarFicha(x,y,paramCirculo,paramNombre){
      let libre=false;
      while(!libre){
        if (y==-1) {
          libre=true;
        }
        else if(!this.matTablero[x][y].ocupado){
          libre=true;
          if(paramCirculo.image!=null){
            this.matTablero[x][y].circulo.image=paramCirculo.image;
            this.matTablero[x][y].circulo.color='white';
          }else{
            this.matTablero[x][y].circulo.setColor(paramCirculo.color);
          }

          this.matTablero[x][y].ocupadopor=paramNombre;
          this.matTablero[x][y].setDisponibilidad();
        }
          y--;
        }
    }

    controlarGanador(){
      let retorno =false;
      if (this.controlarGanadorHor()) {
        return true;
      }else if (this.controlarGanadorVer()) {
        return true;
      }else if (this.controlarGanadorDiagIzqADer()) {
        return true;
      }else if (this.controlarGanadorDiagDerAIzq()) {
        return true;
      }
      return false;
    }

    controlarGanadorHor(){
      for (var y = 0; y < 6; y++) {
        for (var x = 0; x < 6; x++) {
          if(this.matTablero[x][y].ocupado&&this.matTablero[x+1][y].ocupado){
            if(this.recursiveControlarGanadorHor(x,y)==4){
              return true;
            }
          }
        }
      }
      return false;
    }

    recursiveControlarGanadorHor(x,y){
      let winner = 1;
      let control = false;
      if ((x<6)&&(this.matTablero[x+1][y].ocupadopor==this.matTablero[x][y].ocupadopor)) {
        winner += this.recursiveControlarGanadorHor(x+1,y);
      }
      return winner;
    }

    controlarGanadorVer(){
      for (var x = 0; x < 7; x++) {
        for (var y = 0; y < 5; y++) {
          if(this.matTablero[x][y].ocupado&&this.matTablero[x][y+1].ocupado){
            if(this.recursiveControlarGanadorVer(x,y)==4){
              return true;
            }
          }
        }
      }
      return false;
    }

    recursiveControlarGanadorVer(x,y){
      let winner = 1;
      let control = false;
      if ((y<5)&&(this.matTablero[x][y+1].ocupadopor==this.matTablero[x][y].ocupadopor)) {
        winner += this.recursiveControlarGanadorVer(x,y+1);
      }
      return winner;
    }

    controlarGanadorDiagIzqADer(){
      for (var x = 3; x < 7; x++) {
        for (var y = 0; y < 3; y++) {
          if(this.matTablero[x][y].ocupado&&this.matTablero[x-1][y+1].ocupado){
            if(this.recursiveControlarGanadorDiagIzqADer(x,y)==4){
              return true;
            }
          }
          }
        }
        return false;
    }

    recursiveControlarGanadorDiagIzqADer(x,y){
      let winner = 1;
      let control = false;
      if((y<5)&&(x>0)){
        if ((this.matTablero[x-1][y+1].ocupadopor==this.matTablero[x][y].ocupadopor)) {
          winner += this.recursiveControlarGanadorDiagIzqADer(x-1,y+1);
        }
      }
      return winner;
    }

    controlarGanadorDiagDerAIzq(){
      for (var x = 0; x < 4; x++) {
        for (var y = 0; y < 3; y++) {
          if(this.matTablero[x][y].ocupado&&this.matTablero[x+1][y+1].ocupado){
            if(this.recursiveControlarGanadorDiagDerAIzq(x,y)==4){
              return true;
            }
          }
          }
        }
        return false;
      }

      recursiveControlarGanadorDiagDerAIzq(x,y){
        let winner = 1;
        let control = false;
        if((y<5)&&(x<6)){
          if ((y<5)&&(this.matTablero[x+1][y+1].ocupadopor==this.matTablero[x][y].ocupadopor)) {
            winner += this.recursiveControlarGanadorDiagDerAIzq(x+1,y+1);
          }
        }
        return winner;
      }
  }
