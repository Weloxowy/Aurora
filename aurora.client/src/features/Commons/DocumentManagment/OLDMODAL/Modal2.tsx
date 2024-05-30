import {
    Title,
    Text, Button
} from "@mantine/core";
import {IconFileArrowRight} from "@tabler/icons-react";

export default function Modal2({closeParentModal}){

    return(
        <>
        <Title>Wniosek dostarczono!</Title>
        <Text>Status złożonego wniosku, jak i inne dokumenty, których jesteś właścicielem  znajdziesz w zakładce Dokumenty.</Text>
            <Button rightSection={<IconFileArrowRight size={16} />} size={"md"} onClick={closeParentModal} >Przejdź do dokumentów</Button>
        </>
    )
}
