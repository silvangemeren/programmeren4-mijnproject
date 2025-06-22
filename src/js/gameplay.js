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

    static highScore = 0;
    addPoints(points) {
        this.score += points;
        this.updateScore();
    }

    updateScore() {
        this.scoreLabel.updateScore(this.score);
    }

    onActivate(context) {
        console.log("Start de game!");
        this.score = 0;

        // Verwijder alle bestaande objecten voordat je nieuwe toevoegt
        this.clear();

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

        // Timer resetten
        this.spawnTimer = 0;
    }

    onPostUpdate(engine, delta) {
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

        // Als het object uit de viewport gaat, verhoog de score
        obstacle.on("exitviewport", () => {
            this.addPoints(10);
        });
        this.add(obstacle);
    }
onDeactivate() {
        if (this.score > MainGame.highScore) {
            MainGame.highScore = this.score;
        }
}
}