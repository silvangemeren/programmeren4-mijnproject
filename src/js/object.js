import { Actor, Vector } from 'excalibur';

export class Object extends Actor {
    constructor() {
        super({ width: 100, height: 100 });

        // Initialize outside the screen on the right side
        this.pos.x = 1200; // Start outside the screen on the right
        this.pos.y = Math.random() * (600 - 100) + 100; // Randomize Y position within bounds

        // Initial speed
        this.initialSpeed = -Math.random() * 1000 - 50;
        this.vel = new Vector(this.initialSpeed, 0); // Adjust speed as needed

        // Increase speed over time
        this.speedIncrease = 20; // Speed increase amount
        this.maxSpeed = -1000; // Maximum speed

        this.on('exitviewport', () => this.resetPosition());
    }

    update(engine, delta) {
        super.update(engine, delta);

        // Increase speed gradually
        if (this.vel.x > this.maxSpeed) {
            this.vel.x -= this.speedIncrease * delta / 100;
        }
    }

    resetPosition() {
        this.pos.x = 1200; // Start outside the screen on the right
        this.pos.y = Math.random() * (600 - 100) + 100; // Randomize Y position within bounds
        this.vel.x = this.initialSpeed; // Reset velocity
    }
}
