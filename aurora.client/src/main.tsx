import {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import {MantineProvider, createTheme} from '@mantine/core';
import Auth from './pages/Auth/Auth.tsx';
import { Error } from "./pages/Error/Error.tsx";
import Panel from "./pages/Panel/Panel.tsx";
import HolidaySystem from './pages/HolidaySystem/HolidaySystem.tsx';
import EAddress from './pages/EditData/EAddress/EAddress.tsx';
import EBanking from "./pages/EditData/EBanking/EBanking.tsx";
import EPersonal from './pages/EditData/EPersonal/EPersonal.tsx';
import Settings from './pages/Settings/Settings.tsx';
import AllDocs from "./pages/DocumentsAndForms/Documents/AllDocs.tsx";
import AllCompanyDocs from "./pages/DocumentsAndForms/CompanyDocs/AllCompanyDocs.tsx";

// Tworzenie motywu Mantine
const theme = createTheme({
    primaryColor: 'blue',
    focusRing: 'auto',
    defaultRadius: 'md',
    defaultGradient: { from: 'blue', to: 'indigo', deg: 45 }
});

function AuthWithBackground() {
    useEffect(() => {
        document.body.classList.add('specific-background');
        return () => {
            document.body.classList.remove('specific-background');
        };
    }, []);
    return <Auth />;
}

// Routing
// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
    <MantineProvider theme={theme} defaultColorScheme="auto">
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<Error />} />
                <Route path="/" element={<Panel />} />

                <Route path="/auth" element={<AuthWithBackground />} />
                <Route path="/calendar" element={<HolidaySystem />} />
                <Route path="/yourdata" element={<EAddress/>} />
                <Route path="/yourdocs" element={<AllDocs/>} />
                <Route path="/firmdocs" element={<AllCompanyDocs/>} />
                <Route path="/yourbanking" element={<EBanking/>} />
                <Route path="/yourpersonal" element={<EPersonal/>} />
                <Route path="/settings" element={<Settings/>} />
            </Routes>
        </BrowserRouter>
    </MantineProvider>
);

