import "aos/dist/aos.css";
import "react-datepicker/dist/react-datepicker.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import { createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";

import Login from "./screens/login/Login";
import Home from "./screens/home/Home";
import ProtectRoutesAdmin from "./components/protectRoutesAdmin/ProtectRoutesAdmin";
import MainLayout from "./components/mainLayout/MainLayout";
import RentedCar from "./screens/userScreens/rentedCar/RentedCar";
import CarRegistrationManagement from "./screens/adminScreens/carRegistrationManagement/CarRegistrationManagement";
import CarManager from "./screens/adminScreens/carManager/CarManager";
import DriverManagement from "./screens/adminScreens/driverManagement/DriverManagement";
import Statistical from "./screens/adminScreens/statistical/Statistical";
import RoutesPath from "./constants/RoutesPath";
import DriverTripManager from "./screens/driverScreens/driverTripManager/DriverTripManager";
import NoPage from "./screens/noPage/NoPage";
import RentalCar from "./screens/rentalCar/RentalCar";
import UpdateSchedulePending from "./screens/userScreens/updateSchedulePending/UpdateSchedulePending";
import Constants from "./constants/Constants";
import CarStatusOfTrip from "./screens/adminScreens/carStatusOfTrip/CarStatusOfTrip";

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
                    {/* ROUTE LOGIN */}
                    <Route path={RoutesPath.LOGIN} element={<Login />} />

                    {/* ROUTE PROTECT */}
                    <Route path={RoutesPath.INDEX}>
                        <Route element={<ProtectRoutesAdmin />}>
                            {/* ROUTE MAIN LAYOUT */}
                            <Route
                                path={RoutesPath.INDEX}
                                element={<MainLayout />}
                            >
                                {/* ROUTE ADMIN AND USER */}
                                {currentUser.role != Constants.Role.DRIVER && (
                                    <>
                                        <Route
                                            path={RoutesPath.HOME}
                                            element={<Home />}
                                        />
                                        <Route
                                            path={
                                                RoutesPath.RENTAL_CAR +
                                                "/:idCar"
                                            }
                                            element={<RentalCar />}
                                        />
                                    </>
                                )}

                                {/* ROUTE USER */}
                                {currentUser.role == Constants.Role.USER && (
                                    <>
                                        <Route
                                            path={RoutesPath.RENDTED_CAR}
                                            element={<RentedCar />}
                                        />
                                        <Route
                                            path={
                                                RoutesPath.UPDATE_SCHEDULE_PENDING +
                                                "/:idSchedule"
                                            }
                                            element={<UpdateSchedulePending />}
                                        />
                                    </>
                                )}

                                {/* ROUTE ADMIN */}
                                {currentUser.role == Constants.Role.ADMIN && (
                                    <>
                                        <Route
                                            path={
                                                RoutesPath.CAR_REGISTRATION_MANAGEMENT
                                            }
                                            element={
                                                <CarRegistrationManagement />
                                            }
                                        />
                                        <Route
                                            path={RoutesPath.CAR_MANAGER}
                                            element={<CarManager />}
                                        />
                                        <Route
                                            path={RoutesPath.CAR_STATUS_OF_TRIP}
                                            element={<CarStatusOfTrip />}
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

                                {/* ROUTE DRIVER */}
                                {currentUser.role == Constants.Role.DRIVER && (
                                    <Route
                                        path={RoutesPath.HOME}
                                        element={<DriverTripManager />}
                                    />
                                )}
                            </Route>

                            {/* ROUTE NOT PAGE */}
                            <Route path="*" element={<NoPage />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
