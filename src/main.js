import Phaser from 'phaser'

import HelloWorldScene from './MarioMainScene'
import GameOverScene from './GameOverScene'
import WinningScene from './WinningScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 600,
	height: 375,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 8000 },
		},
	},
	scene: [HelloWorldScene, GameOverScene, WinningScene],
	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}

export default new Phaser.Game(config)
