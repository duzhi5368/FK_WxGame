import Phaser from '../libs/phaser-wx.min.js';

import PlanePreloadState from './plane/states/PlanePreloadState.js'
import PlaneGameState from './plane/states/PlaneGameState.js'
import CirclePathGameState from './circlepath/states/CirclePathGameState.js'

export default class GameExamples {
  
  constructor(game) {
    
    game.state.add('planePreload', new PlanePreloadState(game));
    game.state.add('planeGame', new PlaneGameState(game));

    game.state.add('circlePathGame', new CirclePathGameState(game))

  }

}
