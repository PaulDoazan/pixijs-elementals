import { Application, DisplayObject } from "pixi.js";

export class Manager {
    private constructor() { /*this class is purely static. No constructor to see here*/ }

    // Safely store variables for our game
    public static app: Application;
    public static currentScene: IScene;

    // With getters but not setters, these variables become read-only
    public static get width(): number {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    public static get height(): number {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }

    // Use this function ONCE to start the entire machinery
    public static initialize(background: number): void {

        Manager.app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resizeTo: window, // This line here handles the actual resize!
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
        });

        Manager.app.ticker.add(Manager.update)
        Manager.app.stage.interactive = true;

        // listen for the browser telling us that the screen size changed
        window.addEventListener("resize", Manager.resize);
    }

    public static resize(): void {
        // if we have a scene, we let it know that a resize happened!
        if (Manager.currentScene) {
            Manager.currentScene.resize(Manager.width, Manager.height);
        }
    }

    // Call this function when you want to go to a new scene
    public static changeScene(newScene: IScene): void {
        // Remove and destroy old scene... if we had one..
        if (Manager.currentScene) {
            Manager.app.stage.removeChild(Manager.currentScene);
            Manager.currentScene.destroy();
        }

        // Add the new one
        Manager.currentScene = newScene;
        Manager.app.stage.addChild(Manager.currentScene);
    }

    // This update will be called by a pixi ticker and tell the scene that a tick happened
    private static update(framesPassed: number): void {
        // Let the current scene know that we updated it...
        // Just for funzies, sanity check that it exists first.
        if (Manager.currentScene) {
            Manager.currentScene.update(framesPassed);
        }
    }
}

// This could have a lot more generic functions that you force all your scenes to have. Update is just an example.
// Also, this could be in its own file...
export interface IScene extends DisplayObject {
    update(framesPassed: number): void;
    resize(screenWidth: number, screenHeight: number): void;
}