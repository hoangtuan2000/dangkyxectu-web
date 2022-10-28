import { useEffect, useState } from "react";
import {
    Badge,
    Box,
    Button,
    IconButton,
    Rating,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DataGridCustom from "../../../components/dataGridCustom/DataGridCustom";
import Strings from "../../../constants/Strings";
import col from "./columnsDriverManagement";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import BackDrop from "../../../components/backDrop/BackDrop";
import ModalSuccess from "../../../components/modalSuccess/ModalSuccess";
import ModalError from "../../../components/modalError/ModalError";
import Constants from "../../../constants/Constants";
import { ButtonStyle, FabStyle } from "./DriverManagementCustomStyles";
import { DriverManagementServices } from "../../../services/adminServices/DriverManagementServices";
import DialogCarRegistrationManagementFilter from "../../../components/adminComponents/dialogCarRegistrationManagementFilter/DialogCarRegistrationManagementFilter";
import DialogDriverManagementFilter from "../../../components/adminComponents/dialogDriverManagementFilter/DialogDriverManagementFilter";
import helper from "../../../common/helper";
import DialogCreateDriver from "../../../components/adminComponents/dialogCreateDriver/DialogCreateDriver";
import DialogUpdateDriver from "../../../components/adminComponents/dialogUpdateDriver/DialogUpdateDriver";
import * as XLSX from "xlsx";

function DriverManagement() {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [dialogCreateDriver, setDialogCreateDriver] = useState(false);
    const [dialogUpdateDriver, setDialogUpdateDriver] = useState({
        open: false,
        idDriver: null,
    });

    const [dataInfo, setDataInfo] = useState({
        page: Constants.Common.PAGE,
        pageSize: Constants.Common.LIMIT_ENTRY,
        totalRows: 0,
    });

    const [dialogDriverManagementFilter, setDialogDriverManagementFilter] =
        useState(false);
    const [dataFilter, setDataFilter] = useState({
        driverLicense: [],
        driverStatus: [],
        starNumber: null,
        licenseExpires: null,
        numberOfTrip: null,
        codeDriver: null,
        fullNameDriver: null,
        emailDriver: null,
        phoneDriver: null,
    });
    const [totalDataFilter, setTotalDataFilter] = useState(null);

    const [driverList, setDriverList] = useState([]);

    const getDriverList = async (
        page = dataInfo.page,
        pageSize = dataInfo.pageSize,
        driverLicense,
        driverStatus,
        starNumber,
        licenseExpires,
        numberOfTrip,
        codeDriver,
        fullNameDriver,
        emailDriver,
        phoneDriver
    ) => {
        const data = {
            page: page,
            limitEntry: pageSize,
            driverLicense: driverLicense,
            driverStatus: driverStatus,
            starNumber: starNumber,
            licenseExpires: licenseExpires,
            numberOfTrip: numberOfTrip,
            codeDriver: codeDriver,
            fullNameDriver: fullNameDriver,
            emailDriver: emailDriver,
            phoneDriver: phoneDriver,
        };

        const res = await DriverManagementServices.getDriverList({
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
                setDriverList(
                    res.data.data.map((item, index) => {
                        return {
                            id:
                                res.data.limitEntry * res.data.page -
                                res.data.limitEntry +
                                index +
                                1,
                            fullName: item.fullNameDriver,
                            code: item.codeDriver,
                            email: item.emailDriver,
                            phone: item.phoneDriver,
                            driverLicense: item.nameDriverLicense,
                            numberOfTrips: item.numberOfTrips,
                            reviews: item.averageStar,
                            status: item.nameUserStatus,
                            update: item.idDriver,
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

    const getDriverListToExport = async () => {
        const data = await handleFormatDataFilterSendApi(dataFilter);
        const objData = {
            getAllData: true,
            driverLicense: data.driverLicense,
            driverStatus: data.driverStatus,
            starNumber: data.starNumber,
            licenseExpires: data.licenseExpires,
            numberOfTrip: data.numberOfTrip,
            codeDriver: data.codeDriver,
            fullNameDriver: data.fullNameDriver,
            emailDriver: data.emailDriver,
            phoneDriver: data.phoneDriver,
        };

        const res = await DriverManagementServices.getDriverList({
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
        let driverLicense = [];
        let driverStatus = [];
        if (
            helper.isArray(data.driverLicense) &&
            data.driverLicense.length > 0
        ) {
            driverLicense = data.driverLicense.map((item) => {
                return item.idDriverLicense;
            });
        }
        if (helper.isArray(data.driverStatus) && data.driverStatus.length > 0) {
            driverStatus = data.driverStatus.map((item) => {
                return item.idUserStatus;
            });
        }
        return {
            driverLicense,
            driverStatus,
            starNumber: data.starNumber,
            licenseExpires: data.licenseExpires,
            numberOfTrip: data.numberOfTrip,
            codeDriver: data.codeDriver,
            fullNameDriver: data.fullNameDriver,
            emailDriver: data.emailDriver,
            phoneDriver: data.phoneDriver,
        };
    };

    const handleChangePage = async (e) => {
        setDataInfo({ ...dataInfo, page: e });
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getDriverList(
            e,
            dataInfo.pageSize,
            data.driverLicense,
            data.driverStatus,
            data.starNumber,
            data.licenseExpires,
            data.numberOfTrip,
            data.codeDriver,
            data.fullNameDriver,
            data.emailDriver,
            data.phoneDriver
        );
    };

    const handleChangeRowsPerPage = async (e) => {
        setDataInfo({ ...dataInfo, pageSize: e });
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getDriverList(
            dataInfo.page,
            e,
            data.driverLicense,
            data.driverStatus,
            data.starNumber,
            data.licenseExpires,
            data.numberOfTrip,
            data.codeDriver,
            data.fullNameDriver,
            data.emailDriver,
            data.phoneDriver
        );
    };

    const handleFilter = (e) => {
        //format data to send API
        let driverLicense = [];
        let driverStatus = [];
        if (helper.isArray(e.driverLicense) && e.driverLicense.length > 0) {
            driverLicense = e.driverLicense.map((item) => {
                return item.idDriverLicense;
            });
        }
        if (helper.isArray(e.driverStatus) && e.driverStatus.length > 0) {
            driverStatus = e.driverStatus.map((item) => {
                return item.idUserStatus;
            });
        }
        //reset page and pageSize => call getDriverList function
        getDriverList(
            Constants.Common.PAGE,
            dataInfo.pageSize,
            driverLicense,
            driverStatus,
            e.starNumber,
            e.licenseExpires,
            e.numberOfTrip,
            e.codeDriver,
            e.fullNameDriver,
            e.emailDriver,
            e.phoneDriver
        );
        // save data filter in dialogCarManagerFilter => default value in dialogCarManagerFilter
        setDataFilter({
            driverLicense: [...e.driverLicense],
            driverStatus: [...e.driverStatus],
            starNumber: e.starNumber,
            licenseExpires: e.licenseExpires,
            numberOfTrip: e.numberOfTrip,
            codeDriver: e.codeDriver,
            fullNameDriver: e.fullNameDriver,
            emailDriver: e.emailDriver,
            phoneDriver: e.phoneDriver,
        });
        // show total data to filter in UI => button filter
        let total = driverLicense.length + driverStatus.length;
        if (e.starNumber) total += 1;
        if (e.licenseExpires) total += 1;
        if (e.numberOfTrip) total += 1;
        if (e.codeDriver) total += 1;
        if (e.fullNameDriver) total += 1;
        if (e.emailDriver) total += 1;
        if (e.phoneDriver) total += 1;
        setTotalDataFilter(total > 0 ? total : null);
    };

    const handleRefreshDataFilter = () => {
        setDataFilter({
            driverLicense: [],
            driverStatus: [],
            starNumber: null,
            licenseExpires: null,
            numberOfTrip: null,
            codeDriver: null,
            fullNameDriver: null,
            emailDriver: null,
            phoneDriver: null,
        });
    };

    const handleGetDriverListForAdminWithFilter = async () => {
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getDriverList(
            dataInfo.page,
            dataInfo.pageSize,
            data.driverLicense,
            data.driverStatus,
            data.starNumber,
            data.licenseExpires,
            data.numberOfTrip,
            data.codeDriver,
            data.fullNameDriver,
            data.emailDriver,
            data.phoneDriver
        );
    };

    const handleOpenDialogUpdateDriver = (e) => {
        setDialogUpdateDriver({
            ...dialogUpdateDriver,
            open: true,
            idDriver: e,
        });
    };

    const exportExcel = async () => {
        let getData = await getDriverListToExport();
        if (getData) {
            let dataExport = [
                ...getData.map((item) => {
                    return {
                        codeDriver: item.codeDriver,
                        fullNameDriver: item.fullNameDriver,
                        phoneDriver: item.phoneDriver,
                        emailDriver: item.emailDriver,
                        nameDriverLicense: item.nameDriverLicense,
                        numberOfTrips: item.numberOfTrips,
                        averageStar: item.averageStar,
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
                        "Họ Tên",
                        "Điện Thoại",
                        "Email",
                        "Bằng Lái",
                        "Số Chuyến Đi",
                        "Đánh Giá",
                    ],
                ],
                {
                    origin: "A1",
                }
            );
            XLSX.writeFile(wb, "Danh_Sach_Tai_Xe.xlsx");
        }
    };

    const run = async () => {
        await setBackDrop(true);
        await getDriverList();
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
                {Strings.DriverManagement.TITLE}
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
                        onClick={() => setDialogDriverManagementFilter(true)}
                    >
                        <Badge badgeContent={totalDataFilter} color="error">
                            <FilterAltIcon />
                        </Badge>
                    </FabStyle>
                </Tooltip>

                <Box>
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

                    {/* BUTTON ADD CAR */}
                    <ButtonStyle
                        variant="contained"
                        size="small"
                        startIcon={<PersonAddIcon />}
                        onClick={() => setDialogCreateDriver(true)}
                    >
                        {Strings.DriverManagement.ADD_DRIVER}
                    </ButtonStyle>
                </Box>
            </Box>

            <DataGridCustom
                columns={col((e) => handleOpenDialogUpdateDriver(e))}
                rows={driverList}
                {...dataInfo}
                onChangePage={(e) => {
                    handleChangePage(e);
                }}
                onChangeRowsPerPage={(e) => {
                    handleChangeRowsPerPage(e);
                }}
            />

            <DialogCreateDriver
                open={dialogCreateDriver}
                handleClose={() => setDialogCreateDriver(false)}
                handleGetDriverListForAdminWithFilter={
                    handleGetDriverListForAdminWithFilter
                }
            />

            <DialogUpdateDriver
                open={dialogUpdateDriver.open}
                handleClose={() =>
                    setDialogUpdateDriver({
                        ...dialogUpdateDriver,
                        open: false,
                    })
                }
                handleGetDriverListForAdminWithFilter={
                    handleGetDriverListForAdminWithFilter
                }
                idDriver={dialogUpdateDriver.idDriver}
            />

            <DialogDriverManagementFilter
                open={dialogDriverManagementFilter}
                handleClose={() => setDialogDriverManagementFilter(false)}
                handleRefreshDataFilter={handleRefreshDataFilter}
                onSubmit={(e) => handleFilter(e)}
                defaultDriverLicense={dataFilter.driverLicense}
                defaultDriverStatus={dataFilter.driverStatus}
                defaultStarNumber={dataFilter.starNumber}
                defaultLicenseExpires={dataFilter.licenseExpires}
                defaultNumberOfTrip={dataFilter.numberOfTrip}
                defaultCodeDriver={dataFilter.codeDriver}
                defaultFullNameDriver={dataFilter.fullNameDriver}
                defaultEmailDriver={dataFilter.emailDriver}
                defaultPhoneDriver={dataFilter.phoneDriver}
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

export default DriverManagement;
