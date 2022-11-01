import { useEffect, useState } from "react";
import {
    Badge,
    Box,
    CardActionArea,
    CardContent,
    CardMedia,
    List,
    ListItem,
    ListItemText,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import { CardContainer, FabStyle } from "./HomeCustomStyles";
import NearMeIcon from "@mui/icons-material/NearMe";
import DialogCarInfo from "../../components/dialogCarInfo/DialogCarInfo";
import Strings from "../../constants/Strings";
import { HomeService } from "../../services/HomeServices";
import Constants from "../../constants/Constants";
import ModalError from "../../components/modalError/ModalError";
import BackDrop from "../../components/backDrop/BackDrop";
import { GlobalService } from "../../services/GlobalServices";
import helper from "../../common/helper";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DialogRentalCarFilter from "../../components/dialogRentalCarFilter/DialogRentalCarFilter";

export default function Home() {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [openDialogCarInfo, setOpenDialogCarInfo] = useState(false);

    const [dataInfo, setDataInfo] = useState({
        page: Constants.Common.PAGE,
        pageSize: Constants.Common.LIMIT_ENTRY,
        totalRows: 0,
    });
    const [totalDataFilter, setTotalDataFilter] = useState(null);
    const [dialogRentalCarFilter, setDialogRentalCarFilter] = useState(false);
    const [dataFilter, setDataFilter] = useState({
        carType: [],
        carBrand: [],
        licensePlates: null,
        haveTrip: null,
    });

    const [carScheduleList, setCarScheduleList] = useState([]);
    const [car, setCar] = useState([]);
    const [carList, setCarList] = useState([]);
    const [carTypeList, setCarTypeList] = useState([]);
    const [carStatusList, setCarStatusList] = useState([]);
    const [carColorList, setCarColorList] = useState([]);
    const [carBrandList, setCarBrandList] = useState([]);

    const handleOpenDialogCarInfo = async (idCar) => {
        await setBackDrop(true);
        await getCar(idCar);
        await getCarScheduleList(idCar);
        await setOpenDialogCarInfo(true);
        await setBackDrop(false);
    };

    const handleCloseDialogCarInfo = () => {
        setOpenDialogCarInfo(false);
    };

    const getCarScheduleList = async (idCar) => {
        const res = await HomeService.getCarScheduleList({ idCar: idCar });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setCarScheduleList(res.data.data);
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

    const getCar = async (idCar) => {
        const res = await HomeService.getCar({ idCar: idCar });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setCar(res.data.data);
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

    const getCarList = async (
        page = dataInfo.page,
        pageSize = dataInfo.pageSize,
        carType,
        carBrand,
        licensePlates,
        haveTrip
    ) => {
        const data = {
            getAllData: true,
            page: page,
            limitEntry: pageSize,
            carType,
            carBrand,
            licensePlates,
            haveTrip,
        };
        const res = await HomeService.getCarList({ ...data });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setCarList(res.data.data);
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

    const getCommon = async () => {
        const res = await GlobalService.getCommon({
            group: "car_type, car_status, car_color, car_brand",
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setCarTypeList(res.data.data.car_type);
                setCarStatusList(res.data.data.car_status);
                setCarColorList(res.data.data.car_color);
                setCarBrandList(res.data.data.car_brand);
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

    const handleFilter = (e) => {
        //format data to send API
        let carType = [];
        let carBrand = [];
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
        getCarList(
            Constants.Common.PAGE,
            dataInfo.pageSize,
            carType,
            carBrand,
            e.licensePlates,
            e.haveTrip
        );
        // save data filter in dialogRentalCarFilter => default value in dialogRentalCarFilter
        setDataFilter({
            carType: [...e.carType],
            carBrand: [...e.carBrand],
            licensePlates: e.licensePlates,
            haveTrip: e.haveTrip,
        });
        // show total data to filter in UI => button filter
        let total = carType.length + carBrand.length;
        if (e.licensePlates) total += 1;
        if (e.haveTrip) total += 1;
        setTotalDataFilter(total > 0 ? total : null);
    };

    const handleRefreshDataFilter = () => {
        setDataFilter({
            carType: [],
            carBrand: [],
            licensePlates: null,
            haveTrip: null,
        });
    };

    const run = async () => {
        await setBackDrop(true);
        await getCommon();
        await getCarList();
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    useEffect(() => {
        run();
    }, []);

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="h6" component="div">
                    {Strings.Home.CAR_LIST}
                </Typography>

                {/* FILTER BUTTON */}
                <Tooltip title={Strings.Common.FILTER}>
                    <FabStyle
                        color="primary"
                        size="small"
                        onClick={() => setDialogRentalCarFilter(true)}
                    >
                        <Badge badgeContent={totalDataFilter} color="error">
                            <FilterAltIcon />
                        </Badge>
                    </FabStyle>
                </Tooltip>
            </Box>

            {carList.length > 0 ? (
                carList.map((val) => {
                    const startDate = val.startDate
                        ? helper.formatDateStringFromTimeStamp(val.startDate)
                        : undefined;
                    const endDate = val.endDate
                        ? helper.formatDateStringFromTimeStamp(val.endDate)
                        : undefined;
                    return (
                        <CardContainer
                            key={val.idCar}
                            onClick={() => handleOpenDialogCarInfo(val.idCar)}
                            // data-aos="zoom-in"
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    alt="green iguana"
                                    src={val.image}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {`${val.nameCarType} ${val.seatNumber} Chổ`}
                                    </Typography>
                                    <Typography variant="p" component="div">
                                        {Strings.Home.CAR_BRAND}{" "}
                                        {val.nameCarBrand}
                                    </Typography>
                                    <Typography variant="p" component="div">
                                        {Strings.Home.LICENSE_PLATES}{" "}
                                        {val.licensePlates}
                                    </Typography>
                                    <Typography variant="p" component="div">
                                        {Strings.Home.VEHICLE_CONDITION}{" "}
                                        {val.idCarStatus ==
                                        Constants.CarStatusCode.STOP_WORKING ? (
                                            <span
                                                style={{
                                                    color: theme.palette.error
                                                        .main,
                                                }}
                                            >
                                                {val.nameCarStatus}
                                            </span>
                                        ) : val.idCarStatus ==
                                          Constants.CarStatusCode
                                              .MAINTENANCE ? (
                                            <span
                                                style={{
                                                    color: theme.palette.warning
                                                        .main,
                                                }}
                                            >
                                                {val.nameCarStatus}
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    color: theme.palette.success
                                                        .main,
                                                }}
                                            >
                                                {val.nameCarStatus}
                                            </span>
                                        )}
                                    </Typography>

                                    <Typography
                                        variant="p"
                                        color="text.secondary"
                                    >
                                        {Strings.Home.SCHEDULE}
                                        <span
                                            style={{
                                                color:
                                                    val.totalSchedule == 0 &&
                                                    theme.palette.success.main,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {val.totalSchedule == 0
                                                ? "Không Có"
                                                : val.totalSchedule}
                                        </span>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </CardContainer>
                    );
                })
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "50vh",
                    }}
                >
                    <Typography variant="h6" component="div">
                        {Strings.Common.NO_DATA}
                    </Typography>
                </Box>
            )}

            <DialogCarInfo
                open={openDialogCarInfo}
                handleClose={handleCloseDialogCarInfo}
                carData={car}
                carTypeData={carTypeList}
                carColorData={carColorList}
                carBrandData={carBrandList}
                carStatusData={carStatusList}
                carScheduleList={carScheduleList}
            />

            <DialogRentalCarFilter
                open={dialogRentalCarFilter}
                handleClose={() => setDialogRentalCarFilter(false)}
                onSubmit={(e) => handleFilter(e)}
                defaultCarType={dataFilter.carType}
                defaultCarBrand={dataFilter.carBrand}
                defaultLicensePlates={dataFilter.licensePlates}
                defaultHaveTrip={dataFilter.haveTrip}
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

            <BackDrop open={backDrop} />
        </Box>
    );
}
