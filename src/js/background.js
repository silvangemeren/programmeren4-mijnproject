import { Actor, Engine, Vector, Sprite } from "excalibur"
import { Resources } from './resources.js'
import '../css/style.css'

export class Background extends Actor {

    

    onInitialize(engine){
        this.sprite = new Sprite({
            image: Resources.Background,
            sourceView: { x: 0, y: 0, width: engine.drawWidth, height: engine.drawHeight }
        })
        this.anchor = Vector.Zero
        this.graphics.use(this.sprite)
    }

    onPostUpdate(engine, delta) {
        this.sprite.sourceView.x += .5 * delta;
    }
}