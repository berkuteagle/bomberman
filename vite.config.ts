import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    base: '/bomberman/',
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            manifest: {
                name: 'Ninja Bomberman',
                short_name: 'Bomberman',
                start_url: 'https://berkuteagle.github.io/bomberman/',
                scope: 'https://berkuteagle.github.io/bomberman/',
                lang: 'en_US',
                display: 'standalone',
                orientation: 'any',
                background_color: '#373737',
                theme_color: '#218021',
                icons: [
                    {
                        src: 'icons/icon512_maskable.png',
                        type: 'image/png',
                        sizes: '512x512',
                        purpose: 'maskable'
                    }, {
                        purpose: 'any',
                        sizes: '512x512',
                        src: 'icons/icon512_rounded.png',
                        type: 'image/png'
                    }
                ]
            }
        })
    ]
});
