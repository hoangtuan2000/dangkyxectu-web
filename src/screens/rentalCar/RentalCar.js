import { InputAdornment, Tooltip, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    ButtonStyled,
    CarTypeTitle,
    Img,
    TextContent,
    TextInput,
    Title,
    TitleInput,
} from "./RentalCarCustomStyles";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import CreateIcon from "@mui/icons-material/Create";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ModalShowAddress from "../../components/modalShowAddress/ModalShowAddress";
import helper from "../../common/helper";
import ModalSuccess from "../../components/modalSuccess/ModalSuccess";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
registerLocale("vi", vi);

const defaultStartAddress = {
    address: "Khu II Đại Học Cần Thơ",
    province: {
        idProvince: "92",
        name: "Thành phố Cần Thơ",
        type: "Thành phố Trung ương",
    },
    district: {
        idDistrict: "916",
        idProvince: "92",
        name: "Quận Ninh Kiều",
        type: "Quận",
    },
    ward: {
        idDistrict: "916",
        idWard: "31149",
        name: "Phường An Khánh",
        type: "Phường",
    },
};

function RentalCar() {
    const theme = useTheme();
    const ModalShowEndAddressRef = useRef(); // use call reset address function

    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.currentUser.user);
    const { idCar } = useParams();

    const [modalShowStartAdderss, setModalShowStartAdderss] = useState(false);
    const [modalShowEndAdderss, setModalShowEndAdderss] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [disableDateSchedule, setDisableDateSchedule] = useState([]);
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

    const [errorData, setErrorData] = useState({
        errorIdCar: false,
        errorStartDate: false,
        errorEndDate: false,
        errorStartLocation: false,
        errorEndLocation: false,
        errorReason: false,
        errorNote: false,
        errorPhone: false,
        errorIdWardStartLocation: false,
        errorIdWardEndLocation: false,
    });

    const [dataSendApi, setDataSendApi] = useState({
        idCar: idCar,
        startDate: null,
        endDate: null,
        startLocation: defaultStartAddress.address,
        endLocation: null,
        reason: null,
        note: null,
        phone: currentUser.phone || null,
        idWardStartLocation: defaultStartAddress.ward.idWard,
        idWardEndLocation: null,
    });

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
                    sx={{
                        color: value
                            ? theme.palette.text.primary
                            : (errorData.errorStartDate ||
                                  errorData.errorEndDate) &&
                              theme.palette.error.light,
                        borderColor:
                            (errorData.errorStartDate ||
                                errorData.errorEndDate) &&
                            theme.palette.error.dark,
                    }}
                >
                    {value ? value : Strings.RentalCar.CHOOSE_TIME}
                </ButtonStyled>
            </Tooltip>
        );
    });

    const getScheduledDateForCar = async (idCar) => {
        const res = await RentalCarService.getScheduledDateForCar({
            idCar: idCar,
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                let result = res.data.data;
                if (result.length > 0) {
                    // handle put the dates already in the schedule into the array useState DisableDateSchedule
                    let dateRange = [];
                    for (let i = 0; i < result.length; i++) {
                        let startDate = new Date(result[i].startDate * 1000);
                        let endDate = new Date(result[i].endDate * 1000);
                        if (
                            new Date(startDate.toDateString()) >=
                                new Date(new Date().toDateString()) ||
                            new Date(endDate.toDateString()) >=
                                new Date(new Date().toDateString())
                        ) {
                            for (
                                let dateTemp = new Date(
                                    startDate.toDateString()
                                );
                                dateTemp <= new Date(endDate.toDateString());

                            ) {
                                dateRange.push(
                                    new Date(dateTemp.toDateString())
                                );
                                dateTemp = new Date(
                                    dateTemp.setDate(dateTemp.getDate() + 1)
                                );
                            }
                        }
                    }
                    setDisableDateSchedule([...dateRange]);
                }
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
                title:
                    (res.request &&
                        `${Strings.Common.AN_ERROR_OCCURRED} (${res.request.status})`) ||
                    Strings.Common.ERROR,
                content: res.name || null,
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
            startDate: Math.floor(new Date(start).getTime()),
            endDate: Math.floor(new Date(end).getTime()),
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
            reason: e.target.value,
        });
    };

    const handleChangePhone = (e) => {
        if (helper.isValidPhoneNumber(e.target.value)) {
            setDataSendApi({
                ...dataSendApi,
                phone: e.target.value,
            });
            setErrorData({
                ...errorData,
                errorPhone: false,
            });
        } else {
            setDataSendApi({
                ...dataSendApi,
                phone: e.target.value,
            });
            setErrorData({
                ...errorData,
                errorPhone: true,
            });
        }
    };

    const handleChangeNote = (e) => {
        setDataSendApi({
            ...dataSendApi,
            note: e.target.value,
        });
    };

    const handleCheckNullData = () => {
        if (
            helper.isNullOrEmpty(dataSendApi.idCar) ||
            helper.isNullOrEmpty(dataSendApi.startDate) ||
            helper.isNullOrEmpty(dataSendApi.endDate) ||
            helper.isNullOrEmpty(dataSendApi.startLocation) ||
            helper.isNullOrEmpty(dataSendApi.endLocation) ||
            helper.isNullOrEmpty(dataSendApi.idWardStartLocation) ||
            helper.isNullOrEmpty(dataSendApi.idWardEndLocation) ||
            helper.isNullOrEmpty(dataSendApi.reason) ||
            !helper.isValidPhoneNumber(dataSendApi.phone)
        ) {
            setErrorData({
                ...errorData,
                errorIdCar: helper.isNullOrEmpty(dataSendApi.idCar) && true,
                errorStartDate:
                    helper.isNullOrEmpty(dataSendApi.startDate) && true,
                errorEndDate: helper.isNullOrEmpty(dataSendApi.endDate) && true,
                errorStartLocation:
                    helper.isNullOrEmpty(dataSendApi.startLocation) && true,
                errorEndLocation:
                    helper.isNullOrEmpty(dataSendApi.endLocation) && true,
                errorReason: helper.isNullOrEmpty(dataSendApi.reason) && true,
                errorIdWardStartLocation:
                    helper.isNullOrEmpty(dataSendApi.idWardStartLocation) &&
                    true,
                errorIdWardEndLocation:
                    helper.isNullOrEmpty(dataSendApi.idWardEndLocation) && true,
                errorPhone: !helper.isNullOrEmpty(dataSendApi.phone) && true,
            });
            return false;
        } else {
            return true;
        }
    };

    const handleResetErrorData = () => {
        setErrorData({
            ...errorData,
            errorIdCar: false,
            errorStartDate: false,
            errorEndDate: false,
            errorStartLocation: false,
            errorEndLocation: false,
            errorReason: false,
            errorNote: false,
            errorPhone: false,
            errorIdWardStartLocation: false,
            errorIdWardEndLocation: false,
        });
    };

    const handleCheckLengthData = () => {
        const len = 250;
        if (
            (dataSendApi.startLocation &&
                !helper.isValidStringLength(dataSendApi.startLocation, len)) ||
            (dataSendApi.endLocation &&
                !helper.isValidStringLength(dataSendApi.endLocation, len)) ||
            (dataSendApi.reason &&
                !helper.isValidStringLength(dataSendApi.reason, len)) ||
            (dataSendApi.note &&
                !helper.isValidStringLength(dataSendApi.note, len))
        ) {
            setErrorData({
                ...errorData,
                errorStartLocation:
                    dataSendApi.startLocation &&
                    !helper.isValidStringLength(
                        dataSendApi.startLocation,
                        len
                    ) &&
                    true,
                errorEndLocation:
                    dataSendApi.endLocation &&
                    !helper.isValidStringLength(dataSendApi.endLocation, len) &&
                    true,
                errorReason:
                    dataSendApi.reason &&
                    !helper.isValidStringLength(dataSendApi.reason, len) &&
                    true,
                errorNote:
                    dataSendApi.note &&
                    !helper.isValidStringLength(dataSendApi.note, len) &&
                    true,
            });
            return false;
        } else {
            return true;
        }
    };

    const handleResetInput = () => {
        handleResetErrorData();
        setShowEndAddress();
        setSelectedDates({
            startDate: null,
            endDate: null,
        });
        setDataSendApi({
            idCar: idCar,
            startDate: null,
            endDate: null,
            startLocation: defaultStartAddress.address,
            endLocation: null,
            reason: null,
            note: null,
            phone: currentUser.phone || null,
            idWardStartLocation: defaultStartAddress.ward.idWard,
            idWardEndLocation: null,
        });
    };

    const handleSubmit = async () => {
        const checkNull = await handleCheckNullData();
        if (checkNull) {
            const checkLength = await handleCheckLengthData();
            if (checkLength) {
                await setBackDrop(true);
                const res = await RentalCarService.createSchedule(dataSendApi);
                // axios success
                if (res.data) {
                    if (res.data.status == Constants.ApiCode.OK) {
                        handleResetInput();
                        //call function of child component: modalShowEndAdderss
                        //=> reset value in modal choosse end address
                        ModalShowEndAddressRef.current.handleResetAddress();
                        setModalSuccess(true);
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
                await setBackDrop(false);
            }
        }
    };

    const run = async () => {
        await setBackDrop(true);
        await getCommon();
        await getCar(idCar);
        await getScheduledDateForCar(idCar);
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    useEffect(() => {
        run();
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
                            let textColor = theme.palette.text.primary;
                            const objCarStatus = Constants.CarStatusCode;
                            for (const property in objCarStatus) {
                                if (
                                    val.idCarStatus ==
                                    `${objCarStatus[property]}`
                                ) {
                                    textColor =
                                        Constants.ColorOfCarStatus.Text[
                                            property
                                        ];
                                    break;
                                }
                            }
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
                                            {`${val.nameCarType} ${val.seatNumber} Chổ`}
                                        </CarTypeTitle>
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {Strings.RentalCar.LICENSE_PLATES}{" "}
                                            {val.licensePlates}
                                        </TextContent>
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {
                                                Strings.RentalCar
                                                    .VEHICLE_CONDITION
                                            }{" "}
                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                    color: textColor,
                                                }}
                                            >
                                                {val.nameCarStatus}
                                            </span>
                                        </TextContent>
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {Strings.RentalCar.CAR_COLOR}{" "}
                                            {val.nameCarColor}
                                        </TextContent>
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {Strings.RentalCar.CAR_BRAND}{" "}
                                            {val.nameCarBrand}
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
                                excludeDates={[...disableDateSchedule]}
                                selectsDisabledDaysInRange
                                minDate={new Date()}
                            />
                        </div>

                        <div style={{ float: "left" }}>
                            <TitleInput variant="p" component="div">
                                {Strings.RentalCar.CAR_RENTAL_REASON}
                                <span
                                    style={{
                                        display: errorData.errorReason
                                            ? "contents"
                                            : "none",
                                        color: theme.palette.error.main,
                                        fontStyle: "normal",
                                        fontWeight: "bold",
                                        marginLeft: 10,
                                    }}
                                >
                                    ( 1 - 250 Ký Tự )
                                </span>
                            </TitleInput>
                            <TextInput
                                placeholder={
                                    Strings.RentalCar.ENTER_CAR_RENTAL_REASON
                                }
                                variant="outlined"
                                size="small"
                                value={dataSendApi.reason || ""}
                                onChange={(e) => handleChangeReason(e)}
                                error={errorData.errorReason ? true : false}
                                inputProps={{
                                    style: {
                                        color:
                                            errorData.errorReason &&
                                            !dataSendApi.reason &&
                                            theme.palette.error.main,
                                    },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <AssignmentIcon
                                                sx={{
                                                    color: theme.palette.primary
                                                        .main,
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </Box>

                    <Box sx={{ clear: "both" }}></Box>

                    <Box>
                        <div style={{ float: "left" }}>
                            <TitleInput variant="p" component="div">
                                {Strings.RentalCar.START_LOCATION}
                                <span
                                    style={{
                                        display: errorData.errorStartLocation
                                            ? "contents"
                                            : "none",
                                        color: theme.palette.error.main,
                                        fontStyle: "normal",
                                        fontWeight: "bold",
                                        marginLeft: 10,
                                    }}
                                >
                                    ( 1 - 250 Ký Tự )
                                </span>
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
                                sx={{
                                    color:
                                        (errorData.errorStartLocation ||
                                            errorData.idWardStartLocation) &&
                                        theme.palette.error.light,
                                    borderColor:
                                        (errorData.errorStartLocation ||
                                            errorData.idWardStartLocation) &&
                                        theme.palette.error.dark,
                                }}
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
                                <span
                                    style={{
                                        display: errorData.errorEndLocation
                                            ? "contents"
                                            : "none",
                                        color: theme.palette.error.main,
                                        fontStyle: "normal",
                                        fontWeight: "bold",
                                        marginLeft: 10,
                                    }}
                                >
                                    ( 1 - 250 Ký Tự )
                                </span>
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
                                sx={{
                                    color:
                                        (errorData.errorEndLocation ||
                                            errorData.idWardEndLocation) &&
                                        theme.palette.error.light,
                                    borderColor:
                                        (errorData.errorEndLocation ||
                                            errorData.idWardEndLocation) &&
                                        theme.palette.error.dark,
                                }}
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
                                <span
                                    style={{
                                        display: errorData.errorNote
                                            ? "contents"
                                            : "none",
                                        color: theme.palette.error.main,
                                        fontStyle: "normal",
                                        fontWeight: "bold",
                                        marginLeft: 10,
                                    }}
                                >
                                    ( 1 - 250 Ký Tự )
                                </span>
                            </TitleInput>
                            <TextInput
                                placeholder={Strings.RentalCar.ENTER_NOTE}
                                variant="outlined"
                                size="small"
                                value={dataSendApi.note || ""}
                                onChange={(e) => handleChangeNote(e)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <CreateIcon
                                                sx={{
                                                    color: theme.palette.primary
                                                        .main,
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>

                        <div style={{ float: "left" }}>
                            <TitleInput variant="p" component="div">
                                {Strings.RentalCar.PHONE_NUMBER}
                                <span
                                    style={{
                                        display: errorData.errorPhone
                                            ? "contents"
                                            : "none",
                                        color: theme.palette.error.main,
                                        fontStyle: "normal",
                                        fontWeight: "bold",
                                        marginLeft: 10,
                                    }}
                                >
                                    ( {Strings.Common.INVALID_PHONE_NUMBER} )
                                </span>
                            </TitleInput>
                            <TextInput
                                placeholder={
                                    Strings.RentalCar.ENTER_PHONE_NUMBER
                                }
                                variant="outlined"
                                size="small"
                                value={dataSendApi.phone || ""}
                                onChange={(e) => handleChangePhone(e)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneEnabledIcon
                                                sx={{
                                                    color: theme.palette.primary
                                                        .main,
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
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
                                onClick={handleSubmit}
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
                defaultAddress={defaultStartAddress.address}
                defaultProvince={defaultStartAddress.province}
                defaultDistrict={defaultStartAddress.district}
                defaultWard={defaultStartAddress.ward}
            />

            <ModalShowAddress
                open={modalShowEndAdderss}
                handleClose={() => setModalShowEndAdderss(false)}
                labelInput={Strings.RentalCar.ENTER_END_LOCATION}
                titleModal={Strings.ModalShowAddress.TITLE_END_LOCATION}
                onConfirm={(e) => handleShowEndAddress(e)}
                ref={ModalShowEndAddressRef}
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

export default RentalCar;
