// import fajoBilletes from "../assets/fajoE.svg";
// import MedidorTiempo from "../../js/object/MedidorTiempo.js";

export default class FinalGanador extends Phaser.Scene {
  constructor() {
    super('FinalGanador');
    this.escala = window.devicePixelRatio;
    this.totalWidth = window.innerWidth * this.escala;
    this.totalHeight = window.innerHeight * this.escala;
    this.fontSize = 32 * this.escala;
  }

  init(datos) {
    this.score = datos.score;
  }

  preload() {
    this.load.image('fajoE', "./assets/fajoE.svg");
  }

  create() {

    this.scale.on('orientationchange', function(orientation) {
      if (orientation === Phaser.Scale.PORTRAIT) {
        console.log('PORTRAIT');
      } else if (orientation === Phaser.Scale.LANDSCAPE) {
        console.log('LANDSCAPE');
      }
    });

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

    this.colores = juegoConfig.colores.slice();

    this.cameras.main.setBackgroundColor(0xbababa);

  }

  update() {

  }

}
