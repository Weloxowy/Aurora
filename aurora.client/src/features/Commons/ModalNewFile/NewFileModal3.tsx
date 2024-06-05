import {
    Title,
    Text,
    TextInput,
    Paper,
    GridCol,
    Divider,
    rem,
    Grid,
    Progress,
    Button,
    Modal, Select
} from "@mantine/core";
import {IconArrowBack, IconArrowLeft, IconArrowRight, IconFileArrowRight} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import "./TestModal.css";
import NewFileModal4 from "./NewFileModal4";
import { useCallback, useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { User } from "../../../classes/User/User.ts";
import CheckAuthState from "../../../functions/Auth/CheckAuthState/CheckAuthState.tsx";
import CheckUserRank from "../../../functions/Auth/CheckUserRank/CheckUserRank.tsx";
import {GetAllWorkers} from "../../../functions/Users/GetAllWorkers.tsx";
import POSTNewDocument from "../../../functions/FormsAndDocuments/POSTNewDocument/POSTNewDocument.tsx";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

const maxWidth = 550;

type PDFFile = string | File | null;

interface NewFileModal3Props {
    closeParentModal: () => void;
    chosenDocType: string;
    file: PDFFile;
}

export default function NewFileModal3({ closeParentModal, chosenDocType, file }: NewFileModal3Props) {
    const [opened, { open, close }] = useDisclosure(false);
    const [pdfData, setPdfData] = useState<PDFFile>(file);
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState(1);
    const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>();
    const [hrWorkers, setHrWorkers] = useState([]);
    const [selectedReceiverId, setSelectedReceiverId] = useState<string | null>(null);
    const userInstance = User.getInstance();
    const onResize = useCallback<ResizeObserverCallback>((entries) => {
        const [entry] = entries;
        if (entry) {
            setContainerWidth(entry.contentRect.width);
        }
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const workers = await GetAllWorkers();
                const filteredWorkers = workers
                    .filter(worker => worker.userRank === 2)
                    .map(worker => ({
                        id: worker.id,
                        firstName: worker.firstName,
                        lastName: worker.lastName
                    }));
                setHrWorkers(filteredWorkers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (containerRef) {
            const resizeObserver = new ResizeObserver(onResize);
            resizeObserver.observe(containerRef);
            return () => resizeObserver.disconnect();
        }
    }, [containerRef, onResize]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (typeof file === 'string') {
                    const response = await fetch(file); // Fetch PDF file
                    const data = await response.blob(); // Convert response to Blob
                    setPdfData(data); // Set PDF data in state
                } else if (file instanceof File) {
                    setPdfData(file); // If file is already a File object, set it directly
                }
            } catch (error) {
                console.error('Error fetching PDF file:', error);
            }
        };

        if (file) {
            fetchData(); // Fetch PDF file when file prop is provided
        }
    }, [file]);

    const selectData = hrWorkers.map(worker => ({
        value: worker.id.toString(),
        label: `${worker.firstName} ${worker.lastName}`
    }));

    const closeModal4 = () => {
        close();
        closeParentModal();
    };
    function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
        setNumPages(nextNumPages);
    }
    const handlePreviousPage = () => {
        setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
    };

    const handleNextPage = () => {
        setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages || 1));
    };

    const data = {
        senderId: userInstance.userId,
        recieversId : selectedReceiverId,
        description: "string",
        typeOfDocument: chosenDocType,
        tags: "string",
        status: 0,
        createDate: "2024-05-31T23:24:18.701Z",
        language: "string",
        fileItem: file,
        inputData: "string"
    };

    const handleOpen = () =>{
        console.log(data);
        POSTNewDocument(data);
        open();
    }
    return (
        <>
            <Title>Nowy dokument</Title>
            <Text /* tego wiersza nie dawać przy tworzeniu wnioskow */>

            </Text>
            <Grid style={{ width: 'max-content'}} grow gutter="lg">
                <GridCol span={4}>
                    <div ref={setContainerRef} style={{alignItems: 'center'}}>
                        {pdfData && (
                            <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                                <Page
                                    key={`page_${pageNumber}`}
                                    pageNumber={pageNumber}
                                    width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                                />
                            </Document>
                        )}
                        <div>
                            <Button onClick={handlePreviousPage} disabled={pageNumber <= 1}>
                                <IconArrowLeft />
                            </Button>
                            <span>{pageNumber+'/'+numPages}</span>
                            <Button onClick={handleNextPage} disabled={pageNumber >= (numPages || 1)}>
                                <IconArrowRight />
                            </Button>
                        </div>
                    </div>
                </GridCol>
                <Divider size="md" orientation="vertical" ml={rem(50)} mr={rem(50)}/>
                <GridCol span="content">
                    <Paper>
                        <Title>Szczegóły dokumentu</Title>
                        <Text>Tutaj pojawią się najważniejsze informacje. Sprawdź ich poprawność, a w razie konieczności
                            dokonaj korekty.</Text>
                        <TextInput label="Imię i nazwisko" disabled placeholder={userInstance.firstName+' '+userInstance.lastName}/>
                        <TextInput label="Dział" disabled placeholder={userInstance.department}/>
                        <TextInput label="Cel dokumentu" placeholder={chosenDocType} disabled/>
                        <Select
                            label="Odbiorca dokumentu"
                            placeholder="Wybierz pracownika HR"
                            data={selectData}
                            onChange={setSelectedReceiverId}
                        />
                        <Progress radius="md" value={50} animated />
                        <Button rightSection={<IconArrowBack size={16} />} variant="light" size="md">Wróć</Button>
                        <Button rightSection={<IconFileArrowRight size={16} />} size="md" onClick={handleOpen}>Złóż wniosek</Button>
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
                            <NewFileModal4 closeParentModal={closeModal4} />
                        </Modal>
                    </Paper>
                </GridCol>
            </Grid>
        </>
    );
}