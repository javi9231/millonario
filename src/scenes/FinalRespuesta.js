import {juegoConfig} from "../mock";
import Sizes from "../utils/sizes";

export default class FinalRespuesta extends Phaser.Scene {
  constructor() {
    super("FinalRespuesta");
    this.nivelJuego = 1;
  }

  init(datos) {
    this.add.displayList.removeAll();
    this.score = datos.score;
    (this.fajosEuros = datos.fajosCorrectos),
      (this.preguntas = datos.preguntas || "falta preguntas");
    this.pregunta = datos.pregunta || "falta pregunta";
  }

  getSizes() {
    let sizes = new Sizes();
    this.escala = sizes.escala;
    this.totalWidth = sizes.totalWidth;
    this.totalHeight = sizes.totalHeight;
    this.fontSize = sizes.fontSize * this.escala * 2;
    this.tamanioRespuestaW = this.totalWidth / this.numeroRespuestas;
    this.tamanioRespuestaH = this.totalHeight / 4;
  }

  create() {
    this.getSizes();
    this.preguntaText = this.add.text(
      40,
      this.totalHeight / 4,
      "La respuesta correcta es:\n" +
      this.pregunta.respuestas[this.pregunta.respuestaCorrecta] +
        "\n Puntos: " +
        this.score,
      {
        fontSize: this.fontSize,
        fill: "#000",
        align: "center",
        wordWrap: {
          width: this.totalWidth - this.fontSize
        }
      }
    );
    this.cameras.main.setBackgroundColor(0xbababa);

    this.input.on("pointerup", function(pointer) {
      this.scene.changeScene();
    });
  }

  changeScene() {
    console.log("Cambiamos de Scene!!");
    if (this.score > 0) {
      this.pasaScene();
    } else {
      console.log("Sin money");
      this.scene.start("FinalNoMoney");
    }
  }

  pasaScene() {
    if (this.score > 0) {
      switch (this.nivelJuego) {
        case 1:
          this.scene.remove("unoScene");
          this.scene.start("dosScene", {
            score: this.score,
            preguntas: this.preguntas
          });
          break;
        case 2:
          this.scene.remove("dosScene");
          this.scene.start("tresScene", {
            score: this.score,
            preguntas: this.preguntas
          });
          break;
        case 3:
          this.scene.remove("tresScene");
          this.scene.start("cuatroScene", {
            score: this.score,
            preguntas: this.preguntas
          });
          break;
        case 4:
          this.scene.remove("cuatroScene");
          this.scene.start("cincoScene", {
            score: this.score,
            preguntas: this.preguntas
          });
          break;
        case 5:
          this.scene.remove("cincoScene");
          this.scene.start("FinalGanador", {
            score: this.score
          });
      }
    }
    this.nivelJuego++;
    console.log("pasaScene Nivel" + this.nivelJuego);
    console.log("puntuacion " + this.score);
  }

  update() {}
}
