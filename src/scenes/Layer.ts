import { Container, Sprite, SpriteSource } from "pixi.js";
// import { Manager } from "../Manager";

export class Layer extends Container {
    constructor(filePath: SpriteSource, scale: number) {
        super();
        const bgSprite = Sprite.from(filePath);
        this.scale.set(scale);
        this.addChild(bgSprite);
    }

}