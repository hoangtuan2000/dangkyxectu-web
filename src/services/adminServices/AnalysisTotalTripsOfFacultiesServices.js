import axiosInstance from "../../common/axiosConfig";
import Constants from "../../constants/Constants";
import { store } from "../../redux/store";

const AnalysisTotalTripsOfFacultiesServices = {
    getAnalysisTotalTripsOfFaculties: async (data) => {
        const token = store.getState().currentUser.user.token;
        const accessToken = store.getState().currentUser.user.accessToken;
        return await axiosInstance
            .post(
                Constants.ApiPath.AnalysisTotalTripsOfFaculties
                    .GET_ANALYSIS_TOTAL_TRIPS_OF_FACULTIES,
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

export { AnalysisTotalTripsOfFacultiesServices };
