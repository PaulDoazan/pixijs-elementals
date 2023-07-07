import { Container } from "pixi.js";
import { IScene, Manager } from "../Manager";
import { Fish } from "./Fish";
import { Layer } from "./Layer";

export class GameScene extends Container implements IScene {
    private fishes: Array<Fish>;
    private layer1: Layer;
    private layer2: Layer;

    constructor() {
        super();

        this.fishes = [];
        this.layer1 = new Layer('Sand', 0.3);
        this.layer2 = new Layer('Water', 0.3);
        this.layer2.alpha = 0.4
        this.addChild(this.layer1);

        for (let i = 0; i < 30; i++) {
            const fish = new Fish(`Adele Fish ${i % 2}`, Math.random() * Math.PI * 2, 1, 0.2);
            fish.x = Math.random() * Manager.width;
            fish.y = Math.random() * Manager.height;
            this.fishes.push(fish);
            this.addChild(fish);
        }

        this.addChild(this.layer2);
    }

    public update(): void {
        // Lets move fishes !
        for (let i = 0; i < this.fishes.length; i++) {
            const fish = this.fishes[i];
            fish.update();
        }
    }

    public resize(): void {

    }
}