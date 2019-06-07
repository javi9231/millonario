import fajoBilletes from "../../src/assets/fajoE.png";
import Fajos from "../objects/Fajos";
import Sizes from "../utils/sizes";
import {cuestionarios, juegoConfig} from "../mock";
import {reloj} from "../objects/reloj";
import Respuesta from "../objects/Respuesta";

export default class tresScene extends Phaser.Scene {
  constructor(datos) {
    super('tresScene');
  }

  init(datos) {
    this.score = datos.score;
    this.preguntas = datos.preguntas;
  }

  preload() {
    this.load.image('fajoE', fajoBilletes);
  }

  inicializarScene() {
    this.nivelJuego = 3;
    this.numeroRespuestas = 3;
    this.pregunta = this.pregunta || this.resultadoAleatorio(this.preguntas);
    this.colores = juegoConfig.colores.slice();
    this.getSizes();
  }

  getSizes() {
    let sizes = new Sizes();
    this.escala = sizes.escala;
    this.totalWidth = sizes.totalWidth;
    this.totalHeight = sizes.totalHeight;
    this.fontSize = sizes.fontSize;
    this.tamanioRespuestaW = this.totalWidth / this.numeroRespuestas;
    this.tamanioRespuestaH = this.totalHeight / 4;
    this.posicionRect = sizes.posicionRectangulos(this);
  }

  create() {
    this.inicializarScene();

    this.cameras.main.setBackgroundColor(juegoConfig.backGroundColor);

    this.mostrarPregunta();

    this.iniciarTemporizador(juegoConfig.tiempoPregunta);

    this.posicionesRespuestas = [];

    this.pregunta.respuestas.forEach(respuesta => {
      if (respuesta != null) {
        this.posicionRect.color = this.resultadoAleatorio(this.colores);
        this.posicionesRespuestas.push(Object.assign({}, this.posicionRect));

        this.res1 = new Respuesta(this, this.gameView, this.posicionRect,
          respuesta, this.posicionRect.color);
        this.posicionRect.posX += (this.tamanioRespuestaW);
        console.log(this.posicionesRespuestas);
      }
    });

    this.crearFajos((this.score / juegoConfig.valorFajo) - 1);
    // -1 porque la libreria empieza a crear desde 0

  }

  timeIsOver() {
    console.log('Final escena 3');

    this.fajosCorrectos = this.fajos.devolverFajos(this,
      this.posicionesRespuestas[this.pregunta.respuestaCorrecta]);

    this.scene.start('FinalRespuesta', {
      score: this.fajosCorrectos.length * juegoConfig.valorFajo,
      preguntas: this.preguntas,
      pregunta: this.pregunta,
      nivelJuego: 3
    });
  }

  mostrarPregunta() {
    this.preguntaText = this.add.text(40, 20,
      this.pregunta.pregunta + ' score: ' + this.score, {
        fontSize: this.fontSize, //'40px',
        fill: '#000',
        align: 'center',
        wordWrap: {
          width: this.totalWidth - this.fontSize
        }
      });
  }

  iniciarTemporizador(tiempo) {
    this.gameView = this.add.container();
    this.timer = new reloj(this, this.gameView, 'reloj');
    this.timer.countdown(tiempo);

    this.eventos = this.sys.events;
    this.eventos.on('countdown', () => {
      this.timer.abort();
      this.timeIsOver();
    });
  }

  crearFajos(nFajos) {
    this.fajos = new Fajos(this, 100, 100, 'fajoE', nFajos);
    this.fajosEuros = this.fajos.getFajos();

    this.fajosEuros.children.iterate(fajo => {
      fajo.setInteractive({
        draggable: true
      });
      fajo.setCollideWorldBounds(true);
      fajo.setScale(this.escala);
      fajo.on('drag', function(pointer, dragX, dragY) {
        this.x = dragX;
        this.y = dragY;
      });
    });
  }

  colorearFajos(scene, elemento) {
    let within = scene.physics.overlapRect(elemento.posX, elemento.posY,
      elemento.rectW, elemento.rectH, true, true);
    within.forEach(function(body) {
      body.gameObject.setTint(elemento.color); //.destroy();
    });
  }

  /**
   * Devuelve un objeto del array
   * eliminando el objeto del array original
   */
  resultadoAleatorio(arrayDatos) {
    let longArray = arrayDatos.length;
    if (longArray < 1)
      return null;
    let aleatorio = Math.floor(Math.random() * longArray);
    let seleccion = arrayDatos[aleatorio];
    arrayDatos.splice(aleatorio, 1);
    return seleccion;
  }

  comodin5050() {
    this.pregunta.comodines[1]._5050.sort().forEach(eliminar =>
      this.pregunta.respuestas.slice(eliminar, 1));
    console.log(this.pregunta);
  }

  update() {
    this.fajosEuros.children.iterate(fajo => {
      fajo.clearTint();
    });

    this.posicionesRespuestas.forEach(elemento => {
      if (elemento) {
        this.colorearFajos(this, elemento);
      }
    });
  }
}
