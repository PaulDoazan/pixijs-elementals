import { Container } from "pixi.js";
import { IScene, Manager } from "../Manager";
import { Fish } from "./Fish";
import { Layer } from "./Layer";
import { Water } from "./Water";

export class GameScene extends Container implements IScene {
    private fishes: Array<Fish>;
    private layer1: Layer;
    private water: Water;

    constructor() {
        super();

        this.fishes = [];
        this.layer1 = new Layer('Bottom');

        this.addChild(this.layer1);

        for (let i = 0; i < 30; i++) {
            const fish = new Fish(`Adele Fish ${i % 4}`, Math.random() * Math.PI * 2, 2, 0.2, (i % 4) < 3);
            fish.x = Math.random() * (Manager.width + fish.getOffset());
            fish.y = Math.random() * (Manager.height + fish.getOffset());
            this.fishes.push(fish);
            this.addChild(fish);
        }

        this.water = new Water();
        this.addChild(this.water);
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

    }
}