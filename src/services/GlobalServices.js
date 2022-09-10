import axiosInstance from "../common/axiosConfig";
import Constants from "../constants/Constants";

const GlobalService = {
    getCommon: async (data) => {
        return await axiosInstance
            .post(Constants.ApiPath.Common.GET_COMMON, data)
            .then((res) => {
                console.log("call then API");
                return res;
            })
            .catch((err) => {
                console.log("call catch API", err);
                return err;
            });
    },
};

export { GlobalService };