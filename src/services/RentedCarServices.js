import axiosInstance from "../common/axiosConfig";
import Constants from "../constants/Constants";
import { store } from "../redux/store";

const RentedCarService = {
    getUserRegisteredScheduleList: async (data) => {
        const token = store.getState().currentUser.user.token;
        const accessToken = store.getState().currentUser.user.accessToken;
        return await axiosInstance
            .post(Constants.ApiPath.RentedCar.GET_USER_REGISTERED_SCHEDULE_LIST, data, {
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

export { RentedCarService };