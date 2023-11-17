import { Plugins } from './phaser.js';
import { toDataURL } from './qrcode.js';

export default class QRCodeGamePlugin extends Plugins.BasePlugin {

    makeImage(url) {
        return toDataURL(url);
    }

}
