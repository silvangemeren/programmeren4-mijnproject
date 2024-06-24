
import { Actor, Vector } from 'excalibur';
import { Resources } from './resources';

export class Background extends Actor {
    constructor() {
        super({
            anchor: new Vector(0, 0),
            pos: new Vector(0, 0),
            z: -1 // Zorg ervoor dat de achtergrond zich achter andere objecten bevindt
        });
    }

    onInitialize(engine) {
        const sprite = Resources.Background.toSprite();
        sprite.scale = new Vector(engine.drawWidth / sprite.width, engine.drawHeight / sprite.height);
        this.graphics.use(sprite);
    }
}
