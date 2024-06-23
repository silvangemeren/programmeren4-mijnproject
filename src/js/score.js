import { Label, FontUnit, Font, Vector, Actor, Color } from "excalibur";

export class ScoreLabel extends Label {
    constructor(initialScore) {
        super();

        this.text = `score: ${initialScore}`;
        this.color = Color.Black;
        this.pos = new Vector(100, 100);
        this.font = new Font({
            size: 50,
            
            family: 'Arial',
        });
        this.z = 200;
        this.updateScore(initialScore);
    }

    updateScore(newScore) {
        this.text = `Score: ${newScore}`;
        console.log(newScore);
       
    }
    
}