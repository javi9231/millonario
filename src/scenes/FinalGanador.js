import Sizes from "../utils/sizes";

export default class FinalGanador extends Phaser.Scene {
  constructor() {
    super('FinalGanador');

  }

  init(datos) {
    this.score = datos.score;
  }

  getSizes(){
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

    this.textoGanador = this.add.text(40, this.totalHeight / 4,
      'Eres una máquina chechual y has conseguido ' + '\n'
      + 'Premio: ' + this.score , {
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
