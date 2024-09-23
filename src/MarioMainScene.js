import Phaser from 'phaser'

export default class MarioMainScene extends Phaser.Scene {
	constructor() {
		super('MarioMainScene')
	}

	init(){
		this.platform = undefined
		this.player = undefined
		this.coin = undefined
		this.cursor = undefined
	}

	preload() {
		this.load.image("sky", "images/sky.png")
		this.load.image("platform", "images/platform.png")
		this.load.spritesheet("shortMario", "images/short_mario.png", {frameWidth: 18, frameHeight: 16})
		this.load.spritesheet("coin", "images/coins.png", {frameWidth: 16, frameHeight: 16})
	}

	create() {
		this.add.image(300, 187.5, "sky")
		this.platform = this.physics.add.staticGroup()
		this.platform.create(300, 355, "platform").setScale(5, 1.2).refreshBody()
		this.platform.create(64, 200, "platform")
		this.platform.create(536, 160, "platform")
		this.platform.create(300, 100, "platform").setScale(1.5, 1)
		this.player = this.physics.add.sprite(100, 300, "shortMario").setScale(3, 3)
		this.physics.add.collider(this.player, this.platform)
		this.coin = this.physics.add.group()
		// coin1.anims.play("coin")
		this.physics.add.collider(this.coin, this.platform)
		this.cursor = this.input.keyboard.addKeys({ 
			w: Phaser.Input.Keyboard.KeyCodes.W,
			a: Phaser.Input.Keyboard.KeyCodes.A,
			s: Phaser.Input.Keyboard.KeyCodes.S,
			d: Phaser.Input.Keyboard.KeyCodes.D
		});
		this.player.setCollideWorldBounds(true)
		this.anims.create({
			key: "right move",
			frames: this.anims.generateFrameNumbers("shortMario", {start: 1, end: 3}),
			frameRate: 10,
			repeat: -1})
		this.anims.create({key: "idle", frames: [{key: "shortMario", frame: 0}]})
		this.anims.create({
			key: "loopingCoin",
			frames: this.anims.generateFrameNumbers("coin", {start: 0, end: 3}),
			frameRate: 10,
			repeat: -1
		})
		let coin1 = this.add.sprite(50, 170, "coin").setScale(1.5);
		coin1.anims.play("loopingCoin")
		this.coin.add(coin1)
	}

	update(){
		if (this.cursor.w.isDown){
			this.player.setVelocityY(-500)
		}else if (this.cursor.a.isDown){
			this.player.setVelocityX(-200)
			this.player.anims.play("right move")
			this.player.setFlipX(true)
		}else if (this.cursor.d.isDown){
			this.player.setVelocityX(200)
			this.player.anims.play("right move")
			this.player.setFlipX(false)
		}else{
			this.player.setVelocity(0)
			this.player.anims.play("idle")
		}
	}

}