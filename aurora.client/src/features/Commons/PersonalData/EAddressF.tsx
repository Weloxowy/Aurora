import {Flex, Title, Text, Grid, TextInput, Fieldset, NativeSelect, GridCol, Divider, rem} from "@mantine/core";
import { User } from "../../../classes/User/User.ts";


export default function EAddressF(){
    const userInstance = User.getInstance();
    console.log(userInstance.firstName);
    return(
        <>
            <Title order={2} mb={rem(20)} style={{position:'initial',alignItems:'center', top:'5%'}}>Twoje dane</Title>
            <Text pb={rem(100)} style={{fontSize: 18}}>Dane uzupełnione kolorem szarym mogą być zmienione przez osobę o wyższym poziomie dostępu.</Text>

                <Grid style={{width: '100vh'}} grow gutter="lg">
                    <GridCol span="content">
                    <Fieldset  legend="Dane podstawowe" mb={30}>
                        <TextInput label={"Imię i nazwisko"} placeholder={userInstance.firstName+' '+userInstance.lastName} disabled/>
                        <TextInput label={"PESEL"} placeholder={"78********2"} disabled/>
                        <TextInput label={"Data urodzenia"} placeholder={"17.11.1978"} disabled/>
                        <TextInput label={"Płeć"} placeholder={"Mężczyzna"} disabled/>
                        <TextInput label={"Adres email"} placeholder={userInstance.email} />
                        <TextInput label={"Numer kontaktowy"} placeholder={"(+48) 505 606 707"} />
                    </Fieldset>
                    <Fieldset legend="Osoba kontaktowa">
                        <TextInput label={"Imię i nazwisko"} placeholder={"Anna Kaleta"} />
                        <TextInput label={"Numer kontaktowy"} placeholder={"(+48) 607 677 537"} />
                    </Fieldset>
                    </GridCol>
                       <Divider size="md" orientation="vertical" ml={rem(50)} mr={rem(50)}/>
                    <GridCol span="content">
                        <Fieldset legend="Dane służbowe">
                            <TextInput label={"Nazwa firmy"} placeholder={"Aurora"} disabled/>
                            <TextInput label={"Dział"} placeholder={userInstance.department} disabled/>
                            <TextInput label={"Stanowisko"} placeholder={userInstance.position} disabled/>
                            <TextInput label={"Służbowy adres email"} placeholder={"awiech@aurora.pl"} disabled/>
                            <TextInput label={"Numer telefonu (służbowy)"} placeholder={"brak"} disabled />
                            <TextInput label={"Data rozpoczęcia zatrudnienia"} placeholder={"01.05.2020"} disabled/>
                            <NativeSelect label={"Rodzaj umowy"} data={["Umowa o pracę"]} disabled/>
                            <NativeSelect label={"Status umowy"} data={["Pełny etat"]} disabled/>
                        </Fieldset>
                    </GridCol>
                </Grid>
        </>
    )
}