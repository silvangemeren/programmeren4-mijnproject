import { Scene, Label, Vector, Color, Font } from 'excalibur';
import { MainGame } from './gameplay';

export class GameOverScene extends Scene {
    onInitialize(engine) {
        // Tekst: Game Over
        const gameOverLabel = new Label({
            text: 'Game Over',
            pos: new Vector(400, 200),
            color: Color.White,
            font: new Font({
                family: 'Arial',
                size: 48,
            }),
        });

        // Laatste score
        const currentScoreLabel = new Label({
            text: `Score: 0`,
            pos: new Vector(400, 300),
            color: Color.White,
            font: new Font({
                family: 'Arial',
                size: 36,
            }),
        });

        // Highscore
        const highScoreLabel = new Label({
            text: `Highscore: ${MainGame.highScore}`,
            pos: new Vector(400, 400),
            color: Color.White,
            font: new Font({
                family: 'Arial',
                size: 36,
            }),
        });

        // "Nog een keer spelen"-knop
        const restartLabel = new Label({
            text: 'Nog een keer spelen',
            pos: new Vector(400, 500),
            color: Color.Yellow,
            font: new Font({
                family: 'Arial',
                size: 36,
            }),
        });

        // Maak de restart-knop klikbaar
        restartLabel.on('pointerup', () => {
            engine.goToScene('MainGame'); // Ga naar de MainGame scène
        });

        // Bij het activeren van de scène, update de scorelabels
        this.on('activate', () => {
            currentScoreLabel.text = `Score: ${engine.scenes['MainGame'].score}`;
            highScoreLabel.text = `Highscore: ${MainGame.highScore}`;
        });

        this.add(gameOverLabel);
        this.add(currentScoreLabel);
        this.add(highScoreLabel);
        this.add(restartLabel);
    }
}