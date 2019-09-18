import Sizes from "../utils/sizes";

export default class PantallaInicio extends Phaser.Scene {
  constructor() {
    super("PantallaInicio");
  }

  init(datos) {}

  getSizes() {
    let sizes = new Sizes();
    this.escala = sizes.escala;
    this.totalWidth = sizes.totalWidth;
    this.totalHeight = sizes.totalHeight;
    this.fontSize = sizes.fontSize * 2;
  }

  preload() {}

  create() {
    this.getSizes();

    this.textoTitulo = this.add.text(40, this.totalHeight / 10, "Millonario ", {
      fontSize: this.fontSize,
      fill: "#000",
      align: "left",
      wordWrap: {
        width: this.totalWidth - this.fontSize
      }
    });

    this.cameras.main.setBackgroundColor(0xbababa);

    this.inicioBtn = this.add
      .text(40, this.totalHeight / 5, "Inicio", { fill: "#000" })
      .setInteractive()
      .on("pointerup", () => this.pulsadoInicio());
  }
  pulsadoInicio() {
    console.log("Pulsado inicio");
    this.scene.start("unoScene");
  }

  update() {}
}
