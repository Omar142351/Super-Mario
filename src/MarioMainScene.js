//@ts-nocheck
import Phaser from 'phaser'

export default class checkMarioMainScene extends Phaser.Scene {
	constructor() {
		super('MarioMainScene')
	}

	init(){
		this.platform = undefined
		this.player = undefined
		this.coin = undefined
		this.cursor = undefined
		this.score = 0
		this.scoretext = undefined
		this.monsters = undefined
		this.monsterDirection1 = 1
		this.monsterDirection2 = 1
		this.canJump = true
		this.jumpCount = 0
		this.maxJump = 2
	}

	preload() {
		this.load.image("sky", "images/sky.png")
		this.load.image("platform", "images/platform.png")
		this.load.spritesheet("shortMario", "images/short_mario.png", {frameWidth: 18, frameHeight: 16})
		this.load.spritesheet("coin", "images/coins.png", {frameWidth: 16, frameHeight: 16})
		this.load.spritesheet("monster", "images/monster.png", {frameWidth: 16, frameHeight: 16})
		this.load.audio("themeSong", "audio/theme.mp3")
		this.load.audio("coinSFX", "audio/coin.mp3")
		this.load.audio("jump", "audio/jump.mp3")
		this.load.audio("kill", "audio/kick.mp3")
	}

	create() {
		this.add.image(300, 187.5, "sky")
		this.platform = this.physics.add.staticGroup()
		this.platform.create(300, 355, "platform").setScale(5, 1.2).refreshBody()
		this.platform.create(64, 200, "platform")
		this.platform.create(536, 180, "platform").setScale(1.3, 1).refreshBody()
		this.platform.create(300, 130, "platform").setScale(1.5, 1).refreshBody()
		this.player = this.physics.add.sprite(100, 300, "shortMario").setScale(3, 3)
		this.physics.add.collider(this.player, this.platform)
		this.coin = this.physics.add.group()
		this.physics.add.collider(this.coin, this.platform)
		this.monsters = this.physics.add.group()
		this.physics.add.collider(this.monsters, this.platform)
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
		let coin2 = this.add.sprite(230, 50, "coin").setScale(1.5);
		coin2.anims.play("loopingCoin")
		this.coin.add(coin2)
		let coin3 = this.add.sprite(370, 50, "coin").setScale(1.5);
		coin3.anims.play("loopingCoin")
		this.coin.add(coin3)
		let coin4 = this.add.sprite(570, 100, "coin").setScale(1.5);
		coin4.anims.play("loopingCoin")
		this.coin.add(coin4)
		let coin5 = this.add.sprite(530, 300, "coin").setScale(1.5);
		coin5.anims.play("loopingCoin")
		this.coin.add(coin5)
		this.scoretext = this.add.text(20, 20, "Score: 0", {
			fontSize: "20px",
			color: "black"
		})
		this.physics.add.overlap(this.player, this.coin, this.collectCoin, null, this)
		let monster1 = this.add.sprite(300, 72, "monster").setScale(1.5)
		let monster2 = this.add.sprite(400, 322, "monster").setScale(1.5)
		this.monsters.add(monster1)
		this.monsters.add(monster2)
		this.anims.create({
			key: "monster moving",
			frames: this.anims.generateFrameNumbers("monster", {start: 0, end: 1}),
			frameRate: 10,
			repeat: -1
		})
		this.anims.create({
			key: "monster dying",
			frames: this.anims.generateFrameNumbers("monster", {start: 1, end: 2}),
			frameRate: 10,
		})
		this.physics.add.overlap(this.monsters, this.player, this.handleMonsterCollision, null, this)
		this.sound.play("themeSong", {repeat: -1})
	}

	update(){
		let moving = false;
		
				// Handle jumping
				if (this.cursor.w.isDown && (this.canJump || this.jumpCount < this.maxJump)) {
					this.player.setVelocityY(-800 * (this.jumpCount + 1)); // Adjust jump velocity
					this.canJump = false; // Prevent further jumps until landing
					this.jumpCount++;
					this.sound.play('jump', { volume: 0.1 });
				}
		// Handle horizontal movement
				if (this.cursor.a.isDown) {
					this.player.setVelocityX(-200);
					this.player.setFlipX(true);
					moving = true;
				} else if (this.cursor.d.isDown) {
					this.player.setVelocityX(200);
					this.player.setFlipX(false);
					moving = true;
				} else {
					this.player.setVelocityX(0);
				}
				// Update animation based on movement
				if (moving) {
					this.player.anims.play("right move", true);
				} else {
					this.player.anims.play("idle", true);
				}
		
				// Check for landing
				if (this.player.body.touching.down) {
					this.canJump = true; // Reset jump ability on landing
					this.jumpCount = 0; // Reset jump count on landing
				}
		this.monsters.children.iterate((monster, index)=> {
			if(index == 0){
				monster.x += this.monsterDirection1 * 1.2
				if(monster.x >= 360){
					this.monsterDirection1 = -1
				}else if(monster.x <= 240){
					this.monsterDirection1 = 1
				}
				monster.anims.play("monster moving")
			}else if(index == 1){
				monster.x += this.monsterDirection2 * 1.2
				if(monster.x >= 600){
					this.monsterDirection2 = -1
				}else if(monster.x <= 0){
					this.monsterDirection2 = 1
				}
				monster.anims.play("monster moving")
			}
		})
		if(this.score >= 35){
			this.sound.stopAll()
			this.scene.start("WinScene")
		}
	}
	collectCoin(player, coin){
		coin.destroy()
		this.score+= 5
		this.scoretext.setText("Score: " + this.score)
		this.sound.play("coinSFX")
	}
	handleMonsterCollision(player, monster){
	if(player.body.velocity.y > 0 && player.y < monster.y){
			monster.destroy()
			this.score += 5
			this.scoretext.setText("Score: " + this.score)
			this.sound.play("kill")
		}else{
			this.scene.start("GameOverScene")
		}
	}

}