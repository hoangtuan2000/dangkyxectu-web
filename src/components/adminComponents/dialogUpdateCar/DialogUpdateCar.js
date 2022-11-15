import { useState, useEffect, useRef, forwardRef } from "react";
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    InputAdornment,
    ListItem,
    ListItemText,
    TextField,
    Tooltip,
    useTheme,
} from "@mui/material";
import {
    AutocompleteStyle,
    BoxImg,
    BoxLeft,
    BoxRight,
    ButtonFeatures,
    ButtonStyled,
    DialogContainer,
    Img,
    ListStyle,
    TextError,
    BoxHelperDisable,
    TextInput,
    TextStyle,
    Title,
} from "./DialogUpdateCarCustomStyles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UpdateIcon from "@mui/icons-material/Update";
import PersonIcon from "@mui/icons-material/Person";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import QrCodeIcon from "@mui/icons-material/QrCode";
import Constants from "../../../constants/Constants";
import { GlobalService } from "../../../services/GlobalServices";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import helper from "../../../common/helper";
import DialogConfirmation from "../../dialogConfirmation/DialogConfirmation";
import { DialogUpdateCarServices } from "../../../services/adminServices/DialogUpdateCarServices";
registerLocale("vi", vi);

function DialogUpdateCar({
    open,
    handleClose,
    idCar,
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
        title: Strings.Common.DO_YOU_WANT_TO_UPDATE,
        content: Strings.Common.UPDATE_CONFIRMATION,
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
        errorLicensePlatesLength: false,
        errorCarType: false,
        errorCarBrand: false,
        errorCarColor: false,
        errorCarStatus: false,
        errorDateCarRegistrationCertificate: false,
        errorDatePeriodicInspectionCertificate: false,
        errorDateCarInsurance: false,
    });
    const [dataOld, setDataOld] = useState({
        idCar: null,
        createdAt: null,
        updatedAt: null,
        fullNameAdmin: null,
        codeAdmin: null,
        emailAdmin: null,
        phoneAdmin: null,
        image: null,
        licensePlates: null,
        carType: null,
        carBrand: null,
        carColor: null,
        carStatus: null,
        dateCarRegistrationCertificate: [],
        datePeriodicInspectionCertificate: [],
        dateCarInsurance: [],
    });
    const [dataUpdateSendApi, setDataUpdateSendApi] = useState({});

    const [carTypeList, setCarTypeList] = useState([]);
    const [carBrandList, setCarBrandList] = useState([]);
    const [carColorList, setCarColorList] = useState([]);
    const [carStatusList, setCarStatusList] = useState([]);
    const [carLicenseList, setCarLicenseList] = useState({});

    const getCommon = async () => {
        const res = await GlobalService.getCommon({
            group: "car_brand, car_type, car_color, car_status",
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setCarTypeList(res.data.data.car_type);
                setCarBrandList(res.data.data.car_brand);
                setCarColorList(res.data.data.car_color);
                setCarStatusList(res.data.data.car_status);
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

    const getCarToUpdate = async (idCar) => {
        const res = await DialogUpdateCarServices.getCarToUpdate({
            idCar: idCar,
        });

        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                const resCarLicense =
                    await DialogUpdateCarServices.getCarLicense({
                        idCar: idCar,
                        group: "registrationCertificate, periodicInspectionCertificate, insurance",
                    });

                // axios success
                if (resCarLicense.data) {
                    if (resCarLicense.data.status == Constants.ApiCode.OK) {
                        let data = res.data.data[0];
                        let registrationCertificate =
                            resCarLicense.data.data.registrationCertificate[0];
                        let periodicInspectionCertificate =
                            resCarLicense.data.data
                                .periodicInspectionCertificate[0];
                        let insurance = resCarLicense.data.data.insurance[0];
                        setImagePreview(data.image);
                        setSelectDates({
                            carRegistrationCertificate: {
                                startDate: new Date(
                                    registrationCertificate.carLicenseDate *
                                        1000
                                ),
                                endDate: new Date(
                                    registrationCertificate.carLicenseExpirationDate *
                                        1000
                                ),
                            },
                            periodicInspectionCertificate: {
                                startDate: new Date(
                                    periodicInspectionCertificate.carLicenseDate *
                                        1000
                                ),
                                endDate: new Date(
                                    periodicInspectionCertificate.carLicenseExpirationDate *
                                        1000
                                ),
                            },
                            carInsurance: {
                                startDate: new Date(
                                    insurance.carLicenseDate * 1000
                                ),
                                endDate: new Date(
                                    insurance.carLicenseExpirationDate * 1000
                                ),
                            },
                        });
                        setCarLicenseList(resCarLicense.data.data);
                        setDataOld({
                            idCar: data.idCar,
                            image: data.image,
                            fullNameAdmin: data.fullNameAdmin,
                            codeAdmin: data.codeAdmin,
                            emailAdmin: data.emailAdmin,
                            phoneAdmin: data.phoneAdmin,
                            createdAt: data.createdAt,
                            updatedAt: data.updatedAt,
                            licensePlates: data.licensePlates,
                            carType: {
                                idCarType: data.idCarType,
                                name: data.nameCarType,
                                seatNumber: data.seatNumber,
                            },
                            carBrand: {
                                idCarBrand: data.idCarBrand,
                                name: data.nameCarBrand,
                            },
                            carColor: {
                                idCarColor: data.idCarColor,
                                name: data.nameCarColor,
                            },
                            carStatus: {
                                idCarStatus: data.idCarStatus,
                                name: data.nameCarStatus,
                            },
                            dateCarRegistrationCertificate: [
                                registrationCertificate.carLicenseDate * 1000,
                                registrationCertificate.carLicenseExpirationDate *
                                    1000,
                            ],
                            datePeriodicInspectionCertificate: [
                                periodicInspectionCertificate.carLicenseDate *
                                    1000,
                                periodicInspectionCertificate.carLicenseExpirationDate *
                                    1000,
                            ],
                            dateCarInsurance: [
                                insurance.carLicenseDate * 1000,
                                insurance.carLicenseExpirationDate * 1000,
                            ],
                        });
                    } else {
                        setModalError({
                            ...modalError,
                            open: true,
                            title: resCarLicense.data.message,
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
                            (resCarLicense.request &&
                                `${Strings.Common.AN_ERROR_OCCURRED} (${resCarLicense.request.status})`) ||
                            Strings.Common.ERROR,
                        content: resCarLicense.name || null,
                    });
                }
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

    const updateCar = async () => {
        await setBackDrop(true);
        let formData = handleFormDataSendApi();

        const res = await DialogUpdateCarServices.updateCar(formData);
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setModalSuccess(true);
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
                            : Strings.DialogUpdateCar.CHOOSE_TIME
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
                                : Strings.DialogUpdateCar.CHOOSE_TIME}
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
        setDataOld({
            ...dataOld,
            dateCarRegistrationCertificate:
                start && end
                    ? [
                          Math.floor(new Date(start).getTime()),
                          Math.floor(new Date(end).getTime()),
                      ]
                    : [],
        });
        setDataUpdateSendApi({
            ...dataUpdateSendApi,
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
        setDataOld({
            ...dataOld,
            datePeriodicInspectionCertificate:
                start && end
                    ? [
                          Math.floor(new Date(start).getTime()),
                          Math.floor(new Date(end).getTime()),
                      ]
                    : [],
        });
        setDataUpdateSendApi({
            ...dataUpdateSendApi,
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
        setDataOld({
            ...dataOld,
            dateCarInsurance:
                start && end
                    ? [
                          Math.floor(new Date(start).getTime()),
                          Math.floor(new Date(end).getTime()),
                      ]
                    : [],
        });
        setDataUpdateSendApi({
            ...dataUpdateSendApi,
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
        setDataOld({
            ...dataOld,
            image: e.target.files[0],
        });
        setDataUpdateSendApi({
            ...dataUpdateSendApi,
            image: e.target.files[0],
        });
        setErrorData({
            ...errorData,
            errorImage: false,
        });
    };

    const handleChangeLicensePlates = (e) => {
        setDataOld({
            ...dataOld,
            licensePlates: e.target.value,
        });
        setDataUpdateSendApi({
            ...dataUpdateSendApi,
            licensePlates: e.target.value,
        });
        setErrorData({
            ...errorData,
            errorLicensePlates: false,
            errorLicensePlatesLength: !helper.isValidStringBetweenMinMaxLength(
                e.target.value,
                Constants.Common.CHARACTERS_MIN_LENGTH_LICENSE_PLATES,
                Constants.Common.CHARACTERS_MAX_LENGTH_LICENSE_PLATES
            ),
        });
    };

    const handleSelectCarType = (e) => {
        setDataOld({
            ...dataOld,
            carType: e,
        });
        setDataUpdateSendApi({
            ...dataUpdateSendApi,
            carType: e,
        });
        e &&
            setErrorData({
                ...errorData,
                errorCarType: false,
            });
    };

    const handleSelectCarBrand = (e) => {
        setDataOld({
            ...dataOld,
            carBrand: e,
        });
        setDataUpdateSendApi({
            ...dataUpdateSendApi,
            carBrand: e,
        });
        e &&
            setErrorData({
                ...errorData,
                errorCarBrand: false,
            });
    };

    const handleSelectCarStatus = (e) => {
        setDataOld({
            ...dataOld,
            carStatus: e,
        });
        setDataUpdateSendApi({
            ...dataUpdateSendApi,
            carStatus: e,
        });
        e &&
            setErrorData({
                ...errorData,
                errorCarStatus: false,
            });
    };

    const handleSelectCarColor = (e) => {
        setDataOld({
            ...dataOld,
            carColor: e,
        });
        setDataUpdateSendApi({
            ...dataUpdateSendApi,
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
            (dataUpdateSendApi.hasOwnProperty("image") &&
                !dataUpdateSendApi.image) ||
            (dataUpdateSendApi.hasOwnProperty("licensePlates") &&
                !dataUpdateSendApi.licensePlates) ||
            (dataUpdateSendApi.hasOwnProperty("carBrand") &&
                !dataUpdateSendApi.carBrand) ||
            (dataUpdateSendApi.hasOwnProperty("carColor") &&
                !dataUpdateSendApi.carColor) ||
            (dataUpdateSendApi.hasOwnProperty("carType") &&
                !dataUpdateSendApi.carType) ||
            (dataUpdateSendApi.hasOwnProperty("carStatus") &&
                !dataUpdateSendApi.carStatus) ||
            (dataUpdateSendApi.hasOwnProperty(
                "dateCarRegistrationCertificate"
            ) &&
                helper.isArrayEmpty(
                    dataUpdateSendApi.dateCarRegistrationCertificate
                )) ||
            (dataUpdateSendApi.hasOwnProperty(
                "datePeriodicInspectionCertificate"
            ) &&
                helper.isArrayEmpty(
                    dataUpdateSendApi.datePeriodicInspectionCertificate
                )) ||
            (dataUpdateSendApi.hasOwnProperty("dateCarInsurance") &&
                helper.isArrayEmpty(dataUpdateSendApi.dateCarInsurance)) ||
            (dataUpdateSendApi.hasOwnProperty("licensePlates") &&
                !helper.isValidStringBetweenMinMaxLength(
                    dataUpdateSendApi.licensePlates,
                    Constants.Common.CHARACTERS_MIN_LENGTH_LICENSE_PLATES,
                    Constants.Common.CHARACTERS_MAX_LENGTH_LICENSE_PLATES
                ))
        ) {
            setErrorData({
                ...errorData,
                errorImage:
                    dataUpdateSendApi.hasOwnProperty("image") &&
                    !dataUpdateSendApi.image,

                errorLicensePlates:
                    dataUpdateSendApi.hasOwnProperty("licensePlates") &&
                    !dataUpdateSendApi.licensePlates,

                errorLicensePlatesLength:
                    dataUpdateSendApi.hasOwnProperty("licensePlates") &&
                    !helper.isValidStringBetweenMinMaxLength(
                        dataUpdateSendApi.licensePlates,
                        Constants.Common.CHARACTERS_MIN_LENGTH_LICENSE_PLATES,
                        Constants.Common.CHARACTERS_MAX_LENGTH_LICENSE_PLATES
                    ),

                errorCarType:
                    dataUpdateSendApi.hasOwnProperty("carType") &&
                    !dataUpdateSendApi.carType,

                errorCarBrand:
                    dataUpdateSendApi.hasOwnProperty("carBrand") &&
                    !dataUpdateSendApi.carBrand,

                errorCarColor:
                    dataUpdateSendApi.hasOwnProperty("carColor") &&
                    !dataUpdateSendApi.carColor,

                errorCarStatus:
                    dataUpdateSendApi.hasOwnProperty("carStatus") &&
                    !dataUpdateSendApi.carStatus,

                errorDateCarRegistrationCertificate:
                    dataUpdateSendApi.hasOwnProperty(
                        "dateCarRegistrationCertificate"
                    ) &&
                    helper.isArrayEmpty(
                        dataUpdateSendApi.dateCarRegistrationCertificate
                    ),

                errorDatePeriodicInspectionCertificate:
                    dataUpdateSendApi.hasOwnProperty(
                        "datePeriodicInspectionCertificate"
                    ) &&
                    helper.isArrayEmpty(
                        dataUpdateSendApi.datePeriodicInspectionCertificate
                    ),

                errorDateCarInsurance:
                    dataUpdateSendApi.hasOwnProperty("dateCarInsurance") &&
                    helper.isArrayEmpty(dataUpdateSendApi.dateCarInsurance),
            });
            return false;
        } else {
            return true;
        }
    };

    // const handleFormatData = () => {
    //     let data = {};

    //     data.idCar = idCar;
    //     data.image = dataUpdateSendApi.hasOwnProperty("image")
    //         ? dataUpdateSendApi.image
    //         : null;
    //     dataUpdateSendApi.hasOwnProperty("licensePlates") &&
    //         (data.licensePlates = dataUpdateSendApi.licensePlates);
    //     dataUpdateSendApi.hasOwnProperty("carType") &&
    //         (data.idCarType = dataUpdateSendApi.carType.idCarType);
    //     dataUpdateSendApi.hasOwnProperty("carBrand") &&
    //         (data.idCarBrand = dataUpdateSendApi.carBrand.idCarBrand);
    //     dataUpdateSendApi.hasOwnProperty("carColor") &&
    //         (data.idCarColor = dataUpdateSendApi.carColor.idCarColor);
    //     dataUpdateSendApi.hasOwnProperty("carStatus") &&
    //         (data.idCarStatus = dataUpdateSendApi.carStatus.idCarStatus);
    //     dataUpdateSendApi.hasOwnProperty("dateCarRegistrationCertificate") &&
    //         (data.dateCarRegistrationCertificate =
    //             dataUpdateSendApi.dateCarRegistrationCertificate);
    //     dataUpdateSendApi.hasOwnProperty("datePeriodicInspectionCertificate") &&
    //         (data.datePeriodicInspectionCertificate =
    //             dataUpdateSendApi.datePeriodicInspectionCertificate);
    //     dataUpdateSendApi.hasOwnProperty("dateCarInsurance") &&
    //         (data.dateCarInsurance = dataUpdateSendApi.dateCarInsurance);

    //     return data;
    // };

    const handleFormDataSendApi = () => {
        const formData = new FormData();

        formData.append("idCar", dataOld.idCar);

        dataUpdateSendApi.hasOwnProperty("image") &&
            formData.append("imageCar", dataUpdateSendApi.image);

        dataUpdateSendApi.hasOwnProperty("carType") &&
            formData.append(
                "idCarType",
                dataUpdateSendApi.carType && dataUpdateSendApi.carType.idCarType
            );

        dataUpdateSendApi.hasOwnProperty("carBrand") &&
            formData.append(
                "idCarBrand",
                dataUpdateSendApi.carBrand &&
                    dataUpdateSendApi.carBrand.idCarBrand
            );

        dataUpdateSendApi.hasOwnProperty("carColor") &&
            formData.append(
                "idCarColor",
                dataUpdateSendApi.carColor &&
                    dataUpdateSendApi.carColor.idCarColor
            );

        dataUpdateSendApi.hasOwnProperty("licensePlates") &&
            formData.append("licensePlates", dataUpdateSendApi.licensePlates);

        dataUpdateSendApi.hasOwnProperty("carStatus") &&
            formData.append(
                "idCarStatus",
                dataUpdateSendApi.carStatus.idCarStatus
            );

        if (
            dataUpdateSendApi.hasOwnProperty("dateCarRegistrationCertificate")
        ) {
            for (
                var i = 0;
                i < dataUpdateSendApi.dateCarRegistrationCertificate.length;
                i++
            ) {
                formData.append(
                    "dateCarRegistrationCertificate",
                    dataUpdateSendApi.dateCarRegistrationCertificate[i]
                );
            }
        }

        if (
            dataUpdateSendApi.hasOwnProperty(
                "datePeriodicInspectionCertificate"
            )
        ) {
            for (
                var i = 0;
                i < dataUpdateSendApi.datePeriodicInspectionCertificate.length;
                i++
            ) {
                formData.append(
                    "datePeriodicInspectionCertificate",
                    dataUpdateSendApi.datePeriodicInspectionCertificate[i]
                );
            }
        }

        if (dataUpdateSendApi.hasOwnProperty("dateCarInsurance")) {
            for (
                var i = 0;
                i < dataUpdateSendApi.dateCarInsurance.length;
                i++
            ) {
                formData.append(
                    "dateCarInsurance",
                    dataUpdateSendApi.dateCarInsurance[i]
                );
            }
        }

        return formData;
    };

    const onSubmit = async () => {
        const resultValidate = await handleValidateData();
        if (resultValidate) {
            setDialogConfirmation({
                ...dialogConfirmation,
                open: true,
                handleSubmit: () => {
                    updateCar();
                },
            });
        }
    };

    const run = async () => {
        await setBackDrop(true);
        await getCommon();
        await getCarToUpdate(idCar);
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    useEffect(() => {
        setModalError({
            open: false,
            title: null,
            content: null,
        });
        setErrorData({
            errorImage: false,
            errorLicensePlates: false,
            errorLicensePlatesLength: false,
            errorCarType: false,
            errorCarBrand: false,
            errorCarColor: false,
            errorCarStatus: false,
            errorDateCarRegistrationCertificate: false,
            errorDatePeriodicInspectionCertificate: false,
            errorDateCarInsurance: false,
        });
        setDataUpdateSendApi({});
        run();
    }, [idCar]);

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
                <Title>{Strings.DialogUpdateCar.TITLE}</Title>

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
                                            Strings.DialogUpdateCar
                                                .CHOOSE_IMAGE_PLEASE
                                        }
                                    </TextError>
                                </Box>
                            )}
                        </Box>

                        {/* INFO CREATED AT AND UPDATED AT */}
                        <Box>
                            {/* LIST INFO TIME */}
                            <ListStyle>
                                {/* CREATED AT */}
                                {dataOld.createdAt && (
                                    <ListItem>
                                        <AccessTimeIcon />
                                        <Tooltip
                                            title={helper.formatDateTimeStringFromTimeStamp(
                                                dataOld.createdAt
                                            )}
                                            arrow
                                        >
                                            <ListItemText
                                                primary={
                                                    Strings.DialogUpdateCar
                                                        .CREATED_AT
                                                }
                                                secondary={helper.formatDateTimeStringFromTimeStamp(
                                                    dataOld.createdAt
                                                )}
                                            />
                                        </Tooltip>
                                    </ListItem>
                                )}

                                {/* UPDATED AT */}
                                {dataOld.updatedAt && (
                                    <ListItem>
                                        <UpdateIcon />
                                        <Tooltip
                                            title={helper.formatDateTimeStringFromTimeStamp(
                                                dataOld.updatedAt
                                            )}
                                            arrow
                                        >
                                            <ListItemText
                                                primary={
                                                    Strings
                                                        .DialogShowScheduleAdmin
                                                        .UPDATED_AT
                                                }
                                                secondary={helper.formatDateTimeStringFromTimeStamp(
                                                    dataOld.updatedAt
                                                )}
                                            />
                                        </Tooltip>
                                    </ListItem>
                                )}
                            </ListStyle>
                        </Box>

                        {/* INFO ADMIN */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogUpdateCar.INFO_ADMIN}
                            </TextStyle>

                            <ListStyle sx={{ marginLeft: 2 }}>
                                {/* FULL NAME ADMIN */}
                                {dataOld.fullNameAdmin && (
                                    <ListItem>
                                        <PersonIcon />
                                        <Tooltip
                                            title={dataOld.fullNameAdmin}
                                            arrow
                                        >
                                            <ListItemText
                                                primary={
                                                    Strings.DialogUpdateCar.NAME
                                                }
                                                secondary={
                                                    dataOld.fullNameAdmin
                                                }
                                            />
                                        </Tooltip>
                                    </ListItem>
                                )}
                                {/* CODE ADMIN */}
                                {dataOld.codeAdmin && (
                                    <ListItem>
                                        <QrCodeIcon />
                                        <Tooltip
                                            title={dataOld.codeAdmin}
                                            arrow
                                        >
                                            <ListItemText
                                                primary={
                                                    Strings.DialogUpdateCar.CODE
                                                }
                                                secondary={dataOld.codeAdmin}
                                            />
                                        </Tooltip>
                                    </ListItem>
                                )}
                                {/* EMAIL ADMIN */}
                                {dataOld.emailAdmin && (
                                    <ListItem>
                                        <EmailIcon />
                                        <Tooltip
                                            title={dataOld.emailAdmin}
                                            arrow
                                        >
                                            <ListItemText
                                                primary={
                                                    Strings.DialogUpdateCar
                                                        .EMAIL
                                                }
                                                secondary={dataOld.emailAdmin}
                                            />
                                        </Tooltip>
                                    </ListItem>
                                )}
                                {/* PHONE ADMIN */}
                                {dataOld.phoneAdmin && (
                                    <ListItem>
                                        <LocalPhoneIcon />
                                        <Tooltip
                                            title={dataOld.phoneAdmin}
                                            arrow
                                        >
                                            <ListItemText
                                                primary={
                                                    Strings.DialogUpdateCar
                                                        .PHONE
                                                }
                                                secondary={dataOld.phoneAdmin}
                                            />
                                        </Tooltip>
                                    </ListItem>
                                )}
                            </ListStyle>
                        </Box>
                    </BoxLeft>

                    <BoxRight>
                        {/* LICENSE PLATES */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogUpdateCar.LICENSE_PLATES}
                            </TextStyle>
                            <TextInput
                                placeholder={
                                    Strings.DialogUpdateCar.ENTER_LICENSE_PLATES
                                }
                                variant="outlined"
                                size="small"
                                value={dataOld.licensePlates || ""}
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
                                error={
                                    errorData.errorLicensePlates ||
                                    errorData.errorLicensePlatesLength
                                }
                                helperText={
                                    errorData.errorLicensePlates
                                        ? Strings.DialogUpdateCar
                                              .ENTER_LICENSE_PLATES_PLEASE
                                        : errorData.errorLicensePlatesLength &&
                                          Strings.DialogUpdateCar
                                              .SUPPORT_LENGTH_LICENSE_PLATES
                                }
                            />
                        </Box>

                        {/* CAR STATUS */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogUpdateCar.CAR_STATUS}
                            </TextStyle>
                            <AutocompleteStyle
                                disablePortal={false}
                                size="small"
                                sx={{ marginBottom: 1 }}
                                noOptionsText={Strings.Common.NO_DATA}
                                options={carStatusList}
                                getOptionLabel={(option) => `${option.name}`}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder={
                                            Strings.DialogUpdateCar
                                                .CHOOSE_STATUS
                                        }
                                        error={errorData.errorCarStatus}
                                        helperText={
                                            errorData.errorCarStatus &&
                                            Strings.DialogUpdateCar
                                                .CHOOSE_CAR_STATUS_PLEASE
                                        }
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    handleSelectCarStatus(newValue);
                                }}
                                value={dataOld.carStatus || null}
                                isOptionEqualToValue={(option, value) =>
                                    option.idCarStatus === value.idCarStatus
                                }
                            />
                        </Box>

                        {/* CAR TYPE */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogUpdateCar.CAR_TYPE}
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
                                            Strings.DialogUpdateCar
                                                .CHOOSE_CAR_TYPE
                                        }
                                        error={errorData.errorCarType}
                                        helperText={
                                            errorData.errorCarType &&
                                            Strings.DialogUpdateCar
                                                .CHOOSE_CAR_TYPE_PLEASE
                                        }
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    handleSelectCarType(newValue);
                                }}
                                value={dataOld.carType || null}
                                isOptionEqualToValue={(option, value) =>
                                    option.idCarType === value.idCarType
                                }
                            />
                        </Box>

                        {/* CAR BRAND */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogUpdateCar.CAR_BRAND}
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
                                            Strings.DialogUpdateCar
                                                .CHOOSE_CAR_BRAND
                                        }
                                        error={errorData.errorCarBrand}
                                        helperText={
                                            errorData.errorCarBrand &&
                                            Strings.DialogUpdateCar
                                                .CHOOSE_CAR_BRAND_PLEASE
                                        }
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    handleSelectCarBrand(newValue);
                                }}
                                value={dataOld.carBrand || null}
                                isOptionEqualToValue={(option, value) =>
                                    option.idCarBrand === value.idCarBrand
                                }
                            />
                        </Box>

                        {/* CAR COLOR */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogUpdateCar.CAR_COLOR}
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
                                            Strings.DialogUpdateCar
                                                .CHOOSE_CAR_COLOR
                                        }
                                        error={errorData.errorCarColor}
                                        helperText={
                                            errorData.errorCarColor &&
                                            Strings.DialogUpdateCar
                                                .CHOOSE_CAR_COLOR_PLEASE
                                        }
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    handleSelectCarColor(newValue);
                                }}
                                value={dataOld.carColor || null}
                                isOptionEqualToValue={(option, value) =>
                                    option.idCarColor === value.idCarColor
                                }
                            />
                        </Box>

                        {/* PERIODIC INSPECTION CERTIFICATE */}
                        <Box sx={{ marginBottom: 1 }}>
                            <TextStyle>
                                {
                                    Strings.DialogUpdateCar
                                        .PERIODIC_INSPECTION_CERTIFICATE
                                }
                            </TextStyle>
                            {/* UPDATED AT */}
                            {carLicenseList.periodicInspectionCertificate &&
                                carLicenseList.periodicInspectionCertificate[0]
                                    .updatedAt && (
                                    <Tooltip
                                        arrow
                                        title={`${helper.formatDateTimeStringFromTimeStamp(
                                            carLicenseList
                                                .periodicInspectionCertificate[0]
                                                .updatedAt
                                        )}`}
                                    >
                                        <BoxHelperDisable>
                                            {Strings.DialogUpdateCar
                                                .UPDATED_AT +
                                                helper.formatDateTimeStringFromTimeStamp(
                                                    carLicenseList
                                                        .periodicInspectionCertificate[0]
                                                        .updatedAt
                                                )}
                                        </BoxHelperDisable>
                                    </Tooltip>
                                )}
                            {/* PEOPLE UPDATED */}
                            {carLicenseList.periodicInspectionCertificate &&
                                carLicenseList.periodicInspectionCertificate[0]
                                    .updatedAt &&
                                carLicenseList.periodicInspectionCertificate[0]
                                    .fullNameAdmin &&
                                carLicenseList.periodicInspectionCertificate[0]
                                    .codeAdmin && (
                                    <Tooltip
                                        arrow
                                        title={`${carLicenseList.periodicInspectionCertificate[0].fullNameAdmin}-${carLicenseList.periodicInspectionCertificate[0].codeAdmin}`}
                                    >
                                        <BoxHelperDisable>
                                            {Strings.DialogUpdateCar
                                                .PEOPLE_UPDATED +
                                                `${carLicenseList.periodicInspectionCertificate[0].fullNameAdmin}-${carLicenseList.periodicInspectionCertificate[0].codeAdmin}`}
                                        </BoxHelperDisable>
                                    </Tooltip>
                                )}
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
                                            Strings.DialogUpdateCar
                                                .CHOOSE_TIME_PERIODIC_INSPECTION_CERTIFICATE
                                        }
                                        error={
                                            errorData.errorDatePeriodicInspectionCertificate
                                        }
                                        helperText={
                                            Strings.DialogUpdateCar
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
                                {Strings.DialogUpdateCar.CAR_INSURANCE}
                            </TextStyle>
                            {/* UPDATED AT */}
                            {carLicenseList.insurance &&
                                carLicenseList.insurance[0].updatedAt && (
                                    <Tooltip
                                        arrow
                                        title={`${helper.formatDateTimeStringFromTimeStamp(
                                            carLicenseList.insurance[0]
                                                .updatedAt
                                        )}`}
                                    >
                                        <BoxHelperDisable>
                                            {Strings.DialogUpdateCar
                                                .UPDATED_AT +
                                                helper.formatDateTimeStringFromTimeStamp(
                                                    carLicenseList.insurance[0]
                                                        .updatedAt
                                                )}
                                        </BoxHelperDisable>
                                    </Tooltip>
                                )}
                            {/* PEOPLE UPDATED */}
                            {carLicenseList.insurance &&
                                carLicenseList.insurance[0].updatedAt &&
                                carLicenseList.insurance[0].fullNameAdmin &&
                                carLicenseList.insurance[0].codeAdmin && (
                                    <Tooltip
                                        arrow
                                        title={`${carLicenseList.insurance[0].fullNameAdmin}-${carLicenseList.insurance[0].codeAdmin}`}
                                    >
                                        <BoxHelperDisable>
                                            {Strings.DialogUpdateCar
                                                .PEOPLE_UPDATED +
                                                `${carLicenseList.insurance[0].fullNameAdmin}-${carLicenseList.insurance[0].codeAdmin}`}
                                        </BoxHelperDisable>
                                    </Tooltip>
                                )}
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
                                            Strings.DialogUpdateCar
                                                .CHOOSE_TIME_CAR_INSURANCE
                                        }
                                        error={errorData.errorDateCarInsurance}
                                        helperText={
                                            Strings.DialogUpdateCar
                                                .CHOOSE_TIME_PLEASE
                                        }
                                    />
                                }
                                selected={selectDates.carInsurance.startDate}
                                onChange={handleChangeDateCarInsurance}
                                showYearDropdown
                            />
                        </Box>

                        {/* CAR REGISTRATION CERTIFICATE */}
                        <Box sx={{ marginBottom: 1 }}>
                            <TextStyle>
                                {
                                    Strings.DialogUpdateCar
                                        .CAR_REGISTRATION_CERTIFICATE
                                }
                            </TextStyle>
                            {/* UPDATED AT */}
                            {carLicenseList.registrationCertificate &&
                                carLicenseList.registrationCertificate[0]
                                    .updatedAt && (
                                    <Tooltip
                                        arrow
                                        title={`${helper.formatDateTimeStringFromTimeStamp(
                                            carLicenseList
                                                .registrationCertificate[0]
                                                .updatedAt
                                        )}`}
                                    >
                                        <BoxHelperDisable>
                                            {Strings.DialogUpdateCar
                                                .UPDATED_AT +
                                                helper.formatDateTimeStringFromTimeStamp(
                                                    carLicenseList
                                                        .registrationCertificate[0]
                                                        .updatedAt
                                                )}
                                        </BoxHelperDisable>
                                    </Tooltip>
                                )}
                            {/* PEOPLE UPDATED */}
                            {carLicenseList.registrationCertificate &&
                                carLicenseList.registrationCertificate[0]
                                    .updatedAt &&
                                carLicenseList.registrationCertificate[0]
                                    .fullNameAdmin &&
                                carLicenseList.registrationCertificate[0]
                                    .codeAdmin && (
                                    <Tooltip
                                        arrow
                                        title={`${carLicenseList.registrationCertificate[0].fullNameAdmin}-${carLicenseList.registrationCertificate[0].codeAdmin}`}
                                    >
                                        <BoxHelperDisable>
                                            {Strings.DialogUpdateCar
                                                .PEOPLE_UPDATED +
                                                `${carLicenseList.registrationCertificate[0].fullNameAdmin}-${carLicenseList.registrationCertificate[0].codeAdmin}`}
                                        </BoxHelperDisable>
                                    </Tooltip>
                                )}
                            <DatePicker
                                showTimeSelect
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
                                            Strings.DialogUpdateCar
                                                .CHOOSE_TIME_CAR_REGISTRATION_CERTIFICATE
                                        }
                                        error={
                                            errorData.errorDateCarRegistrationCertificate
                                        }
                                        helperText={
                                            Strings.DialogUpdateCar
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
                            <span
                                style={{
                                    fontSize: "11px",
                                    fontStyle: "italic",
                                    color: theme.palette.warning.main,
                                }}
                            >
                                {
                                    Strings.DialogUpdateCar
                                        .NOTE_REGISTRATION_CERTIFICATE
                                }
                            </span>
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
                        {Strings.Common.UPDATE}
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
                colorTitle={theme.palette.warning.main}
                colorButtonSubmit={theme.palette.warning.main}
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

export default DialogUpdateCar;
