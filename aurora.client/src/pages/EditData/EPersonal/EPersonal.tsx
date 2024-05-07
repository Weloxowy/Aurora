import {Navbar} from "../../../layouts/Navbar/Navbar.tsx";
import {Flex} from "@mantine/core";
import EPersonalF from "../../../features/Commons/PersonalData/EPersonalF.tsx";

export default function EAddress(){

    return(
        <Flex
            gap="lg"

            direction="row"
            wrap="nowrap"
            style={{margin:'auto'}}
        >
            <div style={{ zIndex: 1}}>
                <Navbar/>
            </div>
            <div style={{ zIndex: 0, paddingLeft: '15%'}}>
                <EPersonalF/>
            </div>
        </Flex>
    );
}
