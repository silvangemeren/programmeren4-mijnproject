import { Actor, CollisionType, SpriteSheet, Animation, Input } from "excalibur";
import { Resources } from './resources'; // Zorg ervoor dat Resources correct wordt geïmporteerd

export class Bluerunner extends Actor {
    constructor(width = 10, height = 10) {
        super({
            width: width,
            height: height,
            collisionType: CollisionType.Active,
            z: 10000 // Stel een hoge z-waarde in om de Bluerunner helemaal vooraan te plaatsen
        });

        this.spriteSheet = null; // Placeholder voor de SpriteSheet
    }

    onInitialize(engine) {
        // Wacht totdat Resources zijn geladen voordat je de spritesheet instelt
        engine.on('postinitialize', () => {
            // Controleer of Resources.Bluerunnerspritesheet beschikbaar is
            if (!engine.hasResource('Bluerunnerspritesheet')) {
                console.error('Bluerunnerspritesheet resource not found');
                return;
            }

            // Definieer de SpriteSheet voor Bluerunner met 2 sprites
            this.spriteSheet = new SpriteSheet({
                image: Resources.Bluerunnerspritesheet, // Gebruik de geladen spritesheet direct
                spWidth: 64, // Breedte van elke sprite in pixels
                spHeight: 64, // Hoogte van elke sprite in pixels
                rows: 1, // Aantal rijen in de spritesheet (in jouw geval 1)
                columns: 2 // Aantal kolommen in de spritesheet (in jouw geval 2)
            });

            // Definieer de animatie voor Bluerunner
            const animation = new Animation({
                frames: [
                    this.spriteSheet.getSprite(0), // Eerste sprite
                    this.spriteSheet.getSprite(1)  // Tweede sprite
                ],
                //speed: 200 // Snelheid van de animatie in milliseconden per frame
            });

            // Voeg de animatie toe als tekening aan Bluerunner
            this.addDrawing('default', animation);
            this.setDrawing('default'); // Stel de animatie in als de standaard tekening
        });
    }

    hitSomething(event) {
        if (event.other instanceof Rock || event.other instanceof Zubat) {
            console.log('Game over');
            this.scene.engine.goToScene('gameOver', { sceneActivationData: this.scene.score });
        }
    }

    onPostUpdate(engine) {
        let yspeed = 0;
        const maxSpeed = 500;

        if (engine.input.keyboard.isHeld(Input.Keys.W)) {
            yspeed = -maxSpeed;
        } else if (engine.input.keyboard.isHeld(Input.Keys.S)) {
            yspeed = maxSpeed;
        }

        this.vel.y = yspeed;
        this.pos.x = Math.max(0, Math.min(this.pos.x, engine.drawWidth - this.width));
        this.pos.y = Math.max(0, Math.min(this.pos.y, engine.drawHeight - this.height));
    }
}
