import { BitmapFont, BitmapText, Container, Graphics, Sprite, SpriteSource } from "pixi.js";
import { Manager } from "../Manager";
// import { Water } from "./Water";

export class Fish extends Container {
    private direction: number;
    private speed: number;
    private turnSpeed: number;
    private offset: { x: number, y: number };
    private value: number;
    private bitmapTexty: BitmapText

    constructor(filePath: SpriteSource, direction: number, speed: number, turnSpeed: number, thinner: boolean = false, value: number = 0) {
        super();
        const fishSprite = Sprite.from(filePath);

        this.direction = direction;
        this.speed = speed;
        this.turnSpeed = turnSpeed;
        let random = Math.random() * 0.15
        this.scale._x = 0.4 + random;
        this.scale._y = thinner ? 0.2 : 0.4
        this.scale._y += random
        this.value = value;
        fishSprite.anchor.set(0.5);

        this.offset = { x: fishSprite.width * this.scale._x, y: fishSprite.height * this.scale._y };

        BitmapFont.from("comic", {
            fill: "#000000", // White, will be colored later
            fontFamily: "Comic Sans MS",
            fontSize: 128
        })

        this.bitmapTexty = new BitmapText(value.toString(),
            {
                fontName: "comic",
                fontSize: 128,
            });
        this.bitmapTexty.x = -this.offset.x

        const graphy: Graphics = new Graphics();

        // we give instructions in order. begin fill, line style, draw circle, end filling
        graphy.beginFill(0xffffff);
        graphy.lineStyle(10, 0x000000);
        graphy.drawRect(0, 0, 30, 30); // See how I set the drawing at 0,0? NOT AT 100, 100!
        graphy.endFill();

        this.addChild(fishSprite, graphy, this.bitmapTexty);

        this.interactive = true
    }

    public getOffset(): {} {
        return this.offset
    }

    public getValue(): number {
        return this.value
    }

    public update(): void {
        this.direction += this.turnSpeed * 0.015;
        this.x += Math.sin(this.direction) * this.speed;
        this.y += Math.cos(this.direction) * this.speed;

        this.rotation = -this.direction + Math.PI / 2;
        this.bitmapTexty.rotation = this.direction - Math.PI / 2

        // wrap the fish around as the crawl
        let gapX = this.offset.x
        let gapY = this.offset.y
        if (this.x < - gapX) {
            this.x = Manager.width + gapX;
        } else if (this.x > (Manager.width + gapX)) {
            this.x = -gapX;
        }

        if (this.y < - gapY) {
            this.y = Manager.height + gapY;
        } else if (this.y > (Manager.height + gapY)) {
            this.y = -gapY;
        }
    }
}