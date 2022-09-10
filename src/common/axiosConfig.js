import axios from "axios";
import { store } from "../redux/store";
import { deleteCurrentUser } from "../redux/currentUserSlice";
import Constants from "../constants/Constants";
import RoutesPath from "../constants/RoutesPath";
import { changeErrorAuthencationToken } from "../redux/globalReduxSlice";
import Strings from "../constants/Strings";

const axiosInstanceNotAuth = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000,
});

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000,
    // headers: {
    //     Authorization: `${getAccessTokenLocalStorage()} ${getTokenLocalStorage()}`,
    // },
});

const Authentication = async () => {
    const token = store.getState().currentUser.user.token;
    const accessToken = store.getState().currentUser.user.accessToken;
    return await axios
        .post(
            process.env.REACT_APP_BASE_URL + "/authentication",
            {},
            {
                headers: {
                    Authorization: `${accessToken} ${token}`,
                },
            }
        )
        .then((res) => {
            if (res.data) {
                if (res.data.status == Constants.ApiCode.OK) {
                    return true;
                } else {
                    store.dispatch(
                        changeErrorAuthencationToken(res.data.message)
                    );
                    store.dispatch(deleteCurrentUser());
                    window.location = RoutesPath.LOGIN;
                    return false;
                }
            }
            // axios fail
            else {
                store.dispatch(deleteCurrentUser());
                store.dispatch(
                    changeErrorAuthencationToken(Strings.Common.ERROR)
                );
                window.location = RoutesPath.LOGIN;
                return false;
            }
        })
        .catch((err) => {
            store.dispatch(deleteCurrentUser());
            store.dispatch(changeErrorAuthencationToken(Strings.Common.ERROR));
            window.location = RoutesPath.LOGIN;
            return false;
        });
};

axiosInstance.interceptors.request.use(
    async function (config) {
        const resultAuthentication = await Authentication();
        return resultAuthentication ? config : false;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export { axiosInstanceNotAuth };
export default axiosInstance;
