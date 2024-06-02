import handleLogin from "../Login/Login.tsx";

export default async function POSTNewDocument(props) {
    const registerUrl = "https://localhost:7287/api/DocumentEntity";
    console.log(props);
    try {

        const registerResponse = await fetch(registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props),
        });
        if (!registerResponse.ok) {
            const errorMessage = await registerResponse.text();
            throw new Error(`HTTP error! Status: ${registerResponse.status}, Message: ${errorMessage}`);
        }

    } catch (error) {
        console.error('Error during registration:', error);
    }
}