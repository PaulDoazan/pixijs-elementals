import { Container, Sprite, SpriteSource } from "pixi.js";
import { Manager } from "../Manager";

export class Layer extends Container {
    public __width: number
    public __height: number
    public __scale: number
    constructor(filePath: SpriteSource, scale: number = 1) {
        super();
        const bgSprite = Sprite.from(filePath);
        if (scale === 1) {
            scale = Manager.width / bgSprite.width
        }

        this.__width = bgSprite.width
        this.__height = bgSprite.height
        this.__scale = scale

        this.scale.set(scale);
        this.addChild(bgSprite);
    }

}