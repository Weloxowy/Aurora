
export default async function GetAllUserDataById(id:string) {

    const url = "https://localhost:7287/api/UserEntity/allinfo/"+id;
    try {
        const response = await fetch(url, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'cookieName=cookieValue'
            },
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        }
        const data = await response.json();
        //console.log(data);

        return data;
    } catch (error) {

        throw new Error(`Fetch error: ${error.message}`);
    }

}
