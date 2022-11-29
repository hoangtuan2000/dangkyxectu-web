import axiosInstance from "../../common/axiosConfig";
import Constants from "../../constants/Constants";
import { store } from "../../redux/store";

const DialogUpdateUserServices = {
    getUserToUpdate: async (data) => {
        const token = store.getState().currentUser.user.token;
        const accessToken = store.getState().currentUser.user.accessToken;
        return await axiosInstance
            .post(
                Constants.ApiPath.DialogUpdateUser.GET_USER_TO_UPDATE,
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
    updateUser: async (data) => {
        const token = store.getState().currentUser.user.token;
        const accessToken = store.getState().currentUser.user.accessToken;
        return await axiosInstance
            .post(
                Constants.ApiPath.DialogUpdateUser.UPDATE_USER,
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

export { DialogUpdateUserServices };
