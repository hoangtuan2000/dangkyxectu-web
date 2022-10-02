import {
    Badge,
    Box,
    Button,
    IconButton,
    Pagination,
    Rating,
    Tab,
    Tabs,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    gridPaginationRowRangeSelector,
    gridRowCountSelector,
    useGridApiContext,
    useGridSelector,
} from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Strings from "../../../constants/Strings";
import DataGridCustom from "../../../components/dataGridCustom/DataGridCustom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Constants from "../../../constants/Constants";
import col from "./columnsCarManagerDataGrid";
import ModalError from "../../../components/modalError/ModalError";
import ModalSuccess from "../../../components/modalSuccess/ModalSuccess";
import BackDrop from "../../../components/backDrop/BackDrop";
import { CarManagerServices } from "../../../services/adminServices/CarManagerServices";
import { FabStyle, ButtonStyle } from "./CarManagerCustomStyles";
import DialogCarManagerFilter from "../../../components/adminComponents/dialogCarManagerFilter/DialogCarManagerFilter";
import helper from "../../../common/helper";
import DialogCreateCar from "../../../components/adminComponents/dialogCreateCar/DialogCreateCar";

function CarManager() {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [totalDataFilter, setTotalDataFilter] = useState(null);
    const [dialogCarManagerFilter, setDialogCarManagerFilter] = useState(false);
    const [dialogCreateCar, setDialogCreateCar] = useState(false);
    const [dataFilter, setDataFilter] = useState({
        carStatus: [],
        carType: [],
        carBrand: [],
        licensePlates: null,
        carCode: null,
        licenseExpires: null,
        haveTrip: null,
        haveMaintenance: null,
    });

    const [carList, setCarList] = useState([]);
    const [dataInfo, setDataInfo] = useState({
        page: Constants.Common.PAGE,
        pageSize: Constants.Common.LIMIT_ENTRY,
        totalRows: 0,
    });

    const getCarListForAdmin = async (
        page = dataInfo.page,
        pageSize = dataInfo.pageSize,
        carStatus,
        carType,
        carBrand,
        licensePlates,
        carCode,
        licenseExpires,
        haveTrip,
        haveMaintenance
    ) => {
        const data = {
            page: page,
            limitEntry: pageSize,
            carStatus,
            carType,
            carBrand,
            licensePlates,
            carCode,
            licenseExpires,
            haveTrip,
            haveMaintenance,
        };
        const res = await CarManagerServices.getCarListForAdmin({
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
                setCarList(
                    res.data.data.map((item, index) => {
                        return {
                            id:
                                res.data.limitEntry * res.data.page -
                                res.data.limitEntry +
                                index +
                                1,
                            imageCar: item.image,
                            carBrand: item.nameCarBrand,
                            type: `${item.nameCarType} ${item.seatNumber} Chổ`,
                            licensePlates: item.licensePlates,
                            numberOfTrips: item.numberOfTrips || "",
                            numberOfMaintenance: item.numberOfMaintenance || "",
                            status: item.nameCarStatus,
                            license: item.licenseNumberExpired,
                            carCode: item.idCar,
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
        let carStatus = [];
        let carType = [];
        let carBrand = [];
        if (helper.isArray(data.carStatus) && data.carStatus.length > 0) {
            carStatus = data.carStatus.map((item) => {
                return item.idCarStatus;
            });
        }
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
        return {
            carStatus,
            carType,
            carBrand,
            licensePlates: data.licensePlates,
            carCode: data.carCode,
            licenseExpires: data.licenseExpires,
            haveTrip: data.haveTrip,
            haveMaintenance: data.haveMaintenance,
        };
    };

    const handleChangePage = async (e) => {
        setDataInfo({ ...dataInfo, page: e });
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getCarListForAdmin(
            e,
            dataInfo.pageSize,
            data.carStatus,
            data.carType,
            data.carBrand,
            data.carCode,
            data.licensePlates,
            data.licenseExpires,
            data.haveTrip,
            data.haveMaintenance,
        );
    };

    const handleChangeRowsPerPage = async (e) => {
        setDataInfo({ ...dataInfo, pageSize: e });
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getCarListForAdmin(
            dataInfo.page,
            e,
            data.carStatus,
            data.carType,
            data.carBrand,
            data.carCode,
            data.licensePlates,
            data.licenseExpires,
            data.haveTrip,
            data.haveMaintenance,
        );
    };

    const handleFilter = (e) => {
        //format data to send API
        let carStatus = [];
        let carType = [];
        let carBrand = [];
        if (helper.isArray(e.carStatus) && e.carStatus.length > 0) {
            carStatus = e.carStatus.map((item) => {
                return item.idCarStatus;
            });
        }
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
        //reset page and pageSize => call getCarListForAdmin function
        getCarListForAdmin(
            Constants.Common.PAGE,
            dataInfo.pageSize,
            carStatus,
            carType,
            carBrand,
            e.licensePlates,
            e.carCode,
            e.licenseExpires,
            e.haveTrip,
            e.haveMaintenance
        );
        // save data filter in dialogCarManagerFilter => default value in dialogCarManagerFilter
        setDataFilter({
            carStatus: [...e.carStatus],
            carType: [...e.carType],
            carBrand: [...e.carBrand],
            licensePlates: e.licensePlates,
            carCode: e.carCode,
            licenseExpires: e.licenseExpires,
            haveTrip: e.haveTrip,
            haveMaintenance: e.haveMaintenance,
        });
        // show total data to filter in UI => button filter
        let total = carStatus.length + carType.length + carBrand.length;
        if (e.carCode) total += 1;
        if (e.licensePlates) total += 1;
        if (e.licenseExpires) total += 1;
        if (e.haveTrip) total += 1;
        if (e.haveMaintenance) total += 1;
        setTotalDataFilter(total > 0 ? total : null);
    };

    const handleRefreshDataFilter = () => {
        setDataFilter({
            carStatus: [],
            carType: [],
            carBrand: [],
            licensePlates: null,
            carCode: null,
            licenseExpires: null,
            haveTrip: null,
            haveMaintenance: null,
        });
    };

    const handleGetCarListForAdminWithFilter = async () => {
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getCarListForAdmin(
            dataInfo.page,
            dataInfo.pageSize,
            data.carStatus,
            data.carType,
            data.carBrand,
            data.carCode,
            data.licensePlates,
            data.haveTrip,
            data.haveMaintenance,
        );
    };

    const run = async () => {
        await setBackDrop(true);
        await getCarListForAdmin();
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
                {Strings.CarManager.TITLE}
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
                        onClick={() => setDialogCarManagerFilter(true)}
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
                    startIcon={<DirectionsCarIcon />}
                    onClick={() => setDialogCreateCar(true)}
                >
                    {Strings.CarManager.ADD_CAR}
                </ButtonStyle>
            </Box>

            <DataGridCustom
                columns={col()}
                rows={carList}
                {...dataInfo}
                onChangePage={(e) => {
                    handleChangePage(e);
                }}
                onChangeRowsPerPage={(e) => {
                    handleChangeRowsPerPage(e);
                }}
            />

            <DialogCreateCar
                open={dialogCreateCar}
                handleClose={() => setDialogCreateCar(false)}
                handleGetCarListForAdminWithFilter={
                    handleGetCarListForAdminWithFilter
                }
            />

            <DialogCarManagerFilter
                open={dialogCarManagerFilter}
                handleClose={() => setDialogCarManagerFilter(false)}
                onSubmit={(e) => handleFilter(e)}
                defaultCarStatus={dataFilter.carStatus}
                defaultCarType={dataFilter.carType}
                defaultCarBrand={dataFilter.carBrand}
                defaultLicensePlates={dataFilter.licensePlates}
                defaultCarCode={dataFilter.carCode}
                defaultLicenseExpires={dataFilter.licenseExpires}
                defaultHaveTrip={dataFilter.haveTrip}
                defaultHaveMaintenance={dataFilter.haveMaintenance}
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
        </Box>
    );
}

export default CarManager;
