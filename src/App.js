import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./screens/login/Login";
import Home from "./screens/home/Home";
import ProtectRoutesAdmin from "./components/protectRoutesAdmin/ProtectRoutesAdmin";
import MainLayout from "./components/mainLayout/MainLayout";
import Home2 from "./screens/home/Home2";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/">
                    {/* protected router */}
                    <Route element={<ProtectRoutesAdmin />}>
                        <Route
                            path="/"
                            element={
                                // <PrivateRoute>
                                <MainLayout />
                                // </PrivateRoute>
                            }
                        >
                            <Route path="/home" element={<Home />} />
                            <Route path="/home2" element={<Home2 />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
