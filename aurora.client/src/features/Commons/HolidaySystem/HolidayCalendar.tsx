import classes from './HolidayCalendar.module.css';
import {useEffect, useState} from 'react';
import {DatePicker, DatesProvider} from '@mantine/dates';
import '@mantine/dates/styles.css';
import {Flex, MantineThemeProvider, rem, Title, Text, Paper, Button, Group, ButtonGroup} from "@mantine/core";
import {IconFileArrowRight, IconRestore} from "@tabler/icons-react";
import 'dayjs/locale/pl.js';
export default function HolidayCalendar() {
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    const theme = MantineThemeProvider;

    const numberOfComponents = 7; // Przykładowa ilość komponentów
    const [width, setWidth] = useState(0);

    useEffect(() => {
        function handleResize() {
            setWidth((window.innerWidth * 0.65) / numberOfComponents);
        }

        handleResize(); // Wywołanie funkcji handleResize przy pierwszym renderowaniu

        window.addEventListener('resize', handleResize); // Dodanie nasłuchiwania na zdarzenia zmiany rozmiaru okna

        return () => {
            window.removeEventListener('resize', handleResize); // Usunięcie nasłuchiwania przy odmontowywaniu komponentu
        };
    }, []); // Pusta tablica zależności, aby useEffect został wykonany tylko raz przy pierwszym renderowaniu


    function ClearPicker(){
        setValue([null,null]);
    }

    function MakeNewForm(){

    }

    return (
        <Flex
            gap="xl"
            justify="center"
            align="center"
            direction="column"
            wrap="nowrap"
        >
            <Title order={3}>System urlopowy</Title>
            <Flex
                gap="lg"
                justify="space-between"
                align="stretch"
                direction="row"
                wrap="nowrap"
            >
                <Text>Wybierz datę rozpoczęcia i zakończenia urlopu.
                    Aktualny sezon urlopowy zaczyna się <b>2 lipca</b>, a kończy <b>26 sierpnia</b>.
                    Wybranie daty nie jest równoznaczne ze złożeniem wniosku. </Text>
                <Paper radius="md" p="xl" withBorder style={{textWrap: "nowrap"}}>
                    <Text>Pula dni do wykorzystania <b>20 dni</b></Text>
                    <Text>Pozostało do wykorzystania  <b>6 dni</b></Text>
                </Paper>
            </Flex>


        <DatesProvider settings={{ locale: 'pl', firstDayOfWeek: 1, weekendDays: [0,6], timezone: 'UTC' }}>
            <DatePicker
                size={'xl'}
                className={classes.mantineDatePickerCalendarHeader}
                type="range"
                value={value}
                onChange={setValue}
                minDate={new Date(2024, 5, 20)}
                maxDate={new Date(2024, 7, 31)}
                defaultDate={new Date(2024, 5, 20)}
                classNames={{
                    calendarHeader: classes.calendarHeader
                }}
                styles={(theme) => ({
                        display: 'flex',
                        justifyContent: 'center', // Wyśrodkowanie elementów w poziomie
                        alignItems: 'center', // Wyśrodkowanie elementów w pionie,
                    cell: {
                        border: `1px solid ${
                            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                        }`,
                    },
                    day: { borderRadius: 0, flexGrow: 1, height: rem(100), width: `${width}px`, fontSize: theme.fontSizes.lg },

                    weekday: { fontSize: theme.fontSizes.lg },
                    weekdayCell: {
                        fontSize: theme.fontSizes.xl,
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
                        border: `1px solid ${
                            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                        }`,
                        height: 10,
                    }
                })}
            />
        </DatesProvider>
            <Group gap={"lg"}>
                <Button rightSection={<IconRestore size={16} />} variant={"light"} size={"md"} onClick={ClearPicker}>Resetuj kalendarz</Button>
                <Button rightSection={<IconFileArrowRight size={16} />} size={"md"} onClick={MakeNewForm}>Złóż wniosek</Button>
            </Group>
        </Flex>
    );
}
