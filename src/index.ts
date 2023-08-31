import { Manager } from './Manager';
import { LoaderScene } from './scenes/LoaderScene';
import "../assets/style.css"
const FontFaceObserver = require('fontfaceobserver');

const font = new FontFaceObserver('shortStack');

font.load().then(function () {
    console.log('shortStack has loaded.');

    Manager.initialize(0x6495ed);

    // We no longer need to tell the scene the size because we can ask Manager!
    const loady: LoaderScene = new LoaderScene();
    Manager.changeScene(loady);
});

