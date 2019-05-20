

export default class MedidorTiempo extends Phaser.GameObjects.Container {
  constructor(scene, parent = null, name, gameOptions) {
      super(scene);
      if (parent) parent.add(this);
      this.name = name;
      this.gameOptions = gameOptions;
      this.create();
  }

  create() {
    this.timeLeft = this.gameOptions.initialTime;

        // the energy container. A simple sprite
        let energyContainer = this.scene.add.sprite(0, 0, "energycontainer");

        // the energy bar. Another simple sprite
        const energyBar = this.scene.add.sprite(energyContainer.x + 46, energyContainer.y, "energybar");

        // a copy of the energy bar to be used as a mask. Another simple sprite but...
        this.energyMask = this.scene.add.sprite(energyBar.x, energyBar.y, "energybar");

        // ...it's not visible...
        this.energyMask.visible = false;

        // and we assign it as energyBar's mask.
        energyBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask);

        // a boring timer.
        this.gameTimer = this.time.addEvent({
            delay: 1000,
            callback: function(){
                this.timeLeft --;

                // dividing enery bar width by the number of seconds gives us the amount
                // of pixels we need to move the energy bar each second
                let stepWidth = this.energyMask.displayWidth / gameOptions.initialTime;

                // moving the mask
                this.energyMask.x -= stepWidth;
                if(this.timeLeft == 0){
                    console.log('FIN');
                }
            },
            callbackScope: this,
            loop: true
        });
        this.add(this.energyBar);
  }
  update() {
  }

}
