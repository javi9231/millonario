class Respuesta extends Phaser.GameObjects.Container {
  constructor(scene, parent, posicionRect, respuesta = 'falta respuesta', rectColor=0xffff00) {
    super(scene, posicionRect.posX, posicionRect.posY);
    this.scene = scene;
    if (parent) {
      parent.add(this);
    }
    this.posX = posicionRect.posX;
    this.posY = posicionRect.posY;
    this.rectW = posicionRect.rectW;
    this.rectH = posicionRect.rectH;
    this.escala = posicionRect.escala;
    this.respuesta = respuesta;
    this.rectColor = rectColor;
    this.fontSize = 32 + this.escala;
    this.name = name;
    this.create();
  }

  create () {
    this.posRectX = this.rectW / 2;
    this.posRectY = this.rectH / 2;

    let posYrespuestaTxt =  this.posRectY * 2 + this.fontSize;

    const respuestaText = this.scene.add.text(this.fontSize, posYrespuestaTxt, this.respuesta, {
      fontSize: this.fontSize,
      fill: '#000',
      align: 'center',
      wordWrap: {
        width: this.rectW
      }
    });
    const rect = this.scene.add.rectangle(this.posRectX, this.posRectY, this.rectW, this.rectH).setStrokeStyle(10, this.rectColor);

    this.add(rect);
    this.add(respuestaText);
  }
}

export default Respuesta;
