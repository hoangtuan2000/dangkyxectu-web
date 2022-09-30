import axiosInstance from "../../common/axiosConfig";
import Constants from "../../constants/Constants";
import { store } from "../../redux/store";

const DialogCreateCarServices = {
    createCar: async (data) => {
        const token = store.getState().currentUser.user.token;
        const accessToken = store.getState().currentUser.user.accessToken;
        return await axiosInstance
            .post(Constants.ApiPath.DialogCreateCar.CREATE_CAR, data, {
                headers: {
                    Authorization: `${accessToken} ${token}`,
                    "Content-Type": `multipart/form-data`,
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

export { DialogCreateCarServices };
