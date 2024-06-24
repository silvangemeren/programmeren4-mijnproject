import { Scene, Vector } from "excalibur";
import { Zubat } from './zubat.js';
import { Resources, ResourceLoader } from './resources.js';
import { Rock } from './rock.js';
import { Bluerunner } from './bluerunner.js';
import { Background } from './background.js';
import { ScoreLabel } from './score.js';
import { getRandomY } from './utils.js'; // Importeer de functie voor het verkrijgen van willekeurige y-posities

export class MainGame extends Scene {
    constructor() {
        super();
        this.score = 0;
        this.scoreLabel = null;
    }

    onActivate() {
        console.log("Start het spel!");

        // Score
        this.score = 0;
        this.scoreLabel = new ScoreLabel(this.score);
        this.add(this.scoreLabel);

        // Achtergrond
        const background = new Background();
        this.add(background);

        // Rotsen
        const rock1 = new Rock(580, getRandomY());
        this.add(rock1);

        const rock2 = new Rock(980, getRandomY());
        this.add(rock2);

        // Zubats
        const zubat1 = new Zubat(500, getRandomY());
        this.add(zubat1);

        const zubat2 = new Zubat(800, getRandomY());
        this.add(zubat2);

        // Speler
        const player = new Bluerunner();
        player.pos = new Vector(500, 168);
        this.add(player);

        // Botsingsdetectie
        player.on('collisionstart', (event) => {
            if (event.other instanceof Zubat || event.other instanceof Rock) {
                console.log('Game over');
                this.engine.goToScene('gameOver', { sceneActivationData: this.score });
                this.killAllActors(); // Optioneel: vernietig alle actoren bij game over
            }
        });
    }

    killAllActors() {
        // Doorloop alle actoren en vernietig ze
        this.actors.forEach(actor => actor.kill());
    }

    onPostUpdate(engine) {
        // Voeg punten toe aan de score
        this.addPoints(1);
    }

    addPoints(points) {
        // Update de score en het scorelabel
        this.score += points;
        this.scoreLabel.updateScore(this.score);
    }
}
