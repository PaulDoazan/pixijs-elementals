import { Container, Sprite, SpriteSource } from "pixi.js";
import { Manager } from "../Manager";

export class Layer extends Container {
    constructor(filePath: SpriteSource, scale: number = 1) {
        super();
        const bgSprite = Sprite.from(filePath);
        if (scale === 1) {
            scale = Manager.width / bgSprite.width
        }

        this.scale.set(scale);
        this.addChild(bgSprite);
    }

}