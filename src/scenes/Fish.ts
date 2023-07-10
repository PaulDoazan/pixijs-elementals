import { Container, Sprite, SpriteSource } from "pixi.js";
import { Manager } from "../Manager";

export class Fish extends Container {
    private direction: number;
    private speed: number;
    private turnSpeed: number;
    private offset: number;

    constructor(filePath: SpriteSource, direction: number, speed: number, turnSpeed: number, thinner: boolean = false) {
        super();
        const fishSprite = Sprite.from(filePath);

        this.direction = direction;
        this.speed = speed;
        this.turnSpeed = turnSpeed;
        let random = Math.random() * 0.2
        this.scale._x = 0.4 + random;
        this.scale._y = thinner ? 0.15 : 0.4
        this.scale._y += random
        fishSprite.anchor.set(0.5);

        this.offset = fishSprite.width;
        this.addChild(fishSprite);
    }

    public getOffset(): number {
        return this.offset
    }

    public update(): void {
        this.direction += this.turnSpeed * 0.015;
        this.x += Math.sin(this.direction) * this.speed;
        this.y += Math.cos(this.direction) * this.speed;

        this.rotation = -this.direction + Math.PI / 2;

        // wrap the fish around as the crawl
        if (this.x < -this.offset) {
            this.x += (Manager.width + this.offset * 2);
        } else if (this.x > + Manager.width + this.offset) {
            this.x -= (Manager.width + this.offset * 2);
        }

        if (this.y < -this.offset) {
            this.y += (Manager.height + this.offset * 2);
        } else if (this.y > Manager.height + this.offset) {
            this.y -= (Manager.height + this.offset * 2);
        }
    }
}