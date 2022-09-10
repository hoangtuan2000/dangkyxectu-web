import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectRoutesAdmin() {
    const currentUser = useSelector((state) => state.currentUser.user);

    if (currentUser.token && currentUser.accessToken) {
        return <Outlet />;
    } else {
        return <Navigate to="/" />;
    }
}

export default ProtectRoutesAdmin;
