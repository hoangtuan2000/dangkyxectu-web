import { AccountCircle } from "@mui/icons-material";
import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BackDrop from "../../components/backDrop/BackDrop";
import ModalError from "../../components/modalError/ModalError";
import Constants from "../../constants/Constants";
import Strings from "../../constants/Strings";
import { GlobalService } from "../../services/GlobalServices";
import { RentalCarService } from "../../services/RentalCarServices";
import {
    BoxContainerContent,
    BoxLeftContent,
    BoxRightContent,
    ButtonInput,
    CarTypeTitle,
    Img,
    TextContent,
    TextInput,
    Title,
} from "./RentalCarCustomStyles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ModalShowAddress from "../../components/modalShowAddress/ModalShowAddress";

function RentalCar() {
    const theme = useTheme();

    const { idCar } = useParams();
    // let { type, status, color, brand } = [];

    const [modalShowAdderss, setModalShowAdderss] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [car, setCar] = useState([]);
    const [carTypeList, setCarTypeList] = useState([]);
    const [carStatusList, setCarStatusList] = useState([]);
    const [carColorList, setCarColorList] = useState([]);
    const [carBrandList, setCarBrandList] = useState([]);

    const getCar = async (idCar) => {
        const res = await RentalCarService.getCar({ idCar: idCar });
        // axios success
        if (res.data) {
            // login success
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

    const getCarTypeList = async () => {
        const res = await GlobalService.getCommon({ common: "car_type" });
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
        const res = await GlobalService.getCommon({ common: "car_status" });
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

    const getCarColorList = async () => {
        const res = await GlobalService.getCommon({ common: "car_color" });
        // axios success
        if (res.data) {
            // login success
            if (res.data.status == Constants.ApiCode.OK) {
                setCarColorList(res.data.data);
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

    const getCarBrandList = async () => {
        const res = await GlobalService.getCommon({ common: "car_brand" });
        // axios success
        if (res.data) {
            // login success
            if (res.data.status == Constants.ApiCode.OK) {
                setCarBrandList(res.data.data);
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
        getCarTypeList();
        getCarStatusList();
        getCarColorList();
        getCarBrandList();
        getCar(idCar);
        setBackDrop(false);
    }, []);

    return (
        <Box>
            <Typography variant="h6" component="div">
                {Strings.RentalCar.RENTAL_CAR}
            </Typography>

            <BoxContainerContent>
                <Title variant="h6" component="div">
                    {Strings.RentalCar.CAR_REGISTRATRION_INFOMATION}
                </Title>

                <BoxLeftContent>
                    {car.length > 0 &&
                        car.map((val) => {
                            const type =
                                carTypeList.length > 0
                                    ? carTypeList.filter((item) => {
                                          if (item.idCarType == val.idCarType) {
                                              return item;
                                          }
                                      })
                                    : null;
                            const status =
                                carStatusList.length > 0
                                    ? carStatusList.filter((item) => {
                                          if (
                                              item.idCarStatus ==
                                              val.idCarStatus
                                          ) {
                                              return item;
                                          }
                                      })
                                    : null;
                            const color =
                                carColorList.length > 0
                                    ? carColorList.filter((item) => {
                                          if (
                                              item.idCarColor == val.idCarColor
                                          ) {
                                              return item;
                                          }
                                      })
                                    : null;
                            const brand =
                                carBrandList.length > 0
                                    ? carBrandList.filter((item) => {
                                          if (
                                              item.idCarBrand == val.idCarBrand
                                          ) {
                                              return item;
                                          }
                                      })
                                    : null;
                            return (
                                <Box key={val.idCar}>
                                    <Box
                                        sx={{
                                            // textAlign: "start",
                                            // marginLeft: 2,
                                            float: "left",
                                        }}
                                    >
                                        <Img src={val.image} />
                                    </Box>
                                    <Box
                                        sx={{
                                            // textAlign: "start",
                                            // marginLeft: 2,
                                            float: "left",
                                        }}
                                    >
                                        <CarTypeTitle
                                            variant="p"
                                            component="div"
                                        >
                                            {type &&
                                                `${type[0].name} ${type[0].seatNumber} Chổ`}
                                        </CarTypeTitle>
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {Strings.Home.LICENSE_PLATES}{" "}
                                            {val.licensePlates}
                                        </TextContent>
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {Strings.Home.VEHICLE_CONDITION}{" "}
                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                    color: status
                                                        ? status[0]
                                                              .idCarStatus == 2
                                                            ? theme.palette
                                                                  .error.main
                                                            : status[0]
                                                                  .idCarStatus ==
                                                              3
                                                            ? theme.palette
                                                                  .warning.main
                                                            : theme.palette
                                                                  .success.main
                                                        : theme.palette.primary,
                                                }}
                                            >
                                                {status && status[0].name}
                                            </span>
                                        </TextContent>
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {Strings.Home.CAR_COLOR}{" "}
                                            {color && color[0].name}
                                        </TextContent>
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {Strings.Home.CAR_BRAND}{" "}
                                            {brand && brand[0].name}
                                        </TextContent>
                                    </Box>
                                </Box>
                            );
                        })}
                </BoxLeftContent>

                <BoxRightContent>
                    <Box>
                        <ButtonInput>
                            <TextInput
                                disabled
                                label="-- Chọn Thời Gian --"
                                // value="sdfsdf"
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <CalendarMonthIcon
                                                sx={{
                                                    color: theme.palette.primary
                                                        .main,
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ margin: 0 }}
                            />
                        </ButtonInput>
                        <TextInput
                            label={Strings.RentalCar.CAR_RENTAL_REASON}
                            variant="outlined"
                            size="small"
                        />
                    </Box>
                    <Box>
                        <ButtonInput onClick={() => setModalShowAdderss(true)}>
                            <TextInput
                                disabled
                                label={Strings.RentalCar.START_LOCATION}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOnIcon
                                                sx={{
                                                    color: theme.palette.primary
                                                        .main,
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ margin: 0 }}
                            />
                        </ButtonInput>
                        <ButtonInput>
                            <TextInput
                                disabled
                                label={Strings.RentalCar.END_LOCATION}
                                variant="outlined"
                                size="small"
                                // sx={{ width: "100% !important" }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOnIcon
                                                sx={{
                                                    color: theme.palette.primary
                                                        .main,
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ margin: 0 }}
                            />
                        </ButtonInput>
                    </Box>
                </BoxRightContent>
            </BoxContainerContent>

            <ModalShowAddress
                open={modalShowAdderss}
                handleClose={() => setModalShowAdderss(false)}
                labelInput={Strings.RentalCar.ENTER_START_LOCATION}
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

export default RentalCar;
