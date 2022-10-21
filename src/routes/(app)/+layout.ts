import type { LayoutLoad } from "./$types";

import { locale, loadTranslations } from '../../lib/client/localization/translations';
export const load: LayoutLoad = async ({ url }) => {
    const { pathname } = url;
    const defaultLocale = 'en';
    const initLocale = locale.get() || defaultLocale;

    await loadTranslations(initLocale, pathname);

    return {};
}
