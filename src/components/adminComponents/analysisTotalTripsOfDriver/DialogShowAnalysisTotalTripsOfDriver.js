import { useState, useEffect } from "react";
import {
    Badge,
    Box,
    DialogActions,
    DialogContent,
    Tooltip,
    useTheme,
} from "@mui/material";
import {
    ButtonFeatures,
    ButtonStyle,
    DialogContainer,
    Title,
    FabStyle,
} from "./DialogShowAnalysisTotalTripsOfDriverCustomStyles";
import CancelIcon from "@mui/icons-material/Cancel";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import DataGridCustom from "../../dataGridCustom/DataGridCustom";
import Constants from "../../../constants/Constants";
import col from "./columnsDialogShowAnalysisTotalTripsOfDriverDataGrid";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import helper from "../../../common/helper";
import DialogShowScheduleGlobal from "../../dialogShowScheduleGlobal/DialogShowScheduleGlobal";
import DialogShowAnalysisTotalTripsOfFacultiesFilter from "./DialogShowAnalysisTotalTripsOfDriverFilter";
import * as XLSX from "xlsx";
import { AnalysisTotalTripsOfDriverServices } from "../../../services/adminServices/AnalysisTotalTripsOfDriverServices";

function DialogShowAnalysisTotalTripsOfDriver({
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

    const [dialogFilter, setDialogFilter] = useState(false);

    const [dialogShowScheduleGlobal, setDialogShowScheduleGlobal] = useState({
        open: false,
        idSchedule: null,
    });

    const [dataFilter, setDataFilter] = useState({
        status: [],
        carType: [],
        faculty: [],
        haveSchedule: null,
        starRating: null,
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

    const [dataList, setDataList] = useState([]);

    const getDataAnalysisTotalTripsOfDriver = async (
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
        ward,
        startDateSchedule,
        endDateSchedule,
        starRating
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
            ward,
            startDateSchedule,
            endDateSchedule,
            starRating,
        };
        const res =
            await AnalysisTotalTripsOfDriverServices.getDataAnalysisTotalTripsOfDriver(
                {
                    ...data,
                }
            );
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setDataInfo({
                    page: res.data.page,
                    pageSize: res.data.limitEntry,
                    totalRows: res.data.sizeQuerySnapshot,
                });
                let result = res.data.data;
                setDataList(
                    result.data.map((item, index) => {
                        return {
                            id:
                                res.data.limitEntry * res.data.page -
                                res.data.limitEntry +
                                index +
                                1,
                            driver: `${item.fullNameDriver} - ${item.codeDriver}`,
                            idSchedule: item.idSchedule,
                            startDate: item.startDate,
                            endDate: item.endDate,
                            infoUser:
                                item.fullNameUser &&
                                item.codeUser &&
                                `${item.fullNameUser} - ${item.codeUser}`,
                            review: item.starNumber,
                        };
                    })
                );
                if (result.date.startDate && result.date.endDate) {
                    const startDate = helper.formatDateStringFromTimeStamp(
                        result.date.startDate
                    );
                    const endDate = helper.formatDateStringFromTimeStamp(
                        result.date.endDate
                    );
                    setTitle(` Từ: ${startDate} - ${endDate}`);
                } else {
                    setTitle();
                }
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

    const getDataAnalysisTotalTripsOfDriverToExport = async () => {
        const data = await handleFormatDataFilterSendApi(dataFilter);
        const objData = {
            getAllData: true,
            startDate: startDate,
            endDate: endDate,
            haveSchedule: data.haveSchedule,
            status: data.status,
            carType: data.carType,
            faculty: data.faculty,
            infoUser: data.infoUser,
            infoDriver: data.infoDriver,
            licensePlates: data.licensePlates,
            scheduleCode: data.scheduleCode,
            address: data.address,
            idWard: data.idWard,
            startDateSchedule: data.startDateSchedule,
            endDateSchedule: data.endDateSchedule,
            starRating: data.starRating,
        };
        const res =
            await AnalysisTotalTripsOfDriverServices.getDataAnalysisTotalTripsOfDriver(
                {
                    ...objData,
                }
            );
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                return res.data.data;
            } else {
                setModalError({
                    ...modalError,
                    open: true,
                    title: res.data.message,
                    content: null,
                });
                return false;
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
            return false;
        }
    };

    const handleChangePage = async (e) => {
        setDataInfo({ ...dataInfo, page: e });
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getDataAnalysisTotalTripsOfDriver(
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
            data.endDateSchedule,
            data.starRating
        );
    };

    const handleChangeRowsPerPage = async (e) => {
        setDataInfo({ ...dataInfo, pageSize: e });
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getDataAnalysisTotalTripsOfDriver(
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
            data.endDateSchedule,
            data.starRating
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
            starRating: data.starRating,
        };
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
        getDataAnalysisTotalTripsOfDriver(
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
            e.endDateSchedule,
            e.starRating
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
            starRating: e.starRating,
        });

        // show total data to filter in UI => button filter
        let total = status.length + carType.length + faculty.length;
        if (e.starRating) total += 1;
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
            starRating: null,
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
        (await open) &&
            getDataAnalysisTotalTripsOfDriver(
                Constants.Common.PAGE,
                Constants.Common.LIMIT_ENTRY
            );
        (await open) && setTotalDataFilter(null);
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    const exportExcel = async () => {
        let getData = await getDataAnalysisTotalTripsOfDriverToExport();

        if (getData) {
            // FORMAT NAME FILE EXPORT
            let nameFile = "Danh_Sach_Lich_Trinh_Cua_Tai_Xe.xlsx";
            if (getData.date.startDate && getData.date.endDate) {
                const startDate = helper.formatDateStringFromTimeStamp(
                    getData.date.startDate
                );
                const endDate = helper.formatDateStringFromTimeStamp(
                    getData.date.endDate
                );
                nameFile = `Danh_Sach_Lich_Trinh_Cua_Tai_Xe_Tu_${startDate}_Den_${endDate}.xlsx`;
            }
            let dataExport = [
                ...getData.data.map((item) => {
                    return {
                        codeDriver: item.codeDriver,
                        fullNameDriver: item.fullNameDriver,
                        idSchedule: item.idSchedule,
                        startDate: item.startDate
                            ? helper.formatDateStringFromTimeStamp(
                                  item.startDate
                              )
                            : "",
                        endDate: item.endDate
                            ? helper.formatDateStringFromTimeStamp(item.endDate)
                            : "",
                        starNumber: item.starNumber,
                        fullNameUser: item.fullNameUser,
                        codeUser: item.codeUser,
                    };
                }),
            ];
            let wb = XLSX.utils.book_new(),
                ws = XLSX.utils.json_to_sheet(dataExport);
            XLSX.utils.book_append_sheet(wb, ws, "MySheet");
            XLSX.utils.sheet_add_aoa(
                ws,
                [
                    [
                        "Mã Tài Xế",
                        "Tên Tài Xế",
                        "Mã Lịch Trình",
                        "Ngày Đi",
                        "Ngày Về",
                        "Đánh Giá",
                        "Người Đăng Ký",
                        "Mã Người Đăng Ký",
                    ],
                ],
                {
                    origin: "A1",
                }
            );
            XLSX.writeFile(wb, nameFile);
        }
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
                        {Strings.DialogShowAnalysisTotalTripsOfDriver.TITLE}
                        {title}
                    </Title>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* FILTER BUTTON */}
                        <Tooltip title={Strings.Common.FILTER}>
                            <FabStyle
                                color="primary"
                                size="small"
                                onClick={() => setDialogFilter(true)}
                            >
                                <Badge
                                    badgeContent={totalDataFilter}
                                    color="error"
                                >
                                    <FilterAltIcon />
                                </Badge>
                            </FabStyle>
                        </Tooltip>

                        {/* EXPORT BUTTON */}
                        <ButtonStyle
                            variant="contained"
                            size="small"
                            sx={{ backgroundColor: "#02b6d6" }}
                            endIcon={<FileDownloadIcon />}
                            onClick={() => exportExcel()}
                        >
                            {Strings.Common.EXPORT}
                        </ButtonStyle>
                    </Box>

                    {/* CONTENT */}
                    <Box>
                        <DataGridCustom
                            columns={col((e) => handleShowSchedule(e))}
                            rows={dataList}
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

            <DialogShowAnalysisTotalTripsOfFacultiesFilter
                open={dialogFilter}
                handleClose={() => setDialogFilter(false)}
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
                defaultStarRating={dataFilter.starRating}
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

export default DialogShowAnalysisTotalTripsOfDriver;
