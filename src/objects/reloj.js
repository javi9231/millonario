const H = {
  WIDTH: 1280,
  HEIGHT: 720,
  makeText: function(scene, x, y, text, size = "60px", fontColor = "#000000") {
    var config = {
      x: x,
      y: y,
      text,
      style: {
        fontSize: size,
        fontFamily: "credits",
        color: fontColor,
        align: "center",
        shadow: {
          color: "#404040",
          fill: true,
          offsetX: 5,
          offsetY: 5
          // blur: 8
        }
      }
    };
    const textObj = scene.make.text(config);
    textObj.setOrigin(0.5, 0.5);

    return textObj;
  }
};

class reloj extends Phaser.GameObjects.Container {
  constructor(scene, parent = null, name) {
    super(scene);
    this.scene = scene;
    if (parent) parent.add(this);
    this.name = name;
    this.seconds = 0;
    this.create();
  }

  create() {
    const bg = (this.bg = this.scene.add.graphics());
    bg.fillRect(-70, -40, 135, 85);

    this.add(bg);

    const timer = (this.timer = H.makeText(
      this.scene,
      50 * this.scene.escala,
      50 * this.scene.escala,
      null,
      "100px",
      "#FFFFFF"
    ));
    this.setTime(this.seconds);
    this.add(timer);

    bg.x = timer.x;
    bg.y = timer.y;
  }

  setTime(num) {
    this.seconds = num;
    if (num > 9) this.timer.setText(num);
    else this.timer.setText(`0${num}`);
  }

  countdown(secs) {
    this.setTime(secs);
    this.timerEvent = this.scene.time.addEvent({
      delay: 1000,
      callback: secs => {
        if (this.seconds > 0) {
          this.seconds--;
          this.setTime(this.seconds);
        } else {
          this.scene.eventos.emit("countdown");
        }
      },
      args: [secs],
      callbackScope: this,
      repeat: secs
    });
  }

  abort() {
    this.setTime(0);
    this.timerEvent.remove();
  }

  update() {}
}
export {reloj, H};
