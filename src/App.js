import "aos/dist/aos.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import { createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";

import Login from "./screens/login/Login";
import Home from "./screens/home/Home";
import ProtectRoutesAdmin from "./components/protectRoutesAdmin/ProtectRoutesAdmin";
import MainLayout from "./components/mainLayout/MainLayout";
import RentedCar from "./screens/rentedCar/RentedCar";
import CarRentalManager from "./screens/carRentalManager/CarRentalManager";
import CarManager from "./screens/carManager/CarManager";
import DriverManagement from "./screens/driverManagement/DriverManagement";
import Statistical from "./screens/statistical/Statistical";
import RoutesPath from "./constants/RoutesPath";
import Role from "./constants/Role";

// init AOS library
AOS.init({
    offset: 5,
    duration: 1300,
});

function App() {
    const themeDarkMode = useSelector((state) => state.themeDarkMode.darkMode);
    const currentUser = useSelector((state) => state.currentUser.user);

    const themeMode = createTheme({
        palette: {
            mode: themeDarkMode ? "dark" : "light",
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
        <ThemeProvider theme={themeMode}>
            <BrowserRouter>
                <Routes>
                    <Route path={RoutesPath.LOGIN} element={<Login />} />

                    <Route path={RoutesPath.HOME}>
                        <Route element={<ProtectRoutesAdmin />}>
                            <Route
                                path={RoutesPath.HOME}
                                element={<MainLayout />}
                            >
                                <Route index element={<Home />} />
                                {currentUser.role == Role.USER && (
                                    <Route
                                        path={RoutesPath.RENDTED_CAR}
                                        element={<RentedCar />}
                                    />
                                )}

                                {currentUser.role == Role.ADMIN && (
                                    <>
                                        <Route
                                            path={RoutesPath.CAR_RENTAL_MANAGER}
                                            element={<CarRentalManager />}
                                        />
                                        <Route
                                            path={RoutesPath.CAR_MANAGER}
                                            element={<CarManager />}
                                        />
                                        <Route
                                            path={RoutesPath.DRIVER_MANAGEMENT}
                                            element={<DriverManagement />}
                                        />
                                        <Route
                                            path={RoutesPath.STATISTICAL}
                                            element={<Statistical />}
                                        />
                                    </>
                                )}
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
