import { Actor, Vector } from 'excalibur';
import { getRandomY } from './utils.js'; // Importeer de functie voor het verkrijgen van willekeurige y-posities

export class Object extends Actor {
    constructor() {
        super({ width: 100, height: 100 });

        // Initialize outside the screen on the right side
        this.pos.x = 1000; // Start buiten het scherm aan de rechterkant
        this.pos.y = getRandomY(); // Gebruik de functie om een willekeurige Y-positie te verkrijgen

        // Initial speed
        this.initialSpeed = -Math.random() * 500 - 50;
        this.vel = new Vector(this.initialSpeed, 0); // Aanpassen van snelheid indien nodig

        // Increase speed over time
        this.speedIncrease = 400; // Snelheidsverhoging
        this.maxSpeed = 1000; // Maximale snelheid

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
        this.pos.x = 1000; // Start buiten het scherm aan de rechterkant
        this.pos.y = getRandomY(); // Gebruik de functie om een willekeurige Y-positie te verkrijgen
        // this.vel.x = this.initialSpeed; // Reset velocity
    }
}
