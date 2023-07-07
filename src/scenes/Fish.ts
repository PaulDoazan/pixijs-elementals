import { Container, Sprite, SpriteSource } from "pixi.js";
import { Manager } from "../Manager";

export class Fish extends Container {
    private direction: number;
    private speed: number;
    private turnSpeed: number;
    private offset: number;

    constructor(filePath: SpriteSource, direction: number, speed: number, turnSpeed: number) {
        super();
        const fishSprite = Sprite.from(filePath);

        this.direction = direction;
        this.speed = speed;
        this.turnSpeed = turnSpeed;
        this.scale.set(0.4);
        fishSprite.anchor.set(0.5);

        this.offset = fishSprite.width;
        console.log(fishSprite.width, fishSprite.height)

        this.addChild(fishSprite);
    }

    public update(): void {
        this.direction += this.turnSpeed * 0.01;
        this.x += Math.sin(this.direction) * this.speed;
        this.y += Math.cos(this.direction) * this.speed;

        this.rotation = -this.direction + Math.PI / 2;

        // wrap the fish around as the crawl
        if (this.x < -this.offset) {
            this.x += (Manager.width + this.offset);
        } else if (this.x > + Manager.width + this.offset) {
            this.x -= (Manager.width + this.offset);
        }

        if (this.y < -this.offset) {
            this.y += (Manager.height + this.offset);
        } else if (this.y > Manager.height + this.offset) {
            this.y -= (Manager.height + this.offset);
        }
    }
}