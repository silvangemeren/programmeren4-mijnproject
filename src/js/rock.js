
import { Actor, Engine, Vector } from "excalibur"
import { Object } from './object'
import { Resources } from './resources'
import { Zubat } from "./zubat";

export class Rock extends Object {
    constructor(x, y) {
        super(); 
        this.pos = new Vector(x, y);
        this.time = 0; 
        this.canCollide = false;
        setTimeout(() => {
            this.canCollide = true;
        }, 150);
    }

    onInitialize(engine) {
        let sprite = Resources.Rock.toSprite();
        sprite.scale = new Vector(0.1, 0.1); 
        this.graphics.use(sprite);
        this.on('collisionstart', (event) => this.hitSomething(event));
    }

    hitSomething(event) {
        if (!this.canCollide) return;

        if (event.other instanceof Zubat) {
        

            if (event.other.pos.x > this.pos.x) {
                event.other.pos.x += 30;
            } else {
                event.other.pos.x -= 30;
            }
        }
    }

    update(engine, delta) {
        super.update(engine, delta);
        
        this.time += delta; 
        this.pos.x += Math.sin(this.time / 200) * 10; 
    }
}

