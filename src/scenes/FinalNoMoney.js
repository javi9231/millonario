import Sizes from "../utils/sizes";

export default class FinalNoMoney extends Phaser.Scene {
  constructor() {
    super('FinalNoMoney');
  }

  init(datos) {
    this.score = datos.score;
  }

  getSizes() {
    let sizes = new Sizes();
    this.escala = sizes.escala;
    this.totalWidth = sizes.totalWidth;
    this.totalHeight = sizes.totalHeight;
    this.fontSize = sizes.fontSize * 2;
  }

  preload() {

  }

  create() {
    this.getSizes();

    this.textoPerdedor = this.add.text(40, this.totalHeight / 4,
      'Lo sentimos lo ha perdido todo, vuelva a intentarlo o te vas a rendir ahora', {
        fontSize: this.fontSize,
        fill: '#000',
        align: 'center',
        wordWrap: {
          width: this.totalWidth - this.fontSize
        }
      });

    this.cameras.main.setBackgroundColor(0xbababa);

  }

  update() {

  }

}
