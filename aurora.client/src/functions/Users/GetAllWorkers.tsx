import {notifications} from "@mantine/notifications";
import {IconX} from "@tabler/icons-react";

export const GetAllWorkers = async () => {
    const url = "https://localhost:7287/api/UserEntity/";
    try {
        const response = await fetch(url, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'cookieName=cookieValue'
            },
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Status: ${response.status}, Komunikat: ${errorMessage}`);
        }

        return await response.json();
    } catch (error) {
        notifications.show({
            id: 'register-error',
            withCloseButton: true,
            autoClose: 5000,
            title: 'Błąd logowania',
            message: 'Wystąpił błąd:' + error.message,
            color: 'red',
            icon: <IconX/>,
            loading: false,
        });
    }

}
