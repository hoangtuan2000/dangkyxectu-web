import { useState, useEffect } from "react";
import {
    Badge,
    Box,
    DialogActions,
    DialogContent,
    ListItem,
    ListItemText,
    Rating,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import {
    BoxComment,
    BoxLeft,
    BoxRight,
    ButtonFeatures,
    CarTypeTitle,
    DialogContainer,
    FabStyle,
    Img,
    ListStyle,
    MultipleTextInput,
    TextContent,
    Title,
} from "./DialogShowInfoDriverCustomStyles";
import QrCodeIcon from "@mui/icons-material/QrCode";
import PaymentIcon from "@mui/icons-material/Payment";
import InfoIcon from "@mui/icons-material/Info";
import CreateIcon from "@mui/icons-material/Create";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import NearMeIcon from "@mui/icons-material/NearMe";
import UpdateIcon from "@mui/icons-material/Update";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Constants from "../../../constants/Constants";
import Strings from "../../../constants/Strings";
import helper from "../../../common/helper";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import DataGridCustom from "../../dataGridCustom/DataGridCustom";
import col from "./columnsDialogShowInfoDriverDataGrid";
import { DialogShowInfoDriverServices } from "../../../services/adminServices/DialogShowInfoDriverServices";
import DialogShowScheduleGlobal from "../../dialogShowScheduleGlobal/DialogShowScheduleGlobal";
import DialogCarRegistrationManagementFilter from "../dialogCarRegistrationManagementFilter/DialogCarRegistrationManagementFilter";
import DialogShowInfoDriverFilter from "../dialogShowInfoDriverFilter/DialogShowInfoDriverFilter";

function DialogShowInfoDriver({ open, handleClose, idDriver }) {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });
    const [totalDataFilter, setTotalDataFilter] = useState(null);

    const [dataInfo, setDataInfo] = useState({
        page: Constants.Common.PAGE,
        pageSize: Constants.Common.LIMIT_ENTRY,
        totalRows: 0,
    });

    const [
        dialogShowInfoDriverFilter,
        setDialogShowInfoDriverFilter,
    ] = useState(false);

    const [dataFilter, setDataFilter] = useState({
        status: [],
        carType: [],
        faculty: [],
        infoUser: null,
        infoDriver: null,
        licensePlates: null,
        scheduleCode: null,
        address: null,
        ward: null,
        district: null,
        province: null,
        startDate: null,
        endDate: null,
    });

    const [dialogShowScheduleGlobal, setDialogShowScheduleGlobal] = useState({
        open: false,
        idSchedule: null,
    });

    const [scheduleList, setScheduleList] = useState([]);
    const [driver, setDriver] = useState([]);

    const getInfoDriver = async () => {
        const res = await DialogShowInfoDriverServices.getInfoDriver({
            idDriver: idDriver,
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setDriver(res.data.data);
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

    const getScheduleListOfDriver = async (
        page = dataInfo.page,
        pageSize = dataInfo.pageSize,
        status,
        carType,
        faculty,
        infoUser,
        infoDriver,
        licensePlates,
        scheduleCode,
        address,
        idWard,
        startDate,
        endDate
    ) => {
        const data = {
            idDriver: idDriver,
            page: page,
            limitEntry: pageSize,
            status,
            carType,
            faculty,
            infoUser,
            infoDriver,
            licensePlates,
            scheduleCode,
            address,
            idWard,
            startDate,
            endDate,
        };
        const res = await DialogShowInfoDriverServices.getScheduleListOfDriver({
            ...data,
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setDataInfo({
                    page: res.data.page,
                    pageSize: res.data.limitEntry,
                    totalRows: res.data.sizeQuerySnapshot,
                });
                setScheduleList(
                    res.data.data.map((item, index) => {
                        return {
                            id:
                                res.data.limitEntry * res.data.page -
                                res.data.limitEntry +
                                index +
                                1,
                            imageCar: item.image,
                            type: `${item.carType} ${item.seatNumber} Chổ`,
                            licensePlates: item.licensePlates,
                            fullName: `${item.fullNameUser} - ${item.codeUser}`,
                            faculty: item.nameFaculty,
                            // reason: item.reason,
                            destination: `${item.endLocation} - ${item.wardEnd} - ${item.districtEnd} - ${item.provinceEnd}`,
                            startDate: item.startDate,
                            endDate: item.endDate,
                            status: item.scheduleStatus,
                            review: item.starNumber,
                            scheduleCode: item.idSchedule,
                            // update: item.startDate, //check startdate > current date => cancel schedule
                            // driver:
                            //     item.fullNameDriver && item.codeDriver
                            //         ? `${item.fullNameDriver} - ${item.codeDriver}`
                            //         : "",
                        };
                    })
                );
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

    const handleChangePage = async (e) => {
        setDataInfo({ ...dataInfo, page: e });
        // const data = await handleFormatDataFilterSendApi(dataFilter);
        await getScheduleListOfDriver(
            e,
            dataInfo.pageSize
            // data.status,
            // data.carType,
            // data.faculty,
            // data.infoUser,
            // data.infoDriver,
            // data.licensePlates,
            // data.scheduleCode,
            // data.address,
            // data.idWard,
            // data.startDate,
            // data.endDate
        );
    };

    const handleChangeRowsPerPage = async (e) => {
        setDataInfo({ ...dataInfo, pageSize: e });
        // const data = await handleFormatDataFilterSendApi(dataFilter);
        await getScheduleListOfDriver(
            dataInfo.page,
            e
            // data.status,
            // data.carType,
            // data.faculty,
            // data.infoUser,
            // data.infoDriver,
            // data.licensePlates,
            // data.scheduleCode,
            // data.address,
            // data.idWard,
            // data.startDate,
            // data.endDate
        );
    };

    const handleShowSchedule = (e) => {
        setDialogShowScheduleGlobal({
            ...dialogShowScheduleGlobal,
            open: true,
            idSchedule: e,
        });
    };

    const handleFilter = (e) => {
        //format data to send API
        let status = [];
        let carType = [];
        let faculty = [];
        if (helper.isArray(e.status) && e.status.length > 0) {
            status = e.status.map((item) => {
                return item.idScheduleStatus;
            });
        }
        if (helper.isArray(e.carType) && e.carType.length > 0) {
            carType = e.carType.map((item) => {
                return item.idCarType;
            });
        }
        if (helper.isArray(e.faculty) && e.faculty.length > 0) {
            faculty = e.faculty.map((item) => {
                return item.idFaculty;
            });
        }

        //reset page and pageSize => call getUserRegisteredScheduleList function
        getScheduleListOfDriver(
            Constants.Common.PAGE,
            dataInfo.pageSize,
            status,
            carType,
            faculty,
            e.infoUser,
            e.infoDriver,
            e.licensePlates,
            e.scheduleCode,
            e.address,
            e.ward && e.ward.idWard,
            e.startDate,
            e.endDate
        );

        // save data filter in dialogShowInfoDriverFilter => default value in dialogShowInfoDriverFilter
        setDataFilter({
            status: [...e.status],
            carType: [...e.carType],
            faculty: [...e.faculty],
            infoUser: e.infoUser,
            infoDriver: e.infoDriver,
            licensePlates: e.licensePlates,
            scheduleCode: e.scheduleCode,
            address: e.address,
            ward: e.ward,
            district: e.district,
            province: e.province,
            startDate: e.startDate,
            endDate: e.endDate,
        });

        // show total data to filter in UI => button filter
        let total = status.length + carType.length + faculty.length;
        if (e.scheduleCode) total += 1;
        if (e.ward) total += 1;
        if (e.infoUser) total += 1;
        if (e.infoDriver) total += 1;
        if (e.licensePlates) total += 1;
        if (e.startDate && e.endDate) total += 1;
        setTotalDataFilter(total > 0 ? total : null);
    };

    const handleRefreshDataFilter = () => {
        setDataFilter({
            status: [],
            carType: [],
            faculty: [],
            infoUser: null,
            infoDriver: null,
            licensePlates: null,
            scheduleCode: null,
            address: null,
            ward: null,
            district: null,
            province: null,
            startDate: null,
            endDate: null,
        });
    };

    const run = async () => {
        await setBackDrop(true);
        (await open) && getInfoDriver();
        (await open) && getScheduleListOfDriver();
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    useEffect(() => {
        open && run();
    }, [idDriver, open]);

    return (
        <DialogContainer
            open={open}
            onClose={handleClose}
            scroll="body"
            fullWidth={true}
        >
            {/* CONTENT */}
            <DialogContent>
                <Box>
                    {/* TITLE */}
                    <Title>{Strings.DialogShowInfoDriver.TITLE}</Title>

                    {/* CONTENT */}
                    {driver.map((item, index) => {
                        const address = `${item.address} - ${item.nameWard} - ${item.nameDistrict} - ${item.nameProvince}`;
                        let textColor = theme.palette.text.primary;
                        const objUserStatusCode = Constants.UserStatusCode;
                        for (const property in objUserStatusCode) {
                            if (
                                item.idUserStatus ==
                                `${objUserStatusCode[property]}`
                            ) {
                                textColor =
                                    Constants.ColorOfUserStatus.Text[property];
                                break;
                            }
                        }
                        return (
                            <Box
                                key={index}
                                sx={{
                                    display: "inline-flex",
                                    justifyContent: "flex-start",
                                    width: "100%",
                                }}
                            >
                                <Box
                                    sx={{
                                        maxWidth: "60%",
                                        width: "fit-content",
                                        marginRight: 5,
                                    }}
                                >
                                    <ListStyle>
                                        {/* CODE DRIVER */}
                                        <ListItem>
                                            <QrCodeIcon />
                                            <Tooltip title={item.code} arrow>
                                                <ListItemText
                                                    primary={
                                                        Strings
                                                            .DialogShowInfoDriver
                                                            .CODE_DRIVER
                                                    }
                                                    secondary={item.code}
                                                />
                                            </Tooltip>
                                        </ListItem>

                                        {/* FULL_NAME */}
                                        <ListItem>
                                            <PersonIcon />
                                            <Tooltip
                                                title={item.fullName}
                                                arrow
                                            >
                                                <ListItemText
                                                    primary={
                                                        Strings
                                                            .DialogShowInfoDriver
                                                            .FULL_NAME
                                                    }
                                                    secondary={item.fullName}
                                                />
                                            </Tooltip>
                                        </ListItem>

                                        {/* EMAIL */}
                                        <ListItem>
                                            <EmailIcon />
                                            <Tooltip title={item.email} arrow>
                                                <ListItemText
                                                    primary={
                                                        Strings
                                                            .DialogShowInfoDriver
                                                            .EMAIL
                                                    }
                                                    secondary={item.email}
                                                />
                                            </Tooltip>
                                        </ListItem>

                                        {/* PHONE */}
                                        <ListItem>
                                            <LocalPhoneIcon />
                                            <Tooltip title={item.phone} arrow>
                                                <ListItemText
                                                    primary={
                                                        Strings
                                                            .DialogShowInfoDriver
                                                            .PHONE
                                                    }
                                                    secondary={item.phone}
                                                />
                                            </Tooltip>
                                        </ListItem>

                                        {/* ADDRESS */}
                                        <ListItem>
                                            <LocationOnIcon />
                                            <Tooltip title={address} arrow>
                                                <ListItemText
                                                    primary={
                                                        Strings
                                                            .DialogShowInfoDriver
                                                            .ADDRESS
                                                    }
                                                    secondary={address}
                                                />
                                            </Tooltip>
                                        </ListItem>

                                        {/* REVIEW */}
                                        <ListItem>
                                            <StarIcon />
                                            <Tooltip
                                                title={item.averageStar || 0}
                                                arrow
                                            >
                                                <ListItemText
                                                    primary={
                                                        Strings
                                                            .DialogShowInfoDriver
                                                            .REVIEW
                                                    }
                                                    secondary={
                                                        <Box>
                                                            <Rating
                                                                name="read-only"
                                                                value={
                                                                    item.averageStar
                                                                }
                                                                readOnly
                                                                size="small"
                                                                sx={{
                                                                    "& .MuiSvgIcon-root":
                                                                        {
                                                                            color: "orange",
                                                                        },
                                                                }}
                                                            />
                                                        </Box>
                                                    }
                                                />
                                            </Tooltip>
                                        </ListItem>
                                    </ListStyle>
                                </Box>

                                <Box
                                    sx={{
                                        maxWidth: "40%",
                                        width: "fit-content",
                                    }}
                                >
                                    <ListStyle>
                                        {/* DRIVER_LICENSE */}
                                        <ListItem>
                                            <PaymentIcon />
                                            <Tooltip
                                                title={item.nameDriverLicense}
                                                arrow
                                            >
                                                <ListItemText
                                                    primary={
                                                        Strings
                                                            .DialogShowInfoDriver
                                                            .DRIVER_LICENSE
                                                    }
                                                    secondary={
                                                        item.nameDriverLicense
                                                    }
                                                />
                                            </Tooltip>
                                        </ListItem>

                                        {/* LICENSE_TERM */}
                                        <ListItem>
                                            <AccessTimeIcon />
                                            <Tooltip
                                                title={helper.formatDateStringFromTimeStamp(
                                                    item.driverLicenseExpirationDate
                                                )}
                                                arrow
                                            >
                                                <ListItemText
                                                    primary={
                                                        Strings
                                                            .DialogShowInfoDriver
                                                            .LICENSE_TERM
                                                    }
                                                    secondary={helper.formatDateStringFromTimeStamp(
                                                        item.driverLicenseExpirationDate
                                                    )}
                                                />
                                            </Tooltip>
                                        </ListItem>

                                        {/* STATUS */}
                                        <ListItem>
                                            <InfoIcon />
                                            <Tooltip
                                                title={item.nameUserStatus}
                                                arrow
                                            >
                                                <ListItemText
                                                    primary={
                                                        Strings
                                                            .DialogShowInfoDriver
                                                            .STATUS
                                                    }
                                                    secondary={
                                                        <span
                                                            style={{
                                                                color: textColor,
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            {
                                                                item.nameUserStatus
                                                            }
                                                        </span>
                                                    }
                                                />
                                            </Tooltip>
                                        </ListItem>

                                        {/* CREATED_AT */}
                                        <ListItem>
                                            <CreateIcon />
                                            <Tooltip
                                                title={helper.formatDateTimeStringFromTimeStamp(
                                                    item.createdAt
                                                )}
                                                arrow
                                            >
                                                <ListItemText
                                                    primary={
                                                        Strings
                                                            .DialogShowInfoDriver
                                                            .CREATED_AT
                                                    }
                                                    secondary={helper.formatDateTimeStringFromTimeStamp(
                                                        item.createdAt
                                                    )}
                                                />
                                            </Tooltip>
                                        </ListItem>

                                        {/* UPDATED_AT */}
                                        <ListItem>
                                            <UpdateIcon />
                                            <Tooltip
                                                title={
                                                    item.updatedAt
                                                        ? helper.formatDateTimeStringFromTimeStamp(
                                                              item.updatedAt
                                                          )
                                                        : ""
                                                }
                                                arrow
                                            >
                                                <ListItemText
                                                    primary={
                                                        Strings
                                                            .DialogShowInfoDriver
                                                            .UPDATED_AT
                                                    }
                                                    secondary={helper.formatDateTimeStringFromTimeStamp(
                                                        item.updatedAt
                                                    )}
                                                />
                                            </Tooltip>
                                        </ListItem>

                                        {/* UPDATER */}
                                        {item.fullNameUserUpdate &&
                                            item.codeUserUpdate && (
                                                <ListItem>
                                                    <ManageAccountsIcon />
                                                    <Tooltip
                                                        title={`${item.fullNameUserUpdate} - ${item.codeUserUpdate}`}
                                                        arrow
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                Strings
                                                                    .DialogShowInfoDriver
                                                                    .UPDATER
                                                            }
                                                            secondary={`${item.fullNameUserUpdate} - ${item.codeUserUpdate}`}
                                                        />
                                                    </Tooltip>
                                                </ListItem>
                                            )}
                                    </ListStyle>
                                </Box>
                            </Box>
                        );
                    })}

                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h6"
                                sx={{ fontSize: 15 }}
                            >
                                {Strings.DialogShowInfoDriver.SCHEDULE_LIST}
                            </Typography>

                            {/* FILTER BUTTON */}
                            <Tooltip title={Strings.Common.FILTER}>
                                <FabStyle
                                    color="primary"
                                    size="small"
                                    onClick={() =>
                                        setDialogShowInfoDriverFilter(
                                            true
                                        )
                                    }
                                >
                                    <Badge
                                        badgeContent={totalDataFilter}
                                        color="error"
                                    >
                                        <FilterAltIcon />
                                    </Badge>
                                </FabStyle>
                            </Tooltip>
                        </Box>

                        <DataGridCustom
                            columns={col((e) => handleShowSchedule(e))}
                            rows={scheduleList}
                            {...dataInfo}
                            onChangePage={(e) => {
                                handleChangePage(e);
                            }}
                            onChangeRowsPerPage={(e) => {
                                handleChangeRowsPerPage(e);
                            }}
                        />
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
                </Box>
            </DialogActions>

            <DialogShowScheduleGlobal
                open={dialogShowScheduleGlobal.open}
                handleClose={() =>
                    setDialogShowScheduleGlobal({
                        ...dialogShowScheduleGlobal,
                        open: false,
                    })
                }
                idSchedule={dialogShowScheduleGlobal.idSchedule}
            />

            <DialogShowInfoDriverFilter
                open={dialogShowInfoDriverFilter}
                handleClose={() =>
                    setDialogShowInfoDriverFilter(false)
                }
                onSubmit={(e) => handleFilter(e)}
                defaultStatus={dataFilter.status}
                defaultCarType={dataFilter.carType}
                defaultFaculty={dataFilter.faculty}
                defaultInfoUser={dataFilter.infoUser}
                defaultInfoDriver={dataFilter.infoDriver}
                defaultLicensePlates={dataFilter.licensePlates}
                defaultScheduleCode={dataFilter.scheduleCode}
                defaultAddress={dataFilter.address}
                defaultWard={dataFilter.ward}
                defaultDistrict={dataFilter.district}
                defaultProvince={dataFilter.province}
                defaultStartDate={dataFilter.startDate}
                defaultEndDate={dataFilter.endDate}
                handleRefreshDataFilter={handleRefreshDataFilter}
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

export default DialogShowInfoDriver;
