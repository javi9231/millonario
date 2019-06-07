import {
  juegoConfig
} from "../mock";
import Sizes from "../utils/sizes";

export default class FinalRespuesta extends Phaser.Scene {
  constructor() {
    super('FinalRespuesta');
    this.nivelJuego = 1;
  }

  init(datos) {
    this.add.displayList.removeAll();
    this.score = datos.score;
    this.fajosEuros = datos.fajosCorrectos,
      this.preguntas = datos.preguntas || 'falta preguntas';
    this.pregunta = datos.pregunta || 'falta pregunta';
  }

  getSizes() {
    let sizes = new Sizes();
    this.escala = sizes.escala;
    this.totalWidth = sizes.totalWidth;
    this.totalHeight = sizes.totalHeight;
    this.fontSize = sizes.fontSize;
    this.tamanioRespuestaW = this.totalWidth / this.numeroRespuestas;
    this.tamanioRespuestaH = this.totalHeight / 4;
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
    this.getSizes();
    this.inicializarScene();

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
      this.scene.remove('PreguntasScene');
      this.scene.start('FinalNoMoney');
    }
  }

  pasaScene() {
    // this.scene.remove('PreguntasScene');
    if (this.score > 0) {
      switch (this.nivelJuego) {
        case 1:
          this.scene.start('PreguntasScene', {
            score: this.score,
            fajosEuros: this.fajosEuros,
            preguntas: this.preguntas,
            nivelJuego: 1,
            numeroRespuestas: 4
          });
          break;
        case 2:
          this.scene.restart('PreguntasScene', {
            score: this.score,
            fajosEuros: this.fajosEuros,
            preguntas: this.preguntas,
            nivelJuego: 2,
            numeroRespuestas: 4
          });
          break;
        case 3:
          this.scene.restart('PreguntasScene', {
            score: this.score,
            preguntas: this.preguntas,
            nivelJuego: 3,
            numeroRespuestas: 3
          });
          break;
        case 4:
          this.scene.restart('PreguntasScene', {
            score: this.score,
            preguntas: this.preguntas,
            nivelJuego: 4,
            numeroRespuestas: 3
          });
          break;
        case 5:
          this.scene.restart('PreguntasScene', {
            score: this.score,
            nivelJuego: 5,
            numeroRespuestas: 2
          });
          break;
        case 6:
          this.scene.remove('PreguntasScene');
          this.scene.start('FinalGanador', {
            score: this.score
          });
          break;
        default:
          break;
      }
    }
    this.nivelJuego++;
    console.log('pasaScene Nivel' + this.nivelJuego);
    console.log('puntuacion ' + this.score);
  }

  update() {

  }

}
