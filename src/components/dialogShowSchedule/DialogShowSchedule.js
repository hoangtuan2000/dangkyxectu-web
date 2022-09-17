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
    TextContent,
    TextInput,
    Title,
} from "./DialogShowScheduleCustomStyles";
import CreateIcon from "@mui/icons-material/Create";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import CommentIcon from "@mui/icons-material/Comment";
import NearMeIcon from "@mui/icons-material/NearMe";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Strings from "../../constants/Strings";
import ModalError from "../modalError/ModalError";
import ModalSuccess from "../modalSuccess/ModalSuccess";
import BackDrop from "../backDrop/BackDrop";
import Constants from "../../constants/Constants";
import { DialogShowScheduleService } from "../../services/DialogShowScheduleServices";
import helper from "../../common/helper";

function DialogShowSchedule({ open, handleClose, idSchedule }) {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
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
        const res = await DialogShowScheduleService.getSchedule({
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
            res = await DialogShowScheduleService.createOrUpdateReview({
                idReview: dataSendApi.idReview,
                idSchedule: dataSendApi.idSchedule,
                comment: dataSendApi.comment,
                starNumber: dataSendApi.starNumber,
            });
        } else if (
            schedule.length > 0 &&
            schedule[0].scheduleStatus == Constants.ScheduleStatus.APPROVED
        ) {
            res = await DialogShowScheduleService.updateScheduleApproved({
                idSchedule: dataSendApi.idSchedule,
                phoneUser: dataSendApi.phoneUser,
            });
        }

        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setModalSuccess(true);
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
            <DialogContent>
                {schedule.map((item) => {
                    const startDate = helper.formatDateStringFromTimeStamp(
                        item.startDate
                    );
                    const endDate = helper.formatDateStringFromTimeStamp(
                        item.endDate
                    );
                    return (
                        <Box key={item.idSchedule}>
                            <Title>
                                {Strings.ModalShowSchedule.TITLE} (Số:{" "}
                                {item.idSchedule})
                            </Title>

                            <Box>
                                <BoxLeft>
                                    <Img src={item.image} />
                                </BoxLeft>

                                <BoxRight>
                                    <CarTypeTitle variant="p" component="div">
                                        {`${item.carType} ${item.seatNumber} Chổ`}
                                    </CarTypeTitle>

                                    <TextContent variant="p" component="div">
                                        {Strings.RentedCar.LICENSE_PLATES}
                                        <Tooltip
                                            title={item.licensePlates}
                                            arrow
                                        >
                                            <span>{item.licensePlates}</span>
                                        </Tooltip>
                                    </TextContent>

                                    <TextContent variant="p" component="div">
                                        {Strings.RentedCar.CAR_BRAND}
                                        <Tooltip title={item.carBrand} arrow>
                                            <span>{item.carBrand}</span>
                                        </Tooltip>
                                    </TextContent>

                                    <TextContent variant="p" component="div">
                                        {Strings.RentedCar.SUBSCRIBERS}
                                        <Tooltip
                                            title={
                                                item.fullNameUser &&
                                                item.phoneUser
                                                    ? `${item.fullNameUser} (SĐT: ${item.phoneUser})`
                                                    : Strings.Common.UPDATING
                                            }
                                            arrow
                                        >
                                            <span>
                                                {item.fullNameUser &&
                                                item.phoneUser
                                                    ? `${item.fullNameUser} (SĐT: ${item.phoneUser})`
                                                    : Strings.Common.UPDATING}
                                            </span>
                                        </Tooltip>
                                    </TextContent>

                                    <TextContent variant="p" component="div">
                                        {Strings.RentedCar.DRIVER}
                                        <Tooltip
                                            title={
                                                item.fullNameDriver &&
                                                item.phoneDriver
                                                    ? `${item.fullNameDriver} (SĐT: ${item.phoneDriver})`
                                                    : Strings.Common.UPDATING
                                            }
                                            arrow
                                        >
                                            <span>
                                                {item.fullNameDriver &&
                                                item.phoneDriver
                                                    ? `${item.fullNameDriver} (SĐT: ${item.phoneDriver})`
                                                    : Strings.Common.UPDATING}
                                            </span>
                                        </Tooltip>
                                    </TextContent>

                                    <TextContent variant="p" component="div">
                                        {Strings.RentedCar.TIME}
                                        <Tooltip
                                            title={`${startDate} - ${endDate}`}
                                            arrow
                                        >
                                            <span
                                                style={{ fontWeight: "bold" }}
                                            >{`${startDate} - ${endDate}`}</span>
                                        </Tooltip>
                                    </TextContent>

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
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    {Strings.RentedCar.REVIEW}
                                                    <Rating
                                                        value={
                                                            dataSendApi.starNumber
                                                        }
                                                        precision={0.5}
                                                        size="small"
                                                        onChange={(e, val) => {
                                                            handleChangeRating(
                                                                val
                                                            );
                                                        }}
                                                    />
                                                </Box>
                                            </TextContent>

                                            <TextInput
                                                placeholder={
                                                    Strings.RentedCar.COMMENT
                                                }
                                                label={
                                                    Strings.RentedCar.COMMENT
                                                }
                                                variant="outlined"
                                                size="small"
                                                multiline
                                                rows={2}
                                                value={
                                                    dataSendApi.comment || ""
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
                                        item.scheduleStatus ==
                                            Constants.ScheduleStatus
                                                .APPROVED && (
                                            <Box>
                                                <TextInput
                                                    placeholder={
                                                        Strings.RentedCar.PHONE
                                                    }
                                                    label={
                                                        Strings.RentedCar.PHONE
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

                                <Box sx={{ clear: "both" }}></Box>
                                <Box>
                                    <TextContent variant="p" component="div">
                                        {Strings.RentedCar.SCHEDULE}
                                    </TextContent>
                                    <List
                                        sx={{
                                            width: "100%",
                                            bgcolor: "background.paper",
                                            padding: "0px",
                                        }}
                                    >
                                        <ListItem
                                            sx={{
                                                padding: "0px",
                                            }}
                                        >
                                            <CreateIcon
                                                color="primary"
                                                fontSize="small"
                                                sx={{
                                                    marginRight: "5px",
                                                }}
                                            />
                                            <ListItemText
                                                primary={
                                                    "Mục Đích Sử Dụng Xe: "
                                                }
                                                secondary={item.reason}
                                                primaryTypographyProps={{
                                                    fontSize: "13px",
                                                    fontWeight: "bold",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    color: theme.palette.primary
                                                        .main,
                                                }}
                                                secondaryTypographyProps={{
                                                    fontSize: "12px",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            />
                                        </ListItem>

                                        <ListItem
                                            sx={{
                                                padding: "0px",
                                            }}
                                        >
                                            <NearMeIcon
                                                color="primary"
                                                fontSize="small"
                                                sx={{
                                                    marginRight: "5px",
                                                }}
                                            />
                                            <ListItemText
                                                primary={"Điểm xuất phát:"}
                                                secondary={`${item.startLocation} - ${item.wardStart} - ${item.districtStart} - ${item.provinceStart}`}
                                                primaryTypographyProps={{
                                                    fontSize: "13px",
                                                    fontWeight: "bold",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    color: theme.palette.primary
                                                        .main,
                                                }}
                                                secondaryTypographyProps={{
                                                    fontSize: "12px",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            />
                                        </ListItem>

                                        <ListItem
                                            sx={{
                                                padding: "0px",
                                            }}
                                        >
                                            <LocationOnIcon
                                                color="primary"
                                                fontSize="small"
                                                sx={{
                                                    marginRight: "5px",
                                                }}
                                            />
                                            <ListItemText
                                                primary={"Điểm kết thúc:"}
                                                secondary={`${item.endLocation} - ${item.wardEnd} - ${item.districtEnd} - ${item.provinceEnd}`}
                                                primaryTypographyProps={{
                                                    fontSize: "13px",
                                                    fontWeight: "bold",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    color: theme.palette.primary
                                                        .main,
                                                }}
                                                secondaryTypographyProps={{
                                                    fontSize: "12px",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            />
                                        </ListItem>
                                    </List>
                                </Box>
                            </Box>
                        </Box>
                    );
                })}
            </DialogContent>

            <DialogActions>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: 4,
                    }}
                >
                    <ButtonFeatures
                        size="small"
                        variant="contained"
                        endIcon={<CancelIcon />}
                        color="error"
                        sx={{ marginRight: 1 }}
                        onClick={handleClose}
                    >
                        {Strings.Common.CANCEL}
                    </ButtonFeatures>

                    <ButtonFeatures
                        size="small"
                        variant="contained"
                        endIcon={<CheckCircleIcon />}
                        color="primary"
                        sx={{ marginRight: 1 }}
                        onClick={handleSubmit}
                        disabled={
                            schedule.length > 0 &&
                            (dataSendApi.starNumber != schedule[0].starNumber ||
                                dataSendApi.comment != schedule[0].comment ||
                                dataSendApi.phoneUser != schedule[0].phoneUser)
                                ? false
                                : true
                        }
                    >
                        {Strings.Common.UPDATE}
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

            <ModalSuccess
                open={modalSuccess}
                handleClose={() => setModalSuccess(false)}
            />
            <BackDrop open={backDrop} />
        </DialogContainer>
    );
}

export default DialogShowSchedule;
