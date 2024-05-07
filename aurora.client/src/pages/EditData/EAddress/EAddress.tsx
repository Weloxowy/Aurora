import {Navbar} from "../../../layouts/Navbar/Navbar.tsx";
import {Flex} from "@mantine/core";
import EAddressF from "../../../features/Commons/PersonalData/EAddressF.tsx";

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
            <div style={{zIndex: 0, paddingLeft: '15%'}}>
                <EAddressF/>
            </div>
        </Flex>
    );
}

{/*
            justify="center"
            align="center" */}