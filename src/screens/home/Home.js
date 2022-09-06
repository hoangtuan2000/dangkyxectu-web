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
import DialogCarRental from "../../components/dialogCarRental/DialogCarRental";
import Strings from "../../constants/Strings";
import { HomeService } from "../../services/HomeServices";
import Constants from "../../constants/Constants";
import ModalError from "../../components/modalError/ModalError";
import BackDrop from "../../components/backDrop/BackDrop";

// const data = [
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwhhFEsta01Sk0xhKOv41PbmJryOP_bPlSjg&usqp=CAU",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIqvVFqLp_TvYGGHcFleqT8ldUtKWdYx0hxQ&usqp=CAU",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwhhFEsta01Sk0xhKOv41PbmJryOP_bPlSjg&usqp=CAU",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIqvVFqLp_TvYGGHcFleqT8ldUtKWdYx0hxQ&usqp=CAU",
// ];

export default function Home() {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [openDialogCarInfo, setOpenDialogCarInfo] = useState(false);
    const [openDialogCarRental, setOpenDialogCarRental] = useState(false);

    const [carList, setCarList] = useState([]);
    const [carTypeList, setCarTypeList] = useState([]);
    const [carStatusList, setCarStatusList] = useState([]);

    const handleOpenDialogCarInfo = () => () => {
        setOpenDialogCarInfo(true);
    };

    const handleCloseDialogCarInfo = () => {
        setOpenDialogCarInfo(false);
    };

    const handleOpenDialogCarRental = () => () => {
        setOpenDialogCarRental(true);
        setOpenDialogCarInfo(false);
    };

    const handleCloseDialogCarRental = () => {
        setOpenDialogCarRental(false);
    };

    const getCarList = async () => {
        const res = await HomeService.getCarList({ common: "car" });
        // axios success
        if (res.data) {
            // login success
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

    const getCarTypeList = async () => {
        const res = await HomeService.getCommon({ common: "car_type" });
        // axios success
        if (res.data) {
            // login success
            if (res.data.status == Constants.ApiCode.OK) {
                setCarTypeList(res.data.data);
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

    const getCarStatusList = async () => {
        const res = await HomeService.getCommon({ common: "car_status" });
        // axios success
        if (res.data) {
            // login success
            if (res.data.status == Constants.ApiCode.OK) {
                setCarStatusList(res.data.data);
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

    useEffect(() => {
        setBackDrop(true);
        getCarList();
        getCarTypeList();
        getCarStatusList();
        setBackDrop(false);
    }, []);

    return (
        <Box>
            <Typography variant="h6" component="div">
                {Strings.Home.CAR_LIST}
            </Typography>
            {carList.length > 0 ? (
                carList.map((val) => {
                    const type = carTypeList.filter((item) => {
                        if (item.idCarType == val.idCarType) {
                            return item;
                        }
                    });
                    const status = carStatusList.filter((item) => {
                        if (item.idCarStatus == val.idCarStatus) {
                            return item;
                        }
                    });
                    const startDay =
                        val.startDay &&
                        new Date(val.startDay * 1000).toLocaleDateString(
                            "en-GB"
                        );
                    const endDay =
                        val.endDay &&
                        new Date(val.endDay * 1000).toLocaleDateString("en-GB");
                    return (
                        <CardContainer
                            key={val.idCar}
                            onClick={handleOpenDialogCarInfo()}
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
                                        {type[0].name +
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
                                        <span
                                            style={{
                                                color:
                                                    status[0].idCarStatus == 2
                                                        ? theme.palette.error
                                                              .main
                                                        : status[0]
                                                              .idCarStatus == 3
                                                        ? theme.palette.warning
                                                              .main
                                                        : null,
                                            }}
                                        >
                                            {status[0].name}
                                        </span>
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
                                                    sx={{ marginRight: "5px" }}
                                                />
                                                <ListItemText
                                                    primary={val.reason}
                                                    secondary={`${startDay} - ${endDay}`}
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
                        justifyContent: 'center',
                        height: '50vh'
                    }}
                >
                    <Typography
                        variant="h6"
                        component="div"
                        // sx={{
                        //     marginLeft: 1,
                        //     marginTop: 1,
                        //     color: theme.palette.success.main,
                        //     fontWeight: "bold",
                        // }}
                    >
                        {Strings.Common.NO_DATA}
                    </Typography>
                </Box>
            )}

            <DialogCarInfo
                open={openDialogCarInfo}
                handleClose={handleCloseDialogCarInfo}
                handleOpenDialogCarRental={handleOpenDialogCarRental}
            />

            <DialogCarRental
                open={openDialogCarRental}
                handleClose={handleCloseDialogCarRental}
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
