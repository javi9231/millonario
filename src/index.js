import Phaser from "phaser";
import cuestionarios from "./mock.js";
import fajoBilletes from "./assets/fajoE.svg";

let graphics, score = 200, fajoE, fajosEuros, textoTamanio, rectW, rectH, posRectY, posicionRect;
let escala = window.devicePixelRatio;
let totalWidth = window.innerWidth * escala;
let totalHeight= window.innerHeight * escala;

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth * window.devicePixelRatio,
  height: window.innerHeight * window.devicePixelRatio,
  zoom: 1,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0
      },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let game = new Phaser.Game(config);


function preload() {
  this.load.image('fajoE', fajoBilletes);
}

function create() {
  this.cameras.main.setBackgroundColor(0xbababa);
  let fontSize = 18 * escala;
  let preguntaText = this.add.text(40, 20, cuestionarios[0].preguntas[0].pregunta, {
    fontSize: fontSize, //'40px',
    fill: '#000',
    align: 'center',
    wordWrap: {
      width: totalWidth - fontSize
    }
  });

  posicionRect = {
    posX: 50 * escala,
    posY: totalHeight / 4,
    posXdesplazado: (100 + fontSize) * escala
  }

  respuesta(this, posicionRect.posX, cuestionarios[0].preguntas[0].respuestas[0], 0xffff00);
  respuesta(this, posicionRect.posX + posicionRect.posXdesplazado, cuestionarios[0].preguntas[0].respuestas[1], 0xff0000);

  let cursors = this.input.keyboard.createCursorKeys();

  graphics = this.add.graphics();

  let scoreText = this.add.text(totalWidth - 250 * escala,
    totalHeight - 50 * escala, 'score: ' + score, {
      fontSize: fontSize,
      fill: '#000'
    });

  fajosEuros = this.physics.add.group({
    key: 'fajoE',
    repeat: (score / 20) - 1,
    setXY: {
      x: totalWidth - posicionRect.posXdesplazado,
      y: posicionRect.posY
    }
  });

  fajosEuros.children.iterate(fajo => {
    fajo.setInteractive({
      draggable: true
    });
    fajo.setScale(escala / 2);
    fajo.on('drag', function(pointer, dragX, dragY) {
      this.x = dragX;
      this.y = dragY;
    });
  });
}

function colorearFajos(scene, zonaX, zonaY, rW, rH, color) {
  let within = scene.physics.overlapRect(zonaX, zonaY, rW, rH, true, true);
  within.forEach(function(body) {
    body.gameObject.setTint(color); //.destroy();
  });
}


function checkOriention(orientation) {
  if (orientation === Phaser.Scale.PORTRAIT) {
    graphics.alpha = 0.2;
    console.log('PORTRAIT');
    //text.setVisible(true);
  } else if (orientation === Phaser.Scale.LANDSCAPE) {
    graphics.alpha = 1;
    console.log('LANDSCAPE');
    //text.setVisible(false);
  }
}

function respuesta(scene, containerX, respuesta, rectColor){
  textoTamanio = 18 * escala;
  rectW = rectH = 100 * escala;

  let posRectX = rectW / 2;
  posRectY = rectH / 2;

  let posXrespuestaTxt = (posRectX - respuesta.length * 32 /
    respuesta.length )/ escala - 25;

  let posYrespuestaTxt =  posRectY * 2 + textoTamanio;

  let respuestaText = scene.add.text(posXrespuestaTxt, posYrespuestaTxt, respuesta, {
    fontSize: textoTamanio,
    fill: '#000',
    align: 'center',
    wordWrap: {
      width: rectW
    }
  });
  let rect = scene.add.rectangle(posRectX, posRectY, rectW, rectH).setStrokeStyle(10, rectColor);
  var container = scene.add.container(containerX, posicionRect.posY, [respuestaText, rect]);
}

function update() {

  fajosEuros.children.iterate(fajo => {
    fajo.clearTint(); //(0xffffff);
  });

  colorearFajos(this, posicionRect.posX, posicionRect.posY, rectW, rectH, 0xffff00);
  colorearFajos(this, posicionRect.posX + posicionRect.posXdesplazado, posicionRect.posY, rectW, rectH, 0xff0000);
}
