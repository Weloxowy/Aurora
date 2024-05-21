import {Badge, Button, Card, Flex, Group, Image, Text, useMantineTheme} from "@mantine/core";
import classes from "./CardsHome.module.css";


export default function Cards(){
    const theme = useMantineTheme();

    return (
        <Flex
            gap="lg"
            justify="center"
            align="stretch"
            direction="row"
            wrap="nowrap"
        >
            <Card shadow="lg" padding="lg" radius="md" withBorder className={classes.cards}>
                <Card.Section>
                    <Image
                        src="https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        height={160}
                        alt="Łodzie"
                    />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={700}>Sezon urlopowy 2024</Text>
                    <Badge color="red">Pilne</Badge>
                </Group>

                <Text size="sm" c="dimmed">
                    Uruchomiliśmy już działanie systemu dla urlopów wakacyjnych. Aby
                    skorzystać z tego systemu należy wybrać daty graniczne urlopu oraz zatwierdzić
                    wybrany wniosek. Kolejność wniosków ma znaczenie podczas przydzielania
                    terminów urlopowych w danym przedziale czasowym.
                </Text>

                <Button color={theme.colors.blue[4]} fullWidth mt="md" radius="md">
                    Przejdź do systemu urlopowego
                </Button>
            </Card>
            <Card shadow="lg" padding="lg" radius="md" withBorder>
                <Card.Section>
                    <Image
                        src="https://images.unsplash.com/photo-1603807008857-ad66b70431aa?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        height={160}
                        alt="Stetoskop"
                    />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={700}>Badania okresowe</Text>
                    <Badge color="red">Pilne</Badge>
                </Group>

                <Text size="sm" c="dimmed">
                    Skierowanie na badanie okresowe znajdą Państwo w zakładce Twoje dokumenty w kategorii Inne dokumenty.
                    Badanie należy wykonać w ciągu 60 dni od daty wysłania skierowania.
                </Text>

                <Button color={theme.colors.blue[4]} fullWidth mt="md" radius="md">
                    Przejdź do dokumentów
                </Button>
            </Card>
        </Flex>
    );
}