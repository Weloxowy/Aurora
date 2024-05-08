import {Text, ScrollArea, Image, rem, Avatar, Flex, Group} from '@mantine/core';
import {
    IconHome2, IconUser, IconFiles, IconBooks, IconBeach, IconSettings, IconLogout,
} from '@tabler/icons-react';
import { LinksGroup } from './NavbarLinksGroup.tsx';
import classes from './Navbar.module.css';
import logo from '../../assets/LogoWithName.svg'
import {logout} from "../../functions/Auth/Logout/Logout.tsx";
import {Link} from "react-router-dom";

const mockdata = [
    { label: 'Strona Główna', icon: IconHome2, link: '/' },
    {
        label: 'Twoje dane',
        icon: IconUser,
        initiallyOpened: true,
        links: [
            { label: 'Dane osobowe', link: '/yourdata' },
            { label: 'Dane adresowe', link: '/yourpersonal' },
            { label: 'Dane bankowe', link: '/yourbanking' },
        ],
    },
    {
        label: 'Dokumenty i wnioski',
        icon: IconFiles,
        initiallyOpened: false,
        links: [
            { label: 'Twoje dokumenty', link: '/' },
            { label: 'Twoje wnioski', link: '/' },
        ],
    },
    { label: 'Regulaminy', icon: IconBooks, link: '/yourdata' },
    { label: 'Urlopy', icon: IconBeach, link: '/calendar' },
    { label: 'Ustawienia', icon: IconSettings, link: '/settings' },
];

const linkStyle = {
    textDecoration: "none",
    color: 'blue' //NIE DZIAŁA
};

export function Navbar() {
    const links = mockdata.map((item) => {
        if (item.link) {
            return (
                <Link to={item.link} key={item.label} style={linkStyle}>
                    <LinksGroup {...item} />
                </Link>
            );
        } else {
            return (
                <LinksGroup {...item} key={item.label} />
            );
        }
    });

    return (
        <nav className={classes.navbar}>
            <div className={classes.header}>
                    <Image src={logo} style={{ width: rem(250) }}/>
            </div>

            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>

            <div className={classes.footer}>
                <Flex
                    gap="lg"
                    justify="space-evenly"
                    align="center"
                    direction="row"
                    wrap="nowrap"
                >
                    <Avatar variant={"filled"} color={"blue"} w={50} h={50} ml={rem(8)}>AW</Avatar>
                    <Flex

                        justify="flex-start"
                        align="flex-start"
                        direction="column"
                        wrap="nowrap"
                    >
                        <Text pt={20} size="lg" fw={600}>Artur Wiech</Text>
                        <Text pb={20} color={"gray"} size={"sm"} fw={400}>Dział IT</Text>
                    </Flex>
                    <IconLogout color={"gray"} onClick={() => logout()}/>
                </Flex>
            </div>
        </nav>
    );
}