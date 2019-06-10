class Fajos extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, image, nRepeat) {
    super(scene);
    this.scene = scene;
    this.nRepeat = nRepeat;
    this.image = image;
  }

  getFajos() {
    return this.scene.physics.add.group({
      key: this.image,
      repeat: this.nRepeat,
      setXY: {
        x: this.scene.totalWidth / 2,
        y: this.scene.totalHeight - 100
      }
    });
  }

  devolverFajos(scene, elemento) {
    return scene.physics
      .overlapRect(
        elemento.posX,
        elemento.posY,
        elemento.rectW,
        elemento.rectH,
        true,
        true
      )
      .slice();
  }

  fajosPorColor(scene, posicionesRespuestas, pregunta) {
    let fajosEnLaZona = this.devolverFajos(
      scene,
      posicionesRespuestas[pregunta.respuestaCorrecta]
    );

    let fajosCorrectos = [];
    fajosEnLaZona.forEach(fajo => {
      let colorCorrecto =
        posicionesRespuestas[pregunta.respuestaCorrecta].color[1];
      let colorFajo = fajo.gameObject.tintBottomLeft;
      if (colorCorrecto == colorFajo) {
        fajosCorrectos.push(fajo);
      }
      console.log(colorCorrecto);
      console.log(colorFajo);
    });
    return fajosCorrectos;
  }

  eliminarFajos(scene, elemento) {
    let within = scene.physics.overlapRect(
      elemento.posX,
      elemento.posY,
      elemento.rectW,
      elemento.rectH,
      true,
      true
    );
    within.forEach(function(body) {
      body.gameObject.destroy();
    });
  }
}

export default Fajos;
