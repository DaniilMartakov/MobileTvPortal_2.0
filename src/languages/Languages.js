import {ruStrings} from "./LanguagesComponent/Russia.jsx";
import {enStrings} from "./LanguagesComponent/English.jsx";

function getLocale() {
    switch (navigator.language) {
        case 'ru':
        case 'ru-RU':
            return ruStrings;
        case 'en':
        case 'en-US':
            return enStrings;
        default:
            return ruStrings;
    }
}

function getString(string) {
    return getLocale()[string];
}

export {getString};

