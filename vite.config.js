import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import vueJsx from "@vitejs/plugin-vue-jsx";
import vuetify from "vite-plugin-vuetify";
import Components from "unplugin-vue-components/dist/vite.js";
import AutoImport from "unplugin-auto-import/vite";
import svgLoader from "vite-svg-loader";
import {fileURLToPath} from "node:url";

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/materio/src/main.ts',
            ssr: 'resources/js/ssr.ts',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        vueJsx(),

        // Docs: https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin
        vuetify({
            styles: {
                configFile: 'resources/js/materio/src/assets/styles/variables/_vuetify.scss',
            },
        }),
        Components({
            dirs: ['resources/js/materio/src/@core/components', 'resources/js/materio/src/components'],
            dts: true,
            resolvers: [
                componentName => {
                    // Auto import `VueApexCharts`
                    if (componentName === 'VueApexCharts')
                        return { name: 'default', from: 'vue3-apexcharts', as: 'VueApexCharts' }
                },
            ],
        }),

        // Docs: https://github.com/antfu/unplugin-auto-import#unplugin-auto-import
        AutoImport({
            imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/math', 'pinia'],
            vueTemplate: true,

            // ℹ️ Disabled to avoid confusion & accidental usage
            ignore: ['useCookies', 'useStorage'],
        }),
        svgLoader(),
    ],
    define: { 'process.env': {} },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./resources/js/materio/src', import.meta.url)),
            '@core': fileURLToPath(new URL('./resources/js/materio/src/@core', import.meta.url)),
            '@layouts': fileURLToPath(new URL('./resources/js/materio/src/@layouts', import.meta.url)),
            '@images': fileURLToPath(new URL('./resources/js/materio/src/assets/images/', import.meta.url)),
            '@styles': fileURLToPath(new URL('./resources/js/materio/src/assets/styles/', import.meta.url)),
            '@configured-variables': fileURLToPath(new URL('./resources/js/materio/src/assets/styles/variables/_template.scss', import.meta.url)),
        },
    },
    build: {
        chunkSizeWarningLimit: 5000,
    },
    optimizeDeps: {
        exclude: ['vuetify'],
        entries: [
            './resources/js/materio/src/**/*.vue',
        ],
    },
});
