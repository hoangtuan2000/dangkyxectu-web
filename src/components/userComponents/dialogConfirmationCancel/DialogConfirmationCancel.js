import {
    Box,
    Collapse,
    DialogActions,
    DialogContent,
    FormControlLabel,
    FormHelperText,
    Radio,
    Typography,
    useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import helper from "../../../common/helper";
import Constants from "../../../constants/Constants";
import Strings from "../../../constants/Strings";
import { RentedCarService } from "../../../services/userServices/RentedCarServices";
import BackDrop from "../../backDrop/BackDrop";
import ModalError from "../../modalError/ModalError";
import {
    ButtonFeatures,
    DialogContainer,
    MultipleTextInput,
    RadioGroupStyle,
    Title,
} from "./DialogConfirmationCancelCustomStyles";

const nameReason = ["Sai Thông Tin Lịch Trình", "Cuộc Hẹn Bị Hủy"];

function DialogConfirmationCancel({
    open,
    handleClose,
    idSchedule,
    handleOpenModalSuccessOfParent,
    handleGetUserRegisteredScheduleListWithFilter,
}) {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [dataSendApi, setDataSendApi] = useState({
        reason: null,
        reasonOther: null,
    });
    const [errorData, setErrorData] = useState({
        reason: false,
        reasonOther: false,
        textHelperReason: null,
        textHelperReasonOther: null,
    });

    const handleCancelSchedule = async () => {
        await setBackDrop(true);
        let data = {};
        if (dataSendApi.reason) {
            data = {
                idSchedule: idSchedule,
                reasonCancel:
                    dataSendApi.reason == "false"
                        ? dataSendApi.reasonOther
                        : dataSendApi.reason,
            };
        }
        const res = await RentedCarService.cancelSchedule({
            ...data,
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                await handleRefesh();
                await handleGetUserRegisteredScheduleListWithFilter();
                await handleOpenModalSuccessOfParent()
            } else {
                setModalError({
                    ...modalError,
                    open: true,
                    title: res.data.message,
                });
            }
        }
        // axios fail
        else {
            setModalError({
                ...modalError,
                open: true,
                title:
                    (res.request &&
                        `${Strings.Common.AN_ERROR_OCCURRED} (${res.request.status})`) ||
                    Strings.Common.ERROR,
                content: res.name || null,
            });
        }
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
        await handleClose();
    };

    const handleCancel = () => {
        handleClose();
    };

    const handleRefesh = () => {
        setDataSendApi({
            reason: null,
            reasonOther: null,
        });
        setErrorData({
            reason: false,
            reasonOther: false,
            textHelperReason: null,
            textHelperReasonOther: null,
        });
    };

    const validateData = () => {
        if (dataSendApi.reason == "false") {
            if (dataSendApi.reasonOther) {
                if (
                    helper.isValidStringBetweenMinMaxLength(
                        dataSendApi.reasonOther,
                        Constants.Common
                            .CHARACTERS_MIN_LENGTH_REASON_CANCEL_SCHEDULE,
                        Constants.Common
                            .CHARACTERS_MAX_LENGTH_REASON_CANCEL_SCHEDULE
                    )
                ) {
                    return true;
                } else {
                    setErrorData({
                        ...errorData,
                        reasonOther: true,
                        textHelperReasonOther: `Từ ${Constants.Common.CHARACTERS_MIN_LENGTH_REASON_CANCEL_SCHEDULE} - ${Constants.Common.CHARACTERS_MAX_LENGTH_REASON_CANCEL_SCHEDULE} Ký Tự`,
                    });
                    return false;
                }
            } else {
                setErrorData({
                    ...errorData,
                    reasonOther: true,
                    textHelperReasonOther:
                        Strings.DialogConfirmationCancel.PLEASE_ENTER_REASON,
                });
                return false;
            }
        } else if (
            !helper.isNullOrEmpty(dataSendApi.reason) &&
            dataSendApi.reason != "false"
        ) {
            return true;
        } else {
            setErrorData({
                ...errorData,
                reason: true,
                textHelperReason:
                    Strings.DialogConfirmationCancel.PLEASE_CHOOSE_REASON,
            });
            return false;
        }
    };

    const handleConfirm = () => {
        const check = validateData();
        if (check) {
            handleCancelSchedule();
        }
    };

    const handleChangeIsCarBroken = (e) => {
        setDataSendApi({
            ...dataSendApi,
            reason: e.target.value,
        });
        e.target.value == "false" &&
            setErrorData({
                ...errorData,
                reason: false,
            });
    };

    const handleReasonOther = (e) => {
        setDataSendApi({
            ...dataSendApi,
            reasonOther: e.target.value,
        });

        helper.isValidStringBetweenMinMaxLength(
            e.target.value,
            Constants.Common.CHARACTERS_MIN_LENGTH_REASON_CANCEL_SCHEDULE,
            Constants.Common.CHARACTERS_MAX_LENGTH_REASON_CANCEL_SCHEDULE
        )
            ? setErrorData({
                  ...errorData,
                  reasonOther: false,
                  textHelperReasonOther: null,
              })
            : setErrorData({
                  ...errorData,
                  reasonOther: true,
                  textHelperReasonOther: `Từ ${Constants.Common.CHARACTERS_MIN_LENGTH_REASON_CANCEL_SCHEDULE} - ${Constants.Common.CHARACTERS_MAX_LENGTH_REASON_CANCEL_SCHEDULE} Ký Tự`,
              });
    };

    useEffect(() => {
        setDataSendApi({
            reason: null,
            reasonOther: null,
        });
    }, [open, idSchedule]);

    return (
        <DialogContainer
            open={open}
            onClose={handleClose}
            scroll="body"
            fullWidth={true}
        >
            <DialogContent>
                <Box>
                    {/* TITLE */}
                    <Title sx={{ color: theme.palette.error.main }}>
                        {Strings.Common.DO_YOU_WANT_TO_CANCEL_SCHEDULE}
                    </Title>
                    <Typography variant="p" component="div">
                        {Strings.RentedCar.REASON_CANCEL_SCHEDULE}
                    </Typography>

                    <RadioGroupStyle
                        onChange={handleChangeIsCarBroken}
                        value={dataSendApi.reason}
                    >
                        {nameReason.map((item, index) => {
                            return (
                                <FormControlLabel
                                    key={index}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                            );
                        })}
                        <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label={"Khác"}
                        />
                        {errorData.reason && (
                            <FormHelperText error={true}>
                                {errorData.textHelperReason}
                            </FormHelperText>
                        )}
                    </RadioGroupStyle>

                    <Collapse in={dataSendApi.reason == "false" ? true : false}>
                        <MultipleTextInput
                            multiline
                            onChange={(e) => handleReasonOther(e)}
                            label={
                                Strings.DialogConfirmationCancel.ENTER_REASON
                            }
                            value={dataSendApi.reasonOther || ""}
                            error={errorData.reasonOther}
                            helperText={
                                errorData.reasonOther &&
                                errorData.textHelperReasonOther
                            }
                        />
                    </Collapse>
                </Box>
            </DialogContent>

            {/* BUTTON */}
            <DialogActions>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <ButtonFeatures
                        size="small"
                        sx={{
                            marginRight: 1,
                            color: theme.palette.text.secondary,
                        }}
                        onClick={handleCancel}
                    >
                        {Strings.Common.CANCEL}
                    </ButtonFeatures>

                    <ButtonFeatures
                        size="small"
                        sx={{
                            marginRight: 1,
                            color: theme.palette.error.main,
                        }}
                        onClick={handleConfirm}
                    >
                        {Strings.Common.CONFIRM}
                    </ButtonFeatures>
                </Box>
            </DialogActions>

            <ModalError
                open={modalError.open}
                handleClose={() =>
                    setModalError({ ...modalError, open: false })
                }
                content={modalError.content}
                title={modalError.title}
            />
            <BackDrop open={backDrop} />
        </DialogContainer>
    );
}

export default DialogConfirmationCancel;
