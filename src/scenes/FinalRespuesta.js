// import fajoBilletes from "../assets/fajoE.svg";
// import MedidorTiempo from "../../js/object/MedidorTiempo.js";

export default class FinalRespuesta extends Phaser.Scene {
  constructor() {
    super('FinalRespuesta');
    this.escala = window.devicePixelRatio;
    this.totalWidth = window.innerWidth * this.escala;
    this.totalHeight = window.innerHeight * this.escala;
    this.fontSize = 32 * this.escala;
    this.nivelJuego = 1;
  }

  init(datos) {
    this.add.displayList.removeAll();
    this.score = datos.score;
    this.preguntas = datos.preguntas || 'falta preguntas';
    this.pregunta = datos.pregunta || 'falta pregunta';
    // this.nivelJuego = datos.nivelJuego;
    this.inicializarScene();
    console.log('datos: ');
    console.log(datos);
    console.log('Score: ' + this.score);
  }

  preload() {
    this.load.image('fajoE', "./assets/fajoE.svg");
  }

  inicializarScene() {
    this.preguntaText = this.add.text(40, this.totalHeight / 4,
      this.pregunta.respuestas[this.pregunta.respuestaCorrecta] + '\n Puntos: ' + this.score, {
        fontSize: this.fontSize,
        fill: '#000',
        align: 'center',
        wordWrap: {
          width: this.totalWidth - this.fontSize
        }
      });

    this.colores = juegoConfig.colores.slice();
  }

  create() {

    this.scale.on('orientationchange', function(orientation) {
      if (orientation === Phaser.Scale.PORTRAIT) {
        console.log('PORTRAIT');
      } else if (orientation === Phaser.Scale.LANDSCAPE) {
        console.log('LANDSCAPE');
      }
    });

    this.cameras.main.setBackgroundColor(0xbababa);

    this.input.on('pointerup', function(pointer) {
      this.scene.timeIsOver();
    });
  }

  timeIsOver() {
    console.log('Tiempo finalizado!!');
    if (this.score > 0) {
      this.pasaScene();
    } else {
      console.log('Sin money 1');
      this.scene.remove('cincoScene');
      this.scene.start('FinalNoMoney');
    }
  }

  pasaScene() {
    if (this.score > 0) {
      switch (this.nivelJuego) {
        case 1:
          this.scene.remove('unoScene');
          this.scene.start('dosScene', {
            score: this.score,
            preguntas: this.preguntas
          });
          break;
        case 2:
          this.scene.remove('dosScene');
          this.scene.start('tresScene', {
            score: this.score,
            preguntas: this.preguntas
          });
          break;
        case 3:
          this.scene.remove('tresScene');
          this.scene.start('cuatroScene', {
            score: this.score,
            preguntas: this.preguntas
          });
          break;
        case 4:
          this.scene.remove('cuatroScene');
          this.scene.start('cincoScene', {
            score: this.score,
            preguntas: this.preguntas
          });
          break;
        case 5:
          if(this.score > 0){
            this.scene.remove('cincoScene');
            this.scene.start('FinalGanador', {
              score: this.score
            });
          }
        default:
          break;
      }
    }else {
      this.scene.remove('cincoScene');
      this.scene.start('FinalNoMoney');
    }
    this.nivelJuego++;
    console.log('pasaScene Nivel' + this.nivelJuego);
    console.log('puntuacion ' + this.score);
  }

  liberarScene() {

  }
  update() {

  }

}
