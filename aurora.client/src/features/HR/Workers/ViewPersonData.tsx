import {
    Flex,
    Title,
    Text,
    Grid,
    TextInput,
    Fieldset,
    NativeSelect,
    GridCol,
    Divider,
    rem,
    AppShell, Button
} from "@mantine/core";
import {useEffect, useState} from "react";
import GetAllUserDataById from "../../../functions/Auth/GetAllUserDataById/GetAllUserDataById.tsx";

export default function ViewPersonData({id}){
    const [workers,setWorkers]=useState();

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const data = await GetAllUserDataById(id.toString());
                const x = JSON.stringify(data);
                console.log(data);
                setWorkers(x);
                console.log(x);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchWorkers();
    }, [id]);

    return(
        <AppShell style={{position:'relative',alignItems:'center'}}>

            <Title order={2} mb={rem(20)}>Pracownik </Title>
            <Text pb={rem(100)} style={{fontSize: 18}}>Dane uzupełnione kolorem szarym mogą być zmienione przez osobę o wyższym poziomie dostępu.</Text>
            <Grid style={{width: '100vh'}} grow gutter="lg">
                <GridCol span="content">
                    <Fieldset  legend="Dane podstawowe" mb={30}>
                        <TextInput label={"Imię i nazwisko"} placeholder={'xxx'} disabled/>
                        <TextInput label={"PESEL"} placeholder={"781*******2"} disabled/>
                        <TextInput label={"Data urodzenia"} placeholder={"17.11.1978"} disabled/>
                        <TextInput label={"Płeć"} placeholder={"Mężczyzna"} disabled/>
                        <TextInput label={"Adres email"} placeholder={"awiech@wp.pl"} />
                        <TextInput label={"Numer kontaktowy"} placeholder={"(+48) 505 606 707"} />
                    </Fieldset>
                    <Fieldset legend="Osoba kontaktowa">
                        <TextInput label={"Imię i nazwisko"} placeholder={"Marta Wiech"} />
                        <TextInput label={"Numer kontaktowy"} placeholder={"(+48) 607 677 537"} />
                    </Fieldset>
                <Divider size="md" orientation="vertical" ml={rem(50)} mr={rem(50)}/>
                    <Fieldset legend="Dane służbowe">
                        <TextInput label={"Nazwa firmy"} placeholder={"GiftPol"} />
                        <TextInput label={"Dział"} placeholder={"Dział IT"} />
                        <TextInput label={"Stanowisko"} placeholder={"Kierownik działu"} />
                        <TextInput label={"Służbowy adres email"} placeholder={"awiech@giftpol.pl"} />
                        <TextInput label={"Numer telefonu (służbowy)"} placeholder={"brak"}  />
                        <TextInput label={"Data rozpoczęcia zatrudnienia"} placeholder={"01.05.2020"} />
                        <NativeSelect label={"Rodzaj umowy"} data={["Umowa o pracę"]} />
                        <NativeSelect label={"Status umowy"} data={["Pełny etat"]} />
                    </Fieldset>
                </GridCol>
                <GridCol span="content">
                    <Fieldset  legend="Dane do przelewu" mb={30}>
                        <TextInput label={"Numer rachunku"} placeholder={"32 1212 1212 1212 1212 1212 1212"} />
                        <TextInput label={"Nazwa banku"} placeholder={"Alior Bank"} />
                        <TextInput label={"Kraj"} placeholder={"PL"} />
                        <TextInput label={"Imię i nazwisko właściciela"} placeholder={"Artur Wiech"} />

                    </Fieldset>
                    <Fieldset legend="Informacje podatkowe">
                        <NativeSelect label={"Urząd skarbowy"} data={["Pierwszy US w Kielcach","Drugi US w Kielcach"]} />
                        <TextInput label={"NIP"} placeholder={"brak"} />
                    </Fieldset>
                    <Fieldset legend="Dane adresowe">
                        <TextInput label={"Ulica"} placeholder={"Krakowska"} />
                        <TextInput label={"Kod pocztowy"} placeholder={"78/128"} />
                        <TextInput label={"Miasto"} placeholder={"Kielce"} />
                        <TextInput label={"Województwo"} placeholder={"Świętokrzyskie"} />
                        <TextInput label={"Państwo"} placeholder={"Polska"}  />
                    </Fieldset>
                </GridCol>
            </Grid>
            <Button>Zapisz</Button>
        </AppShell>
    )
}