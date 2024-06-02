/*export default async function GETDocumentDetails(id : string) {
    const registerUrl = "https://localhost:7287/api/DocumentEntity/documentinfo/";
    console.log(id);
    try {

        const response = await fetch(registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        }
        return await response.json();

    } catch (error) {
        console.error('Error during registration:', error);
    }
}
 */export default async function GETDocumentDetails(id) {
    const registerUrl = "https://localhost:7287/api/DocumentEntity/documentinfo/";
    console.log(id);
    try {
        const response = await fetch(registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        }
        return await response.json();

    } catch (error) {
        console.error('Error during registration:', error);
    }
}
