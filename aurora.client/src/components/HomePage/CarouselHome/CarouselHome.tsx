import { Carousel } from '@mantine/carousel';
import { Button, Paper, Title, Text } from '@mantine/core';
import classes from './CarouselHome.module.css';
import '@mantine/carousel/styles.css';
import {useNavigate} from "react-router-dom";

const data = [
    {
        image:
            'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Wypróbuj system urlopowy!',
        category: 'Nowości',
        link: 'calendar'
    },
    {
        image:
            'https://images.unsplash.com/photo-1502465771179-51f3535da42c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Nowe zmiany w regulaminie',
        category: 'Administracja',
        link: 'rules/new'
    },
    {
        image:
            'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Pamiętaj o aktywacji systemu',
        category: 'Administracja', //brak linku
    },
];

interface CardProps {
    image: string;
    title: string;
    category: string;
    link?: string;
}

function Card({ image, title, category, link }: CardProps) {
    const navigate = useNavigate();
    return (
        <div className={classes.overlay}>
            <Paper p="xl" radius="xl" className={classes.card} style={{backgroundImage: `url(${image})`}}>
                {/* Warstwa z gradientem jako overlay */}
                <div className={classes.overlayGradient}/>

                {/* Wnętrze Papera */}
                <div className={classes.content}>
                    <Text className={classes.category} size="xs">
                        {category}
                    </Text>
                    <Title order={3} className={classes.title}>
                        {title}
                    </Title>
                    {link != null ? (
                        <Button variant="white" color="dark" onClick={() => navigate(link)}>
                            Przejdź
                        </Button>
                    ) : (
                        <span/>
                    )}
                </div>
            </Paper>
        </div>
    );
}

const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
        <Card {...item} />
    </Carousel.Slide>
));

export default function CarouselHome() {

    return (
        <Carousel
            slideSize={{base: '100%', sm: '100%'}}
            slideGap={{base: 'xl', sm: 2}}
            align="start"
            swipe
            withIndicators
            loop
            withControls
            classNames={{
                controls: classes.carouselControls,
                indicator: classes.carouselIndicator
            }}
        >
            <Carousel.Slide>{slides[0]}</Carousel.Slide>
            <Carousel.Slide>{slides[1]}</Carousel.Slide>
            <Carousel.Slide>{slides[2]}</Carousel.Slide>
        </Carousel>
    );
}