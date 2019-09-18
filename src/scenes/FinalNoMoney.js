import Sizes from "../utils/sizes";

export default class FinalNoMoney extends Phaser.Scene {
  constructor() {
    super("FinalNoMoney");
  }

  create() {
    let sizes = new Sizes();
    sizes.getSizes(this);

    this.textoPerdedor = this.add.text(
      40,
      this.totalHeight / 4,
      "Lo sentimos lo ha perdido todo, vuelva a intentarlo o te vas a rendir ahora",
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
}
