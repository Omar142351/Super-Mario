import Phaser from 'phaser';

export default class WinningScene extends Phaser.Scene {
    constructor() {
        super('WinScene');
    }

    preload() {
        // Load any assets you need for the win scene
        this.load.image('winBackground', 'images/sky.png'); // Example background
        this.load.audio('winSound', 'audio/win.wav'); // Example sound
    }

    create(){
        this.add.image(300, 187.5, "winBackground")
        this.sound.play("winSound")
        // Add styled text
        const loseText = this.add.text(300, 150, 'You Win!!', {
            fontSize: '48px',
            color: '#008000',
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
            duration: 1000,
            ease: 'Power1',
            yoyo: true,
            repeat: -1,
            scale: {from: 1, to: 1.3}
        });
        this.input.keyboard.on("keydown-R", ()=>{
            this.sound.stopAll()
            this.scene.start("MarioMainScene")
        })
    }

  
}