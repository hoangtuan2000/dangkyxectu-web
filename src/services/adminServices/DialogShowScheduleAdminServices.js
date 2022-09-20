import axiosInstance from "../../common/axiosConfig";
import Constants from "../../constants/Constants";
import { store } from "../../redux/store";

const DialogShowScheduleAdminServices = {
    getSchedule: async (data) => {
        const token = store.getState().currentUser.user.token;
        const accessToken = store.getState().currentUser.user.accessToken;
        return await axiosInstance
            .post(Constants.ApiPath.DialogShowScheduleAdmin.GET_SCHEDULE, data, {
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

export { DialogShowScheduleAdminServices };