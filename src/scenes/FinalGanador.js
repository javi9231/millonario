import Sizes from "../utils/sizes";

export default class FinalGanador extends Phaser.Scene {
  constructor() {
    super("FinalGanador");
  }

  init(datos) {
    this.score = datos.score;
  }

  preload() {}

  create() {
    let sizes = new Sizes();
    sizes.getSizes(this);

    this.textoGanador = this.add.text(
      40,
      this.totalHeight / 4,
      "Eres una máquina chechual y has conseguido " +
        "\n" +
        "Premio: " +
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
  }

  update() {}
}
