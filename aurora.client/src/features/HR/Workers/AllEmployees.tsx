import { Button, Group, Menu, Modal, rem, Table, Tabs, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import GetAllUsersData from "../../../functions/Auth/GetAllUserData/GetAllUsersData.tsx";
import classes from './AllEmployees.module.css';
import ViewPersonData from "./ViewPersonData.tsx";

const AllEmployeesComponent = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedWorker, setSelectedWorker] = useState('');

    const handleRowClick = (id) => {
        console.log(id.toString())
        setSelectedWorker(id.toString());
    };

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const data = await GetAllUsersData();
                setWorkers(data);
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkers();
    }, []);

    const renderRows = (filteredWorkers) => {
        return filteredWorkers.map((element) => (
            <tr key={element.userId} onClick={() => handleRowClick(element.userId)} className={classes.rows}>
                <td>{element.firstName ?? 'N/A'}</td>
                <td>{element.lastName ?? 'N/A'}</td>
                <td>{element.email ?? 'N/A'}</td>
                <td>{element.hireDate ?? 'N/A'}</td>
                <td>{element.fireDate ?? 'N/A'}</td>
                <td>{element.department ?? 'N/A'}</td>
                <td>{element.position ?? 'N/A'}</td>
                <td>{element.isUserProfileActive !== null ? (element.isUserProfileActive ? 'Yes' : 'No') : 'N/A'}</td>
            </tr>
        ));
    };

    const [activeTab, setActiveTab] = useState('all');

    const filterWorkers = (status) => {
        if (status === 'all') {
            return workers;
        } else if (status === 'actual') {
            return workers.filter(worker => worker.isUserProfileActive !== false);
        } else if (status === 'onhold') {
            return workers.filter(worker => worker.isUserProfileActive === false);
        } else if (status === 'former') {
            return workers.filter(worker => worker.fireDate !== null);
        }
    };

    return (
        <>
            <Title order={2} mb={rem(20)} style={{ position: 'initial', alignItems: 'center', top: '5%' }}>
                Pracownicy
            </Title>
            <Tabs value={activeTab} onTabChange={setActiveTab} style={{ width: '70vw', marginTop: '5vh' }}>
                <Tabs.List>
                    <Tabs.Tab value="all">Wszyscy pracownicy</Tabs.Tab>
                    <Tabs.Tab value="actual">Aktualnie zatrudnieni</Tabs.Tab>
                    <Tabs.Tab value="onhold">Pracownicy na zwolnieniu</Tabs.Tab>
                    <Tabs.Tab value="former">Byli pracownicy</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="all" pt="xs">
                    <Table>
                        <thead>
                        <tr>
                            <th>Imie</th>
                            <th>Nazwisko</th>
                            <th>Adres email</th>
                            <th>Data zatrudnienia</th>
                            <th>Data zwolnienia</th>
                            <th>Departament</th>
                            <th>Stanowisko</th>
                            <th>Aktywny</th>
                        </tr>
                        </thead>
                        <tbody>{renderRows(filterWorkers('all'))}</tbody>
                    </Table>
                </Tabs.Panel>
                <Tabs.Panel value="actual" pt="xs">
                    <Table>
                        <thead>
                        <tr>
                            <th>Imie</th>
                            <th>Nazwisko</th>
                            <th>Adres email</th>
                            <th>Data zatrudnienia</th>
                            <th>Data zwolnienia</th>
                            <th>Departament</th>
                            <th>Stanowisko</th>
                            <th>Aktywny</th>
                        </tr>
                        </thead>
                        <tbody>{renderRows(filterWorkers('actual'))}</tbody>
                    </Table>
                </Tabs.Panel>
                <Tabs.Panel value="onhold" pt="xs">
                    <Table>
                        <thead>
                        <tr>
                            <th>Imie</th>
                            <th>Nazwisko</th>
                            <th>Adres email</th>
                            <th>Data zatrudnienia</th>
                            <th>Data zwolnienia</th>
                            <th>Departament</th>
                            <th>Stanowisko</th>
                            <th>Aktywny</th>
                        </tr>
                        </thead>
                        <tbody>{renderRows(filterWorkers('onhold'))}</tbody>
                    </Table>
                </Tabs.Panel>
                <Tabs.Panel value="former" pt="xs">
                    <Table>
                        <thead>
                        <tr>
                            <th>Imie</th>
                            <th>Nazwisko</th>
                            <th>Adres email</th>
                            <th>Data zatrudnienia</th>
                            <th>Data zwolnienia</th>
                            <th>Departament</th>
                            <th>Stanowisko</th>
                            <th>Aktywny</th>
                        </tr>
                        </thead>
                        <tbody>{renderRows(filterWorkers('former'))}</tbody>
                    </Table>
                </Tabs.Panel>
            </Tabs>
            {selectedWorker && (
                <Modal
                    opened={true}
                    onClose={() => setSelectedWorker(null)}
                    title="Szczegóły pracownika"
                    size={'100vw'}
                    centered
                    shadow={"md"}
                    style={{ position: 'absolute', top:'0%', left: '0%'}}
                    overlayProps={{
                        backgroundOpacity: 0.55,
                        color: '#ffffff',
                        blur: 6
                    }}
                >
                    <ViewPersonData id={selectedWorker} />
                </Modal>
            )}
        </>
    );
};

export default AllEmployeesComponent;
