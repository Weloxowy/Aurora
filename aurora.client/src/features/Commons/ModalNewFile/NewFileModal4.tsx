import {
    Title,
    Text, Button
} from "@mantine/core";
import {IconFileArrowRight} from "@tabler/icons-react";
import {closeAllModals} from "@mantine/modals";
import {useRef} from "react";

export default function NewFileModal4({closeParentModal}){
    const modalRef = useRef(null);

    const handleOverlayClick = (event) => {
        if (event.target === modalRef.current) {
            closeAllModals();
        }
    };
    return(
        <div ref={modalRef}
             onClick={handleOverlayClick}>
            <Title>Dokument dostarczono!</Title>
            <Text>Status złożonego dokumentu, jak i inne dokumenty, których jesteś właścicielem  znajdziesz w zakładce Dokumenty.</Text>
            <Button rightSection={<IconFileArrowRight size={16} />} size={"md"} onClick={closeParentModal} >Przejdź do dokumentów</Button>
        </div>
    )
}
