import {
    Image,
    Title,
    Text,
    TextInput,
    Paper,
    Flex,
    GridCol,
    Fieldset,
    Divider,
    rem,
    NativeSelect,
    Grid, Progress, Button, Modal
} from "@mantine/core";
import img from "../../assets/img.png"
import {IconFileArrowRight, IconRestore} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import TestModal2 from "./TestModal2.tsx";
export default function TestModal(){
    const [opened, { open, close }] = useDisclosure();
    return(
        <>
        <Title>Wniosek urlopowy | Aleksander Wiech</Title>
    <Text  /*tego wiersza nie dawać przy tworzeniu wnioskow */>Wniosek  Odbiorca: Anna Kolas | Dział Kadr</Text>
        <Grid style={{width: 'max-content'}} grow gutter="lg">
            <GridCol span="content">
                <Image src={img} radius={90}  w={'40vw'} h={'60vh'} fallbackSrc="https://placehold.co/600x400?text=Placeholder" style={{borderStyle: '100px solid green'}} />
            </GridCol>
            <Divider size="md" orientation="vertical" ml={rem(50)} mr={rem(50)}/>
            <GridCol span="content">
                <Paper>
                    <Title>Szczegóły dokumentu</Title>
                    <Text>Tutaj pojawią się najważniejsze informacje. Sprawdź ich poprawność, a w razie konieczności dokonaj korekty.</Text>
                    <TextInput label={"Imię i nazwisko"} disabled placeholder={"Aleksander Wiech"} />
                    <TextInput label={"Dział"} placeholder={"Dział IT"} />
                    <TextInput label={"Początek urlopu"} placeholder={"10.07.2024"}/>
                    <TextInput label={"Koniec urlopu"} placeholder={"19.07.2024"} />
                    <TextInput label={"Cel urlopu"} placeholder={"Urlop wypoczynkowy"} />
                    <TextInput label={"Odbiorca wniosku"} placeholder={"Anna Kolas | Dział HR"} />
                    <Progress radius="md" value={50} animated />
                    <Button rightSection={<IconRestore size={16} />} variant={"light"} size={"md"} >Wróć do kalendarza</Button>
                    <Button rightSection={<IconFileArrowRight size={16} />} size={"md"} onClick={open} >Złóż wniosek</Button>
                    <Modal size={'100vw'} opened={opened} onClose={close} centered shadow={"md"} style={{ position: 'absolute', top:'0%', left: '0%'}}
                           overlayProps={{
                               backgroundOpacity: 0.55,
                               color: '#ffffff',
                               blur: 6
                           }}
                    >
                        <TestModal2 />
                    </Modal>
                </Paper>
            </GridCol>
        </Grid>
        </>
    )
}
