import {Button, Group, Menu, Modal, rem, Table, Tabs, Text, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import GetAllUsersData from "../../../functions/Auth/GetAllUserData/GetAllUsersData.tsx";

const AllEmployeesComponent = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const data = await GetAllUsersData();
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
        <Table.Tr key={element.userId}>
            <Table.Td>{element.firstName ?? 'N/A'}</Table.Td>
            <Table.Td>{element.lastName ?? 'N/A'}</Table.Td>
            <Table.Td>{element.email ?? 'N/A'}</Table.Td>
            <Table.Td>{element.hireDate ?? 'N/A'}</Table.Td>
            <Table.Td>{element.fireDate ?? 'N/A'}</Table.Td>
            <Table.Td>{element.department ?? 'N/A'}</Table.Td>
            <Table.Td>{element.position ?? 'N/A'}</Table.Td>
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
                                <Table.Th>Imie</Table.Th>
                                <Table.Th>Nazwisko</Table.Th>
                                <Table.Th>Adres email</Table.Th>
                                <Table.Th>Data zatrudnienia</Table.Th>
                                <Table.Th>Data zwolnienia</Table.Th>
                                <Table.Th>Departament</Table.Th>
                                <Table.Th>Stanowisko</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </Tabs.Panel>

                <Tabs.Panel value="actual" pt="xs">
                    <Table stickyHeader stickyHeaderOffset={30}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Imie</Table.Th>
                                <Table.Th>Nazwisko</Table.Th>
                                <Table.Th>Aktualny pracownik</Table.Th>
                                <Table.Th>Data zatrudnienia</Table.Th>
                                <Table.Th>Data zwolnienia</Table.Th>
                                <Table.Th>Departament</Table.Th>
                                <Table.Th>Stanowisko</Table.Th>
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
                                <Table.Th>Imie</Table.Th>
                                <Table.Th>Nazwisko</Table.Th>
                                <Table.Th>Aktualny pracownik</Table.Th>
                                <Table.Th>Data zatrudnienia</Table.Th>
                                <Table.Th>Data zwolnienia</Table.Th>
                                <Table.Th>Departament</Table.Th>
                                <Table.Th>Stanowisko</Table.Th>
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
                                <Table.Th>Imie</Table.Th>
                                <Table.Th>Nazwisko</Table.Th>
                                <Table.Th>Aktualny pracownik</Table.Th>
                                <Table.Th>Data zatrudnienia</Table.Th>
                                <Table.Th>Data zwolnienia</Table.Th>
                                <Table.Th>Departament</Table.Th>
                                <Table.Th>Stanowisko</Table.Th>
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