import { Badge, Box, Tooltip, Typography, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Strings from "../../../constants/Strings";
import DataGridCustom from "../../../components/dataGridCustom/DataGridCustom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Constants from "../../../constants/Constants";
import col from "./columnsCarStatusOfTripDataGrid";
import ModalError from "../../../components/modalError/ModalError";
import ModalSuccess from "../../../components/modalSuccess/ModalSuccess";
import BackDrop from "../../../components/backDrop/BackDrop";
import { CarManagerServices } from "../../../services/adminServices/CarManagerServices";
import { FabStyle, ButtonStyle } from "./CarStatusOfTripCustomStyles";
import DialogCarStatusOfTripFilter from "../../../components/adminComponents/dialogCarStatusOfTripFilter/DialogCarStatusOfTripFilter";
import helper from "../../../common/helper";
import DialogCreateCar from "../../../components/adminComponents/dialogCreateCar/DialogCreateCar";
import DialogUpdateCar from "../../../components/adminComponents/dialogUpdateCar/DialogUpdateCar";
import { CarStatusOfTripServices } from "../../../services/adminServices/CarStatusOfTripServices";
import DialogShowCarBroken from "../../../components/adminComponents/dialogShowCarBroken/DialogShowCarBroken";
import * as XLSX from "xlsx";

function CarStatusOfTrip() {
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
    const [dialogCarStatusOfTripFilter, setDialogCarStatusOfTripFilter] =
        useState(false);
    const [dialogShowCarBroken, setDialogShowCarBroken] = useState({
        open: false,
        idSchedule: null,
    });

    const [totalDataFilter, setTotalDataFilter] = useState(null);
    const [dataFilter, setDataFilter] = useState({
        carType: [],
        carBrand: [],
        driver: [],
        licensePlates: null,
        carCode: null,
        isBrokenCarPartsBeforeTrip: null,
        isBrokenCarPartsAfterTrip: null,
        startDate: null,
        endDate: null,
    });

    const [carStatusOfTrips, setCarStatusOfTrips] = useState([]);

    const getCarStatusListOfTrips = async (
        page = dataInfo.page,
        pageSize = dataInfo.pageSize,
        carType,
        carBrand,
        driver,
        licensePlates,
        carCode,
        isBrokenCarPartsBeforeTrip,
        isBrokenCarPartsAfterTrip,
        startDate,
        endDate
    ) => {
        const data = {
            page: page,
            limitEntry: pageSize,
            carType: carType,
            carBrand: carBrand,
            driver: driver,
            licensePlates: licensePlates,
            carCode: carCode,
            isBrokenCarPartsBeforeTrip: isBrokenCarPartsBeforeTrip,
            isBrokenCarPartsAfterTrip: isBrokenCarPartsAfterTrip,
            startDate: startDate,
            endDat: endDate,
        };

        const res = await CarStatusOfTripServices.getCarStatusListOfTrips({
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
                setCarStatusOfTrips(
                    res.data.data.map((item, index) => {
                        return {
                            id:
                                res.data.limitEntry * res.data.page -
                                res.data.limitEntry +
                                index +
                                1,
                            imageCar: item.image,
                            scheduleCode: item.idSchedule,
                            carCode: item.idCar,
                            carBrand: item.nameCarBrand,
                            type: `${item.nameCarType} ${item.seatNumber} Chổ`,
                            licensePlates: item.licensePlates,
                            totalBrokenPartsBeforeTrip:
                                item.totalBrokenPartsBeforeTrip,
                            totalBrokenPartsAfterTrip:
                                item.totalBrokenPartsAfterTrip,
                            scheduleStatus: item.nameScheduleStatus,
                            infoDriver: `${item.fullNameDriver} - ${item.codeDriver}`,
                            startDate: item.startDate,
                            endDate: item.endDate,
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

    const getCarStatusListOfTripsToExport = async () => {
        const data = await handleFormatDataFilterSendApi(dataFilter);
        const objData = {
            getAllData: true,
            carType: data.carType,
            carBrand: data.carBrand,
            driver: data.driver,
            licensePlates: data.licensePlates,
            carCode: data.carCode,
            isBrokenCarPartsBeforeTrip: data.isBrokenCarPartsBeforeTrip,
            isBrokenCarPartsAfterTrip: data.isBrokenCarPartsAfterTrip,
            startDate: data.startDate,
            endDate: data.endDate,
        };

        const res = await CarStatusOfTripServices.getCarStatusListOfTrips({
            ...objData,
        });

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

    const handleFormatDataFilterSendApi = (data) => {
        //format data to send API
        let carType = [];
        let carBrand = [];
        let driver = [];
        if (helper.isArray(data.carType) && data.carType.length > 0) {
            carType = data.carType.map((item) => {
                return item.idCarType;
            });
        }
        if (helper.isArray(data.carBrand) && data.carBrand.length > 0) {
            carBrand = data.carBrand.map((item) => {
                return item.idCarBrand;
            });
        }
        if (helper.isArray(data.driver) && data.driver.length > 0) {
            driver = data.driver.map((item) => {
                return item.idDriver;
            });
        }

        return {
            carType,
            carBrand,
            driver,
            licensePlates: data.licensePlates,
            carCode: data.carCode,
            isBrokenCarPartsBeforeTrip: data.isBrokenCarPartsBeforeTrip,
            isBrokenCarPartsAfterTrip: data.isBrokenCarPartsAfterTrip,
            startDate: data.startDate,
            endDate: data.endDate,
        };
    };

    const handleChangePage = async (e) => {
        setDataInfo({ ...dataInfo, page: e });
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getCarStatusListOfTrips(
            e,
            dataInfo.pageSize,
            data.carType,
            data.carBrand,
            data.driver,
            data.licensePlates,
            data.carCode,
            data.isBrokenCarPartsBeforeTrip,
            data.isBrokenCarPartsAfterTrip,
            data.startDate,
            data.endDate
        );
    };

    const handleChangeRowsPerPage = async (e) => {
        setDataInfo({ ...dataInfo, pageSize: e });
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getCarStatusListOfTrips(
            dataInfo.page,
            e,
            data.carType,
            data.carBrand,
            data.driver,
            data.licensePlates,
            data.carCode,
            data.isBrokenCarPartsBeforeTrip,
            data.isBrokenCarPartsAfterTrip,
            data.startDate,
            data.endDate
        );
    };

    const handleFilter = (e) => {
        //format data to send API
        let carType = [];
        let carBrand = [];
        let driver = [];
        if (helper.isArray(e.carType) && e.carType.length > 0) {
            carType = e.carType.map((item) => {
                return item.idCarType;
            });
        }
        if (helper.isArray(e.carBrand) && e.carBrand.length > 0) {
            carBrand = e.carBrand.map((item) => {
                return item.idCarBrand;
            });
        }
        if (helper.isArray(e.driver) && e.driver.length > 0) {
            driver = e.driver.map((item) => {
                return item.idDriver;
            });
        }

        //reset page and pageSize => call getCarStatusListOfTrips function
        getCarStatusListOfTrips(
            Constants.Common.PAGE,
            dataInfo.pageSize,
            carType,
            carBrand,
            driver,
            e.licensePlates,
            e.carCode,
            e.isBrokenCarPartsBeforeTrip,
            e.isBrokenCarPartsAfterTrip,
            e.startDate,
            e.endDate
        );

        // save data filter in dialogCarRegistrationManagementFilter => default value in dialogCarRegistrationManagementFilter
        setDataFilter({
            carType: [e.carType],
            carBrand: [e.carBrand],
            driver: [e.driver],
            licensePlates: e.licensePlates,
            carCode: e.carCode,
            isBrokenCarPartsBeforeTrip: e.isBrokenCarPartsBeforeTrip,
            isBrokenCarPartsAfterTrip: e.isBrokenCarPartsAfterTrip,
            startDate: e.startDate,
            endDat: e.endDate,
        });

        // show total data to filter in UI => button filter
        let total = carType.length + carBrand.length + driver.length;
        if (e.licensePlates) total += 1;
        if (e.carCode) total += 1;
        if (e.isBrokenCarPartsBeforeTrip) total += 1;
        if (e.isBrokenCarPartsAfterTrip) total += 1;
        if (e.startDate && e.endDate) total += 1;
        setTotalDataFilter(total > 0 ? total : null);
    };

    const handleRefreshDataFilter = () => {
        setDataFilter({
            carType: [],
            carBrand: [],
            driver: [],
            licensePlates: null,
            carCode: null,
            isBrokenCarPartsBeforeTrip: null,
            isBrokenCarPartsAfterTrip: null,
            startDate: null,
            endDate: null,
        });
    };

    const handleOpenDialogCarBroken = (e) => {
        setDialogShowCarBroken({
            ...dialogShowCarBroken,
            open: true,
            idSchedule: e,
        });
    };

    const exportExcel = async () => {
        let getData = await getCarStatusListOfTripsToExport();
        if (getData) {
            let dataExport = [
                ...getData.map((item) => {
                    return {
                        idSchedule: item.idSchedule,
                        idCar: item.idCar,
                        totalBrokenPartsBeforeTrip:
                            item.totalBrokenPartsBeforeTrip,
                        totalBrokenPartsAfterTrip:
                            item.totalBrokenPartsAfterTrip,
                        carType: `${item.nameCarType} ${item.seatNumber} Chổ`,
                        licensePlates: item.licensePlates,
                        nameCarBrand: item.nameCarBrand,
                        startDate: helper.formatDateStringFromTimeStamp(
                            item.startDate
                        ),
                        endDate: helper.formatDateStringFromTimeStamp(
                            item.endDate
                        ),
                        scheduleStatus: item.nameScheduleStatus,
                        fullNameDriver: item.fullNameDriver,
                        codeDriver: item.codeDriver,
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
                        "Mã Lịch Trình",
                        "Mã Xe",
                        "Số Bộ Phận Xe Bị Hỏng Trước Khi Đi",
                        "Số Bộ Phận Xe Bị Hỏng Xe Sau Khi Đi",
                        "Loại Xe",
                        "Biển Số Xe",
                        "Thương Hiệu",
                        "Thời Gian Đi",
                        "Thời Gian Về",
                        "Trạng Thái Lịch Trình",
                        "Tài Xế",
                        "Mã Tài Xế",
                        "Người Đăng Ký",
                        "Mã Người Đăng Ký",
                    ],
                ],
                {
                    origin: "A1",
                }
            );
            XLSX.writeFile(wb, "Danh_Sach_Tinh_Trang_Xe_Cua_Chuyen_Di.xlsx");
        }
    };

    const run = async () => {
        await setBackDrop(true);
        await getCarStatusListOfTrips();
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    useEffect(() => {
        run();
    }, []);

    return (
        <Box>
            {/* TITLE HEADER */}
            <Typography variant="h6" component="div">
                {Strings.CarStatusOfTrip.TITLE}
            </Typography>

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
                        onClick={() => setDialogCarStatusOfTripFilter(true)}
                    >
                        <Badge badgeContent={totalDataFilter} color="error">
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

            <DataGridCustom
                columns={col((e) => handleOpenDialogCarBroken(e))}
                rows={carStatusOfTrips}
                {...dataInfo}
                onChangePage={(e) => {
                    handleChangePage(e);
                }}
                onChangeRowsPerPage={(e) => {
                    handleChangeRowsPerPage(e);
                }}
            />

            <DialogCarStatusOfTripFilter
                open={dialogCarStatusOfTripFilter}
                handleClose={() => setDialogCarStatusOfTripFilter(false)}
                onSubmit={(e) => handleFilter(e)}
                defaultCarType={dataFilter.carType}
                defaultCarBrand={dataFilter.carBrand}
                defaultLicensePlates={dataFilter.licensePlates}
                defaultCarCode={dataFilter.carCode}
                defaultDriver={dataFilter.driver}
                defaultEndDate={dataFilter.endDate}
                defaultStartDate={dataFilter.startDate}
                defaultIsBrokenCarPartsAfterTrip={
                    dataFilter.isBrokenCarPartsAfterTrip
                }
                defaultIsBrokenCarPartsBeforeTrip={
                    dataFilter.isBrokenCarPartsBeforeTrip
                }
                handleRefreshDataFilter={handleRefreshDataFilter}
            />

            <DialogShowCarBroken
                open={dialogShowCarBroken.open}
                handleClose={() =>
                    setDialogShowCarBroken({
                        ...dialogShowCarBroken,
                        open: false,
                    })
                }
                idSchedule={dialogShowCarBroken.idSchedule}
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
        </Box>
    );
}

export default CarStatusOfTrip;
