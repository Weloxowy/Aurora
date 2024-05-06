export async function logout() {
    try {
        const response = await fetch("https://localhost:7071/api/AspNetUsers/logout", {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            }
        });
    }
    catch(error){
        console.error("err");
    }
    finally {
        window.location.href = "/auth";
    }
}