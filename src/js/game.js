import { Engine, DisplayMode } from 'excalibur';
import { Resources, ResourceLoader } from './resources';
import { GameOverScene } from './gameover';
import { MainGame } from './gameplay';
import { BeginScene } from './beginscene';

export class Game extends Engine {
    constructor() {
        super({ 
            width: 980,
            height: 1020,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        });

        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        this.add('MainGame', new MainGame());
        this.add('gameOver', new GameOverScene(this));
        this.add('BeginScene', new BeginScene(this));
        this.goToScene('BeginScene');
    }
}

new Game();