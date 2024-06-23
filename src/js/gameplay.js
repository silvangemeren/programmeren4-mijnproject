
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

        // Score
        this.score = 0;
        this.scoreLabel = new ScoreLabel(this.score);
        this.add(this.scoreLabel);

        // Background
        const background = new Background();
        this.add(background);

        // Rock
        const rock = new Rock(580, 200);
        this.add(rock);

        // Player
        const player = new Bluerunner();
        player.pos = new Vector(400, 800);
        this.add(player);

        // Zubat
        const zubat = new Zubat(500, 300);
        this.add(zubat);

        player.on('collisionstart', (event) => {
            if (event.other instanceof Zubat || event.other instanceof Rock) {
                this.engine.goToScene('gameOver', { sceneActivationData: this.score });
                for (const actor of this.actors) {
                    actor.kill();
                }
            }
        });
    }

    onPostUpdate(engine) {
        this.addPoints(1);
        console.log(this.score);
    }
}