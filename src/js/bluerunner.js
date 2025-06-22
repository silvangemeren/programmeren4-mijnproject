import { Actor, Vector, Keys, CollisionType, Shape } from "excalibur";
import { Resources } from "./resources";
import { Rock } from "./rock.js";
import { Zubat } from "./zubat.js";

export class Bluerunner extends Actor {
    constructor() {
        super({
            collisionType: CollisionType.Active, // Actieve botsing voor de speler
            pos: new Vector(400, 900), // Startpositie net boven de grond
        });

        this.isJumping = false;
        this.jumpVelocity = -600; // Snelheid van de sprong omhoog
        this.gravity = 1500; // Zwaartekrachtconstante
        this.groundY = 900; // Hoogte van de grond
        this.spriteScaleNormal = new Vector(0.3, 0.3);
        this.spriteScaleCrouch = new Vector(0.3, 0.15);

        // Definieer collider-vorm (bijv. een rechthoek van 50x50 pixels voor botsing)
        this.collider.set(Shape.Box(50, 50));
    }

    currentSprite;

    onInitialize(engine) {
        // Stel standaard sprite in
        this.currentSprite = Resources.Bluerunner.toSprite();
        this.currentSprite.scale = this.spriteScaleNormal;
        this.graphics.use(this.currentSprite);

        console.log("Bluerunner initialized.");

        // Botsingen detecteren
        this.on("collisionstart", (event) => this.hitSomething(event));
    }

    hitSomething(event) {
        if (event.other instanceof Rock || event.other instanceof Zubat) {
            console.log("Player hit! Game over.");

            // Verplaats naar GameOverScene
            this.scene.engine.goToScene('gameOver');
        }
    }

    onPreUpdate(engine, delta) {
        console.log("Checking input...");

        // Springen met toets W
        if (engine.input.keyboard.wasPressed(Keys.W) && !this.isJumping) {
            console.log("W key pressed. Attempting to jump.");
            this.isJumping = true;
            this.vel.y = this.jumpVelocity; // Sprong starten
            this.startJumpAnimation();
        }

        // Bukken met toets S
        if (engine.input.keyboard.isHeld(Keys.S)) {
            console.log("S key held. Crouching.");
            this.setCrouchState();
        } else if (!this.isJumping) {
            // Alleen terug naar normaal als je niet springt
            this.setNormalState();
        }

        // Zwaartekracht toepassen indien in de lucht
        if (this.isJumping) {
            this.vel.y += (this.gravity * delta) / 1000; // Zwaartekracht toevoegen
            this.pos.y += this.vel.y * (delta / 1000); // Pas Y-positie aan
            console.log(`Jumping: pos.y=${this.pos.y}, vel.y=${this.vel.y}`);
        }

        // Controleer of de speler op de grond staat
        if (this.isJumping && this.pos.y >= this.groundY) {
            this.isJumping = false;
            this.vel.y = 0; // Snelheid resetten
            this.pos.y = this.groundY; // Corrigeer grondpositie
            console.log("Player landed.");
            this.endJumpAnimation();
        }
    }

    setCrouchState() {
        // Bukken: verander schaal en pas positie aan
        this.graphics.current.scale = this.spriteScaleCrouch;
        this.pos.y = this.groundY + 25; // Zakt naar beneden bij bukken
    }

    setNormalState() {
        // Terug naar de normale staat
        this.graphics.current.scale = this.spriteScaleNormal;
        this.pos.y = this.groundY; // Keert terug naar normale grondpositie
    }

    startJumpAnimation() {
        console.log("Switching to jump sprite.");
        const jumpingSprite = Resources.Bluerunnertwee.toSprite();
        jumpingSprite.scale = this.spriteScaleNormal;
        this.graphics.use(jumpingSprite);
    }

    endJumpAnimation() {
        console.log("Switching to running sprite.");
        const runningSprite = Resources.Bluerunner.toSprite();
        runningSprite.scale = this.spriteScaleNormal;
        this.graphics.use(runningSprite);
    }
}