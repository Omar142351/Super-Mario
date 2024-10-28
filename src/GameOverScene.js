import Phaser from 'phaser';
import checkMarioMainScene from './MarioMainScene';

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    preload() {
        // Load any assets you need for the lose scene
        this.load.image('loseBackground', 'images/sky.png'); // Example background
        this.load.audio('GameOverSound', 'audio/gameover.mp3'); // Example sound
    }

    create(){
        this.add.image(300, 187.5, "loseBackground")
        this.sound.play("GameOverSound")
        // Add styled text
        const loseText = this.add.text(300, 150, 'Game Over!', {
            fontSize: '48px',
            color: '#ff0000',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(300, 250, 'Press R to Restart', {
            fontSize: '32px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Add a shake effect to the lose text
        this.tweens.add({
            targets: loseText,
            y: loseText.y + 10,
            duration: 200,
            ease: 'Power1',
            yoyo: true,
            repeat: -1
        });
        this.input.keyboard.on("keydown-R", ()=>{
            this.sound.stopAll()
            this.scene.start("MarioMainScene")
        })
    }

}