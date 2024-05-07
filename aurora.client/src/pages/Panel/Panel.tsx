import {Navbar} from "../../layouts/NewNavbar/Navbar.tsx";
import {AppShell, Burger, Group, Image, rem} from "@mantine/core";
import MainPage from "../../features/Commons/Main/MainPage.tsx";
import {useDisclosure} from "@mantine/hooks";
import logo from "../../assets/LogoWithName.svg";

export default function Panel(){
    const [opened, { toggle }] = useDisclosure();
    return(
        <AppShell
            header={{ height: { base: 60, sm: 70, md: 70, lg: 80 }}}
            navbar={{
                width: { base: 250, sm: 250, md: 250, lg: 300 },
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header
                w={{ base: '100vh',sm: 250, md: 250, lg: 300 }}
                style={{
                    borderInlineEnd: 'calc(0.0625rem * var(--mantine-scale)) solid var(--app-shell-border-color)',
                    '@media (max-width: 1300px)': {
                        borderInlineEnd: 'none'
                    }
                }}
            >
                <Group h="100%" px="md">
                    <Image src={logo} style={{ width: rem(250) }}/>
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar h={"100%"}>
                <Navbar/>
            </AppShell.Navbar>
            <AppShell.Main>
                <div>
                    <MainPage />
                </div>
            </AppShell.Main>
        </AppShell>
    );
}