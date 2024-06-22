import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';
import '../css/style.css'

export class BlueRunner extends Actor {
    constructor() {
        super({
            pos: new Vector(300, 310),
            vel: new Vector(0, 0),
            collisionType: CollisionType.Active //
        });
        this.graphics.use(Resources.Bluerunner.toSprite());
        this.transform.scale = new Vector(0.2, 0.2);
    }

    jump() {
        if (this.vel.y === 0) {  // Check if the runner is on the ground
            this.vel.y = -600;
        }
    }

    duck() {
        this.transform.scale = new Vector(0.2, 0.1);  // Change scale to simulate ducking
    }

    stand() {
        this.transform.scale = new Vector(0.2, 0.2);  // Revert scale to normal
    }

}
