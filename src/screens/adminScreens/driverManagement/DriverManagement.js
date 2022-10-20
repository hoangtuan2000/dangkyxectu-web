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
import BackDrop from "../../../components/backDrop/BackDrop";
import ModalSuccess from "../../../components/modalSuccess/ModalSuccess";
import ModalError from "../../../components/modalError/ModalError";
import Constants from "../../../constants/Constants";
import { ButtonStyle, FabStyle } from "./DriverManagementCustomStyles";
import { DriverManagementServices } from "../../../services/adminServices/DriverManagementServices";
import DialogCarRegistrationManagementFilter from "../../../components/adminComponents/dialogCarRegistrationManagementFilter/DialogCarRegistrationManagementFilter";
import DialogDriverManagementFilter from "../../../components/adminComponents/dialogDriverManagementFilter/DialogDriverManagementFilter";
import helper from "../../../common/helper";

const rowsTest = [
    {
        id: 1,
        fullName: "Nguyễn Văn A",
        code: "TX123",
        phone: "0123456789",
        license: "Hạng C",
        numberOfTrips: "20",
        status: "Hoạt Động",
    },
    {
        id: 2,
        fullName: "Nguyễn Văn A",
        code: "TX123",
        phone: "0123456789",
        license: "Hạng C",
        numberOfTrips: "20",
        status: "Hoạt Động",
    },
    {
        id: 3,
        fullName: "Nguyễn Văn A",
        code: "TX123",
        phone: "0123456789",
        license: "Hạng C",
        numberOfTrips: "20",
        status: "Hoạt Động",
    },
    {
        id: 4,
        fullName: "Nguyễn Văn A",
        code: "TX123",
        phone: "0123456789",
        license: "Hạng C",
        numberOfTrips: "20",
        status: "Ngừng Hoạt Động",
    },
    {
        id: 5,
        fullName: "Nguyễn Văn A",
        code: "TX123",
        phone: "0123456789",
        license: "Hạng C",
        numberOfTrips: "20",
        status: "Hoạt Động",
    },
];

function DriverManagement() {
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
            phoneDrive: phoneDriver,
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

                {/* BUTTON ADD CAR */}
                <ButtonStyle
                    variant="contained"
                    size="small"
                    startIcon={<PersonAddIcon />}
                    // onClick={() => setDialogCreateCar(true)}
                >
                    {Strings.DriverManagement.ADD_DRIVER}
                </ButtonStyle>
            </Box>

            <DataGridCustom
                columns={col()}
                rows={driverList}
                {...dataInfo}
                onChangePage={(e) => {
                    handleChangePage(e);
                }}
                onChangeRowsPerPage={(e) => {
                    handleChangeRowsPerPage(e);
                }}
            />

            <DialogDriverManagementFilter
                open={dialogDriverManagementFilter}
                handleClose={() => setDialogDriverManagementFilter(false)}
                handleRefreshDataFilter={handleRefreshDataFilter}
                onSubmit={(e) => handleFilter(e)}

                // defaultCarStatus={dataFilter.carStatus}
                // defaultCarType={dataFilter.carType}
                // defaultCarBrand={dataFilter.carBrand}
                // defaultLicensePlates={dataFilter.licensePlates}
                // defaultCarCode={dataFilter.carCode}
                // defaultLicenseExpires={dataFilter.licenseExpires}
                // defaultHaveTrip={dataFilter.haveTrip}
                // defaultHaveMaintenance={dataFilter.haveMaintenance}
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
