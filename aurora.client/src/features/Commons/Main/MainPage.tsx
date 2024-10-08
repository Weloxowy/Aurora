import {Flex} from "@mantine/core";
import CarouselHome from "../../../components/HomePage/CarouselHome/CarouselHome.tsx";
import Cards from "../../../components/HomePage/CardsHome/CardsHome.tsx";

export default function MainPage(){

    return (
        <Flex
            gap="lg"
            justify="center"
            align="flex-start"
            direction="column"
            wrap="nowrap"
            style={{ height: '100%' }} // Ustawienie wysokości na 100%
        >
            <CarouselHome/>
            <Cards />
        </Flex>
    )
}