import { Actor, vec } from 'excalibur';
import { Resources } from './resources';

export class Background extends Actor {
    constructor(scrollSpeed = 100) {
        super({ z: -1 }); // Plaats de achtergrond achter andere objecten
        this.scrollSpeed = scrollSpeed; // Pixels/seconde
        this.spriteWidth = 0; // Breedte van geschaalde achtergrond
        this.firstActor = null; // Eerste achtergrond
        this.secondActor = null; // Tweede achtergrond
    }

    onInitialize(engine) {
        const sprite = Resources.Background.toSprite();

        // Schalen zodat de sprite exact past in het canvas
        const scaleX = engine.drawWidth / sprite.width;
        const scaleY = engine.drawHeight / sprite.height;
        sprite.scale = vec(scaleX, scaleY);

        this.spriteWidth = engine.drawWidth; // Gebruik de breedte van het canvas direct

        // **Eerste achtergrond**
        this.firstActor = new Actor({
            pos: vec(0, 0), // Begin exact linksboven
            anchor: vec(0, 0) // Gebruik de linkerbovenhoek als anker
        });
        this.firstActor.graphics.use(sprite);
        this.addChild(this.firstActor);

        // **Tweede achtergrond (rechts van de eerste, aansluitend)**
        this.secondActor = new Actor({
            pos: vec(this.spriteWidth, 0), // Rechts van de eerste
            anchor: vec(0, 0)
        });
        this.secondActor.graphics.use(sprite);
        this.addChild(this.secondActor);
    }

    onPostUpdate(engine, delta) {
        // Scrollverplaatsing berekenen
        const shiftAmount = (this.scrollSpeed * delta) / 1000;

        // Beide sprites naar links verschuiven
        this.firstActor.pos.x -= shiftAmount;
        this.secondActor.pos.x -= shiftAmount;

        // **Reconnect wanneer een sprite buiten beeld schuift**
        if (this.firstActor.pos.x <= -this.spriteWidth) {
            this.firstActor.pos.x = this.secondActor.pos.x + this.spriteWidth;
        }

        if (this.secondActor.pos.x <= -this.spriteWidth) {
            this.secondActor.pos.x = this.firstActor.pos.x + this.spriteWidth;
        }
    }
}