import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./screens/login/Login";
import Home from "./screens/home/Home";
import ProtectRoutesAdmin from "./components/protectRoutesAdmin/ProtectRoutesAdmin";
import MainLayout from "./components/mainLayout/MainLayout";
import { createTheme, ThemeProvider } from "@mui/material";

function App() {
    const darkMode = createTheme({
        palette: {
            mode: "dark",
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
                mobileS: 320,
                mobileM: 375,
                mobileL: 425,
            },
        },
    });

    return (
        <ThemeProvider theme={darkMode}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route path="/">
                        <Route element={<ProtectRoutesAdmin />}>
                            <Route
                                path="/"
                                element={
                                    // <PrivateRoute>
                                    <MainLayout />
                                    // </PrivateRoute>
                                }
                            >
                                <Route index element={<Home />} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
