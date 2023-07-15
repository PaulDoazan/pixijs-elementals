import { BitmapFont, BitmapText, Container, Ticker } from "pixi.js";
import { Fish } from "./Fish";

export class FishNumber extends Container {
    private bmpContainer: Container
    constructor(fish: Fish) {
        super()
        BitmapFont.from("comic", {
            fill: "#ffffff", // White, will be colored later
            fontFamily: "Comic Sans MS",
            fontSize: 32
        })

        // Remember, this font only has letters and numbers. No commas or any other symbol.
        const bitmapTexty: BitmapText = new BitmapText(fish.getValue().toString(),
            {
                fontName: "comic",
                fontSize: 32, // Making it too big or too small will look bad
            });


        this.bmpContainer = new Container();
        this.bmpContainer.scale.set(2)
        this.bmpContainer.position.set(fish.x, fish.y)
        bitmapTexty.anchor.set(0.5)
        this.addChild(this.bmpContainer);
        this.bmpContainer.addChild(bitmapTexty);

        Ticker.shared.add(this.update, this);
    }

    private update(): void {
        this.bmpContainer.scale.x += 0.03
        this.bmpContainer.scale.y += 0.03

        this.bmpContainer.alpha -= 0.005

        if (this.bmpContainer.scale.x > 7) {
            this.removeChild(this.bmpContainer)
            this.destroy()
        }
    }
}