import { useState, useEffect } from "react";
import {
    Box,
    DialogActions,
    DialogContent,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    Rating,
    Tooltip,
    useTheme,
} from "@mui/material";
import {
    BoxLeft,
    BoxRight,
    ButtonFeatures,
    CarTypeTitle,
    DialogContainer,
    Img,
    ListStyle,
    TextContent,
    TextInput,
    Title,
} from "./DialogShowScheduleUserCustomStyles";
import CreateIcon from "@mui/icons-material/Create";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import CommentIcon from "@mui/icons-material/Comment";
import NearMeIcon from "@mui/icons-material/NearMe";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import Constants from "../../../constants/Constants";
import { DialogShowScheduleUserServices } from "../../../services/userServices/DialogShowScheduleUserServices";
import helper from "../../../common/helper";
import DialogConfirmation from "../../dialogConfirmation/DialogConfirmation";

function DialogShowScheduleUser({
    open,
    handleClose,
    idSchedule,
    titleDialog,
    handleGetUserRegisteredScheduleListWithFilter,
}) {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });
    const [dialogConfirmation, setDialogConfirmation] = useState({
        open: false,
        title: Strings.Common.DO_YOU_WANT_TO_UPDATE,
        content: Strings.Common.SCHEDULE_UPDATE_CONFIRMATION,
        handleSubmit: () => {},
    });

    const [schedule, setSchedule] = useState([]);
    const [dataSendApi, setDataSendApi] = useState({
        idReview: null,
        idSchedule: null,
        comment: null,
        starNumber: null,
        phoneUser: null,
    });

    const getSchedule = async () => {
        const res = await DialogShowScheduleUserServices.getSchedule({
            idSchedule: idSchedule,
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setSchedule(res.data.data);
                setDataSendApi({
                    ...dataSendApi,
                    idReview: res.data.data[0].idReview,
                    idSchedule: res.data.data[0].idSchedule,
                    comment: res.data.data[0].comment,
                    starNumber: res.data.data[0].starNumber,
                    phoneUser: res.data.data[0].phoneUser,
                });
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
    };

    const handleChangeRating = (val) => {
        if (helper.isValidStarNumber(val)) {
            setDataSendApi({
                ...dataSendApi,
                starNumber: val,
            });
        }
    };

    const handleChangeComment = (e) => {
        if (helper.isValidStringLength(e.target.value, 500)) {
            setDataSendApi({
                ...dataSendApi,
                comment: e.target.value,
            });
        }
    };

    const handleChangePhone = (e) => {
        setDataSendApi({
            ...dataSendApi,
            phoneUser: e.target.value,
        });
    };

    const handleSubmit = async () => {
        let res = {};
        if (
            schedule.length > 0 &&
            schedule[0].scheduleStatus == Constants.ScheduleStatus.COMPLETE
        ) {
            res = await DialogShowScheduleUserServices.createOrUpdateReview({
                idReview: dataSendApi.idReview,
                idSchedule: dataSendApi.idSchedule,
                comment: dataSendApi.comment,
                starNumber: dataSendApi.starNumber,
            });
        } else if (
            schedule.length > 0 &&
            (schedule[0].scheduleStatus == Constants.ScheduleStatus.APPROVED ||
                schedule[0].scheduleStatus == Constants.ScheduleStatus.RECEIVED)
        ) {
            res = await DialogShowScheduleUserServices.updatePhoneNumberUserInSchedule({
                idSchedule: dataSendApi.idSchedule,
                phoneUser: dataSendApi.phoneUser,
            });
        }

        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setModalSuccess(true);
                handleGetUserRegisteredScheduleListWithFilter();
            } else {
                setModalError({
                    ...modalError,
                    open: true,
                    title: res.data.message,
                    content: null,
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
    };

    const onSubmit = () => {
        // call dialog confirm => submit
        setDialogConfirmation({
            ...dialogConfirmation,
            open: true,
            handleSubmit: () => {
                handleSubmit();
            },
        });
    };

    const run = async () => {
        await setBackDrop(true);
        (await open) && getSchedule();
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    useEffect(() => {
        run();
    }, [idSchedule]);

    return (
        <DialogContainer
            open={open}
            onClose={handleClose}
            scroll="body"
            fullWidth={true}
        >
            {schedule.map((item) => {
                const startDate = helper.formatDateStringFromTimeStamp(
                    item.startDate
                );
                const endDate = helper.formatDateStringFromTimeStamp(
                    item.endDate
                );
                return (
                    <Box key={item.idSchedule}>
                        {/* CONTENT */}
                        <DialogContent>
                            <Box>
                                {/* TITLE */}
                                <Title>
                                    {titleDialog} (Số: {item.idSchedule})
                                </Title>

                                <Box>
                                    {/* IMAGE CAR */}
                                    <BoxLeft>
                                        <Img src={item.image} />
                                    </BoxLeft>

                                    {/* BOX CONTENT */}
                                    <BoxRight>
                                        {/* SEAT NUMBER OF CAR */}
                                        <CarTypeTitle
                                            variant="p"
                                            component="div"
                                        >
                                            {`${item.carType} ${item.seatNumber} Chổ`}
                                        </CarTypeTitle>

                                        {/* LICENSEPLATES */}
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {Strings.RentedCar.LICENSE_PLATES}
                                            <Tooltip
                                                title={item.licensePlates}
                                                arrow
                                            >
                                                <span>
                                                    {item.licensePlates}
                                                </span>
                                            </Tooltip>
                                        </TextContent>

                                        {/* CAR BRAND */}
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {Strings.RentedCar.CAR_BRAND}
                                            <Tooltip
                                                title={item.carBrand}
                                                arrow
                                            >
                                                <span>{item.carBrand}</span>
                                            </Tooltip>
                                        </TextContent>

                                        {/* INFO USER */}
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {Strings.RentedCar.SUBSCRIBERS}
                                            <Tooltip
                                                title={
                                                    item.fullNameUser &&
                                                    item.phoneUser
                                                        ? `${item.fullNameUser} (SĐT: ${item.phoneUser})`
                                                        : Strings.Common
                                                              .UPDATING
                                                }
                                                arrow
                                            >
                                                <span>
                                                    {item.fullNameUser &&
                                                    item.phoneUser
                                                        ? `${item.fullNameUser} (SĐT: ${item.phoneUser})`
                                                        : Strings.Common
                                                              .UPDATING}
                                                </span>
                                            </Tooltip>
                                        </TextContent>

                                        {/* INFO DRIVER */}
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {Strings.RentedCar.DRIVER}
                                            <Tooltip
                                                title={
                                                    item.fullNameDriver &&
                                                    item.phoneDriver
                                                        ? `${item.fullNameDriver} (SĐT: ${item.phoneDriver})`
                                                        : Strings.Common
                                                              .UPDATING
                                                }
                                                arrow
                                            >
                                                <span>
                                                    {item.fullNameDriver &&
                                                    item.phoneDriver
                                                        ? `${item.fullNameDriver} (SĐT: ${item.phoneDriver})`
                                                        : Strings.Common
                                                              .UPDATING}
                                                </span>
                                            </Tooltip>
                                        </TextContent>

                                        {/* DATE */}
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {Strings.RentedCar.TIME}
                                            <Tooltip
                                                title={`${startDate} - ${endDate}`}
                                                arrow
                                            >
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >{`${startDate} - ${endDate}`}</span>
                                            </Tooltip>
                                        </TextContent>

                                        {/* RATING AND COMMENT OR PHONE */}
                                        {item.scheduleStatus ==
                                        Constants.ScheduleStatus.COMPLETE ? (
                                            <Box>
                                                <TextContent
                                                    variant="p"
                                                    component="div"
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        {
                                                            Strings.RentedCar
                                                                .REVIEW
                                                        }
                                                        <Rating
                                                            value={
                                                                dataSendApi.starNumber
                                                            }
                                                            precision={0.5}
                                                            size="small"
                                                            onChange={(
                                                                e,
                                                                val
                                                            ) => {
                                                                handleChangeRating(
                                                                    val
                                                                );
                                                            }}
                                                        />
                                                    </Box>
                                                </TextContent>

                                                <TextInput
                                                    placeholder={
                                                        Strings.RentedCar
                                                            .COMMENT
                                                    }
                                                    label={
                                                        Strings.RentedCar
                                                            .COMMENT
                                                    }
                                                    variant="outlined"
                                                    size="small"
                                                    multiline
                                                    rows={2}
                                                    value={
                                                        dataSendApi.comment ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        handleChangeComment(e)
                                                    }
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="start">
                                                                <CommentIcon
                                                                    sx={{
                                                                        color: theme
                                                                            .palette
                                                                            .text
                                                                            .secondary,
                                                                    }}
                                                                />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Box>
                                        ) : (
                                            // PHONE NUMBER
                                            (item.scheduleStatus ==
                                                Constants.ScheduleStatus
                                                    .APPROVED ||
                                                item.scheduleStatus ==
                                                    Constants.ScheduleStatus
                                                        .RECEIVED) && (
                                                <Box>
                                                    <TextInput
                                                        placeholder={
                                                            Strings.RentedCar
                                                                .PHONE
                                                        }
                                                        label={
                                                            Strings.RentedCar
                                                                .PHONE
                                                        }
                                                        error={
                                                            !helper.isValidPhoneNumber(
                                                                dataSendApi.phoneUser
                                                            )
                                                        }
                                                        helperText={
                                                            Strings.Common
                                                                .INVALID_PHONE_NUMBER
                                                        }
                                                        variant="outlined"
                                                        size="small"
                                                        value={
                                                            dataSendApi.phoneUser ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            handleChangePhone(e)
                                                        }
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="start">
                                                                    <PhoneEnabledIcon
                                                                        sx={{
                                                                            color: theme
                                                                                .palette
                                                                                .text
                                                                                .secondary,
                                                                        }}
                                                                    />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Box>
                                            )
                                        )}
                                    </BoxRight>

                                    {/* BOX INFO LOCATION */}
                                    <Box sx={{ clear: "both" }}></Box>
                                    <Box>
                                        {/* TITLE */}
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {Strings.RentedCar.SCHEDULE}
                                        </TextContent>

                                        {/* LIST LOCATION */}
                                        <ListStyle>
                                            {/* REASON */}
                                            <ListItem>
                                                <CreateIcon />
                                                <Tooltip
                                                    title={item.reason}
                                                    arrow
                                                >
                                                    <ListItemText
                                                        primary={
                                                            "Mục Đích Sử Dụng Xe: "
                                                        }
                                                        secondary={item.reason}
                                                    />
                                                </Tooltip>
                                            </ListItem>

                                            {/* START LOCATION */}
                                            <ListItem>
                                                <NearMeIcon />
                                                <Tooltip
                                                    title={`${item.startLocation} - ${item.wardStart} - ${item.districtStart} - ${item.provinceStart}`}
                                                    arrow
                                                >
                                                    <ListItemText
                                                        primary={
                                                            "Điểm xuất phát:"
                                                        }
                                                        secondary={`${item.startLocation} - ${item.wardStart} - ${item.districtStart} - ${item.provinceStart}`}
                                                    />
                                                </Tooltip>
                                            </ListItem>

                                            {/* END LOCATION */}
                                            <ListItem>
                                                <LocationOnIcon />
                                                <Tooltip
                                                    title={`${item.endLocation} - ${item.wardEnd} - ${item.districtEnd} - ${item.provinceEnd}`}
                                                    arrow
                                                >
                                                    <ListItemText
                                                        primary={
                                                            "Điểm kết thúc:"
                                                        }
                                                        secondary={`${item.endLocation} - ${item.wardEnd} - ${item.districtEnd} - ${item.provinceEnd}`}
                                                    />
                                                </Tooltip>
                                            </ListItem>
                                        </ListStyle>
                                    </Box>
                                </Box>
                            </Box>
                        </DialogContent>

                        {/* BUTTON */}
                        <DialogActions>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginTop: 4,
                                }}
                            >
                                {/* EXIT BUTTON */}
                                <ButtonFeatures
                                    size="small"
                                    variant="contained"
                                    endIcon={<CancelIcon />}
                                    color="error"
                                    sx={{ marginRight: 1 }}
                                    onClick={handleClose}
                                >
                                    {item.scheduleStatus ==
                                        Constants.ScheduleStatus.APPROVED ||
                                    item.scheduleStatus ==
                                        Constants.ScheduleStatus.COMPLETE
                                        ? Strings.Common.CANCEL
                                        : Strings.Common.EXIT}
                                </ButtonFeatures>

                                {/* SUBMIT BUTTON */}
                                {(item.scheduleStatus ==
                                    Constants.ScheduleStatus.APPROVED ||
                                    item.scheduleStatus ==
                                        Constants.ScheduleStatus.RECEIVED ||
                                    item.scheduleStatus ==
                                        Constants.ScheduleStatus.COMPLETE) && (
                                    <ButtonFeatures
                                        size="small"
                                        variant="contained"
                                        endIcon={<CheckCircleIcon />}
                                        color="primary"
                                        sx={{ marginRight: 1 }}
                                        onClick={onSubmit}
                                        disabled={
                                            schedule.length > 0 &&
                                            (dataSendApi.starNumber !=
                                                schedule[0].starNumber ||
                                                dataSendApi.comment !=
                                                    schedule[0].comment ||
                                                dataSendApi.phoneUser !=
                                                    schedule[0].phoneUser)
                                                ? false
                                                : true
                                        }
                                    >
                                        {Strings.Common.UPDATE}
                                    </ButtonFeatures>
                                )}
                            </Box>
                        </DialogActions>
                    </Box>
                );
            })}

            <DialogConfirmation
                open={dialogConfirmation.open}
                handleClose={() =>
                    setDialogConfirmation({
                        ...dialogConfirmation,
                        open: false,
                    })
                }
                content={dialogConfirmation.content}
                title={dialogConfirmation.title}
                handleSubmit={dialogConfirmation.handleSubmit}
            />

            <ModalError
                open={modalError.open}
                handleClose={() =>
                    setModalError({ ...modalError, open: false })
                }
                content={modalError.content}
                title={modalError.title}
            />

            <ModalSuccess
                open={modalSuccess}
                handleClose={() => setModalSuccess(false)}
            />
            <BackDrop open={backDrop} />
        </DialogContainer>
    );
}

export default DialogShowScheduleUser;
