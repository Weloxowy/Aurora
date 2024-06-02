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
import {
    IconArrowBack,
    IconArrowLeft,
    IconArrowRight,
    IconFileArrowRight,
    IconFileChart,
    IconFileCheck, IconFileDislike, IconFileX
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { User } from "../../../classes/User/User.ts";
import GETDocumentDetails from "../../../functions/FormsAndDocuments/GETDocumentDetails/GETDocumentDetails.ts";
import ChangeDocumentStatus from "../../../functions/FormsAndDocuments/ChangeDocumentStatus/ChangeDocumentStatus.tsx";
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

interface ViewFileModal {
    id: string;
}

export default function ViewFileModal({id} : ViewFileModal) {
    const [opened, { open, close }] = useDisclosure(false);
    const [fileData, setFileData] = useState<PDFFile>(null);
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState(1);
    const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>();
    const [details, setDetails] = useState([]);
    const [selectedReceiverId, setSelectedReceiverId] = useState<string | null>(null);
    const [decision, setDecision] = useState(true);
    const onResize = useCallback<ResizeObserverCallback>((entries) => {
        const [entry] = entries;
        if (entry) {
            setContainerWidth(entry.contentRect.width);
        }
    }, []);
/*
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const det = await GETDocumentDetails(id);
                console.log(det);
                setDetails(det);
                //setPdfData(det.fileItem);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDetails();
    }, [id]);

 /*   useEffect(() => {
        const fetchDetails = async () => {
            try {
                const det = await GETDocumentDetails(id);
                console.log(det);
                setDetails(det);

                if (det.fileItem && !det.fileItem.startsWith('data:')) {
                    // If fileItem is a URL, set it directly
                    setPdfData(det.fileItem);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDetails();
    }, [id]);
*/

    const handleFileData = (base64data) => {
        setFileData(base64data);
    }

    // Wywołanie funkcji pobierającej dane z serwera
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GETDocumentDetails(id);
                setDetails(data);
                (data.status === 0 || data.status === 3) ? setDecision(true) : setDecision(false);
                const fileData = await fetch(data.fileItem);
                const fileBlob = await fileData.blob();
                const reader = new FileReader();
                reader.readAsDataURL(fileBlob);
                reader.onloadend = function() {
                    const base64data = reader.result;
                    handleFileData(base64data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);




    useEffect(() => {
        if (containerRef) {
            const resizeObserver = new ResizeObserver(onResize);
            resizeObserver.observe(containerRef);
            return () => resizeObserver.disconnect();
        }
    }, [containerRef, onResize]);

    const closeModal4 = () => {
        close();
        //closeParentModal(); //odkomentować gdy dodam modal potwierdzenia
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

    const handleNegative = () =>{
        ChangeDocumentStatus(details,false);
        //open();
    }
    const handlePositive = () =>{
        ChangeDocumentStatus(details,false);
       // open();
    }
    return (
        <>
            <Title>Wniosek urlopowy | Aleksander Wiech</Title>
            <Text /* tego wiersza nie dawać przy tworzeniu wnioskow */>
                Odbiorca: {details.rFirstName + ' '+details.rLastName} | {details.rDepartment}
            </Text>
            <Grid style={{ width: 'max-content'}} grow gutter="lg">
                <GridCol span={4}>
                    <div ref={setContainerRef} style={{alignItems: 'center'}}>
                        {fileData && (
                            <Document file={fileData} onLoadSuccess={onDocumentLoadSuccess} options={options}>
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
                        <TextInput label="Imię i nazwisko" disabled placeholder={details.sFirstName + ' '+details.sLastName}/>
                        <TextInput label="Dział" placeholder={details.sDepartment} disabled/>
                        <TextInput label="Cel dokumentu" placeholder={details.typeOfDocument} disabled/>
                        <Select
                            label="Odbiorca dokumentu"
                            placeholder={details.rFirstName + ' '+details.rLastName}
                            disabled
                            data={['']}
                            onChange={setSelectedReceiverId}
                        />
                        <Progress radius="md" value={50} animated />
                        <Button rightSection={<IconFileX size={16} />} disabled={!decision} variant="filled" color="red" size="md" onClick={handleNegative}>Odrzuć wniosek</Button>
                        <Button rightSection={<IconFileCheck  size={16} />} size="md" disabled={!decision} onClick={handlePositive}>Akceptuj wniosek</Button>

                    </Paper>
                </GridCol>
            </Grid>
        </>
    );
}