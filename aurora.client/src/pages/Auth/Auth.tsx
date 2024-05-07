import React, { useState, useEffect } from "react";
import { useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack, BackgroundImage, Space, useMantineTheme,
} from '@mantine/core';
import './Auth.css';
import '@mantine/core/styles.css';
import './Auth.css';
import {IconArrowBackUp} from "@tabler/icons-react";
/*import { checkUserLoggedIn } from "../../features/getCookies/getCookies";
*/

export default function Auth(props) {
    const [formType, toggleType] = useToggle(['login', 'register']);
    const [formUsage, toggleUsage] = useToggle(['default', 'recover']);
    const form = useForm({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            terms: true,
        },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 4 ? 'Password should include at least 4 characters' : null),
        },
    });

    const recover = useForm({
        initialValues: {
            email: '',
        },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        },
    });


    const [error, setError] = useState(""); // Stan przechowuj�cy komunikat o b��dzie

    async function handleRegister() {
        /*
        const checkEmailUrl = "https://localhost:7071/api/AspNetUsers/checkEmail/" + form.values.email;
        const registerUrl = "https://localhost:7071/api/AspNetUsers/registerCustom";

        try {
            // Sprawd�, czy email ju� istnieje w bazie danych
            const emailResponse = await fetch(checkEmailUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!emailResponse.ok) {
                const errorMessage = await emailResponse.text();
                throw new Error(`HTTP error! Status: ${emailResponse.status}, Message: ${errorMessage}`);
            }

            const emailExists = await emailResponse.json();

            if (emailExists) {
                setError("Podany adres email ju� istnieje w bazie danych.");
                return;
            }

            // Je�li email nie istnieje, zarejestruj u�ytkownika
            const registerData = {
                FirstName: form.values.firstName,
                LastName: form.values.lastName,
                Email: form.values.email,
                PasswordHash: form.values.password,
            };

            const registerResponse = await fetch(registerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });

            if (!registerResponse.ok) {
                const errorMessage = await registerResponse.text();
                throw new Error(`HTTP error! Status: ${registerResponse.status}, Message: ${errorMessage}`);
            }

            // Je�li rejestracja zako�czy�a si� powodzeniem, przeprowad� logowanie
            await handleLogin();
            window.location.href = "/";

        } catch (error) {
            console.error('Error during registration:', error);
        }
         */
    }

    async function handleLogin() {
        /*
        const url = "https://localhost:7071/login?useCookies=true&useSessionCookies=true";
        const data = {

            email: form.values.email,
            password: form.values.password
        }

        try {
            const response = await fetch(url, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type':
                        'application/json',
                    'Cookie': 'cookieName=cookieValue'
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {

                const errorMessage = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
            } else {
                window.location.href = "/";
            }

        } catch (error) {
            console.error('Error creating entity:', error);
        }
        */
    }
    /*
    const [users, setUsers] = useState([]);

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,OPTIONS'
    }
    async function getCookies() {
        const response = await fetch("https://localhost:7142/api/AspNetUsers/info", {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            }

        });

        if (response.ok) {

            return true;
        } else {

            return false;
        }


    }
    useEffect(() => {
        const checkCookies = async () => {
            const isLoggedIn = await checkUserLoggedIn();
            if (isLoggedIn) {
                window.location.href = "/main";
            } else {

            }
        };

    }, []);
    */
    async function gotoMain(){
        window.location.href = "/panel";
    }

    return (
        formUsage === 'default' ?
            <Paper radius="md" p="xl" withBorder {...props} w={400} className="auth">
                <Text size="xl" fw={700} pb={"xl"}>
                    {formType === 'register'
                        ? 'Miło cię widzieć!'
                        : "Witaj ponownie!"}
                </Text>
                <form onSubmit={form.onSubmit(() => {
                })}>
                    <Stack>
                        {formType === 'register' && (
                            <TextInput
                                label="Imie"
                                placeholder="Podaj imię"
                                value={form.values.firstName}
                                onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                                radius="md"
                            />
                        )}
                        {formType === 'register' && (
                            <TextInput
                                label="Nazwisko"
                                placeholder="Podaj nazwisko"
                                value={form.values.lastName}
                                onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                                radius="md"
                            />
                        )}
                        <TextInput
                            required
                            label="Adres email"
                            placeholder="Wpisz swój adres email"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Podany adres jest nieprawid�owy'}
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="Hasło"
                            placeholder="Wpisz swoje hasło"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Hasło powinno zawierać minimum 8 znaków'}
                            radius="md"
                        />

                        {formType === 'register' && (
                            <Checkbox
                                label="Akceptuje regulamin serwisu."
                                checked={form.values.terms}
                                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                            />
                        )}

                        {error && <Text style={{
                            color: 'red',
                            fontSize: '0.75rem'
                        }}>{error}</Text>} {/* Wyswietlenie komunikatu o bledzie */}
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor component="button" type="button" c="dimmed" onClick={toggleType} size="xs">
                            {formType === 'register'
                                ? 'Posiadasz konto? Zaloguj się'
                                : "Nie posiadasz konta? Zarejestruj się"}
                        </Anchor>
                        <Button type="submit" radius="xl"
                                onClick={/*type === 'register' ? handleRegister : handleLogin*/ gotoMain}>
                            {formType === 'register' ? "Rejestracja" : "Logowanie"}
                        </Button>
                    </Group>
                </form>
                <Anchor component="button" type="button" c="dimmed" onClick={toggleUsage} size="xs">
                    Nie pamiętasz hasła?
                </Anchor>
            </Paper>
            :
            <Paper radius="md" p="xl" withBorder {...props} w={400}>
                <Group>
                    <IconArrowBackUp onClick={toggleUsage} color={useMantineTheme().colors.dark[2]}/>
                </Group>
                <Text size="xl" fw={700} pb={"xl"}>
                    Odzyskiwanie hasła
                </Text>


                <form onSubmit={recover.onSubmit(() => {
                })}>
                    <Stack>
                        <TextInput
                            label="Adres email"
                            placeholder="Wpisz swój adres email"
                            value={recover.values.email}
                            onChange={(event) => recover.setFieldValue('email', event.currentTarget.value)}
                            error={recover.errors.email && 'Podany adres jest nieprawidłowy'}
                            radius="md"
                        />
                        {error && <Text style={{
                            color: 'red',
                            fontSize: '0.75rem'
                        }}>{error}</Text>} {/* Wyswietlenie komunikatu o bledzie */}
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Button type="submit" radius="xl"
                                onClick={gotoMain}>
                            Przypomnij hasło
                        </Button>
                    </Group>
                </form>
            </Paper>
    );
}
