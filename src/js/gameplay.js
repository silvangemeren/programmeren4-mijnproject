import { Scene, Vector } from "excalibur";
import { Zubat } from './zubat.js';
import { Resources } from './resources.js';
import { Rock } from './rock.js';
import { Bluerunner } from './bluerunner.js';
import { Background } from './background.js';
import { ScoreLabel } from './score.js';

export class MainGame extends Scene {
    score = 0;
    scoreLabel;

    addPoints(points) {
        this.score += points;
        this.updateScore();
    }

    updateScore() {
        this.scoreLabel.updateScore(this.score);
    }

    onActivate() {
        console.log("start de game!");

        // **Achtergrond**
        const background = new Background();
        background.z = -1; // Achter alle objecten plaatsen
        this.add(background);

        // **Score UI**
        this.score = 0;
        this.scoreLabel = new ScoreLabel(this.score);
        this.scoreLabel.z = 10; // Scorelabel bovenop plaatsen
        this.add(this.scoreLabel);

        // **Rocks (obstakels)**
        const rock = new Rock(580, 200);
        rock.z = 1; // Plaats Rocks bovenop de achtergrond
        this.add(rock);

        // **Player**
        const player = new Bluerunner();
        player.z = 1; // Player moet bovenop de achtergrond
        player.pos = new Vector(400, 800);
        this.add(player);

        // **Zubat (vijand)**
        const zubat = new Zubat(500, 300);
        zubat.z = 1; // Plaats Zubat bovenop de achtergrond
        this.add(zubat);

        // **Collision Event**
        player.on('collisionstart', (event) => {
            if (event.other instanceof Zubat || event.other instanceof Rock) {
                console.log('Collision detected! Switching to the GameOver scene...');

                // Overgangen mogelijk maken naar GameOver
                try {
                    this.engine.goToScene('gameOver', { sceneActivationData: this.score });
                } catch (e) {
                    console.error('Fout tijdens het schakelen naar de gameOver-scène:', e);
                }

                // Zorg dat alle acteurs worden verwijderd
                this.actors.forEach((actor) => actor.kill());
            }
        });
    }

    onPostUpdate(engine) {
        this.addPoints(1);
        console.log(this.score);
    }
}