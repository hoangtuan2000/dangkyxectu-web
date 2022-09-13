import axiosInstance from "../common/axiosConfig";
import Constants from "../constants/Constants";
import { store } from "../redux/store";

const RentalCarService = {
    getCar: async (data) => {
        return await axiosInstance
            .post(Constants.ApiPath.RentalCar.GET_CAR, data)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
    createSchedule: async (data) => {
        const token = store.getState().currentUser.user.token;
        const accessToken = store.getState().currentUser.user.accessToken;
        return await axiosInstance
            .post(Constants.ApiPath.RentalCar.CREATE_SCHEDULE, data, {
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

export { RentalCarService };
