import { useState } from "react";
import { useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Checkbox,
    Anchor,
    Stack,
    useMantineTheme,
} from '@mantine/core';
import './Auth.css';
import '@mantine/core/styles.css';
import './Auth.css';
import {IconArrowBackUp} from "@tabler/icons-react";
import { checkUserLoggedIn } from "../features/getCookies";
import handleLogin from "../../functions/Auth/Login/Login.tsx";
import handleRegister from "../../functions/Auth/Register/Register.tsx";


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
            password: (val) => (val.length <= 8 ? 'Password should include at least 8 characters' : null),
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
                                onClick={formType === 'register' ? () => handleRegister(form) :  () => handleLogin(form)}>
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
