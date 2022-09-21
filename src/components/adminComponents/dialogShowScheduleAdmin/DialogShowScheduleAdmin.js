import { useState, useEffect } from "react";
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    ListItem,
    ListItemText,
    TextField,
    Tooltip,
    useTheme,
} from "@mui/material";
import {
    AutocompleteStyle,
    BoxLeft,
    BoxRight,
    ButtonFeatures,
    CarTypeTitle,
    DialogContainer,
    Img,
    ListStyle,
    TextContent,
    Title,
} from "./DialogShowScheduleAdminCustomStyles";
import CreateIcon from "@mui/icons-material/Create";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import NearMeIcon from "@mui/icons-material/NearMe";
import UpdateIcon from "@mui/icons-material/Update";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import Constants from "../../../constants/Constants";
import { DialogShowScheduleAdminServices } from "../../../services/adminServices/DialogShowScheduleAdminServices";
import helper from "../../../common/helper";

function DialogShowScheduleAdmin({
    open,
    handleClose,
    idSchedule,
    titleDialog,
}) {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [schedule, setSchedule] = useState([]);
    const [driverList, setDriverList] = useState([]);
    const [scheduleStatusList, setScheduleStatusList] = useState([]);
    const [dataSendApi, setDataSendApi] = useState({
        idSchedule: idSchedule || null,
        status: null,
        driver: null,
    });
    const [errorDataSendApi, setErrorDataSendApi] = useState({
        errorStatus: false,
        errorDriver: false,
    });

    const getSchedule = async () => {
        const res = await DialogShowScheduleAdminServices.getSchedule({
            idSchedule: idSchedule,
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setSchedule(res.data.data);

                if (
                    res.data.data[0].scheduleStatus ==
                        Constants.ScheduleStatus.PENDING &&
                    helper.isDateTimeStampGreaterThanCurrentDate(
                        res.data.data[0].startDate
                    )
                ) {
                    getScheduleStatusList();
                    setDataSendApi({
                        ...dataSendApi,
                        status: {
                            idScheduleStatus: res.data.data[0].idScheduleStatus,
                            name: res.data.data[0].scheduleStatus,
                        },
                    });
                }

                if (res.data.data[0].idDriver) {
                    setDataSendApi({
                        ...dataSendApi,
                        driver: {
                            idDriver: res.data.data[0].idDriver,
                            fullNameDriver: res.data.data[0].fullNameDriver,
                            codeDriver: res.data.data[0].codeDriver,
                        },
                    });
                    getDriverListForSchedule(
                        res.data.data[0].idCar,
                        res.data.data[0].startDate,
                        res.data.data[0].endDate
                    );
                }
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

    const getDriverListForSchedule = async (idCar, startDate, endDate) => {
        const res =
            await DialogShowScheduleAdminServices.getDriverListForSchedule({
                idCar,
                startDate,
                endDate,
            });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setDriverList(res.data.data);
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

    const getScheduleStatusList = async () => {
        const res =
            await DialogShowScheduleAdminServices.getScheduleStatusList();
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setScheduleStatusList(res.data.data);
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

    const handleSelectStatus = (value) => {
        setDataSendApi({
            ...dataSendApi,
            status: value,
            driver: null,
        });
        getDriverListForSchedule(
            schedule[0].idCar,
            schedule[0].startDate,
            schedule[0].endDate
        );
    };

    const handleSelectDriver = (value) => {
        setDataSendApi({
            ...dataSendApi,
            driver: value,
        });
    };

    const handleScheduleCompletionConfirmation = () => {
        //update status complete
    };

    const handleUpdateSchedule = () => {
        // if schedule approved => only update driver
        if (
            schedule[0].idScheduleStatus ==
            Constants.ScheduleStatusCode.APPROVED
        ) {
            if (helper.isNullOrEmpty(dataSendApi.driver.idDriver)) {
                setErrorDataSendApi({
                    ...errorDataSendApi,
                    errorDriver: true,
                });
            } else {
                //submit
            }
        }
        // if schedule pending => update status or driver
        else {
            // if select the schedule status as approved => update status and driver
            if (
                dataSendApi.status.idScheduleStatus ==
                Constants.ScheduleStatusCode.APPROVED
            ) {
                if (
                    helper.isNullOrEmpty(dataSendApi.driver.idDriver) ||
                    helper.isNullOrEmpty(dataSendApi.status.idScheduleStatus)
                ) {
                    setErrorDataSendApi({
                        ...errorDataSendApi,
                        errorDriver: helper.isNullOrEmpty(
                            dataSendApi.driver.idDriver
                        )
                            ? true
                            : false,
                        errorStatus: helper.isNullOrEmpty(
                            dataSendApi.status.idScheduleStatus
                        )
                            ? true
                            : false,
                    });
                } else {
                    //submit
                }
            }
            // if selecting schedule status is not approved => only update status
            else {
                if (helper.isNullOrEmpty(dataSendApi.status.idScheduleStatus)) {
                    setErrorDataSendApi({
                        ...errorDataSendApi,
                        errorStatus: true,
                    });
                } else {
                    //submit
                }
            }
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
                        colorCarStatus = Constants.ColorOfCarStatus[property];
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
                                    {/* INFO CAR AND INFO ADMIN */}
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
                                                        .DialogShowScheduleAdmin
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
                                                        .DialogShowScheduleAdmin
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
                                                        .DialogShowScheduleAdmin
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

                                            {/* INFO CREATED AT AND UPDATED AT */}
                                            <Box>
                                                {/* TITLE */}
                                                <TextContent
                                                    variant="p"
                                                    component="div"
                                                >
                                                    {
                                                        Strings
                                                            .DialogShowScheduleAdmin
                                                            .TIME
                                                    }
                                                </TextContent>

                                                {/* LIST INFO TIME */}
                                                <ListStyle>
                                                    {/* CREATED AT */}
                                                    <ListItem>
                                                        <AccessTimeIcon />
                                                        <Tooltip
                                                            title={helper.formatDateTimeStringFromTimeStamp(
                                                                item.createdAt
                                                            )}
                                                            arrow
                                                        >
                                                            <ListItemText
                                                                primary={
                                                                    Strings
                                                                        .DialogShowScheduleAdmin
                                                                        .CREATED_AT
                                                                }
                                                                secondary={helper.formatDateTimeStringFromTimeStamp(
                                                                    item.createdAt
                                                                )}
                                                            />
                                                        </Tooltip>
                                                    </ListItem>

                                                    {/* UPDATED AT */}
                                                    {item.updatedAt && (
                                                        <ListItem>
                                                            <UpdateIcon />
                                                            <Tooltip
                                                                title={helper.formatDateTimeStringFromTimeStamp(
                                                                    item.updatedAt
                                                                )}
                                                                arrow
                                                            >
                                                                <ListItemText
                                                                    primary={
                                                                        Strings
                                                                            .DialogShowScheduleAdmin
                                                                            .UPDATED_AT
                                                                    }
                                                                    secondary={helper.formatDateTimeStringFromTimeStamp(
                                                                        item.updatedAt
                                                                    )}
                                                                />
                                                            </Tooltip>
                                                        </ListItem>
                                                    )}
                                                </ListStyle>
                                            </Box>

                                            {/* INFO ADMIN */}
                                            <Box>
                                                {/* TITLE */}
                                                <TextContent
                                                    variant="p"
                                                    component="div"
                                                >
                                                    {
                                                        Strings
                                                            .DialogShowScheduleAdmin
                                                            .INFO_ADMIN
                                                    }
                                                    {!item.fullNameAdmin && (
                                                        <Tooltip
                                                            title={
                                                                Strings.Common
                                                                    .UPDATING
                                                            }
                                                            arrow
                                                        >
                                                            <span>
                                                                {
                                                                    Strings
                                                                        .Common
                                                                        .UPDATING
                                                                }
                                                            </span>
                                                        </Tooltip>
                                                    )}
                                                </TextContent>

                                                {/* LIST INFO ADMIN */}
                                                {item.fullNameAdmin && (
                                                    <ListStyle>
                                                        {/* FULL NAME ADMIN */}
                                                        <ListItem>
                                                            <PersonIcon />
                                                            <Tooltip
                                                                title={`${item.fullNameAdmin} - ${item.codeAdmin}`}
                                                                arrow
                                                            >
                                                                <ListItemText
                                                                    primary={
                                                                        Strings
                                                                            .DialogShowScheduleAdmin
                                                                            .NAME_CODE
                                                                    }
                                                                    secondary={`${item.fullNameAdmin} - ${item.codeAdmin}`}
                                                                />
                                                            </Tooltip>
                                                        </ListItem>
                                                    </ListStyle>
                                                )}
                                            </Box>
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
                                                Strings.DialogShowScheduleAdmin
                                                    .TIME
                                            }
                                            <Tooltip
                                                title={`${startDate} - ${endDate}`}
                                                arrow
                                            >
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                        color:
                                                            !helper.isDateTimeStampGreaterThanCurrentDate(
                                                                item.startDate
                                                            ) &&
                                                            item.scheduleStatus ==
                                                                Constants
                                                                    .ScheduleStatus
                                                                    .PENDING
                                                                ? theme.palette
                                                                      .error
                                                                      .main
                                                                : theme.palette
                                                                      .text
                                                                      .primary,
                                                    }}
                                                >
                                                    {`${startDate} - ${endDate}`}
                                                    {!helper.isDateTimeStampGreaterThanCurrentDate(
                                                        item.startDate
                                                    ) &&
                                                    item.scheduleStatus ==
                                                        Constants.ScheduleStatus
                                                            .PENDING
                                                        ? ` ( ${Strings.Common.OUT_OF_DATE} )`
                                                        : null}
                                                </span>
                                            </Tooltip>
                                        </TextContent>

                                        {/* STATUS SCHEDULE */}
                                        <Box>
                                            {/* TEXT SCHEDULE STATUS */}
                                            <TextContent
                                                variant="p"
                                                component="div"
                                            >
                                                {
                                                    Strings
                                                        .DialogShowScheduleAdmin
                                                        .SCHEDULE_STATUS
                                                }
                                                {(item.scheduleStatus ==
                                                    Constants.ScheduleStatus
                                                        .PENDING &&
                                                    !helper.isDateTimeStampGreaterThanCurrentDate(
                                                        item.startDate
                                                    )) ||
                                                item.scheduleStatus !=
                                                    Constants.ScheduleStatus
                                                        .PENDING ? (
                                                    <Tooltip
                                                        title={
                                                            item.scheduleStatus
                                                        }
                                                        arrow
                                                    >
                                                        <span
                                                            style={{
                                                                fontWeight:
                                                                    "bold",
                                                                color: colorScheduleStatus,
                                                            }}
                                                        >
                                                            {
                                                                item.scheduleStatus
                                                            }
                                                        </span>
                                                    </Tooltip>
                                                ) : null}
                                            </TextContent>

                                            {/* SELECTBOX UPDATE SCHEDULE STATUS */}
                                            {item.scheduleStatus ==
                                                Constants.ScheduleStatus
                                                    .PENDING &&
                                                helper.isDateTimeStampGreaterThanCurrentDate(
                                                    item.startDate
                                                ) && (
                                                    <AutocompleteStyle
                                                        disablePortal={false}
                                                        size="small"
                                                        sx={{ marginBottom: 1 }}
                                                        noOptionsText={
                                                            Strings.Common
                                                                .NO_DATA
                                                        }
                                                        options={
                                                            scheduleStatusList
                                                        }
                                                        getOptionLabel={(
                                                            option
                                                        ) => `${option.name}`}
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                {...params}
                                                                placeholder={
                                                                    Strings
                                                                        .DialogDriverTripManagerFilter
                                                                        .CHOOSE_STATUS
                                                                }
                                                                error={true}
                                                            />
                                                        )}
                                                        onChange={(
                                                            event,
                                                            newValue
                                                        ) => {
                                                            handleSelectStatus(
                                                                newValue
                                                            );
                                                        }}
                                                        value={
                                                            dataSendApi.status ||
                                                            null
                                                        }
                                                        isOptionEqualToValue={(
                                                            option,
                                                            value
                                                        ) =>
                                                            option.idScheduleStatus ===
                                                            value.idScheduleStatus
                                                        }
                                                    />
                                                )}
                                        </Box>

                                        {/* INFO DRIVER */}
                                        <Box>
                                            {/* TEXT INFO DRIVER */}
                                            <TextContent
                                                variant="p"
                                                component="div"
                                            >
                                                {
                                                    Strings
                                                        .DialogShowScheduleAdmin
                                                        .DRIVER
                                                }
                                                {!item.fullNameDriver && (
                                                    <Tooltip
                                                        title={
                                                            Strings.Common
                                                                .UPDATING
                                                        }
                                                        arrow
                                                    >
                                                        <span>
                                                            {
                                                                Strings.Common
                                                                    .UPDATING
                                                            }
                                                        </span>
                                                    </Tooltip>
                                                )}
                                            </TextContent>

                                            {/* SELECTBOX UPDATE DRIVER*/}
                                            {((dataSendApi.status &&
                                                dataSendApi.status
                                                    .idScheduleStatus ==
                                                    Constants.ScheduleStatusCode
                                                        .APPROVED) ||
                                                item.scheduleStatus ==
                                                    Constants.ScheduleStatus
                                                        .APPROVED) &&
                                                helper.isDateTimeStampGreaterThanCurrentDate(
                                                    item.startDate
                                                ) && (
                                                    <AutocompleteStyle
                                                        disablePortal={false}
                                                        size="small"
                                                        sx={{ marginBottom: 1 }}
                                                        noOptionsText={
                                                            Strings.Common
                                                                .NO_DATA
                                                        }
                                                        options={driverList}
                                                        getOptionLabel={(
                                                            option
                                                        ) =>
                                                            `${option.fullNameDriver} - ${option.codeDriver}`
                                                        }
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                {...params}
                                                                placeholder={
                                                                    Strings
                                                                        .DialogDriverTripManagerFilter
                                                                        .CHOOSE_DRIVER
                                                                }
                                                            />
                                                        )}
                                                        onChange={(
                                                            event,
                                                            newValue
                                                        ) => {
                                                            handleSelectDriver(
                                                                newValue
                                                            );
                                                        }}
                                                        value={
                                                            dataSendApi.driver ||
                                                            null
                                                        }
                                                        isOptionEqualToValue={(
                                                            option,
                                                            value
                                                        ) =>
                                                            option.idDriver ===
                                                            value.idDriver
                                                        }
                                                    />
                                                )}

                                            {/* LIST INFO DRIVER */}
                                            {item.fullNameDriver && (
                                                <ListStyle>
                                                    {/* FULL NAME DRIVER */}
                                                    <ListItem>
                                                        <PersonIcon />
                                                        <Tooltip
                                                            title={`${item.fullNameDriver} - ${item.codeDriver}`}
                                                            arrow
                                                        >
                                                            <ListItemText
                                                                primary={
                                                                    Strings
                                                                        .DialogShowScheduleAdmin
                                                                        .NAME_CODE
                                                                }
                                                                secondary={`${item.fullNameDriver} - ${item.codeDriver}`}
                                                            />
                                                        </Tooltip>
                                                    </ListItem>

                                                    {/* PHONE DRIVER */}
                                                    <ListItem>
                                                        <LocalPhoneIcon />
                                                        <Tooltip
                                                            title={
                                                                item.phoneDriver
                                                            }
                                                            arrow
                                                        >
                                                            <ListItemText
                                                                primary={
                                                                    Strings
                                                                        .DialogShowScheduleAdmin
                                                                        .PHONE
                                                                }
                                                                secondary={
                                                                    item.phoneDriver
                                                                }
                                                            />
                                                        </Tooltip>
                                                    </ListItem>

                                                    {/* EMAIL DRIVER */}
                                                    <ListItem>
                                                        <EmailIcon />
                                                        <Tooltip
                                                            title={
                                                                item.emailDriver
                                                            }
                                                            arrow
                                                        >
                                                            <ListItemText
                                                                primary={
                                                                    Strings
                                                                        .DialogShowScheduleAdmin
                                                                        .EMAIL
                                                                }
                                                                secondary={
                                                                    item.emailDriver
                                                                }
                                                            />
                                                        </Tooltip>
                                                    </ListItem>
                                                </ListStyle>
                                            )}
                                        </Box>

                                        {/* INFO USER */}
                                        <Box>
                                            {/* TITLE */}
                                            <TextContent
                                                variant="p"
                                                component="div"
                                            >
                                                {
                                                    Strings
                                                        .DialogShowScheduleAdmin
                                                        .INFO_SUBSCRIBERS
                                                }
                                            </TextContent>

                                            {/* LIST INFO USER */}
                                            <ListStyle>
                                                {/* FULL NAME USER */}
                                                <ListItem>
                                                    <PersonIcon />
                                                    <Tooltip
                                                        title={`${item.fullNameUser} - ${item.codeUser}`}
                                                        arrow
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                Strings
                                                                    .DialogShowScheduleAdmin
                                                                    .NAME_CODE_FACULTY
                                                            }
                                                            secondary={`${item.fullNameUser} - ${item.codeUser} - ${item.nameFaculty}`}
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
                                                                    .DialogShowScheduleAdmin
                                                                    .PHONE
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
                                                                    .DialogShowScheduleAdmin
                                                                    .EMAIL
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
                                                        .DialogShowScheduleAdmin
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
                                                                    .DialogShowScheduleAdmin
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
                                                                    .DialogShowScheduleAdmin
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
                                                                    .DialogShowScheduleAdmin
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
                                                                    .DialogShowScheduleAdmin
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

                                {/* SUBMIT BUTTON */}
                                {schedule[0].idScheduleStatus ==
                                    Constants.ScheduleStatusCode.PENDING ||
                                (schedule[0].idScheduleStatus ==
                                    Constants.ScheduleStatusCode.APPROVED &&
                                    !helper.isDateTimeStampGreaterThanOrEqualCurrentDate(
                                        schedule[0].startDate
                                    )) ? (
                                    <ButtonFeatures
                                        size="small"
                                        variant="contained"
                                        endIcon={<CheckCircleIcon />}
                                        color="primary"
                                        sx={{ marginRight: 1 }}
                                        onClick={handleUpdateSchedule}
                                    >
                                        {Strings.Common.UPDATE}
                                    </ButtonFeatures>
                                ) : null}

                                {/* COMPLETE BUTTON */}
                                {schedule[0].idScheduleStatus ==
                                    Constants.ScheduleStatusCode.APPROVED &&
                                    helper.isDateTimeStampGreaterThanOrEqualCurrentDate(
                                        schedule[0].startDate
                                    ) && (
                                        <Tooltip
                                            title={
                                                Strings.Common.CONFIRM_COMPLETED
                                            }
                                            arrow
                                        >
                                            <ButtonFeatures
                                                size="small"
                                                variant="contained"
                                                endIcon={<CheckCircleIcon />}
                                                color="success"
                                                sx={{ marginRight: 1 }}
                                                onClick={
                                                    handleScheduleCompletionConfirmation
                                                }
                                            >
                                                {Strings.Common.COMPLETE}
                                            </ButtonFeatures>
                                        </Tooltip>
                                    )}
                            </Box>
                        </DialogActions>
                    </Box>
                );
            })}

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

export default DialogShowScheduleAdmin;
