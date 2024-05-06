import {Navbar} from "../../layouts/Navbar/Navbar.tsx";
import {Flex} from "@mantine/core";
import MainPage from "../../features/Commons/Main/MainPage.tsx";

export default function Panel(){

    return(
        <Flex
            gap="lg"
            justify="center"
            align="center"
            direction="row"
            wrap="nowrap"
            style={{margin:'auto'}}
        >
            <div style={{ zIndex: 1}}>
                <Navbar/>
            </div>
            <div style={{ zIndex: 0, paddingLeft:'20%'}}>
                <MainPage />
            </div>
        </Flex>
    );
}