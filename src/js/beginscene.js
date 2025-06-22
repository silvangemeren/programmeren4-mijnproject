import { Scene, Label, Vector, Color, Font } from 'excalibur';
import { Background } from './background';

export class BeginScene extends Scene {
    onInitialize(engine) {
        // Voeg de achtergrond toe
        const background = new Background();
        this.add(background);

        // Voeg de titel toe
        const titleLabel = new Label({
            text: 'Zubat Dodge',
            pos: new Vector(100, 100),
            font: new Font({
                family: 'impact',
                size: 120,
                color: Color.White
            }),
            z: 10 // Zorg dat de titel bovenop de achtergrond ligt
        });
        this.add(titleLabel);

        // Voeg de startknop toe
        const startLabel = new Label({
            text: 'Start Game',
            pos: new Vector(500, 400),
            font: new Font({
                family: 'bold',
                size: 80,
                color: Color.White
            }),
            z: 10 // Zorg dat ook de knop bovenop ligt
        });

        startLabel.on('pointerup', () => engine.goToScene('MainGame'));
        this.add(startLabel);
    }
}