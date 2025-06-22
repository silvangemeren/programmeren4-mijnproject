import { Actor, Vector, CollisionType, Shape } from "excalibur";

export class Object extends Actor {
    constructor() {
        super({
            collisionType: CollisionType.Passive, // Passieve botsing voor obstakels
            pos: new Vector(1200, 0), // Spawnpositie
        });

        // Maak een standaard collider voor het object
        this.collider.set(Shape.Box(100, 100)); // Rechthoekige botsingsvorm
        this.vel = new Vector(-300, 0); // Horizontale snelheid (linksbeweging)
    }

    onInitialize(engine) {
        console.log(`Object spawned at position: x=${this.pos.x}, y=${this.pos.y}`);
    }

    update(engine, delta) {
        super.update(engine, delta);

        // Update positie van het object
        this.pos.x += this.vel.x * (delta / 1000);

        // Debug: Controleer objectpositie
        console.log(`Object updated: x=${this.pos.x}`);

        // Verwijder object als het buiten de viewport gaat
        if (this.pos.x < -100) {
            this.kill();
        }
    }
}