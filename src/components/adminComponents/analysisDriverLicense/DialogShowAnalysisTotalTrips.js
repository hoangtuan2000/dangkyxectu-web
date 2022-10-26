import { useState, useEffect } from "react";
import {
    Badge,
    Box,
    Checkbox,
    DialogActions,
    DialogContent,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Tooltip,
    useTheme,
} from "@mui/material";
import {
    ButtonFeatures,
    DialogContainer,
    FormGroupStyle,
    TextInput,
    Title,
} from "./DialogShowAnalysisTotalTripsCustomStyles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import DataGridCustom from "../../dataGridCustom/DataGridCustom";
import Constants from "../../../constants/Constants";
import col from "./columnsDialogShowAnalysisTotalTripsDataGrid";
import { DialogChangeCarServices } from "../../../services/adminServices/DialogChangeCarServices";
import DialogConfirmation from "../../dialogConfirmation/DialogConfirmation";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { AnalysisTotalTripsServices } from "../../../services/adminServices/AnalysisTotalTripsServices";
import helper from "../../../common/helper";
import DialogShowScheduleGlobal from "../../dialogShowScheduleGlobal/DialogShowScheduleGlobal";
import { FabStyle } from "./DialogShowAnalysisTotalTripsCustomStyles";
import DialogShowAnalysisTotalTripsFilter from "./DialogShowAnalysisTotalTripsFilter";

function DialogShowAnalysisTotalTrips({
    open,
    handleClose,
    startDate,
    endDate,
}) {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });
    const [dataInfo, setDataInfo] = useState({
        page: Constants.Common.PAGE,
        pageSize: Constants.Common.LIMIT_ENTRY,
        totalRows: 0,
    });

    const [totalDataFilter, setTotalDataFilter] = useState(null);
    const [title, setTitle] = useState();

    const [
        dialogShowAnalysisTotalTripsFilter,
        setDialogShowAnalysisTotalTripsFilter,
    ] = useState(false);

    const [dialogShowScheduleGlobal, setDialogShowScheduleGlobal] = useState({
        open: false,
        idSchedule: null,
    });

    const [dataFilter, setDataFilter] = useState({
        status: [],
        carType: [],
        faculty: [],
        haveSchedule: null,
        infoUser: null,
        infoDriver: null,
        licensePlates: null,
        scheduleCode: null,
        address: null,
        ward: null,
        district: null,
        province: null,
        startDateSchedule: null,
        endDateSchedule: null,
    });

    const [scheduleList, setScheduleList] = useState([]);

    const getDataTotalNumberOfTripsOverTime = async (
        page = dataInfo.page,
        pageSize = dataInfo.pageSize,
        haveSchedule,
        status,
        carType,
        faculty,
        infoUser,
        infoDriver,
        licensePlates,
        scheduleCode,
        address,
        idWard,
        startDateSchedule,
        endDateSchedule
    ) => {
        const data = {
            page: page,
            limitEntry: pageSize,
            startDate: startDate,
            endDate: endDate,
            haveSchedule,
            status,
            carType,
            faculty,
            infoUser,
            infoDriver,
            licensePlates,
            scheduleCode,
            address,
            idWard,
            startDateSchedule,
            endDateSchedule,
        };
        const res =
            await AnalysisTotalTripsServices.getDataTotalNumberOfTripsOverTime({
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
                            date: item.date,
                            idSchedule: item.idSchedule,
                            startDate: item.startDate,
                            endDate: item.endDate,
                            infoUser:
                                item.fullNameUser &&
                                item.codeUser &&
                                `${item.fullNameUser} - ${item.codeUser}`,
                            infoDriver:
                                item.fullNameDriver &&
                                item.codeDriver &&
                                `${item.fullNameDriver} - ${item.codeDriver}`,
                            scheduleStatusCode: item.idScheduleStatus,
                            scheduleStatus: item.nameScheduleStatus,
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
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getDataTotalNumberOfTripsOverTime(
            e,
            dataInfo.pageSize,
            data.haveSchedule,
            data.status,
            data.carType,
            data.faculty,
            data.infoUser,
            data.infoDriver,
            data.licensePlates,
            data.scheduleCode,
            data.address,
            data.idWard,
            data.startDateSchedule,
            data.endDateSchedule
        );
    };

    const handleChangeRowsPerPage = async (e) => {
        setDataInfo({ ...dataInfo, pageSize: e });
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getDataTotalNumberOfTripsOverTime(
            dataInfo.page,
            e,
            data.haveSchedule,
            data.status,
            data.carType,
            data.faculty,
            data.infoUser,
            data.infoDriver,
            data.licensePlates,
            data.scheduleCode,
            data.address,
            data.idWard,
            data.startDateSchedule,
            data.endDateSchedule
        );
    };

    const handleFormatDataFilterSendApi = (data) => {
        //format data to send API
        let status = [];
        let carType = [];
        let faculty = [];
        if (helper.isArray(data.status) && data.status.length > 0) {
            status = data.status.map((item) => {
                return item.idScheduleStatus;
            });
        }
        if (helper.isArray(data.carType) && data.carType.length > 0) {
            carType = data.carType.map((item) => {
                return item.idCarType;
            });
        }
        if (helper.isArray(data.faculty) && data.faculty.length > 0) {
            faculty = data.faculty.map((item) => {
                return item.idFaculty;
            });
        }

        return {
            status,
            carType,
            faculty,
            haveSchedule: data.haveSchedule,
            infoUser: data.infoUser,
            infoDriver: data.infoDriver,
            licensePlates: data.licensePlates,
            scheduleCode: data.scheduleCode,
            address: data.address,
            idWard: data.ward && data.ward.idWard,
            startDateSchedule: data.startDateSchedule,
            endDateSchedule: data.endDateSchedule,
        };
    };

    // const handleGetDataTotalNumberOfTripsOverTimeWithFilter = async () => {
    //     const data = await handleFormatDataFilterSendApi(dataFilter);
    //     await getDataTotalNumberOfTripsOverTime(
    //         dataInfo.page,
    //         dataInfo.pageSize,
    //         data.status,
    //         data.carType,
    //         data.faculty,
    //         data.infoUser,
    //         data.infoDriver,
    //         data.licensePlates,
    //         data.scheduleCode,
    //         data.address,
    //         data.idWard,
    //         data.startDateSchedule,
    //         data.endDateSchedule
    //     );
    // };

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
        getDataTotalNumberOfTripsOverTime(
            Constants.Common.PAGE,
            dataInfo.pageSize,
            e.haveSchedule,
            status,
            carType,
            faculty,
            e.infoUser,
            e.infoDriver,
            e.licensePlates,
            e.scheduleCode,
            e.address,
            e.ward && e.ward.idWard,
            e.startDateSchedule,
            e.endDateSchedule
        );

        // save data filter in dialogCarRegistrationManagementFilter => default value in dialogCarRegistrationManagementFilter
        setDataFilter({
            status: [...e.status],
            carType: [...e.carType],
            faculty: [...e.faculty],
            haveSchedule: e.haveSchedule,
            infoUser: e.infoUser,
            infoDriver: e.infoDriver,
            licensePlates: e.licensePlates,
            scheduleCode: e.scheduleCode,
            address: e.address,
            ward: e.ward,
            district: e.district,
            province: e.province,
            startDateSchedule: e.startDateSchedule,
            endDateSchedule: e.endDateSchedule,
        });

        // show total data to filter in UI => button filter
        let total = status.length + carType.length + faculty.length;
        if (e.scheduleCode) total += 1;
        if (e.haveSchedule) total += 1;
        if (e.ward) total += 1;
        if (e.infoUser) total += 1;
        if (e.infoDriver) total += 1;
        if (e.licensePlates) total += 1;
        if (e.startDateSchedule && e.endDateSchedule) total += 1;
        setTotalDataFilter(total > 0 ? total : null);
    };

    const handleRefreshDataFilter = () => {
        setDataFilter({
            status: [],
            carType: [],
            faculty: [],
            haveSchedule: null,
            infoUser: null,
            infoDriver: null,
            licensePlates: null,
            scheduleCode: null,
            address: null,
            ward: null,
            district: null,
            province: null,
            startDateSchedule: null,
            endDateSchedule: null,
        });
    };

    const handleShowSchedule = (e) => {
        setDialogShowScheduleGlobal({
            ...dialogShowScheduleGlobal,
            open: true,
            idSchedule: e,
        });
    };

    const run = async () => {
        await setBackDrop(true);
        (await open) && getDataTotalNumberOfTripsOverTime(Constants.Common.PAGE, Constants.Common.LIMIT_ENTRY);
        if (startDate && endDate) {
            const startTime = helper.formatDateStringFromTimeStamp(
                startDate / 1000
            );
            const endTime = helper.formatDateStringFromTimeStamp(
                endDate / 1000
            );
            setTitle(` Từ ${startTime} - ${endTime}`);
        } else {
            const currentDate = new Date();
            const startTime = new Date(
                currentDate.setDate(currentDate.getDate() - 7)
            ).toLocaleDateString("en-GB");
            const endTime = new Date().toLocaleDateString("en-GB");
            setTitle(` Từ ${startTime} - ${endTime}`);
        }
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };    

    useEffect(() => {
        run();
    }, [open, startDate, endDate]);

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
                    <Title>
                        {Strings.DialogShowAnalysisTotalTrips.TITLE}
                        {title}
                    </Title>

                    {/* FILTER BUTTON */}
                    <Tooltip title={Strings.Common.FILTER}>
                        <FabStyle
                            color="primary"
                            size="small"
                            onClick={() =>
                                setDialogShowAnalysisTotalTripsFilter(true)
                            }
                        >
                            <Badge badgeContent={totalDataFilter} color="error">
                                <FilterAltIcon />
                            </Badge>
                        </FabStyle>
                    </Tooltip>

                    {/* CONTENT */}
                    <Box>
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

            <DialogShowAnalysisTotalTripsFilter
                open={dialogShowAnalysisTotalTripsFilter}
                handleClose={() => setDialogShowAnalysisTotalTripsFilter(false)}
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
                defaultStartDateSchedule={dataFilter.startDateSchedule}
                defaultEndDateSchedule={dataFilter.endDateSchedule}
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

export default DialogShowAnalysisTotalTrips;
