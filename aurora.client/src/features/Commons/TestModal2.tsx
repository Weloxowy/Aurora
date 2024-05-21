import {
    Title,
    Text, Button
} from "@mantine/core";
import {IconFileArrowRight} from "@tabler/icons-react";
import {modals} from "@mantine/modals";

export default function TestModal2(){

    return(
        <>
        <Title>Wniosek dostarczono!</Title>
        <Text>Status złożonego wniosku, jak i inne dokumenty, których jesteś właścicielem  znajdziesz w zakładce Dokumenty.</Text>
            <Button rightSection={<IconFileArrowRight size={16} />} size={"md"} onClick={modals.closeAll()} >Przejdź do dokumentów</Button>

        </>
    )
}
