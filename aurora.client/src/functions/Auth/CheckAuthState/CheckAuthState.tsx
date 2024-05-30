
export default async function CheckAuthState(){
    const [response] = await Promise.all([fetch("https://localhost:7287/api/UserEntity/info", {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
        }
    })]);
    if (!response.ok) {
        window.location.href = "/auth";
    }
}