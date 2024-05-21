import { useState } from 'react';
import {
    Card, Divider,
    Fieldset, Grid,
    GridCol,
    Group, MantineThemeProvider, NativeSelect, rem, Stack,
    Switch,
    Text, TextInput, Title,
    useComputedColorScheme,
    useMantineColorScheme, useMantineTheme
} from '@mantine/core';
import classes from './SettingsComponent.module.css';

function SettingsComponent (){

    const { setColorScheme } = useMantineColorScheme();
    const sizing = useMantineTheme().fontSizes;
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
    const computedFontSizing = useMantineTheme().fontSizes.lg === useMantineTheme().fontSizes.xl ? 0 : 1;

    const [data, setData] = useState([
        {
            title: 'Motyw aplikacji',
            description: 'Zmień motyw. Ty tu decydujesz!',
            switchState: computedColorScheme === 'dark',
            handleSwitchChange: (index: number) => {
                const newData = [...data];
                newData[index].switchState = !newData[index].switchState;
                setData(newData);
                setColorScheme(newData[index].switchState ? 'dark' : 'light');
            }
        },
        { title: 'Powiadomienia na adres email', description: 'Na podany adres wyślemy potwierdzenie zgłoszenia na hackaton. PS. To nie działa', switchState: false },
        {
            title: 'Większy rozmiar czcionki',
            description: 'Włączenie powyższej funkcji może spowodować zmiany w układzie strony.',
            switchState: computedFontSizing === 1,
            handleSwitchChange: (index: number) => {
                const newData = [...data];
                newData[index].switchState = !newData[index].switchState;
                setData(newData);
                if (newData[index].switchState) {
                    sizing.xs = sizing.sm;
                    sizing.sm = sizing.md;
                    sizing.md = sizing.lg;
                    sizing.lg = sizing.xl;
                } else {
                    sizing.sm = sizing.xs;
                    sizing.md = sizing.sm;
                    sizing.lg = sizing.md;
                    sizing.xl = sizing.lg;
                }
            }
        },
    ]);

    const items = data.map((item, index) => (
        <Group justify="space-between" className={classes.item} wrap="nowrap" gap="xl" key={item.title}>
            <div>
                <Text>{item.title}</Text>
                <Text size="xs" c="dimmed">
                    {item.description}
                </Text>
            </div>
            <Switch
                onLabel="1"
                offLabel="0"
                className={classes.switch}
                size="lg"
                onChange={() => item.handleSwitchChange(index)}
                checked={item.switchState}
            />
        </Group>
    ));

    return (
        <>
        <Title order={2} mb={rem(20)} style={{position:'initial',alignItems:'center', top:'5%'}}>Twoje dane</Title>
    <Text pb={rem(100)} style={{fontSize: 18}}>Dane uzupełnione kolorem szarym mogą być zmienione przez osobę o wyższym poziomie dostępu.</Text>
        <Grid style={{width: '100vh'}} grow>
        <GridCol span={5}>
            <Card withBorder radius="md" p="lg" className={classes.card}>
                <Text fz="lg" className={classes.title} fw={500}>
                    Ustawienia
                </Text>
                <Text fz="xs" c="dimmed" mt={3} mb="xl">
                    Dostosuj aplikacje pod siebie
                </Text>
                <div style={{ textAlign: "left" }}>
                    {items}
                </div>
            </Card>
</GridCol>
    <Divider size="md" orientation="vertical" ml={rem(50)} mr={rem(50)}/>
    <GridCol span={5}>
        <Card withBorder radius="md" p="lg" className={classes.card}>
            <Text fz="lg" className={classes.title} fw={500}>
                FAQ
            </Text>
            <Text fz="xs" c="dimmed" mt={3} mb="xl">
                Najczęściej zadawane pytania.
            </Text>
            <Stack>
                <div>
                    <Title order={5}>Jak zmienić dane osobowe?</Title>
                    <Text>
                        Dane osobowe należy zmienić w panelu w zakładce Twoje dane. Pamiętaj że nie wszystkie dane są możliwe do zmiany. Jeżeli pole jest wyszarzone, zmienić je może osoba wyższa rangą (dział kadr, kierownik, właściciel, itd...)
                    </Text>
                </div>
                <div>
                    <Title order={5}>Czemu panel urlopu jest zablokowany?</Title>
                    <Text>
                        O uruchomieniu/zamknięciu sezonu urlopowego decyduje zarządca systemu.
                    </Text>
                </div>
                <div>
                    <Title order={5}>Kiedy dotrze mój wniosek?</Title>
                    <Text>
                        Wnioski są przesyłane automatycznie w ramach jednego systemu, więc docierają niemalże od razu.
                    </Text>
                </div>
                <div>
                    <Title order={5}>Kiedy zostanie rozpatrzony mój wniosek?</Title>
                    <Text>
                        O rozpatrzeniu wniosku decyduje dział kadr.
                    </Text>
                </div>
            </Stack>
        </Card>
    </GridCol>
</Grid>
        </>
    );

}
export default SettingsComponent;
