import { Scene, Label, Color, Vector, Font } from 'excalibur';

export class GameOverScene extends Scene {
    onInitialize(engine) {
        const gameOverLabel = new Label({
            text: 'Game Over',
            pos: new Vector(400, 300),
            color: Color.White,
            font: new Font({
                family: 'Arial',
                size: 48,
                unit: 'px'  // Gebruik een string voor de eenheid van de lettergrootte
            })
        });
        this.add(gameOverLabel);
    }
}
