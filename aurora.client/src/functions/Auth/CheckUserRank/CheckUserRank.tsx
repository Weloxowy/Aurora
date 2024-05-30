
export default async function CheckUserRank() {

    const url = "https://localhost:7287/api/UserEntity/info";
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
        console.log(data.userRank);

        return data.userRank;
    } catch (error) {

        throw new Error(`Fetch error: ${error.message}`);
    }

}
