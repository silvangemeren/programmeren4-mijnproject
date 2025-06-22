import { Object } from './object';
import { Resources } from './resources';
import { Vector, CollisionType, Shape } from 'excalibur';

export class Rock extends Object {
    constructor(x) {
        super();

        this.pos = new Vector(x, 900); // Plaats op de grond (zelfde hoogte als Bluerunner)
        this.collisionType = CollisionType.Passive; // Passieve botsing voor obstakels
    }

    onInitialize(engine) {
        const sprite = Resources.Rock.toSprite();
        sprite.scale = new Vector(0.2, 0.2); // Maakt de sprite kleiner
        this.graphics.use(sprite);

        // Stel de collider in
        this.collider.set(Shape.Box(100, 100)); // Box van 40x40 pixels
        console.log('Rock collider ingesteld met afmetingen: 40x40');
    }
}