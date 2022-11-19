import axiosInstance from "../../common/axiosConfig";
import Constants from "../../constants/Constants";
import { store } from "../../redux/store";

const MaintenanceManagerServices = {
    getCarMaintenanceList: async (data) => {
        const token = store.getState().currentUser.user.token;
        const accessToken = store.getState().currentUser.user.accessToken;
        return await axiosInstance
            .post(Constants.ApiPath.MaintenanceManager.GET_CAR_MAINTENANCE_LIST, data, {
                headers: {
                    Authorization: `${accessToken} ${token}`,
                },
            })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
};

export { MaintenanceManagerServices };
