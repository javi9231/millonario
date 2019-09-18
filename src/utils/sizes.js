export default class Sizes {
  constructor() {
    let ratio = 1;

    this.escala = window.devicePixelRatio;
    this.totalWidth = window.innerWidth * this.escala;
    this.totalHeight = window.innerHeight * this.escala;
    this.fontSize = 18 * this.escala;
  }

  checkOriention(orientation) {
    if (orientation === Phaser.Scale.PORTRAIT) {
      graphics.alpha = 0.2;
      console.log("PORTRAIT");
      //text.setVisible(true);
    } else if (orientation === Phaser.Scale.LANDSCAPE) {
      graphics.alpha = 1;
      console.log("LANDSCAPE");
    }
  }

  getSizes(scene) {
    scene.escala = this.escala;
    scene.totalWidth = this.totalWidth;
    scene.totalHeight = this.totalHeight;
    scene.fontSize = this.fontSize;
    scene.tamanioRespuestaW = scene.totalWidth / scene.numeroRespuestas;
    scene.tamanioRespuestaH = scene.totalHeight / 4;
    scene.posicionRect = this.posicionRectangulos(scene);
  }

  posicionRectangulos(scene) {
    return {
      posX: 0,
      posY: scene.totalHeight / 4,
      rectW: scene.tamanioRespuestaW,
      rectH: scene.tamanioRespuestaH,
      escala: scene.escala,
      posXfajos: (100 + scene.fontSize) * scene.escala,
      color: 0xff0000
    };
  }

  // this.scale.on('orientationchange', function(orientation) {
  //   if (orientation === Phaser.Scale.PORTRAIT) {
  //     console.log('PORTRAIT');
  //   } else if (orientation === Phaser.Scale.LANDSCAPE) {
  //     console.log('LANDSCAPE');
  //   }
  // });
}
