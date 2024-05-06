import {Navbar} from "../../layouts/Navbar/Navbar.tsx";
import {Flex} from "@mantine/core";
import HolidayCalendar from "../../features/Commons/HolidaySystem/HolidayCalendar.tsx";

export default function HolidaySystem(){

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
                <HolidayCalendar />
            </div>
        </Flex>
    );
}