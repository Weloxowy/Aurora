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
    AppShell
} from "@mantine/core";

export default function EPersonalF(){

    return(
        <AppShell style={{position:'relative',alignItems:'center'}}>

            <Title order={2} mb={rem(20)}>Twoje dane</Title>
            <Text pb={rem(100)} style={{fontSize: 18}}>Dane uzupełnione kolorem szarym mogą być zmienione przez osobę o wyższym poziomie dostępu.</Text>

                <Grid style={{width: '100vh'}} grow gutter="lg">
                    <GridCol span="content">
                        <Fieldset legend="Dane adresowe">
                            <TextInput label={"Ulica"} placeholder={"Krakowska"} disabled/>
                            <TextInput label={"Kod pocztowy"} placeholder={"78/128"} disabled/>
                            <TextInput label={"Miasto"} placeholder={"Kielce"} disabled/>
                            <TextInput label={"Województwo"} placeholder={"Świętokrzyskie"} disabled/>
                            <TextInput label={"Państwo"} placeholder={"Polska"} disabled />
                        </Fieldset>
                    </GridCol>

                </Grid>
        </AppShell>
    )
}