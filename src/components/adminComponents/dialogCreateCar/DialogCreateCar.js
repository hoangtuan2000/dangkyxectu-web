import { useState, useEffect, useRef, forwardRef } from "react";
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    InputAdornment,
    TextField,
    Tooltip,
    useTheme,
} from "@mui/material";
import {
    AutocompleteStyle,
    BoxContent,
    BoxImg,
    BoxLeft,
    BoxRight,
    ButtonFeatures,
    ButtonStyled,
    DialogContainer,
    Img,
    TextError,
    TextInput,
    TextStyle,
    Title,
} from "./DialogCreateCarCustomStyles";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BackDrop from "../../backDrop/BackDrop";
import CodeIcon from "@mui/icons-material/Code";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Constants from "../../../constants/Constants";
import { GlobalService } from "../../../services/GlobalServices";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import helper from "../../../common/helper";
import axios from "axios";
import { DialogCreateCarServices } from "../../../services/adminServices/DialogCreateCarServices";
import DialogConfirmation from "../../dialogConfirmation/DialogConfirmation";
registerLocale("vi", vi);

function DialogCreateCar({
    open,
    handleClose,
    handleGetCarListForAdminWithFilter,
}) {
    const theme = useTheme();

    const inputImage = useRef();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });
    const [dialogConfirmation, setDialogConfirmation] = useState({
        open: false,
        title: Strings.Common.DO_YOU_WANT_TO_ADD_CAR,
        content: Strings.Common.ADD_CAR_CONFIRMATION,
        handleSubmit: () => {},
    });

    const [selectDates, setSelectDates] = useState({
        carRegistrationCertificate: {
            startDate: null,
            endDate: null,
        },
        periodicInspectionCertificate: {
            startDate: null,
            endDate: null,
        },
        carInsurance: {
            startDate: null,
            endDate: null,
        },
    });
    const [imagePreview, setImagePreview] = useState();
    const [errorData, setErrorData] = useState({
        errorImage: false,
        errorLicensePlates: false,
        errorCarType: false,
        errorCarBrand: false,
        errorCarColor: false,
        errorDateCarRegistrationCertificate: false,
        errorDatePeriodicInspectionCertificate: false,
        errorDateCarInsurance: false,
    });
    const [dataSendApi, setDataSendApi] = useState({
        image: null,
        licensePlates: null,
        carType: null,
        carBrand: null,
        carColor: null,
        dateCarRegistrationCertificate: [],
        datePeriodicInspectionCertificate: [],
        dateCarInsurance: [],
    });
    const [carTypeList, setCarTypeList] = useState([]);
    const [carBrandList, setCarBrandList] = useState([]);
    const [carColorList, setCarColorList] = useState([]);

    const getCommon = async () => {
        const res = await GlobalService.getCommon({
            group: "car_brand, car_type, car_color",
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setCarTypeList(res.data.data.car_type);
                setCarBrandList(res.data.data.car_brand);
                setCarColorList(res.data.data.car_color);
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

    const ButtonDate = forwardRef(
        (
            {
                value,
                onClick,
                handleRemoveDate,
                titleContent,
                error,
                helperText,
            },
            ref
        ) => {
            return (
                <Tooltip
                    title={
                        value
                            ? value
                            : titleContent
                            ? titleContent
                            : Strings.DialogCreateCar.CHOOSE_TIME
                    }
                >
                    <Box
                        sx={{
                            position: "relative",
                            width: "fit-content",
                        }}
                    >
                        <ButtonStyled
                            onClick={onClick}
                            ref={ref}
                            variant="outlined"
                            endIcon={
                                <CalendarMonthIcon
                                    sx={{
                                        color: error
                                            ? theme.palette.error.main
                                            : theme.palette.primary.main,
                                        display: value && "none",
                                    }}
                                />
                            }
                            sx={{
                                borderColor: error && theme.palette.error.main,
                            }}
                        >
                            {value
                                ? value
                                : titleContent
                                ? titleContent
                                : Strings.DialogCreateCar.CHOOSE_TIME}
                        </ButtonStyled>
                        {error && (
                            <TextError variant="span" component="div">
                                {helperText}
                            </TextError>
                        )}
                        {value && (
                            <Button
                                size="small"
                                onClick={handleRemoveDate}
                                sx={{
                                    zIndex: 99999,
                                    position: "absolute",
                                    top: 5,
                                    right: 10,
                                    p: 0,
                                    color: theme.palette.error.light,
                                    opacity: 0.8,
                                    width: "22px !important",
                                    minWidth: 22,
                                }}
                            >
                                <HighlightOffIcon />
                            </Button>
                        )}
                    </Box>
                </Tooltip>
            );
        }
    );

    // DATE OF Car Registration Certificate
    const handleChangeDateCarRegistrationCertificate = (dates) => {
        const [start, end] = dates;
        setSelectDates({
            ...selectDates,
            carRegistrationCertificate: {
                startDate: start,
                endDate: end,
            },
        });
        setDataSendApi({
            ...dataSendApi,
            dateCarRegistrationCertificate:
                start && end
                    ? [
                          Math.floor(new Date(start).getTime()),
                          Math.floor(new Date(end).getTime()),
                      ]
                    : [],
        });
        setErrorData({
            ...errorData,
            errorDateCarRegistrationCertificate: !start || !end ? true : false,
        });
    };

    // DATE OF Periodic Inspection Certificate
    const handleChangeDatePeriodicInspectionCertificate = (dates) => {
        const [start, end] = dates;
        setSelectDates({
            ...selectDates,
            periodicInspectionCertificate: {
                startDate: start,
                endDate: end,
            },
        });
        setDataSendApi({
            ...dataSendApi,
            datePeriodicInspectionCertificate:
                start && end
                    ? [
                          Math.floor(new Date(start).getTime()),
                          Math.floor(new Date(end).getTime()),
                      ]
                    : [],
        });
        setErrorData({
            ...errorData,
            errorDatePeriodicInspectionCertificate:
                !start || !end ? true : false,
        });
    };

    // DATE OF Car Insurance
    const handleChangeDateCarInsurance = (dates) => {
        const [start, end] = dates;
        setSelectDates({
            ...selectDates,
            carInsurance: {
                startDate: start,
                endDate: end,
            },
        });
        setDataSendApi({
            ...dataSendApi,
            dateCarInsurance:
                start && end
                    ? [
                          Math.floor(new Date(start).getTime()),
                          Math.floor(new Date(end).getTime()),
                      ]
                    : [],
        });
        setErrorData({
            ...errorData,
            errorDateCarInsurance: !start || !end ? true : false,
        });
    };

    // OPEN FOLDER CHOOSE IMAGE
    const onOpenChooseImage = () => {
        inputImage.current.click();
    };

    // CHOOSE IMAGE
    const handleChooseImage = (e) => {
        let imgPreview = URL.createObjectURL(e.target.files[0]);
        setImagePreview(imgPreview);
        setDataSendApi({
            ...dataSendApi,
            image: e.target.files[0],
        });
        setErrorData({
            ...errorData,
            errorImage: false,
        });
    };

    const handleChangeLicensePlates = (e) => {
        setDataSendApi({
            ...dataSendApi,
            licensePlates: e.target.value,
        });
        setErrorData({
            ...errorData,
            errorLicensePlates: false,
        });
    };

    const handleSelectCarType = (e) => {
        setDataSendApi({
            ...dataSendApi,
            carType: e,
        });
        e &&
            setErrorData({
                ...errorData,
                errorCarType: false,
            });
    };

    const handleSelectCarBrand = (e) => {
        setDataSendApi({
            ...dataSendApi,
            carBrand: e,
        });
        e &&
            setErrorData({
                ...errorData,
                errorCarBrand: false,
            });
    };

    const handleSelectCarColor = (e) => {
        setDataSendApi({
            ...dataSendApi,
            carColor: e,
        });
        e &&
            setErrorData({
                ...errorData,
                errorCarColor: false,
            });
    };

    const handleValidateData = () => {
        if (
            !dataSendApi.image ||
            !dataSendApi.licensePlates ||
            !dataSendApi.carBrand ||
            !dataSendApi.carColor ||
            !dataSendApi.carType ||
            helper.isArrayEmpty(dataSendApi.dateCarRegistrationCertificate) ||
            helper.isArrayEmpty(
                dataSendApi.datePeriodicInspectionCertificate
            ) ||
            helper.isArrayEmpty(dataSendApi.dateCarInsurance)
        ) {
            setErrorData({
                ...errorData,
                errorImage: helper.isNullOrEmpty(dataSendApi.image),
                errorLicensePlates: helper.isNullOrEmpty(
                    dataSendApi.licensePlates
                ),
                errorCarType: helper.isNullOrEmpty(dataSendApi.carType),
                errorCarBrand: helper.isNullOrEmpty(dataSendApi.carBrand),
                errorCarColor: helper.isNullOrEmpty(dataSendApi.carColor),
                errorDateCarRegistrationCertificate: helper.isArrayEmpty(
                    dataSendApi.dateCarRegistrationCertificate
                ),
                errorDatePeriodicInspectionCertificate: helper.isArrayEmpty(
                    dataSendApi.datePeriodicInspectionCertificate
                ),
                errorDateCarInsurance: helper.isArrayEmpty(
                    dataSendApi.dateCarInsurance
                ),
            });
            return false;
        } else {
            return true;
        }
    };

    const handleRefreshInput = () => {
        // REFRESH SELECTED DATES
        setSelectDates({
            carRegistrationCertificate: {
                startDate: null,
                endDate: null,
            },
            periodicInspectionCertificate: {
                startDate: null,
                endDate: null,
            },
            carInsurance: {
                startDate: null,
                endDate: null,
            },
        });

        //REFRESH IMAGE PREVIEW
        setImagePreview();

        setDataSendApi({
            image: null,
            licensePlates: null,
            carType: null,
            carBrand: null,
            carColor: null,
            dateCarRegistrationCertificate: [],
            datePeriodicInspectionCertificate: [],
            dateCarInsurance: [],
        });
    };

    const handleFormDataSendApi = () => {
        const formData = new FormData();
        formData.append("imageCar", dataSendApi.image);
        formData.append(
            "idCarType",
            dataSendApi.carType && dataSendApi.carType.idCarType
        );
        formData.append(
            "idCarBrand",
            dataSendApi.carBrand && dataSendApi.carBrand.idCarBrand
        );
        formData.append(
            "idCarColor",
            dataSendApi.carColor && dataSendApi.carColor.idCarColor
        );
        formData.append("licensePlates", dataSendApi.licensePlates);
        for (
            var i = 0;
            i < dataSendApi.dateCarRegistrationCertificate.length;
            i++
        ) {
            formData.append(
                "dateCarRegistrationCertificate",
                dataSendApi.dateCarRegistrationCertificate[i]
            );
        }
        for (
            var i = 0;
            i < dataSendApi.datePeriodicInspectionCertificate.length;
            i++
        ) {
            formData.append(
                "datePeriodicInspectionCertificate",
                dataSendApi.datePeriodicInspectionCertificate[i]
            );
        }
        for (var i = 0; i < dataSendApi.dateCarInsurance.length; i++) {
            formData.append(
                "dateCarInsurance",
                dataSendApi.dateCarInsurance[i]
            );
        }
        return formData;
    };

    const createCar = async () => {
        await setBackDrop(true);
        const formData = await handleFormDataSendApi();
        const res = await DialogCreateCarServices.createCar(formData);
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setModalSuccess(true);
                handleRefreshInput();
                handleGetCarListForAdminWithFilter();
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
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    const onSubmit = async () => {
        const resultValidate = await handleValidateData();
        if (resultValidate) {
            setDialogConfirmation({
                ...dialogConfirmation,
                open: true,
                handleSubmit: () => {
                    createCar();
                },
            });
        }
    };

    const run = async () => {
        await setBackDrop(true);
        await getCommon();
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    useEffect(() => {
        run();
    }, []);

    return (
        <DialogContainer
            open={open}
            onClose={handleClose}
            scroll="body"
            fullWidth={true}
        >
            {/* FORM */}
            <DialogContent>
                {/* TITLE */}
                <Title>{Strings.DialogCreateCar.TITLE}</Title>

                {/* CONTENT */}
                <Box>
                    <BoxLeft>
                        {/* CHOOSE IMAGE */}
                        <Box
                            sx={{
                                marginBottom: "30px",
                            }}
                        >
                            <input
                                ref={inputImage}
                                type="file"
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={(e) => handleChooseImage(e)}
                            />
                            <BoxImg
                                onClick={onOpenChooseImage}
                                sx={{
                                    borderColor:
                                        errorData.errorImage &&
                                        theme.palette.error.main,
                                }}
                            >
                                {imagePreview && <Img src={imagePreview} />}
                                <CameraAltIcon
                                    sx={{
                                        fontSize: "50px",
                                        color: errorData.errorImage
                                            ? theme.palette.error.main
                                            : theme.palette.text.secondary,
                                        opacity: 0.5,
                                        zIndex: 999999,
                                        position: "absolute",
                                        top: "35%",
                                    }}
                                />
                            </BoxImg>
                            {errorData.errorImage && (
                                <Box sx={{ textAlign: "center" }}>
                                    <TextError variant="span" component="div">
                                        {
                                            Strings.DialogCreateCar
                                                .CHOOSE_IMAGE_PLEASE
                                        }
                                    </TextError>
                                </Box>
                            )}
                        </Box>

                        {/* LICENSE PLATES */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogCreateCar.LICENSE_PLATES}
                            </TextStyle>
                            <TextInput
                                placeholder={
                                    Strings.DialogCreateCar.ENTER_LICENSE_PLATES
                                }
                                variant="outlined"
                                size="small"
                                value={dataSendApi.licensePlates || ""}
                                onChange={(e) => handleChangeLicensePlates(e)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <DirectionsCarIcon
                                                sx={{
                                                    color: errorData.errorLicensePlates
                                                        ? theme.palette.error
                                                              .main
                                                        : theme.palette.primary
                                                              .main,
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                error={errorData.errorLicensePlates}
                                helperText={
                                    errorData.errorLicensePlates &&
                                    Strings.DialogCreateCar
                                        .ENTER_LICENSE_PLATES_PLEASE
                                }
                            />
                        </Box>

                        {/* CAR TYPE */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogCreateCar.CAR_TYPE}
                            </TextStyle>
                            <AutocompleteStyle
                                disablePortal={false}
                                size="small"
                                sx={{ marginBottom: 1 }}
                                noOptionsText={Strings.Common.NO_DATA}
                                options={carTypeList}
                                getOptionLabel={(option) =>
                                    `${option.name} ${option.seatNumber} Chổ`
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder={
                                            Strings.DialogCreateCar
                                                .CHOOSE_CAR_TYPE
                                        }
                                        error={errorData.errorCarType}
                                        helperText={
                                            errorData.errorCarType &&
                                            Strings.DialogCreateCar
                                                .CHOOSE_CAR_TYPE_PLEASE
                                        }
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    handleSelectCarType(newValue);
                                }}
                                value={dataSendApi.carType || null}
                                isOptionEqualToValue={(option, value) =>
                                    option.idCarType === value.idCarType
                                }
                            />
                        </Box>
                    </BoxLeft>

                    <BoxRight>
                        {/* CAR BRAND */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogCreateCar.CAR_BRAND}
                            </TextStyle>
                            <AutocompleteStyle
                                disablePortal={false}
                                size="small"
                                sx={{ marginBottom: 1 }}
                                noOptionsText={Strings.Common.NO_DATA}
                                options={carBrandList}
                                getOptionLabel={(option) => `${option.name}`}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder={
                                            Strings.DialogCreateCar
                                                .CHOOSE_CAR_BRAND
                                        }
                                        error={errorData.errorCarBrand}
                                        helperText={
                                            errorData.errorCarBrand &&
                                            Strings.DialogCreateCar
                                                .CHOOSE_CAR_BRAND_PLEASE
                                        }
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    handleSelectCarBrand(newValue);
                                }}
                                value={dataSendApi.carBrand || null}
                                isOptionEqualToValue={(option, value) =>
                                    option.idCarBrand === value.idCarBrand
                                }
                            />
                        </Box>

                        {/* CAR COLOR */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogCreateCar.CAR_COLOR}
                            </TextStyle>
                            <AutocompleteStyle
                                disablePortal={false}
                                size="small"
                                sx={{ marginBottom: 1 }}
                                noOptionsText={Strings.Common.NO_DATA}
                                options={carColorList}
                                getOptionLabel={(option) => `${option.name}`}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder={
                                            Strings.DialogCreateCar
                                                .CHOOSE_CAR_COLOR
                                        }
                                        error={errorData.errorCarColor}
                                        helperText={
                                            errorData.errorCarColor &&
                                            Strings.DialogCreateCar
                                                .CHOOSE_CAR_COLOR_PLEASE
                                        }
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    handleSelectCarColor(newValue);
                                }}
                                value={dataSendApi.carColor || null}
                                isOptionEqualToValue={(option, value) =>
                                    option.idCarColor === value.idCarColor
                                }
                            />
                        </Box>

                        {/* CAR REGISTRATION CERTIFICATE */}
                        <Box sx={{ marginBottom: 1 }}>
                            <TextStyle>
                                {
                                    Strings.DialogCreateCar
                                        .CAR_REGISTRATION_CERTIFICATE
                                }
                            </TextStyle>
                            <DatePicker
                                locale="vi"
                                dateFormat={Constants.Styled.DATE_FORMAT}
                                selectsRange={true}
                                startDate={
                                    selectDates.carRegistrationCertificate
                                        .startDate
                                }
                                endDate={
                                    selectDates.carRegistrationCertificate
                                        .endDate
                                }
                                withPortal
                                customInput={
                                    <ButtonDate
                                        handleRemoveDate={() =>
                                            handleChangeDateCarRegistrationCertificate(
                                                [null, null]
                                            )
                                        }
                                        titleContent={
                                            Strings.DialogCreateCar
                                                .CHOOSE_TIME_CAR_REGISTRATION_CERTIFICATE
                                        }
                                        error={
                                            errorData.errorDateCarRegistrationCertificate
                                        }
                                        helperText={
                                            Strings.DialogCreateCar
                                                .CHOOSE_TIME_PLEASE
                                        }
                                    />
                                }
                                selected={
                                    selectDates.carRegistrationCertificate
                                        .startDate
                                }
                                onChange={
                                    handleChangeDateCarRegistrationCertificate
                                }
                                showYearDropdown
                            />
                        </Box>

                        {/* PERIODIC INSPECTION CERTIFICATE */}
                        <Box sx={{ marginBottom: 1 }}>
                            <TextStyle>
                                {
                                    Strings.DialogCreateCar
                                        .PERIODIC_INSPECTION_CERTIFICATE
                                }
                            </TextStyle>
                            <DatePicker
                                locale="vi"
                                dateFormat={Constants.Styled.DATE_FORMAT}
                                selectsRange={true}
                                startDate={
                                    selectDates.periodicInspectionCertificate
                                        .startDate
                                }
                                endDate={
                                    selectDates.periodicInspectionCertificate
                                        .endDate
                                }
                                withPortal
                                customInput={
                                    <ButtonDate
                                        handleRemoveDate={() =>
                                            handleChangeDatePeriodicInspectionCertificate(
                                                [null, null]
                                            )
                                        }
                                        titleContent={
                                            Strings.DialogCreateCar
                                                .CHOOSE_TIME_PERIODIC_INSPECTION_CERTIFICATE
                                        }
                                        error={
                                            errorData.errorDatePeriodicInspectionCertificate
                                        }
                                        helperText={
                                            Strings.DialogCreateCar
                                                .CHOOSE_TIME_PLEASE
                                        }
                                    />
                                }
                                selected={
                                    selectDates.periodicInspectionCertificate
                                        .startDate
                                }
                                onChange={
                                    handleChangeDatePeriodicInspectionCertificate
                                }
                                showYearDropdown
                            />
                        </Box>

                        {/* CAR INSURANCE */}
                        <Box sx={{ marginBottom: 1 }}>
                            <TextStyle>
                                {Strings.DialogCreateCar.CAR_INSURANCE}
                            </TextStyle>
                            <DatePicker
                                locale="vi"
                                dateFormat={Constants.Styled.DATE_FORMAT}
                                selectsRange={true}
                                startDate={selectDates.carInsurance.startDate}
                                endDate={selectDates.carInsurance.endDate}
                                withPortal
                                customInput={
                                    <ButtonDate
                                        handleRemoveDate={() =>
                                            handleChangeDateCarInsurance([
                                                null,
                                                null,
                                            ])
                                        }
                                        titleContent={
                                            Strings.DialogCreateCar
                                                .CHOOSE_TIME_CAR_INSURANCE
                                        }
                                        error={errorData.errorDateCarInsurance}
                                        helperText={
                                            Strings.DialogCreateCar
                                                .CHOOSE_TIME_PLEASE
                                        }
                                    />
                                }
                                selected={selectDates.carInsurance.startDate}
                                onChange={handleChangeDateCarInsurance}
                                showYearDropdown
                            />
                        </Box>
                    </BoxRight>
                </Box>
            </DialogContent>

            {/* BUTTON */}
            <DialogActions>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    {/* EXIT BUTTON */}
                    <ButtonFeatures
                        size="small"
                        variant="contained"
                        endIcon={<CancelIcon />}
                        color="error"
                        sx={{ marginRight: 1 }}
                        onClick={handleClose}
                    >
                        {Strings.Common.EXIT}
                    </ButtonFeatures>

                    {/* SUBMIT BUTTON */}
                    <ButtonFeatures
                        size="small"
                        variant="contained"
                        endIcon={<CheckCircleIcon />}
                        color="primary"
                        sx={{ marginRight: 1 }}
                        onClick={onSubmit}
                    >
                        {Strings.Common.ADD}
                    </ButtonFeatures>
                </Box>
            </DialogActions>

            <DialogConfirmation
                open={dialogConfirmation.open}
                handleClose={() =>
                    setDialogConfirmation({
                        ...dialogConfirmation,
                        open: false,
                    })
                }
                content={dialogConfirmation.content}
                title={dialogConfirmation.title}
                handleSubmit={dialogConfirmation.handleSubmit}
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
        </DialogContainer>
    );
}

export default DialogCreateCar;
