import { Scene, Label, Color, Vector, Font, Input } from 'excalibur';

export class BeginScene extends Scene {
    constructor(engine) {
        super(engine);

        // Achtergrond toevoegen (voorbeeld: aanname dat Background correct is geïmplementeerd in background.js)
        // const background = new Background();
        // this.add(background);

        // Titellabel toevoegen
        let titleLabel = new Label({
            text: 'Zubat Dodge',
            pos: new Vector(100, 100),
            font: new Font({
                color: Color.White,
                family: 'impact',
                size: 120,
            })
        });
        this.add(titleLabel);

        // Start Game knop toevoegen
        const startButton = new Label({
            text: 'Start Game',
            pos: new Vector(500, 400),
            font: new Font({
                family: 'bold',
                size: 80,
            }),
            color: Color.White
        });
        startButton.on('pointerup', (evt) => {
            if (evt.pointerType === Input.PointerType.Mouse) {
                // Controleer of engine en goToScene beschikbaar zijn
                if (this.engine && this.engine.goToScene) {
                    this.engine.goToScene('MainGame');
                } else {
                    console.error('Engine or goToScene method not available');
                }
            }
        });
        this.add(startButton);
    }
}
