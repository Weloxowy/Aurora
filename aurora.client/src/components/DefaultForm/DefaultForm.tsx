import {Button, Flex, TextInput, Title} from "@mantine/core";
import classes from './DefaultForm.module.css';
export default function DefaultForm() {
    function updateRecordFromForm() {
        const form = document.getElementById('updateForm');

        if (!form) {
            console.error('Złe ID.');
            return;
        }

        const formData = {
            id: form.querySelector('input[name="id"]').value,
            street: form.querySelector('input[name="street"]').value,
            postalCode: form.querySelector('input[name="postalCode"]').value,
            city: form.querySelector('input[name="city"]').value,
            region: form.querySelector('input[name="region"]').value,
            country: form.querySelector('input[name="country"]').value
        };

        return fetch(`https://localhost:7287/api/AddressEntity/${formData.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Wystąpił błąd podczas aktualizacji rekordu.');
                }
            })
            .then(data => {
                // Return od API
                console.log('Rekord został pomyślnie zaktualizowany:', data);
                return data;
            })
            .catch(error => {
                // Jak się zjebało
                console.error('Wystąpił błąd:', error.message);
                throw error;
            });
    }

    const handleSubmit = async () => {
        try {
            const response = await updateRecordFromForm();
            console.log('Odpowiedź z serwera:', response);
        } catch (error) {
            console.error('Błąd podczas przetwarzania żądania:', error);
        }
    };

    return (
        <Flex direction="column" style={{backgroundColor: "black"}}>
            <Title order={4} style={{color: "white"}}>Textinput matiego</Title>
            <TextInput
                variant="unstyled"
                size="xl"
                placeholder="Email"
                className={classes.customTextInput}
            />

            <form id="updateForm">
                <TextInput label="ID" name="id" placeholder="Wprowadź ID" />
                <TextInput label="Ulica" name="street" placeholder="Wprowadź ulicę" />
                <TextInput label="Kod pocztowy" name="postalCode" placeholder="Wprowadź kod pocztowy" />
                <TextInput label="Miasto" name="city" placeholder="Wprowadź miasto" />
                <TextInput label="Region" name="region" placeholder="Wprowadź region" />
                <TextInput label="Kraj" name="country" placeholder="Wprowadź kraj" />
                <Button onClick={handleSubmit}>Wyślij</Button>
            </form>
        </Flex>
    );
}
