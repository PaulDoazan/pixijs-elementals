import { Container } from "pixi.js";
import { IScene, Manager } from "../Manager";
import { Fish } from "./Fish";
import { Layer } from "./Layer";
import { Water } from "./Water";

export class GameScene extends Container implements IScene {
    private fishes: Array<Fish>;
    private layer1: Layer;
    private water: Water;
    public mainContainer: Container

    constructor() {
        super();

        this.fishes = [];
        this.layer1 = new Layer('Bottom');
        this.mainContainer = new Container()
        this.mainContainer.addChild(this.layer1);
        this.addChild(this.mainContainer);

        for (let i = 0; i < 10; i++) {
            const fish = new Fish(`Adele Fish ${i % 4}`, Math.random() * Math.PI * 2, 2, 0.2, (i % 4) < 3, i);
            fish.x = Math.random() * (Manager.width);
            fish.y = Math.random() * (Manager.height);
            this.fishes.push(fish);
            this.addChild(fish);
        }

        this.water = new Water();
        this.addChild(this.water);

        this.resize()
    }

    public update(): void {
        // Lets move fishes !
        for (let i = 0; i < this.fishes.length; i++) {
            const fish = this.fishes[i];
            fish.update();
        }
        this.water.update()
    }

    public resize(): void {
        let scale;

        if (Manager.width / Manager.height > this.layer1.__width / this.layer1.__height) {
            scale = Manager.width / this.layer1.__width
        } else {
            scale = Manager.height / this.layer1.__height
        }
        this.layer1.scale.set(scale)
    }
}