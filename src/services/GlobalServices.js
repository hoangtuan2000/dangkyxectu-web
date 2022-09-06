import axiosInstance from "../common/axiosConfig";
import Constants from "../constants/Constants";

const GlobalService = {
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

export { GlobalService };