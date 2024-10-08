import {Text, ScrollArea, rem, Avatar, Flex, Divider} from '@mantine/core';
import {
    IconHome2,
    IconUser,
    IconFiles,
    IconBooks,
    IconBeach,
    IconSettings,
    IconLogout,
    IconUsersGroup,
    IconFileStack,
} from '@tabler/icons-react';
import { LinksGroup } from './NavbarLinksGroup.tsx';
import classes from './Navbar.module.css';
import {logout} from "../../functions/Auth/Logout/Logout.tsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import CheckAuthState from "../../functions/Auth/CheckAuthState/CheckAuthState.tsx";
import CheckUserRank from "../../functions/Auth/CheckUserRank/CheckUserRank.tsx";
import { User } from "../../classes/User/User.ts";

const mockdata = [
    { label: 'Strona Główna', icon: IconHome2, link: '/' },
    {
        label: 'Twoje dane',
        icon: IconUser,
        initiallyOpened: false,
        links: [
            { label: 'Dane osobowe', link: '/yourdata' },
            { label: 'Dane adresowe', link: '/yourpersonal' },
            { label: 'Dane bankowe', link: '/yourbanking' },
        ],
    },
    {label: 'Dokumenty i wnioski', icon: IconFiles, link: '/yourdocs'},
    { label: 'Regulaminy', icon: IconBooks, link: '/firmdocs' },
    { label: 'Urlopy', icon: IconBeach, link: '/calendar' },
    { label: 'Ustawienia', icon: IconSettings, link: '/settings' },
];

const mockdataAdmin = [
    { label: 'Strona Główna', icon: IconHome2, link: '/' },
    {type: 'divider', label: 'Wszyscy pracownicy'},
    {
        label: 'Pracownicy i wydziały',
        icon: IconUsersGroup,
        initiallyOpened: false,
        links: [
            { label: 'Pracownicy', link: '/allemp' },
            { label: 'Wydziały', link: '/alldep' }
        ],
    },

    {label: 'Skrzynka podawcza', icon: IconFileStack, link: '/alldocs'},
    {type: 'divider', label: 'Tylko ty'},
    { label: 'Regulaminy', icon: IconBooks, link: '/firmdocs' },
    {
        label: 'Twoje dane',
        icon: IconUser,
        initiallyOpened: false,
        links: [
            { label: 'Dane osobowe', link: '/yourdata' },
            { label: 'Dane adresowe', link: '/yourpersonal' },
            { label: 'Dane bankowe', link: '/yourbanking' },
        ],
    },
    { label: 'Twoje dokumenty', icon: IconBooks, link: '/yourdocs' },
    { label: 'Urlopy', icon: IconBeach, link: '/calendar' },
    { label: 'Ustawienia', icon: IconSettings, link: '/settings' },
];

const linkStyle = {
    textDecoration: "none",
    color: 'blue', //NIE DZIAŁA
};


export function Navbar() {
    const [userRank, setUserRank] = useState(null);
    const [linksData, setLinksData] = useState([]);
    const userInstance = User.getInstance();
    useEffect(() => {
        const fetchData = async () => {
            try {
                await CheckAuthState();
                const rank = await CheckUserRank();
                setUserRank(rank);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const renderComponent = async () => {
            if (userRank !== null) {
                const data = userRank === 1 ? mockdata : (userRank === 2 ? mockdataAdmin : mockdata);
                setLinksData(data);
            }
        };
        renderComponent();
    }, [userRank]);

    if (userRank === null) {
        return null; // or a loading spinner
    }


    const links = linksData.map((item) => {
        if (item.type === 'divider') {
            return <Divider p={10} key={item.label} label={item.label}/>;
        } else if (item.link) {
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
            <ScrollArea className={classes.links} >
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>

            <div className={classes.footer}>
                <Flex
                    gap="lg"
                    justify="space-between"
                    align="center"
                    direction="row"
                    wrap="nowrap"
                >
                    {userInstance ? (
                            <Avatar variant={"filled"} color={"blue"} w={50} h={50} ml={rem(8)}>{userInstance.firstName[0] +userInstance.lastName[0]}</Avatar>
                    ) : (
                        <Avatar variant={"filled"} color={"blue"} w={50} h={50} ml={rem(8)}></Avatar>
                    )}

                    <Flex
                        justify="flex-start"
                        align="flex-start"
                        direction="column"
                        wrap="nowrap"
                    >

                        {userInstance ? (
                            <Text pt={20} size="lg" fw={600}>{userInstance.firstName + ' ' + userInstance.lastName}</Text>
                        ) : (
                            <></>
                        )}
                        {userInstance ? (
                            <Text pb={20} color={"gray"} size={"sm"} fw={400}>{userInstance.position+' | '+ userInstance.department}</Text>
                        ) : (
                            <div></div>
                        )}
                    </Flex>
                    <IconLogout color={"gray"} onClick={() => logout()}/>
                </Flex>
            </div>
        </nav>
    );
}