import axiosInstance from "../common/axiosConfig";
import Constants from "../constants/Constants";

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
};

export { RentalCarService };