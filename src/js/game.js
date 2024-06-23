import '../css/style.css';
import { Engine, DisplayMode } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';
import { GameOverScene } from './gameover.js';
import { MainGame } from './gameplay.js';
import { BeginScene } from './beginscene.js';

export class Game extends Engine {
    ui;

    resetGame() {
        this.goToScene('MainGame');
    }

    constructor() {
        super({ 
            width: 980,
            height: 1020,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        });

        this.add('MainGame', new MainGame());
        this.add('gameOver', new GameOverScene(this));
        this.add('BeginScene', new BeginScene(this));

        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        this.goToScene('BeginScene');
    }
}

new Game();
