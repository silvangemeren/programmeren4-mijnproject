import '../css/style.css';
import { Engine, DisplayMode } from 'excalibur';
import { ResourceLoader } from './resources.js';
import { GameOverScene } from './gameover.js';
import { MainGame } from './gameplay.js';
import { BeginScene } from './beginscene.js';

export class Game extends Engine {
    constructor() {
        super({
            width: 980,
            height: 1020,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        });

        // Debug-instellingen om colliders te visualiseren
        this.debug.graphics.showPhysics = true; // Visualiseer botsingsdozen
        this.debug.graphics.showPhysicsColliders = true; // Toon colliders visueel

        // Scènes toevoegen
        this.add('MainGame', new MainGame());
        this.add('gameOver', new GameOverScene());
        this.add('BeginScene', new BeginScene());

        // Resources laden en spel starten
        this.start(ResourceLoader)
            .then(() => {
                console.log('Resources zijn geladen.');
                this.startGame(); // Eerste scène starten
            })
            .catch((error) => {
                console.error('Fout bij het laden van resources:', error);
            });
    }

    startGame() {
        // Ga naar de beginscène
        this.goToScene('BeginScene').catch((error) => {
            console.error('Fout bij het overschakelen naar BeginScene:', error);
        });
    }
}

// Start de game engine
new Game();