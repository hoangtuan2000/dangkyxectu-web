import axiosInstance from "../../common/axiosConfig";
import Constants from "../../constants/Constants";
import { store } from "../../redux/store";

const DialogCarStatusConfirmationServices = {
    confirmReceivedOrCompleteOfSchedule: async (data) => {
        const token = store.getState().currentUser.user.token;
        const accessToken = store.getState().currentUser.user.accessToken;
        return await axiosInstance
            .post(Constants.ApiPath.DialogCarStatusConfirmation.CONFIRM_RECEIVED_OR_COMPLETE_OF_SCHEDULE, data, {
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

export { DialogCarStatusConfirmationServices };