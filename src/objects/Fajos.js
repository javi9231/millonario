
class Fajos extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, image, nRepeat) {
    super(scene);
    this.scene = scene;
    this.nRepeat = nRepeat;
    this.image = image;
    this.preload();
  }

  preload() {
  }

  getFajos(){
    return this.scene.physics.add.group({
      key: this.image,
      repeat: this.nRepeat, //(this.score / juegoConfig.valorFajo) - 1,
      setXY: {
        x: this.scene.totalWidth - this.scene.posicionRect.posXfajos,
        y: this.scene.posicionRect.posY - 100
      }
    });
  }
}

export default Fajos;
