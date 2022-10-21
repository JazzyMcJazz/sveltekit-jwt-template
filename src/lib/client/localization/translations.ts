import type { Config } from 'sveltekit-i18n';
import i18n from 'sveltekit-i18n';

import env from '../public-environment/static';

const config: Config = ({
    fallbackLocale: 'en',
    fallbackValue: '[missing translation]',
    loaders: [
        {
            locale: 'en',
            key: 'common',
            loader: async () => (await fetch(`${env.API_URL}/loc/en/common`).then(res => res.json())),
        },
        {
            locale: 'en',
            key: 'home',
            routes: ['/'],
            loader: async () => (await fetch(`${env.API_URL}/loc/en/home`).then(res => res.json())),
        },
        {
            locale: 'en',
            key: 'about',
            routes: ['/about'],
            loader: async () => (await fetch(`${env.API_URL}/loc/en/about`).then(res => res.json())),
        },
        {
            locale: 'en',
            key: 'login',
            routes: ['/login'],
            loader: async () => (await fetch(`${env.API_URL}/loc/en/login`).then(res => res.json())),
        },
        {
            locale: 'en',
            key: 'register',
            routes: ['/register'],
            loader: async () => (await fetch(`${env.API_URL}/loc/en/register`).then(res => res.json())),
        },
        {
            locale: 'en',
            key: 'adminDashboard',
            routes: ['/admin/dashboard'],
            loader: async () => (await fetch(`${env.API_URL}/loc/en/adminDashboard`).then(res => res.json())),
        }
    ]
});

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
