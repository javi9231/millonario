
class Fajos extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, image, nRepeat) {
    super(scene);
    this.scene = scene;
    this.nRepeat = nRepeat;
    this.image = image;

  }

  getFajos(){
    return this.scene.physics.add.group({
      key: this.image,
      repeat: this.nRepeat,
      setXY: {
        x: this.scene.totalWidth /2,
        y: this.scene.posicionRect.posY - 100
      }
    });
  }

  /**
   * Los fajos que no se encuentran en la respuesta correcta se eliminan
   * y los que estan en la posicion correcta se pasan a la puntuacion general
   */
   // eliminarFajosMalColocados(respuestaCorrecta, posicionesRespuestas) {
   //   for (let i = 0; i < 4; i++) {
   //     if (this.posicionesRespuestas != null) {
   //       if (i != this.pregunta.respuestaCorrecta) {
   //         this.eliminarFajos(this, this.posicionesRespuestas[i]);
   //       } else if (i == this.pregunta.respuestaCorrecta) {
   //         this.fajosCorrectos = this.devolverFajos(this, this.posicionesRespuestas[i]);
   //         console.log(this.fajosCorrectos);
   //       }
   //     }
   //   }
   // }

   devolverFajos(scene, elemento){
     return scene.physics.overlapRect(elemento.posX, elemento.posY,
       elemento.rectW, elemento.rectH, true, true).slice();
   }

   eliminarFajos (scene, elemento) {
     let within = scene.physics.overlapRect(elemento.posX, elemento.posY,
       elemento.rectW, elemento.rectH, true, true);
     within.forEach(function(body) {
       body.gameObject.destroy();
     });
   }
}

export default Fajos;
