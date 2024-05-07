import {Navbar} from "../../../layouts/Navbar/Navbar.tsx";
import {Flex} from "@mantine/core";
import EBankingF from "../../../features/Commons/PersonalData/EBankingF.tsx";

export default function EBanking(){

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
                <EBankingF/>
            </div>
        </Flex>
    );
}
