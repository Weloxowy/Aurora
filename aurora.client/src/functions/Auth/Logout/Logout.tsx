import {notifications} from "@mantine/notifications";
import {IconX} from "@tabler/icons-react";

export async function logout() {
    try {
        const response = await fetch("https://localhost:7287/api/UserEntity/logout", {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            }
        });

    }
    catch(error){
        notifications.show({
            id: 'logout-error',
            withCloseButton: true,
            autoClose: 5000,
            title: 'Błąd wylogowywania',
            message: 'Nie zostałeś pomyślnie wylogowany. Spróbuj ponownie za chwilę.',
            color: 'red',
            icon: <IconX />,
            loading: false,
        });
    }
    finally {
        window.location.href = "/auth";
    }
}