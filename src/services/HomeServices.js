import axiosInstance from "../common/axiosConfig";
import Constants from "../constants/Constants";

const HomeService = {
    getCarScheduleList: async (data) => {
        return await axiosInstance
            .post(Constants.ApiPath.Home.GET_SCHEDULE_LIST, data)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },

    getCar: async (data) => {
        return await axiosInstance
            .post(Constants.ApiPath.Home.GET_CAR, data)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
    
    getCarList: async () => {
        return await axiosInstance
            .post(Constants.ApiPath.Home.GET_CAR_LIST)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
};

export { HomeService };