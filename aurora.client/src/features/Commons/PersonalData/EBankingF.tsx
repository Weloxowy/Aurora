import {Flex, Title, Text, Grid, TextInput, Fieldset, NativeSelect, GridCol, Divider, rem} from "@mantine/core";

export default function EBankingF(){

    return(
        <>

            <Title order={2} mb={rem(20)}>Twoje dane</Title>
            <Text pb={rem(100)} style={{fontSize: 18}}>Dane uzupełnione kolorem szarym mogą być zmienione przez osobę o wyższym poziomie dostępu.</Text>

                <Grid style={{width: '100vh'}} grow gutter="lg">
                    <GridCol span="content">
                    <Fieldset  legend="Dane do przelewu" mb={30}>
                        <TextInput label={"Numer rachunku"} placeholder={"32 1212 1212 1212 1212 1212 1212"} disabled/>
                        <TextInput label={"Nazwa banku"} placeholder={"Alior Bank"} disabled/>
                        <TextInput label={"Kraj"} placeholder={"PL"} disabled/>
                        <TextInput label={"Imię i nazwisko właściciela"} placeholder={"Artur Wiech"} disabled/>

                    </Fieldset>
                    <Fieldset legend="Informacje podatkowe">
                        <NativeSelect label={"Urząd skarbowy"} data={["Pierwszy US w Kielcach","Drugi US w Kielcach"]} disabled/>
                        <TextInput label={"NIP"} placeholder={"brak"} />
                    </Fieldset>
                    </GridCol>
                </Grid>
        </>
    )
}