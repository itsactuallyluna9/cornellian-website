// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from "@tailwindcss/vite";

import sitemap from '@astrojs/sitemap';

import { remarkReadingTime } from './remark-reading-time.mjs';
import { remarkImageCaptions } from './remark-image-captions.mjs';

// https://astro.build/config
export default defineConfig({
    site: 'http://itsactuallyluna9.asuscomm.com:4321',
    markdown: {
        shikiConfig: {
            themes: {
                dark: "catppuccin-mocha",
                light: "catppuccin-latte",
            }
        },
        remarkPlugins: [remarkReadingTime, remarkImageCaptions]
    },
    vite: {
    	plugins: [tailwindcss()]
    },
    integrations: [mdx(), sitemap()],
});
