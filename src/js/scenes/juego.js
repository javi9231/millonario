import { cuestionarios, gameOptions } from "../../mock.js";
import api from "../../js/api/api.js";
import fajoBilletes from "../../assets/fajoE.svg";
import MedidorTiempo from "../../js/object/MedidorTiempo.js";

export default class Juego extends Phaser.Scene {

  constructor() {
    super('Juego');
    this.score = 200;
    this.escala = window.devicePixelRatio;
   this.totalWidth = window.innerWidth * this.escala;
   this.totalHeight= window.innerHeight * this.escala;
  }
  preload(){
    this.load.image('fajoE', fajoBilletes);
  }
  create() {
    this.cameras.main.setBackgroundColor(0xbababa);
    
      this.medidorView = this.add.container();
      this.medidorTiempo = new MedidorTiempo(this, this.medidorView,
        'MedidorTiempo', gameOptions);

      let fontSize = 18 * this.escala;
      let preguntaText = this.add.text(40, 20,
        cuestionarios[0].preguntas[0].pregunta, {
        fontSize: fontSize, //'40px',
        fill: '#000',
        align: 'center',
        wordWrap: {
          width: totalWidth - fontSize
        }
      });

      this.posicionRect = {
        posX: 50 * this.escala,
        posY: totalHeight / 4,
        posXdesplazado: (100 + fontSize) * this.escala
      }

      respuesta(this, this.posicionRect.posX, cuestionarios[0].preguntas[0].respuestas[0], 0xffff00);
      respuesta(this, this.posicionRect.posX + this.posicionRect.posXdesplazado, cuestionarios[0].preguntas[0].respuestas[1], 0xff0000);

      this.graphics = this.add.graphics();

      this.scoreText = this.add.text(this.totalWidth - 250 * this.escala,
        this.totalHeight - 50 * this.escala, 'score: ' + this.score, {
          fontSize: fontSize,
          fill: '#000'
        });

      this.fajosEuros = this.physics.add.group({
        key: 'fajoE',
        repeat: (this.score / 20) - 1,
        setXY: {
          x: this.totalWidth - this.posicionRect.posXdesplazado,
          y: this.posicionRect.posY
        }
      });

      this.fajosEuros.children.iterate(fajo => {
        fajo.setInteractive({
          draggable: true
        });
        fajo.setScale(escala / 2);
        fajo.on('drag', function(pointer, dragX, dragY) {
          this.x = dragX;
          this.y = dragY;
        });
      });

  }
  colorearFajos(scene, zonaX, zonaY, rW, rH, color) {
    let within = scene.physics.overlapRect(zonaX, zonaY, rW, rH, true, true);
    within.forEach(function(body) {
      body.gameObject.setTint(color); //.destroy();
    });
  }


  checkOriention(orientation) {
    if (orientation === Phaser.Scale.PORTRAIT) {
      graphics.alpha = 0.2;
      console.log('PORTRAIT');
      //text.setVisible(true);
    } else if (orientation === Phaser.Scale.LANDSCAPE) {
      graphics.alpha = 1;
      console.log('LANDSCAPE');
      //text.setVisible(false);
    }
  }

  respuesta(scene, containerX, respuesta, rectColor){
    this.textoTamanio = 18 * this.escala;
    this.rectW = this.rectH = 100 * this.escala;

    this.posRectX = this.rectW / 2;
    this.posRectY = this.rectH / 2;

    let posXrespuestaTxt = (this.posRectX - this.respuesta.length * 32 /
      this.respuesta.length )/ this.escala - 25;

    let posYrespuestaTxt =  this.posRectY * 2 + this.textoTamanio;

    let respuestaText = scene.add.text(posXrespuestaTxt, posYrespuestaTxt, respuesta, {
      fontSize: this.textoTamanio,
      fill: '#000',
      align: 'center',
      wordWrap: {
        width: this.rectW
      }
    });
    let rect = scene.add.rectangle(this.posRectX, this.posRectY, this.rectW, this.rectH).setStrokeStyle(10, rectColor);
    var container = scene.add.container(this.containerX, this.posicionRect.posY, [respuestaText, rect]);
  }

  update(){
    this.fajosEuros.children.iterate(fajo => {
      fajo.clearTint(); //(0xffffff);
    });

    this.colorearFajos(this, this.posicionRect.posX, this.posicionRect.posY, this.rectW, this.rectH, 0xffff00);
    this.colorearFajos(this, this.posicionRect.posX + this.posicionRect.posXdesplazado, this.posicionRect.posY, this.rectW, this.rectH, 0xff0000);
  }
}
