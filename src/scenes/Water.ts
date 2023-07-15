import { Container, DisplacementFilter, Sprite, WRAP_MODES } from "pixi.js";
import { ShockwaveFilter } from 'pixi-filters';
import { Layer } from "./Layer";
import { Manager } from "../Manager";
import { Fish } from "./Fish";
import { FishNumber } from "./FishNumber";

export class Water extends Container {
    private container: Container
    private waterArr: Layer[]
    private displacementSprite: Sprite
    private shockWaveFilters: ShockwaveFilter[]
    private displacementFilter: any

    constructor() {
        super();
        this.container = new Container();
        this.waterArr = []

        let water1 = new Layer('Water', 1.8);
        let water2 = new Layer('Water', 1.8);
        let water3 = new Layer('Water', 1.8);
        let water4 = new Layer('Water', 1.8);
        let water5 = new Layer('Water', 1.8);
        let water6 = new Layer('Water', 1.8);
        water3.y = water4.y = water1.height
        water5.y = water6.y = water1.height * 2
        water2.x = water4.x = water6.x = water1.width

        this.container.alpha = 0.25

        this.displacementSprite = Sprite.from('displacement_map_repeat');
        // Make sure the sprite is wrapping.
        this.displacementSprite.texture.baseTexture.wrapMode = WRAP_MODES.REPEAT;
        this.displacementFilter = new DisplacementFilter(this.displacementSprite);
        this.displacementFilter.scale.x = 50;
        this.displacementFilter.scale.y = 50;

        this.shockWaveFilters = []
        this.setUpShockWave()

        Manager.app.stage.filters = [this.displacementFilter];

        this.container.addChild(water1, water2, water3, water4, water5, water6)
        Manager.app.stage.addChild(this.displacementSprite)

        this.container.rotation = -0.5
        this.container.x -= water1.width / 2
        this.waterArr.push(water1, water2, water3, water4, water5, water6)
        this.addChild(this.container);
        this.container.interactive = true
    }

    private setUpShockWave() {
        Manager.app.stage.addEventListener('pointerdown', (e) => {
            if (this.shockWaveFilters.length > 10) return
            const shockWaveFilter = new ShockwaveFilter();
            this.shockWaveFilters.push(shockWaveFilter)
            Manager.app.stage.filters = [this.displacementFilter, ...this.shockWaveFilters]
            shockWaveFilter.amplitude = 30;
            shockWaveFilter.radius = -1;
            shockWaveFilter.brightness = 1;
            shockWaveFilter.wavelength = 160;

            shockWaveFilter.center = [e.data.globalX, e.data.globalY]
            shockWaveFilter.time = 0

            this.parent.children.forEach(el => {
                if (el instanceof Fish)
                    if (this.distanceBetweenTwoPoints(e.data.globalX, e.data.globalY, el.x, el.y) < 100) {
                        let nb = new FishNumber(el)
                        // let nb = new BitmapText(el.getValue().toString())
                        Manager.app.stage.addChild(nb)
                    }
            })

        })
    }

    private distanceBetweenTwoPoints(x1: number, y1: number, x2: number, y2: number) {
        return Math.hypot(x2 - x1, y2 - y1);
    }


    public update(): void {
        const speed = 0.8;
        this.waterArr.forEach(water => {
            water.y -= speed

            if (water.y < -water.height) {
                water.y = water.height * 2
            }
        })
        this.displacementSprite.x += 1;
        this.displacementSprite.y += 1;
        // Reset x & y to 0 when x > width to keep values from going to very huge numbers.
        if (this.displacementSprite.x > this.displacementSprite.width) {
            this.displacementSprite.x = 0;
            this.displacementSprite.y = 0;
        }

        // shockwave animation
        this.shockWaveFilters.forEach(shockWave => {
            shockWave.time += 0.015
            if (shockWave.time > 4) {
                shockWave.destroy()
                this.shockWaveFilters.shift();
                Manager.app.stage.filters = [this.displacementFilter, ...this.shockWaveFilters]
            }
        })
    }
}