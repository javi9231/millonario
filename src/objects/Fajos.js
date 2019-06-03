import fajoBilletes from "../assets/fajoE.svg";

class Fajos {
  constructor(scene, nRepeat) {
    this.scene = scene;
    this.nRepeat = nRepeat;
    this.preload();
  }

  preload() {
    this.scene.load.image('fajoE', fajoBilletes);
  }

  getFajos(){
    const fajos = this.scene.physics.add.group({
      key: 'fajoE',
      repeat: this.nRepeat, //(this.score / juegoConfig.valorFajo) - 1,
      setXY: {
        x: this.scene.totalWidth - this.scene.posicionRect.posXfajos,
        y: this.scene.posicionRect.posY - 100
      }
    });

    fajos.children.iterate(fajo => {
      fajo.setInteractive({
        draggable: true
      });
      fajo.setCollideWorldBounds(true);
      fajo.setScale(this.scene.escala / 2);
      fajo.on('drag', function(pointer, dragX, dragY) {
        this.scene.x = dragX;
        this.scene.y = dragY;
      });
    });

    return fajos;
  }
}

export default Fajos;
