import {DatePicker, DatesProvider} from "@mantine/dates";
import classes from "./HolidaySystem/HolidayCalendar.module.css";
import { rem } from "@mantine/core";
import {useState} from "react";

export default function TestModal(){

    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

    return(
        <>
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
                    day: { borderRadius: 0, flexGrow: 1, height: rem(80), width: `80px`, fontSize: theme.fontSizes.lg },

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
        </>
    )
}
