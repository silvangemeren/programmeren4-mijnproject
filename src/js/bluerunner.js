import { Actor, Vector, Keys, CollisionType } from "excalibur";
import { Resources } from './resources';

export class Bluerunner extends Actor {
    constructor(width = 10, height = 10) {
        super({
            width: width,
            height: height,
            collisionType: CollisionType.Active
        });
    }

    onInitialize(engine) {
        const sprite = Resources.Bluerunner.toSprite();
        sprite.scale = new Vector(0.3, 0.3);
        this.graphics.use(sprite);

        this.on('collisionstart', (event) => this.hitSomething(event));
    }

    hitSomething(event) {
        if (event.other instanceof Rock || event.other instanceof Zubat) {
            console.log('dood');
        }
    }

    onPostUpdate(engine) {
        let yspeed = 0;
        const maxSpeed = 500;

        if (engine.input.keyboard.isHeld(Keys.W)) {
            yspeed = -maxSpeed;
        } else if (engine.input.keyboard.isHeld(Keys.S)) {
            yspeed = maxSpeed;
        }

        this.vel.y = yspeed;
        this.pos.x = Math.max(0, Math.min(this.pos.x, engine.drawWidth - this.width));
        this.pos.y = Math.max(0, Math.min(this.pos.y, engine.drawHeight - this.height));
    }
}
