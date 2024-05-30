import {notifications} from "@mantine/notifications";
import {IconX} from "@tabler/icons-react";

export default async function handleLogin(props) {

    const url = "https://localhost:7287/login?useCookies=true&useSessionCookies=true";
    const data = {
        email: props.values.email,
        password: props.values.password
    }

    try {
        const response = await fetch(url, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'cookieName=cookieValue'
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            if(response.status === 401){

            }
            const errorMessage = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        } else {
            await gotoMain();
        }

    } catch (error) {
        notifications.show({
            id: 'register-error',
            withCloseButton: true,
            autoClose: 5000,
            title: 'Błąd logowania',
            message: 'Pojawił się nieokreślony błąd. Spróbuj ponownie.'+error.message,
            color: 'red',
            icon: <IconX />,
            loading: false,
        });
    }

}

async function gotoMain(){
    window.location.href = "/";
}