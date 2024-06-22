import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class Rock extends Actor {
    constructor() {
        super({
            pos: new Vector(800, 500),
            vel: new Vector(-200, 0),
            collisionType: CollisionType.Active // Set collision type to Active
        });
        this.graphics.use(Resources.Rock.toSprite());
        this.transform.scale = new Vector(0.2, 0.2);
    }

    onPostUpdate(engine, delta) {
        // Check if the rock is outside the screen bounds
        if (this.pos.x < -50) {
            this.kill(); // Destroy the rock
        }
    }
}
