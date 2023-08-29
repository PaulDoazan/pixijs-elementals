import { BitmapFont, BitmapText, Container, Graphics, Sprite, SpriteSource } from "pixi.js";
import { Manager } from "../Manager";
// import { Water } from "./Water";

export class Fish extends Container {
    private direction: number;
    private speed: number;
    private turnSpeed: number;
    private offset: { x: number, y: number };
    private value: number;
    public bitmapTexty: BitmapText

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
            fill: "#000000",
            fontFamily: "shortStack",
            fontSize: 128
        })

        this.bitmapTexty = new BitmapText(value.toString(),
            {
                fontName: "comic",
                fontSize: 128,
            });
        this.bitmapTexty.anchor.set(0.5);
        this.bitmapTexty.x = -fishSprite.width / 1.5
        this.bitmapTexty.y = -25

        const graphy: Graphics = new Graphics();

        // we give instructions in order. begin fill, line style, draw circle, end filling
        graphy.beginFill(0xffffff);
        graphy.lineStyle(5, 0x000000);
        graphy.moveTo(200 - fishSprite.width / 1.5, 0)
        graphy.lineTo(75 - fishSprite.width / 1.5, 0)
        graphy.drawRect(-75 - fishSprite.width / 1.5, -75, 150, 150);
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
        //this.bitmapTexty.rotation = this.direction - Math.PI / 2

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