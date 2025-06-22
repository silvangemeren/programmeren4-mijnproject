import { Object } from './object';
import { Resources } from './resources';
import { Vector, CollisionType, Shape } from 'excalibur';

export class Zubat extends Object {
    constructor(x) {
        super();

        this.pos = new Vector(x, 820); // Plaats op vlieglocatie
        this.collisionType = CollisionType.Passive; // Passieve botsing voor obstakels
    }

    onInitialize(engine) {
        const sprite = Resources.Zubat.toSprite();
        sprite.scale = new Vector(0.5, 0.5); // Maakt sprite kleiner
        this.graphics.use(sprite);

        // Stel de collider in
        this.collider.set(Shape.Box(150, 150)); // Box van 50x50 pixels
        console.log('Zubat collider ingesteld met afmetingen: 50x50');
    }
}