import { Actor, Vector } from "excalibur";
import { Resources } from './resources';
import { Object } from './object';

export class Zubat extends Object {
    constructor(x, y) {
        super();
        this.pos = new Vector(x, y);
    }

    onInitialize(engine) {
        const sprite = Resources.Zubat.toSprite();
        sprite.scale = new Vector(0.4, 0.4);
        this.graphics.use(sprite);
    }
}