import axiosInstance from "../../common/axiosConfig";
import Constants from "../../constants/Constants";
import { store } from "../../redux/store";

const UserManagementServices = {
    getUserList: async (data) => {
        const token = store.getState().currentUser.user.token;
        const accessToken = store.getState().currentUser.user.accessToken;
        return await axiosInstance
            .post(Constants.ApiPath.UserManagement.GET_USER_LIST, data, {
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
    // createMultipleDriver: async (data) => {
    //     const token = store.getState().currentUser.user.token;
    //     const accessToken = store.getState().currentUser.user.accessToken;
    //     return await axiosInstance
    //         .post(
    //             Constants.ApiPath.DriverManagement.CREATE_MULTIPLE_DRIVER,
    //             data,
    //             {
    //                 headers: {
    //                     Authorization: `${accessToken} ${token}`,
    //                 },
    //             }
    //         )
    //         .then((res) => {
    //             return res;
    //         })
    //         .catch((err) => {
    //             return err;
    //         });
    // },
};

export { UserManagementServices };
