import { Scene, Label, Color, Vector } from 'excalibur';

export class GameOverScene extends Scene {
    onInitialize(engine) {
        const gameOverLabel = new Label({ 
            text: 'Game Over',
            pos: new Vector(400, 300),
            color: Color.White,
            font: new ex.Font({
                family: 'Arial',
                size: 48,
                unit: ex.FontUnit.Px
            })
        });
        this.add(gameOverLabel);
    }
}