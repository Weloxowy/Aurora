import {
    Image,
    Title,
    Text,
    TextInput,
    Paper,
    Flex,
    GridCol,
    Fieldset,
    Divider,
    rem,
    Grid,
    Progress,
    Button,
    Modal,
    Group
} from "@mantine/core";
import img from "../../../assets/img.png";
import { IconFileArrowRight, IconPhoto, IconRestore, IconUpload, IconX } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import "./TestModal.css";
import NewFileModal3 from "./NewFileModal3.tsx";
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";
import { useState } from "react";


export default function NewFileModal2({ closeParentModal, chosenDocType }, props: Partial<DropzoneProps>) {
    const [opened, { open, close }] = useDisclosure(false);
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const [state, setState] = useState(false);
    const [fileObject, setFileObject] = useState(null);

    const closeModal3 = () => {
        close();
        setState(false);
        closeParentModal();
    };

    console.log(chosenDocType);

    const handleFileConversion = async (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileData = event.target.result;
            setFiles(fileData);
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <Dropzone
                onDrop={async (files) => {
                    console.log('accepted files', files);
                    if (files.length > 0) {
                        setFiles(files);
                        setState(true);
                        await handleFileConversion(files[0]);
                        open();
                    }
                }}
                disabled={state}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={10 * 1024 ** 2}
                accept={[
                    MIME_TYPES.pdf
                ]}
                {...props}
            >
                <Group position="center" spacing="xl" mih={220} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            Przeciągnij pliki lub dodaj je za pomocą guzika
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                            Możesz załączyć tylko jeden plik naraz, a jego wielkość nie może przekraczać 10 MB.
                        </Text>
                    </div>
                </Group>
            </Dropzone>

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
                <NewFileModal3 closeParentModal={closeModal3} chosenDocType={chosenDocType} file={files} />
            </Modal>
        </>
    );
}
