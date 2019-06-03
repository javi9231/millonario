// import fajoBilletes from "../assets/fajoE.svg";
// import MedidorTiempo from "../../js/object/MedidorTiempo.js";
import Fajos from "../objects/Fajos";
import Sizes from "../utils/sizes";
import {cuestionarios, juegoConfig} from "../mock";
import {reloj} from "../objects/reloj";
import Respuesta from "../objects/Respuesta";

export default class unoScene extends Phaser.Scene {
  constructor() {
    super('unoScene');
    this.score = 100;
    this.nivelJuego = 1;
    this.numeroRespuestas = 4;
  }

  preload() {
    // this.load.image('fajoE', "./assets/fajoE.svg");
  }

  getSizes(){
    let sizes = new Sizes();
    this.escala = sizes.escala;
    this.totalWidth = sizes.totalWidth;
    this.totalHeight = sizes.totalHeight;
    this.fontSize = sizes.fontSize;
    this.tamanioRespuestaW = this.totalWidth / this.numeroRespuestas;
    this.tamanioRespuestaH = this.totalHeight / 4;
  }

  getCuestion(){
    let aleatorio = Phaser.Math.Between(0,1);
    return cuestionarios[aleatorio].preguntas.slice();
  }

  inicializarScene() {
    this.preguntas = this.getCuestion();
    this.pregunta = this.pregunta || this.resultadoAleatorio(this.preguntas);

    if (this.preguntaText) {
      this.preguntaText.setText(this.pregunta.pregunta + ' score: ' + this.score);
    }
    this.colores = juegoConfig.colores.slice();
  }

  create() {
    this.getSizes();
    this.inicializarScene();

    this.scale.on('orientationchange', function(orientation) {
      if (orientation === Phaser.Scale.PORTRAIT) {
        console.log('PORTRAIT');
      } else if (orientation === Phaser.Scale.LANDSCAPE) {
        console.log('LANDSCAPE');
      }
    });

    this.cameras.main.setBackgroundColor(0xbababa);

    // this.muestraPregunta();
    if (!this.preguntaText) {
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

    this.posicionRect = {
      posX: 0,
      posY: this.totalHeight / 4,
      rectW: this.tamanioRespuestaW,
      rectH: this.tamanioRespuestaH,
      escala: this.escala,
      fontSize: 18 * this.escala,
      posXfajos: (100 + this.fontSize) * this.escala,
      color: 0xff0000
    }

    this.gameView = this.add.container();
    this.timer = new reloj(this, this.gameView, 'reloj');
    this.timer.countdown(juegoConfig.tiempoPregunta);

    this.eventos = this.sys.events;
    this.eventos.on('countdown', () => {
      this.timer.abort();
      this.timeIsOver();
    });
    this.eventos.on('resize', this.resize, this);

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

    this.graphics = this.add.graphics();

    let nFajos = (this.score / juegoConfig.valorFajo) - 1;
    let fajos = new Fajos(this, nFajos);
    this.fajosEuros = fajos.getFajos();

    // this.physics.add.group({
    //   key: 'fajoE',
    //   repeat: (this.score / juegoConfig.valorFajo) - 1,
    //   setXY: {
    //     x: this.totalWidth - this.posicionRect.posXfajos,
    //     y: this.posicionRect.posY - 100
    //   }
    // });
    //
    // this.fajosEuros.children.iterate(fajo => {
    //   fajo.setInteractive({
    //     draggable: true
    //   });
    //   fajo.setCollideWorldBounds(true);
    //   fajo.setScale(this.escala);
    //   fajo.on('drag', function(pointer, dragX, dragY) {
    //     this.x = dragX;
    //     this.y = dragY;
    //   });
    // });
    var canvas = this.sys.game.canvas;
  }

  timeIsOver() {
    console.log('Final escena 1');
    this.eliminarFajosMalColocados();
    this.scene.start('FinalRespuesta', {
      score: this.score,
      preguntas: this.preguntas,
      pregunta: this.pregunta,
      nivelJuego: 1
    });
  }

  /**
   * Los fajos que no se encuentran en la respuesta correcta se eliminan
   * y los que estan en la posicion correcta se pasan a la puntuacion general
   */
   eliminarFajosMalColocados() {
     for (let i = 0; i < 4; i++) {
       if (this.posicionesRespuestas != null) {
         if (i != this.pregunta.respuestaCorrecta) {
           this.eliminarFajos(this, this.posicionesRespuestas[i]);
         } else if (i == this.pregunta.respuestaCorrecta) {
           this.score = this.contarFajos(this, this.posicionesRespuestas[i]) *
             juegoConfig.valorFajo;
         }
       }
     }
   }

   resize () {
     let width = window.innerWidth * window.devicePixelRatio;
     let height = window.innerHeight * window.devicePixelRatio;
     this.cameras.main.setBounds(0, 0, width, height);
     console.log(width + ' ' + height);
   }

   contarFajos (scene, elemento) {
     let within = scene.physics.overlapRect(elemento.posX, elemento.posY,
       elemento.rectW, elemento.rectH, true, true);
     let contador = 0;
     within.forEach(function(body) {
       contador++;
     });
     return contador;
   }

   eliminarFajos (scene, elemento) {
     let within = scene.physics.overlapRect(elemento.posX, elemento.posY,
       elemento.rectW, elemento.rectH, true, true);
     within.forEach(function(body) {
       body.gameObject.destroy();
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

  comodin5050() {
    this.pregunta.comodines[1]._5050.sort().forEach(eliminar =>
      this.pregunta.respuestas.slice(eliminar, 1));
    console.log(this.pregunta);
  }

  update() {
    this.fajosEuros.children.iterate(fajo => {
      fajo.clearTint(); // es lo mismo pintar de blanco (0xffffff);
    });

    this.posicionesRespuestas.forEach(elemento => {
      if (elemento) {
        this.colorearFajos(this, elemento);
      }
    });
  }
}
