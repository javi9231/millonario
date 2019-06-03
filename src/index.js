import Phaser from "phaser";
import cuestionarios from "./mock.js";
import api from "./js/api/api.js";
import unoScene from './scenes/unoScene';
import dosScene from './scenes/dosScene';
import tresScene from './scenes/tresScene';
import cuatroScene from './scenes/cuatroScene';
import cincoScene from './scenes/cincoScene';
import FinalRespuesta from './scenes/FinalRespuesta';
import FinalNoMoney from './scenes/FinalNoMoney';
import FinalGanador from './scenes/FinalGanador';

const config = {
  type: Phaser.AUTO,
  zoom: 1,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "juego",
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio
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
  scene: [
    unoScene,
    dosScene,
    tresScene,
    cuatroScene,
    cincoScene,
    FinalRespuesta,
    FinalNoMoney,
    FinalGanador
  ]
};

const game = new Phaser.Game(config);
