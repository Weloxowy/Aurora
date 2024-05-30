import {Button, Group, Menu, Modal, rem, Table, Tabs, Text, Title} from "@mantine/core";
import {IconFileArrowRight, IconFileImport, IconFilePlus, IconRestore, IconSettings} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {GetAllWorkers} from "../../../functions/Users/GetAllWorkers.tsx";

const AllEmployeesComponent = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const data = await GetAllWorkers();
                setWorkers(data);
            } catch (err : any) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkers();
    }, []);

    const rows = workers.map((element) => (
        <Table.Tr key={element.id}>
            <Table.Td>{element.firstName}</Table.Td>
            <Table.Td>{element.lastName}</Table.Td>
            <Table.Td>{element.email}</Table.Td>
            <Table.Td>{element.phoneNumber}</Table.Td>
            <Table.Td style={{ display: 'none' }}>{element.userRank}</Table.Td>
        </Table.Tr>
    ));

    const [activeTab, setActiveTab] = useState<string | null>('all');
    return (
        <>
            <Title order={2} mb={rem(20)}
                   style={{position: 'initial', alignItems: 'center', top: '5%'}}>Pracownicy</Title>
            <Tabs defaultValue="all" value={activeTab} onChange={setActiveTab}
                  style={{width: '70vw', marginTop: '5vh'}}>
                <Tabs.List>
                    <Tabs.Tab value="all">Wszyscy pracownicy</Tabs.Tab>
                    <Tabs.Tab value="actual">Aktualnie zatrudnieni</Tabs.Tab>
                    <Tabs.Tab value="onhold">Pracownicy na zwolnieniu</Tabs.Tab>
                    <Tabs.Tab value="former">Byli pracownicy</Tabs.Tab>
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

                <Tabs.Panel value="actual" pt="xs">
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
                        {/*
                         <Table.Tbody>{rows.filter(row => row.props.children[0].props.children.props.children[5].props.children === 'contracts')}</Table.Tbody>
                        */}
                    </Table>
                </Tabs.Panel>
                <Tabs.Panel value="onhold" pt="xs">
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
                        {/*
                        <Table.Tbody>{rows.filter(row => row.props.children[0].props.children.props.children[5].props.children === 'forms')}</Table.Tbody>
                        */}
                        <Table.Tbody>{rows}</Table.Tbody>
                        <Table.Caption>Scroll page to see sticky thead</Table.Caption>
                    </Table>
                </Tabs.Panel>
                <Tabs.Panel value="former" pt="xs">
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
                      <Table.Tbody>{rows.filter(row => row.props.children[0].props.children.props.children[5].props.children === 'others')}</Table.Tbody>
                        */}
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </Tabs.Panel>
            </Tabs>

        </>
    );
}
export default AllEmployeesComponent;