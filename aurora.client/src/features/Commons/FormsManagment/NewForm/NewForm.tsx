import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";


const NewForm = ({ closeModal }) => {
    const [opened, { open, close }] = useDisclosure();

    return (
        <Modal opened={opened} onClose={close} centered fullScreen style={{ position: 'fixed', top: '50%', left: '0%'}}>
            <Button onClick={close}>Zamknij</Button>
        </Modal>
    );
};

export default NewForm;
