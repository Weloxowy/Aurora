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
import NewFileModal2 from "./NewFileModal2.tsx";
export default function NewFileModal1({closeParentModal}){
    const [opened, { open, close }] = useDisclosure(false);

    const closeModal2 = () => {
        close();
        closeParentModal();
    };

    return(
        <>
        <Title>Wybierz rodzaj pliku</Title>
            <Radio.Group
            >
                <Stack mt="xs">
                    <Radio value="urlop" label="Urlop" />
                    <Radio value="dofin" label="Dofinansowanie" />
                    <Radio value="zdalna" label="Okazjonalna praca zdalna" />
                    <Radio value="ppk" label="PPK" />
                    <Radio value="rozw" label="Rozwiązanie umowy" />
                    <Radio value="inne" label="Inne" />
                </Stack>
            </Radio.Group>
                    <Button rightSection={<IconFileArrowRight size={16} />} size={"md"} onClick={open} >Przejdź do wniosku</Button>
                    <Modal size={'100vw'} opened={opened} onClose={close} withCloseButton={false} centered shadow={"md"} style={{ position: 'absolute', top:'0%', left: '0%'}}
                           overlayProps={{
                               backgroundOpacity: 0.55,
                               color: '#ffffff',
                               blur: 6
                           }}
                    >
                        <NewFileModal2 closeParentModal={closeModal2}  />
                    </Modal>
        </>
    )
}
