import { Scene, Label, Vector, Color, Font } from 'excalibur';
import { Background } from './background.js';

export class BeginScene extends Scene {
    constructor(engine) {
        super();

        // Achtergrond toevoegen
        const background = new Background();
        this.add(background);

        let label = new Label({
            text: 'Zubat Dodge',
            pos: new Vector(100, 100),
            font: new Font({
                color: Color.White,
                family: 'impact',
                size: 120,
            })
        });

        const GoToGame = new Label({
            text: 'Start Game',
            pos: new Vector(500, 400),
            font: new Font({
                family: 'bold',
                size: 80,
            }),
            color: Color.White
        });

        GoToGame.on('pointerup', () => {
            // Start het spel
            engine.goToScene('MainGame');
        });

        this.add(label);
        this.add(GoToGame);
    }
}