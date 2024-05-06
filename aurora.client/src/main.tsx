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
import DefaultForm from "./components/DefaultForm/DefaultForm.tsx";
import HolidaySystem from './pages/HolidaySystem/HolidaySystem.tsx';

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
                <Route path="/auth" element={<AuthWithBackground />} />
                <Route path="/404" element={<Error />} />
                <Route path="/" element={<Panel />} />
                <Route path="/calendar" element={<HolidaySystem />} />
                <Route path="/def" element={<DefaultForm />} />
            </Routes>
        </BrowserRouter>
    </MantineProvider>
);

