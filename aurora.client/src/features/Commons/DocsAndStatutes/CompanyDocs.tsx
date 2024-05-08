import {Button, Group, Menu, Modal, rem, Table, Tabs, Text, Title} from "@mantine/core";
import {IconFileArrowRight, IconFileImport, IconFilePlus, IconRestore, IconSettings} from "@tabler/icons-react";
import TestModal from "../../TestModal.tsx";
import {useState} from "react";

const elements = [
    { id: 1, nazwa: 'Wniosek Urlopowy 3/2024', sentDate: '26.04.2024', acceptDate: '27.04.2024', acceptingPerson:'Anna Wolska', purpose:'Urlop na żądanie', type:'forms', state:'Zaakceptowany'},
    { id: 2, nazwa: 'Wniosek Urlopowy 2/2024', sentDate: '01.03.2024', acceptDate: '03.03.2024', acceptingPerson:'Anna Wolska', purpose:'Urlop okolicznościowy', type:'forms', state:'Zaakceptowany'},
    { id: 3, nazwa: 'Wniosek Urlopowy 1/2024', sentDate: '07.01.2024', acceptDate: '13.01.2024', acceptingPerson:'Anna Wolska', purpose:'Urlop okolicznościowy', type:'forms', state:'Odrzucony'},
    { id: 4, nazwa: 'Wniosek o dofinansowanie 1/2024', sentDate: '03.01.2024', acceptDate: '04.01.2024', acceptingPerson:'Anna Wolska', purpose:'Dofinansowanie do szkoleń i kursów', type:'forms', state:'Zaakceptowany'},
    { id: 5, nazwa: 'Wniosek Urlopowy 4/2023', sentDate: '26.04.2024', acceptDate: '27.04.2024', acceptingPerson:'Anna Wolska', purpose:'Urlop na żądanie', type:'forms', state:'Zaakceptowany'},
    { id: 6, nazwa: 'Wniosek Urlopowy 3/2023', sentDate: '26.04.2024', acceptDate: '27.04.2024', acceptingPerson:'Anna Wolska', purpose:'Urlop na żądanie', type:'forms', state:'Zaakceptowany'},
    { id: 7, nazwa: 'Umowa 1/2023', sentDate: '26.04.2024', acceptDate: '27.04.2024', acceptingPerson:'Anna Wolska', purpose:'Urlop na żądanie', type:'contracts', state:'Zaakceptowany'},
    { id: 8, nazwa: 'Wniosek Urlopowy 2/2023', sentDate: '26.04.2024', acceptDate: '27.04.2024', acceptingPerson:'Anna Wolska', purpose:'Urlop na żądanie', type:'forms', state:'Odrzucony'},
    { id: 9, nazwa: 'Wniosek Urlopowy 1/2023', sentDate: '26.04.2024', acceptDate: '27.04.2024', acceptingPerson:'Anna Wolska', purpose:'Urlop na żądanie', type:'forms', state:'Zaakceptowany'},
    { id: 10, nazwa: 'Wniosek Urlopowy 1/2022', sentDate: '26.04.2024', acceptDate: '27.04.2024', acceptingPerson:'Anna Wolska', purpose:'Urlop na żądanie', type:'forms', state:'Zaakceptowany'},
    { id: 11, nazwa: 'Wniosek Rodzicielski 1/2022', sentDate: '26.04.2024', acceptDate: '27.04.2024', acceptingPerson:'Anna Wolska', purpose:'Urlop na żądanie', type:'forms', state:'Zaakceptowany'},
    { id: 12, nazwa: 'Umowa 1/2023', sentDate: '26.04.2024', acceptDate: '27.04.2024', acceptingPerson:'Anna Wolska', purpose:'Urlop na żądanie', type:'contracts', state:'Zaakceptowany'},
    { id: 13, nazwa: 'Wniosek Urlopowy 1/2021', sentDate: '26.04.2024', acceptDate: '27.04.2024', acceptingPerson:'Anna Wolska', purpose:'Urlop na żądanie', type:'forms', state:'Zaakceptowany'},
    { id: 14, nazwa: 'Wniosek o awans', sentDate: '26.04.2024', acceptDate: '27.04.2024', acceptingPerson:'Anna Wolska', purpose:'Wniosek o Awans', type:'others', state:'Zaakceptowany'},
    { id: 15, nazwa: 'Wniosek Urlopowy 2/2020', sentDate: '26.04.2024', acceptDate: '27.04.2024', acceptingPerson:'Anna Wolska', purpose:'Urlop na żądanie', type:'forms', state:'Zaakceptowany'},
    { id: 16, nazwa: 'Wniosek Urlopowy 1/2020', sentDate: '26.04.2024', acceptDate: '27.04.2024', acceptingPerson:'Anna Wolska', purpose:'Urlop na żądanie', type:'forms', state:'Odrzucony'},

];

export default function CompanyDocs(){
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    const rows = elements.map((element) => (
        <Menu
            key={element.id}
            opened={openMenuId === element.id}
            onOpen={() => setOpenMenuId(element.id)}
            onClose={() => setOpenMenuId(null)}
        >
            <Menu.Target>
                <Table.Tr >
                    <Table.Td>{element.nazwa}</Table.Td>
                    <Table.Td>{element.sentDate}</Table.Td>
                    <Table.Td>{element.acceptDate}</Table.Td>
                    <Table.Td>{element.acceptingPerson}</Table.Td>
                    <Table.Td>{element.purpose}</Table.Td>
                    <Table.Td style={{ display: 'none' }}>{element.type}</Table.Td>
                    <Table.Td>{element.state}</Table.Td>
                </Table.Tr>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item leftSection={<IconSettings size={20} />}>
                    Settings
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    ));

    //console.log(elements.filter(row => row.type === 'forms'));
    //console.log(rows);
    //console.log(rows.filter(row => row.type === 'forms'));
    //console.log(rows.filter(row => row.props.children[0].props.children.props.children[5].props.children === 'forms'));

    const [activeTab, setActiveTab] = useState<string | null>('all');
    return (
        <>
            <Title order={2} mb={rem(20)} style={{position:'initial',alignItems:'center', top:'5%'}}>Regulaminy</Title>
            <Tabs defaultValue="all" value={activeTab} onChange={setActiveTab} style={{width: '70vw', marginTop: '5vh'}}>
                <Tabs.List>
                    <Tabs.Tab value="all">Wszystkie dokumenty</Tabs.Tab>
                    <Tabs.Tab value="contracts">Regulaminy</Tabs.Tab>
                    <Tabs.Tab value="forms">Kodeksy</Tabs.Tab>
                    <Tabs.Tab value="other">
                        Formularze
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="all" pt="xs">
                    <Table stickyHeader stickyHeaderOffset={30}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Nazwa wniosku</Table.Th>
                                <Table.Th>Data wysłania</Table.Th>
                                <Table.Th>Data akceptacji</Table.Th>
                                <Table.Th>Akceptująca osoba</Table.Th>
                                <Table.Th>Cel wniosku</Table.Th>
                                <Table.Th>Stan wniosku</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </Tabs.Panel>
                <Tabs.Panel value="contracts" pt="xs">
                    <Table stickyHeader stickyHeaderOffset={30}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Nazwa wniosku</Table.Th>
                                <Table.Th>Data wysłania</Table.Th>
                                <Table.Th>Data akceptacji</Table.Th>
                                <Table.Th>Akceptująca osoba</Table.Th>
                                <Table.Th>Cel wniosku</Table.Th>
                                <Table.Th>Stan wniosku</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows.filter(row => row.props.children[0].props.children.props.children[5].props.children === 'contracts')}</Table.Tbody>
                    </Table>
                </Tabs.Panel>
                <Tabs.Panel value="forms" pt="xs">
                    <Table stickyHeader stickyHeaderOffset={30}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Nazwa wniosku</Table.Th>
                                <Table.Th>Data wysłania</Table.Th>
                                <Table.Th>Data akceptacji</Table.Th>
                                <Table.Th>Akceptująca osoba</Table.Th>
                                <Table.Th>Cel wniosku</Table.Th>
                                <Table.Th>Stan wniosku</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        {/*
                        rows.filter(row => row.props.children[4].props.children === 'forms')
                        */}
                        <Table.Tbody>{rows.filter(row => row.props.children[0].props.children.props.children[5].props.children === 'forms')}</Table.Tbody>
                        <Table.Caption>Scroll page to see sticky thead</Table.Caption>
                    </Table>
                </Tabs.Panel>
                <Tabs.Panel value="other" pt="xs">
                    <Table stickyHeader stickyHeaderOffset={30}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Nazwa wniosku</Table.Th>
                                <Table.Th>Data wysłania</Table.Th>
                                <Table.Th>Data akceptacji</Table.Th>
                                <Table.Th>Akceptująca osoba</Table.Th>
                                <Table.Th>Cel wniosku</Table.Th>
                                <Table.Th>Stan wniosku</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows.filter(row => row.props.children[0].props.children.props.children[5].props.children === 'others')}</Table.Tbody>
                    </Table>
                </Tabs.Panel>
            </Tabs>

        </>
    );
}