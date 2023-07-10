import type { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
    bundles: [
        {
            name: "lake bundle",
            assets:
            {
                "Adele Fish 0": "./adeleFish_0.png",
                "Adele Fish 1": "./adeleFish_1.png",
                "Adele Fish 2": "./adeleFish_2.png",
                "Adele Fish 3": "./adeleFish_3.png",
                "Bottom": "./dark-bottom.jpg",
                "Water": "./waves.png",
                "displacement_map_repeat": "./displacementMap.jpg",
            }
        },
        // {
        //     name: "another bundle",
        //     assets:
        //     {
        //         "whistle": "./whistle.mp3",
        //     }
        // },
    ]
}