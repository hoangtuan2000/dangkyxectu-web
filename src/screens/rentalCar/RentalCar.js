import { AccountCircle } from "@mui/icons-material";
import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { forwardRef, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BackDrop from "../../components/backDrop/BackDrop";
import ModalError from "../../components/modalError/ModalError";
import Constants from "../../constants/Constants";
import Strings from "../../constants/Strings";
import RoutesPath from "../../constants/RoutesPath";
import { GlobalService } from "../../services/GlobalServices";
import { RentalCarService } from "../../services/RentalCarServices";
import {
    BoxContainerContent,
    BoxLeftContent,
    BoxRightContent,
    ButtonFeatures,
    // ButtonInput,
    ButtonStyled,
    CarTypeTitle,
    Img,
    TextContent,
    TextInput,
    Title,
    TitleInput,
} from "./RentalCarCustomStyles";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import CreateIcon from "@mui/icons-material/Create";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ModalShowAddress from "../../components/modalShowAddress/ModalShowAddress";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { addDays, subDays } from "date-fns";
import vi from "date-fns/locale/vi";
registerLocale("vi", vi);

function RentalCar() {
    const theme = useTheme();

    const navigate = useNavigate();

    const { idCar } = useParams();

    const [modalShowStartAdderss, setModalShowStartAdderss] = useState(false);
    const [modalShowEndAdderss, setModalShowEndAdderss] = useState(false);
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

    const [showStartAddress, setShowStartAddress] = useState();
    const [showEndAddress, setShowEndAddress] = useState();
    const [selectedDates, setSelectedDates] = useState({
        startDate: null,
        endDate: null,
    });

    const [dataSendApi, setDataSendApi] = useState({
        idCar: idCar,
        startDate: null,
        endDate: null,
        startLocation: null,
        endLocation: null,
        reason: null,
        note: null,
        idWardStartLocation: null,
        idWardEndLocation: null,
    });

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

    const getCommon = async () => {
        const res = await GlobalService.getCommon({
            group: "car_type, car_status, car_color, car_brand",
        });
        // axios success
        if (res.data) {
            // login success
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

    const handleChangeDate = (dates) => {
        const [start, end] = dates;
        setSelectedDates({
            startDate: start,
            endDate: end,
        });
        setDataSendApi({
            ...dataSendApi,
            startDate: Math.floor(new Date(start).getTime() / 1000),
            endDate: Math.floor(new Date(end).getTime() / 1000),
        });
    };

    const handleShowStartAddress = (e) => {
        const address = `${e.address} - ${e.ward.name} - ${e.district.name} - ${e.province.name}`;
        setShowStartAddress(address);
        setDataSendApi({
            ...dataSendApi,
            startLocation: e.address,
            idWardStartLocation: e.ward.idWard,
        });
    };

    const handleShowEndAddress = (e) => {
        const address = `${e.address} - ${e.ward.name} - ${e.district.name} - ${e.province.name}`;
        setShowEndAddress(address);
        setDataSendApi({
            ...dataSendApi,
            endLocation: e.address,
            idWardEndLocation: e.ward.idWard,
        });
    };

    const handleChangeReason = (e) => {
        setDataSendApi({
            ...dataSendApi,
            reason: e.target.value
        });
    }

    const handleChangeNote = (e) => {
        setDataSendApi({
            ...dataSendApi,
            note: e.target.value
        });
    }

    const ButtonDate = forwardRef(({ value, onClick }, ref) => {
        return (
            <Tooltip title={value ? value : Strings.RentalCar.CHOOSE_TIME}>
                <ButtonStyled
                    onClick={onClick}
                    ref={ref}
                    variant="outlined"
                    endIcon={
                        <CalendarMonthIcon
                            sx={{
                                color: theme.palette.primary.main,
                            }}
                        />
                    }
                    sx={{ color: value && theme.palette.text.primary }}
                >
                    {value ? value : Strings.RentalCar.CHOOSE_TIME}
                </ButtonStyled>
            </Tooltip>
        );
    });

    useEffect(() => {
        setBackDrop(true);
        getCommon()
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
                        <div style={{ float: "left" }}>
                            <TitleInput variant="p" component="div">
                                {Strings.RentalCar.START_END_DAY}
                            </TitleInput>
                            <DatePicker
                                locale="vi"
                                dateFormat={Constants.Styled.DATE_FORMAT}
                                selectsRange={true}
                                startDate={selectedDates.startDate}
                                endDate={selectedDates.endDate}
                                withPortal
                                customInput={<ButtonDate />}
                                selected={selectedDates.startDate}
                                onChange={handleChangeDate}
                                // excludeDates={[
                                //     // new Date(),
                                //     new Date("09/09/2022"),
                                // ]}
                                selectsDisabledDaysInRange
                                minDate={new Date()}
                            />
                        </div>

                        <div style={{ float: "left" }}>
                            <TitleInput variant="p" component="div">
                                {Strings.RentalCar.CAR_RENTAL_REASON}
                            </TitleInput>
                            <TextInput
                                placeholder={
                                    Strings.RentalCar.ENTER_CAR_RENTAL_REASON
                                }
                                variant="outlined"
                                size="small"
                                value={dataSendApi.reason || ""}
                                onChange={(e) => handleChangeReason(e)}
                            />
                        </div>
                    </Box>

                    <Box sx={{ clear: "both" }}></Box>

                    <Box>
                        <div style={{ float: "left" }}>
                            <TitleInput variant="p" component="div">
                                {Strings.RentalCar.START_LOCATION}
                            </TitleInput>
                            <ButtonStyled
                                onClick={() => setModalShowStartAdderss(true)}
                                variant="outlined"
                                endIcon={
                                    <LocationOnIcon
                                        sx={{
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                }
                            >
                                <Tooltip
                                    title={
                                        showStartAddress
                                            ? showStartAddress
                                            : Strings.RentalCar
                                                  .ENTER_START_LOCATION
                                    }
                                >
                                    <Box
                                        sx={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            color:
                                                showStartAddress &&
                                                theme.palette.text.primary,
                                        }}
                                    >
                                        {showStartAddress
                                            ? showStartAddress
                                            : Strings.RentalCar
                                                  .ENTER_START_LOCATION}
                                    </Box>
                                </Tooltip>
                            </ButtonStyled>
                        </div>

                        <div style={{ float: "left" }}>
                            <TitleInput variant="p" component="div">
                                {Strings.RentalCar.END_LOCATION}
                            </TitleInput>
                            <ButtonStyled
                                onClick={() => setModalShowEndAdderss(true)}
                                variant="outlined"
                                endIcon={
                                    <LocationOnIcon
                                        sx={{
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                }
                            >
                                <Tooltip
                                    title={
                                        showEndAddress
                                            ? showEndAddress
                                            : Strings.RentalCar
                                                  .ENTER_END_LOCATION
                                    }
                                >
                                    <Box
                                        sx={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            color:
                                                showEndAddress &&
                                                theme.palette.text.primary,
                                        }}
                                    >
                                        {showEndAddress
                                            ? showEndAddress
                                            : Strings.RentalCar
                                                  .ENTER_END_LOCATION}
                                    </Box>
                                </Tooltip>
                            </ButtonStyled>
                        </div>
                    </Box>

                    <Box>
                        <div style={{ float: "left" }}>
                            <TitleInput variant="p" component="div">
                                {Strings.RentalCar.NOTE}
                            </TitleInput>
                            <TextInput
                                placeholder={Strings.RentalCar.ENTER_NOTE}
                                variant="outlined"
                                size="small"
                                value={dataSendApi.note || ""}
                                onChange={(e) => handleChangeNote(e)}
                            />
                        </div>
                    </Box>

                    <Box sx={{ clear: "both" }}></Box>
                    <Box>
                        <Box sx={{ marginLeft: 2 }}>
                            <ButtonFeatures
                                size="small"
                                variant="contained"
                                endIcon={<CancelIcon />}
                                color="error"
                                sx={{ marginRight: 1 }}
                                onClick={() => {
                                    navigate("/" + RoutesPath.HOME);
                                }}
                            >
                                {Strings.Common.CANCEL}
                            </ButtonFeatures>
                            <ButtonFeatures
                                size="small"
                                variant="contained"
                                endIcon={<SendIcon />}
                                onClick={() => console.log(dataSendApi)}
                            >
                                {Strings.RentalCar.REGISTRATION_CONFIRMATION}
                            </ButtonFeatures>
                        </Box>
                    </Box>
                </BoxRightContent>
            </BoxContainerContent>

            <ModalShowAddress
                open={modalShowStartAdderss}
                handleClose={() => setModalShowStartAdderss(false)}
                labelInput={Strings.RentalCar.ENTER_START_LOCATION}
                titleModal={Strings.ModalShowAddress.TITLE_START_LOCATION}
                onConfirm={(e) => handleShowStartAddress(e)}
                defaultAddress={"Khu II Đại Học Cần Thơ"}
                defaultProvince={{
                    idProvince: "92",
                    name: "Thành phố Cần Thơ",
                    type: "Thành phố Trung ương",
                }}
                defaultDistrict={{
                    idDistrict: "916",
                    idProvince: "92",
                    name: "Quận Ninh Kiều",
                    type: "Quận",
                }}
                defaultWard={{
                    idDistrict: "916",
                    idWard: "31149",
                    name: "Phường An Khánh",
                    type: "Phường",
                }}
            />

            <ModalShowAddress
                open={modalShowEndAdderss}
                handleClose={() => setModalShowEndAdderss(false)}
                labelInput={Strings.RentalCar.ENTER_END_LOCATION}
                titleModal={Strings.ModalShowAddress.TITLE_END_LOCATION}
                onConfirm={(e) => handleShowEndAddress(e)}
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
