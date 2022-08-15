import { Navigate, Outlet } from 'react-router-dom';
// import {useSelector} from 'react-redux'

function ProtectRoutesAdmin() {
    // const userLoginAdmin = useSelector((state) => state.userLoginAdmin.infoUserAdmin)
    // if(Object.entries(userLoginAdmin).length !== 0){
    //     return <Outlet /> 
    // }else{
    //     return <Navigate to='/' />
    // }

    if(1 == 1){
        return <Outlet /> 
    }else{
        return <Navigate to='/' />
    }
}

export default ProtectRoutesAdmin