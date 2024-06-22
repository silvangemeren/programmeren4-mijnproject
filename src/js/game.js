import '../css/style.css'
import { Actor, Engine, Vector, Input, CollisionType, Scene } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { BlueRunner } from './bluerunner.js'
import { Background } from './background.js'
import { Rock } from './rock.js'
import { Zubat } from './zubat.js'
import { GameOverScene } from './gameover.js'
//import { GamePlay } from './gameplay.js'
import { BeginScene } from './beginscene.js'

export class Game extends Engine {

    constructor() {
        super({ width: 800, height: 600 })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")

        const background = new Background();
        this.add(background)

        this.bluerunner = new BlueRunner();
        this.bluerunner.collisionType = CollisionType.Active; // Set collision type to Active
        this.add(this.bluerunner)

        this.addObstacle();

        this.add('gameover', new GameOverScene());
    }

    addObstacle() {
        const rock = new Rock();
        rock.collisionType = CollisionType.Active; // Set collision type to Active
        this.add(rock);

        const zubat = new Zubat();
        zubat.collisionType = CollisionType.Active; // Set collision type to Active
        this.add(zubat);

        this.obstacleTimer = this.clock.schedule(() => this.addObstacle(), 2000);
    }

    update(engine, delta) {
        super.update(engine, delta);

        // Check collisions
        this.currentScene.actors.forEach(actor => {
            if (actor instanceof Rock || actor instanceof Zubat) {
                if (actor.collides(this.bluerunner)) {
                    this.gameOver();
                }
            }
        });
        
        // Player controls
        const input = this.input.keyboard;
        if (input.isHeld(Input.Keys.Space)) {
            this.bluerunner.jump();
        }
        if (input.isHeld(Input.Keys.ShiftLeft)) {
            this.bluerunner.duck();
        } else {
            this.bluerunner.stand();
        }
    }
    gameOver() {
        console.log("Game Over!");
        this.obstacleTimer.cancel();
        this.goToScene('gameover');
    }
}
new Game()