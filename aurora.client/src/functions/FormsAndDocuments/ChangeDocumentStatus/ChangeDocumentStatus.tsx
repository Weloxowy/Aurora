import { notifications } from "@mantine/notifications";
import {IconX} from "@tabler/icons-react";
import {string32} from "pdfjs-dist/types/src/shared/util";

export default async function ChangeDocumentStatus(details, isAccepted) {
    const updateUrl = "https://localhost:7287/api/DocumentEntity/id/"+details.id;
    try {
        console.log(details.id);
        const status = isAccepted ? 1 : 2;
        const props = {
            status
        };
        console.log(JSON.stringify(props));
        const updateResponse = await fetch(updateUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(status),
        });

        if (!updateResponse.ok) {
            const errorMessage = await updateResponse.text();
            throw new Error(`HTTP error! Status: ${updateResponse.status}, Message: ${errorMessage}`);
        }

        // Optionally show a success notification
        notifications.show({
            id: 'change-document-status-success',
            withCloseButton: true,
            autoClose: 5000,
            title: 'Status Zmieniony',
            message: 'Status dokumentu został pomyślnie zmieniony.',
            color: 'green',
        });

    } catch (error) {
        notifications.show({
            id: 'change-document-status-error',
            withCloseButton: true,
            autoClose: 5000,
            title: 'Błąd zmiany statusu',
            message: `Pojawił się nieokreślony błąd. Spróbuj ponownie. Error: ${error.message}`,
            color: 'red',
            icon: <IconX />
        });
    }
}
