import "aos/dist/aos.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import { createTheme, ThemeProvider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import Login from "./screens/login/Login";
import Home from "./screens/home/Home";
import ProtectRoutesAdmin from "./components/protectRoutesAdmin/ProtectRoutesAdmin";
import MainLayout from "./components/mainLayout/MainLayout";
import RentedCar from "./screens/rentedCar/RentedCar";
import CarRentalManager from "./screens/carRentalManager/CarRentalManager";
import { CarRental } from "@mui/icons-material";
import CarManager from "./screens/carManager/CarManager";
import DriverManagement from "./screens/driverManagement/DriverManagement";
import Statistical from "./screens/statistical/Statistical";

// init AOS library
AOS.init({
    offset: 5,
    duration: 1300,
});

function App() {
    const themeDarkMode = useSelector((state) => state.themeDarkMode.darkMode);

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
                                <Route path="rented-car" element={<RentedCar />} />
                                <Route path="car-rental-manager" element={<CarRentalManager />} />
                                <Route path="car-manager" element={<CarManager />} />
                                <Route path="driver-management" element={<DriverManagement />} />
                                <Route path="statistical" element={<Statistical />} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
