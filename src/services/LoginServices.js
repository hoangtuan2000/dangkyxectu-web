import axiosInstance from "../common/axiosConfig";
import Constants from "../constants/Constants";

const LoginService = {
    Login: async (data) => {
        return await axiosInstance
            .post(Constants.ApiPath.Login.LOGIN, data)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
};

export { LoginService };
