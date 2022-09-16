import { useEffect, useState } from "react";
import {
    Box,
    CardActionArea,
    CardContent,
    CardMedia,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import { CardContainer } from "./HomeCustomStyles";
import NearMeIcon from "@mui/icons-material/NearMe";
import DialogCarInfo from "../../components/dialogCarInfo/DialogCarInfo";
import Strings from "../../constants/Strings";
import { HomeService } from "../../services/HomeServices";
import Constants from "../../constants/Constants";
import ModalError from "../../components/modalError/ModalError";
import BackDrop from "../../components/backDrop/BackDrop";
import { GlobalService } from "../../services/GlobalServices";
import helper from "../../common/helper";

export default function Home() {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [openDialogCarInfo, setOpenDialogCarInfo] = useState(false);

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
                title: `${Strings.Common.AN_ERROR_OCCURRED} (${res.request.status})`,
                content: res.name,
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
                title: `${Strings.Common.AN_ERROR_OCCURRED} (${res.request.status})`,
                content: res.name,
            });
        }
    };

    const getCarList = async () => {
        const res = await HomeService.getCarList();
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
                title: `${Strings.Common.AN_ERROR_OCCURRED} (${res.request.status})`,
                content: res.name,
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
                title: `${Strings.Common.AN_ERROR_OCCURRED} (${res.request.status})`,
                content: res.name,
            });
        }
    };

    const run = async () => {
        await setBackDrop(true);
        await getCommon();
        await getCarList();
        await setTimeout(() => {
            setBackDrop(false)
        }, 1000)
    };

    useEffect(() => {
        run();
    }, []);

    return (
        <Box>
            <Typography variant="h6" component="div">
                {Strings.Home.CAR_LIST}
            </Typography>
            {carList.length > 0 ? (
                carList.map((val) => {
                    const type = carTypeList
                        ? carTypeList.filter((item) => {
                              if (item.idCarType == val.idCarType) {
                                  return item;
                              }
                          })
                        : [];
                    const status = carStatusList
                        ? carStatusList.filter((item) => {
                              if (item.idCarStatus == val.idCarStatus) {
                                  return item;
                              }
                          })
                        : [];
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
                            data-aos="zoom-in"
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
                                        {type.length > 0 &&
                                            type[0].name +
                                                " " +
                                                type[0].seatNumber}{" "}
                                        Chỗ
                                    </Typography>
                                    <Typography variant="p" component="div">
                                        {Strings.Home.LICENSE_PLATES}{" "}
                                        {val.licensePlates}
                                    </Typography>
                                    <Typography variant="p" component="div">
                                        {Strings.Home.VEHICLE_CONDITION}{" "}
                                        {status.length > 0 ? (
                                            status[0].idCarStatus == 2 ? (
                                                <span
                                                    style={{
                                                        color: theme.palette
                                                            .error.main,
                                                    }}
                                                >
                                                    {status[0].name}
                                                </span>
                                            ) : status[0].idCarStatus == 3 ? (
                                                <span
                                                    style={{
                                                        color: theme.palette
                                                            .warning.main,
                                                    }}
                                                >
                                                    {status[0].name}
                                                </span>
                                            ) : (
                                                <span
                                                    style={{
                                                        color: theme.palette
                                                            .success.main,
                                                    }}
                                                >
                                                    {status[0].name}
                                                </span>
                                            )
                                        ) : undefined}
                                    </Typography>
                                    <Typography
                                        variant="p"
                                        color="text.secondary"
                                    >
                                        {Strings.Home.SCHEDULE}
                                    </Typography>

                                    {val.idSchedule && (
                                        <List
                                            sx={{
                                                width: "100%",
                                                bgcolor: "background.paper",
                                                padding: "0px",
                                            }}
                                        >
                                            <ListItem
                                                sx={{
                                                    padding: "0px",
                                                }}
                                            >
                                                <NearMeIcon
                                                    color="primary"
                                                    fontSize="small"
                                                    sx={{
                                                        marginRight: "5px",
                                                    }}
                                                />
                                                <ListItemText
                                                    primary={val.reason}
                                                    secondary={`${startDate} - ${endDate}`}
                                                    primaryTypographyProps={{
                                                        fontSize: "13px",
                                                        fontWeight: "bold",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow:
                                                            "ellipsis",
                                                        color: theme.palette
                                                            .primary.main,
                                                    }}
                                                    secondaryTypographyProps={{
                                                        fontSize: "12px",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow:
                                                            "ellipsis",
                                                    }}
                                                />
                                            </ListItem>
                                        </List>
                                    )}

                                    {!val.idSchedule && (
                                        <Typography
                                            variant="p"
                                            component="div"
                                            color="text.secondary"
                                            sx={{
                                                marginLeft: 1,
                                                marginTop: 1,
                                                color: theme.palette.success
                                                    .main,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {Strings.Common.NO_SCHEDULE}
                                        </Typography>
                                    )}
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
                    <Typography
                        variant="h6"
                        component="div"
                    >
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
