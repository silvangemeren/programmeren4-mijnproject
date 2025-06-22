import { Label, Font, Vector, Color } from "excalibur";

export class ScoreLabel extends Label {
    constructor(initialScore) {
        super({
            text: `Score: ${initialScore}`,
            color: Color.Black,
            pos: new Vector(100, 100),
            font: new Font({
                size: 50,
                family: 'Arial',
            }),
        });
        this.z = 200;
        this.updateScore(initialScore);
    }

    updateScore(newScore) {
        this.text = `Score: ${newScore}`;
        console.log(newScore);
    }
}