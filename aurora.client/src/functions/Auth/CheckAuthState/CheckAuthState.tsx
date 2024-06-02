import { User, UserProps } from "../../../classes/User/User.ts";
import GetAllUserData from "../GetAllUserData/GetAllUserData.tsx";
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
    else{
        const data = await GetAllUserData();
    // Ustawienie danych użytkownika za pomocą metody setUser
        const userInstance = User.getInstance();
        userInstance.setUser(data);
    }
}