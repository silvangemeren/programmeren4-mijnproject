import { Scene } from "excalibur";
import { Zubat } from './zubat.js';
import { Rock } from './rock.js';
import { Bluerunner } from './bluerunner.js';
import { Background } from './background.js';
import { ScoreLabel } from './score.js';

export class MainGame extends Scene {
    score = 0;
    scoreLabel;
    spawnTimer = 0; // Timer voor het spawnen van obstakels

    addPoints(points) {
        this.score += points;
        this.updateScore();
    }

    updateScore() {
        this.scoreLabel.updateScore(this.score);
    }

    onActivate(context) {
        console.log("Start de game!");

        // **Achtergrond**
        const background = new Background();
        background.z = -1; // Achtergrond achter andere objecten
        this.add(background);

        // **Score UI**
        this.scoreLabel = new ScoreLabel(0);
        this.scoreLabel.z = 10; // Scorelabel bovenop plaatsen
        this.add(this.scoreLabel);

        // **Player (Bluerunner)**
        const player = new Bluerunner();
        player.z = 1;
        this.add(player);
    }

    onPostUpdate(engine, delta) {
        // Score verhogen over tijd
        this.addPoints(1);
        this.spawnTimer += delta;

        // Laat om de 2 seconden een obstakel spawnen
        if (this.spawnTimer >= 2000) {
            this.spawnObstacle();
            this.spawnTimer = 0;
        }
    }

    spawnObstacle() {
        const isRock = Math.random() < 0.5; // Kans van 50% per soort
        const obstacle = isRock
            ? new Rock(1200)     // Rock spawnt op de grondhoogte
            : new Zubat(1200);   // Zubat spawnt op hoofdhoogte

        obstacle.z = 5; // Zorg dat deze zichtbaar is vóór de achtergrond
        this.add(obstacle);

        console.log(
            `Spawned obstacle: ${isRock ? "Rock" : "Zubat"} at X: 1200, Y: ${obstacle.pos.y}`
        );
    }
}