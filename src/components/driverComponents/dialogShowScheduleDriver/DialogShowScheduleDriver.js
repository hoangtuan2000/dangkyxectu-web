import { useState, useEffect } from "react";
import {
    Box,
    DialogActions,
    DialogContent,
    ListItem,
    ListItemText,
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
    Title,
} from "./DialogShowScheduleDriverCustomStyles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import NearMeIcon from "@mui/icons-material/NearMe";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Constants from "../../../constants/Constants";
import { DialogShowScheduleDriverServices } from "../../../services/driverServices/DialogShowScheduleDriverServices";
import helper from "../../../common/helper";
import DialogCarStatusConfirmation from "../dialogCarStatusConfirmation/DialogCarStatusConfirmation";
import DialogConfirmation from "../../dialogConfirmation/DialogConfirmation";

function DialogShowScheduleDriver({
    open,
    handleClose,
    idSchedule,
    titleDialog,
    getDriverScheduleListOfDriverTripManager,
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
        title: Strings.Common.DO_YOU_WANT_TO_CONFIRM_MOVING,
        content: Strings.Common.MOVING_CONFIRMATION,
        handleSubmit: () => {},
    });

    const [dialogCarStatusConfirmation, setDialogCarStatusConfirmation] =
        useState({
            open: false,
            idSchedule: null,
            idScheduleStatus: null,
        });

    const [schedule, setSchedule] = useState([]);

    const confirmMoving = async () => {
        await setBackDrop(true);
        const res = await DialogShowScheduleDriverServices.confirmMoving({
            idSchedule: idSchedule,
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                getDriverScheduleListOfDriverTripManager();
                getSchedule();
                setModalSuccess(true);
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
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    const getSchedule = async () => {
        const res = await DialogShowScheduleDriverServices.getSchedule({
            idSchedule: idSchedule,
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setSchedule(res.data.data);
                setDialogCarStatusConfirmation({
                    ...dialogCarStatusConfirmation,
                    open: false,
                    idSchedule: res.data.data[0].idSchedule,
                    idScheduleStatus: res.data.data[0].idScheduleStatus,
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

    const handleConfirmMoving = async () => {
        setDialogConfirmation({
            ...dialogConfirmation,
            open: true,
            handleSubmit: () => {
                confirmMoving();
            },
        });
    };

    const handleOpenDialogCarStatusConfirmation = () => {
        setDialogCarStatusConfirmation({
            ...dialogCarStatusConfirmation,
            open: true,
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

                const objScheduleStatus = Constants.ScheduleStatus;
                let colorScheduleStatus = theme.palette.text.primary;
                for (const property in objScheduleStatus) {
                    if (
                        item.scheduleStatus == `${objScheduleStatus[property]}`
                    ) {
                        colorScheduleStatus =
                            Constants.ColorOfScheduleStatus.TextNoBackground[
                                property
                            ];
                        break;
                    }
                }

                const objCarStatus = Constants.CarStatusCode;
                let colorCarStatus = theme.palette.text.primary;
                for (const property in objCarStatus) {
                    if (item.idCarStatus == `${objCarStatus[property]}`) {
                        colorCarStatus =
                            Constants.ColorOfCarStatus.Text[property];
                        break;
                    }
                }
                return (
                    <Box key={item.idSchedule}>
                        {/* CONTENT */}
                        <DialogContent>
                            <Box>
                                {/* TITLE */}
                                <Title>
                                    {titleDialog} (Số: {item.idSchedule})
                                </Title>

                                {/* CONTENT */}
                                <Box>
                                    {/* INFO CAR */}
                                    <BoxLeft>
                                        {/* IMAGE CAR */}
                                        <Img src={item.image} />

                                        {/* CONTENT INFO CAR */}
                                        <Box sx={{ textAlign: "start" }}>
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
                                                {
                                                    Strings
                                                        .DialogShowScheduleDriver
                                                        .LICENSE_PLATES
                                                }
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
                                                {
                                                    Strings
                                                        .DialogShowScheduleDriver
                                                        .CAR_BRAND
                                                }
                                                <Tooltip
                                                    title={item.carBrand}
                                                    arrow
                                                >
                                                    <span>{item.carBrand}</span>
                                                </Tooltip>
                                            </TextContent>

                                            {/* CAR STATUS */}
                                            <TextContent
                                                variant="p"
                                                component="div"
                                            >
                                                {
                                                    Strings
                                                        .DialogShowScheduleDriver
                                                        .CAR_STATUS
                                                }
                                                <Tooltip
                                                    title={item.carStatus}
                                                    arrow
                                                >
                                                    <span
                                                        style={{
                                                            fontWeight: "bold",
                                                            color: colorCarStatus,
                                                        }}
                                                    >
                                                        {item.carStatus}
                                                    </span>
                                                </Tooltip>
                                            </TextContent>
                                        </Box>
                                    </BoxLeft>

                                    {/* BOX CONTENT SCHEDULE */}
                                    <BoxRight>
                                        {/* DATE */}
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {
                                                Strings.DialogShowScheduleDriver
                                                    .TIME
                                            }
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

                                        {/* INFO DRIVER */}
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {
                                                Strings.DialogShowScheduleDriver
                                                    .DRIVER
                                            }
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

                                        {/* STATUS SCHEDULE */}
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {
                                                Strings.DialogShowScheduleDriver
                                                    .SCHEDULE_STATUS
                                            }
                                            <Tooltip
                                                title={item.scheduleStatus}
                                                arrow
                                            >
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                        color: colorScheduleStatus,
                                                    }}
                                                >
                                                    {item.scheduleStatus}
                                                </span>
                                            </Tooltip>
                                        </TextContent>

                                        {/* INFO USER */}
                                        <Box>
                                            {/* TITLE */}
                                            <TextContent
                                                variant="p"
                                                component="div"
                                            >
                                                {
                                                    Strings
                                                        .DialogShowScheduleDriver
                                                        .INFO_SUBSCRIBERS
                                                }
                                            </TextContent>

                                            {/* LIST INFO USER */}
                                            <ListStyle>
                                                {/* FULL NAME USER */}
                                                <ListItem>
                                                    <PersonIcon />
                                                    <Tooltip
                                                        title={
                                                            item.fullNameUser
                                                        }
                                                        arrow
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                Strings
                                                                    .DialogShowScheduleDriver
                                                                    .FULL_NAME_USER
                                                            }
                                                            secondary={
                                                                item.fullNameUser
                                                            }
                                                        />
                                                    </Tooltip>
                                                </ListItem>

                                                {/* PHONE USER */}
                                                <ListItem>
                                                    <LocalPhoneIcon />
                                                    <Tooltip
                                                        title={item.phoneUser}
                                                        arrow
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                Strings
                                                                    .DialogShowScheduleDriver
                                                                    .PHONE_USER
                                                            }
                                                            secondary={
                                                                item.phoneUser
                                                            }
                                                        />
                                                    </Tooltip>
                                                </ListItem>

                                                {/* EMAIL USER */}
                                                <ListItem>
                                                    <EmailIcon />
                                                    <Tooltip
                                                        title={item.emailUser}
                                                        arrow
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                Strings
                                                                    .DialogShowScheduleDriver
                                                                    .EMAIL_USER
                                                            }
                                                            secondary={
                                                                item.emailUser
                                                            }
                                                        />
                                                    </Tooltip>
                                                </ListItem>
                                            </ListStyle>
                                        </Box>

                                        {/* SCHEDULE */}
                                        <Box>
                                            {/* TITLE */}
                                            <TextContent
                                                variant="p"
                                                component="div"
                                            >
                                                {
                                                    Strings
                                                        .DialogShowScheduleDriver
                                                        .SCHEDULE
                                                }
                                            </TextContent>

                                            {/* LIST LOCATION */}
                                            <ListStyle>
                                                {/* NOTE */}
                                                <ListItem>
                                                    <CreateIcon />
                                                    <Tooltip
                                                        title={item.note || ""}
                                                        arrow
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                Strings
                                                                    .DialogShowScheduleDriver
                                                                    .NOTE
                                                            }
                                                            secondary={
                                                                item.note
                                                            }
                                                        />
                                                    </Tooltip>
                                                </ListItem>

                                                {/* REASON */}
                                                <ListItem>
                                                    <TextSnippetIcon />
                                                    <Tooltip
                                                        title={item.reason}
                                                        arrow
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                Strings
                                                                    .DialogShowScheduleDriver
                                                                    .CAR_RENTAL_REASON
                                                            }
                                                            secondary={
                                                                item.reason
                                                            }
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
                                                                Strings
                                                                    .DialogShowScheduleDriver
                                                                    .START_LOCATION
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
                                                                Strings
                                                                    .DialogShowScheduleDriver
                                                                    .END_LOCATION
                                                            }
                                                            secondary={`${item.endLocation} - ${item.wardEnd} - ${item.districtEnd} - ${item.provinceEnd}`}
                                                        />
                                                    </Tooltip>
                                                </ListItem>
                                            </ListStyle>
                                        </Box>
                                    </BoxRight>
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
                                    {Strings.Common.EXIT}
                                </ButtonFeatures>

                                {/* RECEIVE_SCHEDULE BUTTON */}
                                {helper.isDateTimeStampGreaterThanOrEqualCurrentDate(
                                    item.startDate
                                ) &&
                                    item.idScheduleStatus ==
                                        Constants.ScheduleStatusCode
                                            .APPROVED && (
                                        <ButtonFeatures
                                            size="small"
                                            variant="contained"
                                            endIcon={<CheckCircleIcon />}
                                            color="primary"
                                            sx={{
                                                marginRight: 1,
                                                backgroundColor:
                                                    Constants
                                                        .ColorOfScheduleStatus
                                                        .Background.RECEIVED,
                                            }}
                                            onClick={
                                                handleOpenDialogCarStatusConfirmation
                                            }
                                        >
                                            {
                                                Strings.DialogShowScheduleDriver
                                                    .RECEIVE_SCHEDULE
                                            }
                                        </ButtonFeatures>
                                    )}

                                {/* MOVING_COMFIRMATION BUTTON */}
                                {item.idScheduleStatus ==
                                    Constants.ScheduleStatusCode.RECEIVED && (
                                    <ButtonFeatures
                                        size="small"
                                        variant="contained"
                                        endIcon={<CheckCircleIcon />}
                                        sx={{
                                            marginRight: 1,
                                            backgroundColor:
                                                Constants.ColorOfScheduleStatus
                                                    .Background.MOVING,
                                        }}
                                        onClick={handleConfirmMoving}
                                    >
                                        {
                                            Strings.DialogShowScheduleDriver
                                                .MOVING_COMFIRMATION
                                        }
                                    </ButtonFeatures>
                                )}

                                {/* COMPLETE_COMFIRMATION BUTTON */}
                                {item.idScheduleStatus ==
                                    Constants.ScheduleStatusCode.MOVING && (
                                    <ButtonFeatures
                                        size="small"
                                        variant="contained"
                                        endIcon={<CheckCircleIcon />}
                                        sx={{
                                            marginRight: 1,
                                            backgroundColor:
                                                Constants.ColorOfScheduleStatus
                                                    .Background.COMPLETE,
                                        }}
                                        onClick={
                                            handleOpenDialogCarStatusConfirmation
                                        }
                                    >
                                        {
                                            Strings.DialogShowScheduleDriver
                                                .COMPLETE_COMFIRMATION
                                        }
                                    </ButtonFeatures>
                                )}
                            </Box>
                        </DialogActions>
                    </Box>
                );
            })}

            <DialogCarStatusConfirmation
                open={dialogCarStatusConfirmation.open}
                handleClose={() =>
                    setDialogCarStatusConfirmation({
                        ...dialogCarStatusConfirmation,
                        open: false,
                    })
                }
                idSchedule={dialogCarStatusConfirmation.idSchedule}
                idScheduleStatus={dialogCarStatusConfirmation.idScheduleStatus}
                openModalSuccessOfDialogShowSheduleDriver={() =>
                    setModalSuccess(true)
                }
                getScheduleOfDialogShowSheduleDriver={getSchedule}
                getDriverScheduleListOfDriverTripManager={
                    getDriverScheduleListOfDriverTripManager
                }
            />

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

export default DialogShowScheduleDriver;
