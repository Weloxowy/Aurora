import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const settingsCookies = () => {
    // Funkcja do odczytu danych z ciasteczka
    const getSettingsCookie = () => {
        const settingsCookie = Cookies.get('settingsCookie');
        return settingsCookie ? JSON.parse(settingsCookie) : null;
    };

    // Stan dla przechowywania danych z ciasteczka
    const [cookieData, setCookieData] = useState(getSettingsCookie());

    // Efekt pobierający dane z ciasteczka przy pierwszym renderowaniu
    useEffect(() => {
        const initialData = getSettingsCookie();
        if (initialData) {
            setCookieData(initialData);
        }
    }, []);

    // Funkcja aktualizująca dane z ciasteczka
    const updateCookieData = (newData) => {
        setCookieData(newData);
        // Zapis nowych danych do ciasteczka
        Cookies.set('settingsCookie', JSON.stringify(newData));
    };

    return { cookieData, updateCookieData };
};

export default settingsCookies;
