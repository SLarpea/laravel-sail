import './bootstrap';
import '../css/app.css';

import { createApp, h, reactive } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

const appName = import.meta.env.VITE_APP_NAME || 'ProjectCMS';

const global = reactive({
    isLoading: false,
    isSearchLoading: false,
    showAddForm: false,
    showDeleteForm: false
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .provide('globalVar', global) // Global var for all vue components
            .mount(el);
    },
    progress: {
        delay: 250,
        color: '#1b9e4b',
        includeCSS: true,
        showSpinner: true,
    },
});
