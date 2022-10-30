import axiosInstance from "../../common/axiosConfig";
import Constants from "../../constants/Constants";
import { store } from "../../redux/store";

const AnalysisTotalTripsOfDriverServices = {
    getAnalysisTotalTripsOfDriver: async (data) => {
        const token = store.getState().currentUser.user.token;
        const accessToken = store.getState().currentUser.user.accessToken;
        return await axiosInstance
            .post(
                Constants.ApiPath.AnalysisTotalTripsOfDriver
                    .GET_ANALYSIS_TOTAL_TRIPS_OF_DRIVER,
                data,
                {
                    headers: {
                        Authorization: `${accessToken} ${token}`,
                    },
                }
            )
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
    getDataAnalysisTotalTripsOfDriver: async (data) => {
        const token = store.getState().currentUser.user.token;
        const accessToken = store.getState().currentUser.user.accessToken;
        return await axiosInstance
            .post(
                Constants.ApiPath.AnalysisTotalTripsOfDriver
                    .GET_DATA_ANALYSIS_TOTAL_TRIPS_OF_DRIVER,
                data,
                {
                    headers: {
                        Authorization: `${accessToken} ${token}`,
                    },
                }
            )
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
};

export { AnalysisTotalTripsOfDriverServices };
