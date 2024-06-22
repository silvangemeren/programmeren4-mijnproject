import { Scene, Label, Color, Vector, Input } from 'excalibur';

export class BeginScene extends Scene {
    onInitialize(engine) {
        const beginLabel = new Label({
            text: 'Zubatdodge',
            pos: new Vector(400, 300),
            color: Color.White,
            font: new ex.Font({
                family: 'Arial',
                size: 48,
                unit: ex.FontUnit.Px
            }),
            textAlign: ex.TextAlign.Center
        });

        this.add(beginLabel);

    }
}
