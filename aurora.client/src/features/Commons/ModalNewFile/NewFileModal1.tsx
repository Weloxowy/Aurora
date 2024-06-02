import {
    Title,
    Button,
    Modal,
    Radio,
    Stack
} from "@mantine/core";
import {IconFileArrowRight} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import  "./TestModal.css";
import NewFileModal2 from "./NewFileModal2";
import {useState} from "react";

export default function NewFileModal1({ closeParentModal }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedValue, setSelectedValue] = useState("urlop");

    const closeModal2 = () => {
        close();
        closeParentModal();
    };

    return (
        <>
            <Title>Wybierz rodzaj pliku</Title>
            <Radio.Group value={selectedValue} onChange={setSelectedValue}>
                <Stack mt="xs">
                    <Radio value="Urlop" label="Urlop" />
                    <Radio value="Dofinansowanie" label="Dofinansowanie" />
                    <Radio value="Okazjonalna praca zdalna" label="Okazjonalna praca zdalna" />
                    <Radio value="PPK" label="PPK" />
                    <Radio value="Rozwiązanie umowy" label="Rozwiązanie umowy" />
                    <Radio value="Inne" label="Inne" />
                </Stack>
            </Radio.Group>
            <Button rightSection={<IconFileArrowRight size={16} />} size="md" onClick={open}>
                Przejdź do wniosku
            </Button>
            <Modal
                size="100vw"
                opened={opened}
                onClose={close}
                withCloseButton={false}
                centered
                shadow="md"
                style={{ position: 'absolute', top: '0%', left: '0%' }}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    color: '#ffffff',
                    blur: 6
                }}
            >
                <NewFileModal2 closeParentModal={closeModal2} chosenDocType={selectedValue} />
            </Modal>
        </>
    );
}
