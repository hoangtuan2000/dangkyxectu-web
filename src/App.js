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
import CarRentalManager from "./screens/carRentalManager/CarRentalManager";
import CarManager from "./screens/carManager/CarManager";
import DriverManagement from "./screens/driverManagement/DriverManagement";
import Statistical from "./screens/statistical/Statistical";
import RoutesPath from "./constants/RoutesPath";
import DriverTripManager from "./screens/driverTripManager/DriverTripManager";
import TripManager from "./screens/tripManager/TripManager";
import NoPage from "./screens/noPage/NoPage";
import RentalCar from "./screens/rentalCar/RentalCar";
import UpdateSchedulePending from "./screens/userScreens/updateSchedulePending/UpdateSchedulePending"
import Constants from "./constants/Constants";

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
                    <Route path={RoutesPath.INDEX}>
                        <Route element={<ProtectRoutesAdmin />}>
                            <Route
                                path={RoutesPath.INDEX}
                                element={<MainLayout />}
                            >
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

                                {currentUser.role == Constants.Role.ADMIN && (
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
                                            path={RoutesPath.TRIP_MANAGER}
                                            element={<TripManager />}
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

                                {currentUser.role == Constants.Role.DRIVER && (
                                    <Route
                                        path={RoutesPath.HOME}
                                        element={<DriverTripManager />}
                                    />
                                )}
                            </Route>
                            <Route path="*" element={<NoPage />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
