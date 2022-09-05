import axiosInstance from "../common/axiosConfig";
import Constants from "../constants/Constants";

const HomeService = {
    getCarList: async (data) => {
        return await axiosInstance
            .post(Constants.ApiPath.Home.GET_CAR_LIST, data)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },

    getCommon: async (data) => {
        return await axiosInstance
            .post(Constants.ApiPath.Common.GET_COMMON, data)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
};

export { HomeService };