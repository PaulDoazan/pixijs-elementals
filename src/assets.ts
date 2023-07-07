import type { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
    bundles: [
        {
            name: "lake bundle",
            assets:
            {
                "Adele Fish 0": "./adeleFish_0.png",
                "Adele Fish 1": "./adeleFish_1.png",
                "Sand": "./sandBeach.jpg",
                "Water": "./waterTexture.png",
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