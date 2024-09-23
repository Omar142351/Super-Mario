import Phaser from 'phaser'

import HelloWorldScene from './MarioMainScene'

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
	scene: [HelloWorldScene],
	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}

export default new Phaser.Game(config)
