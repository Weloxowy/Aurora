import handleLogin from "../Login/Login.tsx";

export default async function handleRegister(props) {
    const checkEmailUrl = "https://localhost:7287/api/UserEntity/checkEmail/" + props.values.email;
    const registerUrl = "https://localhost:7287/api/UserEntity/registerCustom";
    try {
        /*
        const emailResponse = await fetch(checkEmailUrl, {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json',
             },
         });

         if (!emailResponse.ok) {
             const errorMessage = await emailResponse.text();
             throw new Error(`HTTP error! Status: ${emailResponse.status}, Message: ${errorMessage}`);
         }

         const emailExists = await emailResponse.json();

         if (emailExists) {
             setError("Podany adres email już istnieje w bazie danych.");
             return;
         }
     */
        /*weryfikacja się odbywa po stronie backendu. pole normalizedEmail posiada constraint UNIQUE, który nie pozwala na wprowadzenie
        * dwóch krotek o tym samym emailu. Jeden endpoint mniej.
        */

        const registerData = {
            FirstName: props.values.firstName,
            LastName: props.values.lastName,
            Email: props.values.email,
            PasswordHash: props.values.password,
        };

        const registerResponse = await fetch(registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        });

        if (!registerResponse.ok) {
            const errorMessage = await registerResponse.text();
            throw new Error(`HTTP error! Status: ${registerResponse.status}, Message: ${errorMessage}`);
        }

        // Jeśli rejestracja zakończyła się powodzeniem, przeprowadź logowanie
        await handleLogin(props);

    } catch (error) {
        console.error('Error during registration:', error);
    }
}