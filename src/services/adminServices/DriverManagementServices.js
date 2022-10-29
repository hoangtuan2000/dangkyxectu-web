import axiosInstance from "../../common/axiosConfig";
import Constants from "../../constants/Constants";
import { store } from "../../redux/store";

const DriverManagementServices = {
    getDriverList: async (data) => {
        const token = store.getState().currentUser.user.token;
        const accessToken = store.getState().currentUser.user.accessToken;
        return await axiosInstance
            .post(Constants.ApiPath.DriverManagement.GET_DRIVER_LIST, data, {
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
    createMultipleDriver: async (data) => {
        const token = store.getState().currentUser.user.token;
        const accessToken = store.getState().currentUser.user.accessToken;
        return await axiosInstance
            .post(
                Constants.ApiPath.DriverManagement.CREATE_MULTIPLE_DRIVER,
                data,
                {
                    headers: {
                        Authorization: `${accessToken} ${token}`,
                    },
                }
            )
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
};

export { DriverManagementServices };
