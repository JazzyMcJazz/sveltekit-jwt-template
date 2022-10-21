import type { RequestHandler } from "@sveltejs/kit";
import {error} from "@sveltejs/kit";

/*
 * This endpoint simulates an external API where translation data can be fetched.
 * If this behavior is unwanted all the data can be moved to .json files and imported
 * in from lib/client/localization/translations.ts. (see sveltekit-i18n documentation)
 *
 * Alternatively this endpoint can be altered to interact with a database. That way you can
 * build an admin/translations page where you can edit the content.
 */

export const GET: RequestHandler = async ({ params }) => {

    const language: string | undefined = params.language;
    const key:      string | undefined = params.key;
    if (!language || !key) throw error(404, 'Not Found');

    const translation = translations[language][key];
    if (!translation) throw error(404, 'Not Found');

    return new Response(JSON.stringify(translation));
}


type Translation = {
    [key: string]: {
        [key: string]: {}
    }
}

// fake database
const translations: Translation = {
    en: {
        common: {
            navAbout: 'About',
            navLogin: 'Log in',
            navRegister: 'Register',
            navProfile: 'Profile',
            navAdmin: 'Admin',
            navLogout: 'Logout'
        },
        home: {
            title: 'Welcome',
        },
        about: {
            title: 'About',
            backButton: 'Back',
        },
        login: {
            title: 'Log in',
            username: 'Username',
            password: 'Password',
            submitButton: 'Log in',
        },
        register: {
            title: 'Register',
            username: 'Username',
            password: 'Password',
            repeatPassword: 'Repeat Password',
            submitButton: 'Log in',
        },
        adminDashboard: {
            title: 'Admin Dashboard'
        }
    }
}
