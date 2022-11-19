import axiosInstance from "../../common/axiosConfig";
import Constants from "../../constants/Constants";
import { store } from "../../redux/store";

const DialogUploadMaintenanceServices = {
    getCarMaintenance: async (data) => {
        const token = store.getState().currentUser.user.token;
        const accessToken = store.getState().currentUser.user.accessToken;
        return await axiosInstance
            .post(
                Constants.ApiPath.DialogUpdateMaintenance.GET_CAR_MAINTENANCE,
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
    updateCarMaintenance: async (data) => {
        const token = store.getState().currentUser.user.token;
        const accessToken = store.getState().currentUser.user.accessToken;
        return await axiosInstance
            .post(
                Constants.ApiPath.DialogUpdateMaintenance
                    .UPDATE_CAR_MAINTENANCE,
                data,
                {
                    headers: {
                        Authorization: `${accessToken} ${token}`,
                        "Content-Type": `multipart/form-data`,
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

export { DialogUploadMaintenanceServices };
