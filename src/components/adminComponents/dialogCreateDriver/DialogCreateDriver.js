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
    TitleInput,
} from "./DialogCreateDriverCustomStyles";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import QrCodeIcon from "@mui/icons-material/QrCode";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import KeyIcon from "@mui/icons-material/Key";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import CancelIcon from "@mui/icons-material/Cancel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Constants from "../../../constants/Constants";
import { GlobalService } from "../../../services/GlobalServices";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import helper from "../../../common/helper";
import { DialogCreateCarServices } from "../../../services/adminServices/DialogCreateCarServices";
import DialogConfirmation from "../../dialogConfirmation/DialogConfirmation";
import ModalShowAddress from "../../modalShowAddress/ModalShowAddress";
registerLocale("vi", vi);

function DialogCreateDriver({
    open,
    handleClose,
    handleGetCarListForAdminWithFilter,
}) {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });
    const [modalShowAddress, setModalShowAddress] = useState(false);
    const [dialogConfirmation, setDialogConfirmation] = useState({
        open: false,
        title: Strings.Common.DO_YOU_WANT_TO_ADD_CAR,
        content: Strings.Common.ADD_CAR_CONFIRMATION,
        handleSubmit: () => {},
    });

    const [selectDates, setSelectDates] = useState({
        startDate: null,
        endDate: null,
    });
    const [errorData, setErrorData] = useState({
        fullName: false,
        code: false,
        email: false,
        password: false,
        phone: false,
        date: false,
        driverLicense: false,
        address: false,
        idWardAddress: false,
        helperTextCode: null,
        helperTextFullName: null,
        helperTextEmail: null,
        helperTextPassword: null,
        helperTextPhone: null,
    });
    const [showAddress, setShowAddress] = useState();
    const [dataSendApi, setDataSendApi] = useState({
        driverLicense: null,
        fullName: null,
        code: null,
        email: null,
        password: null,
        phone: null,
        startDate: null,
        endDate: null,
        address: null,
        ward: null,
        district: null,
        province: null,
    });

    const [driverLicenseList, setdriverLicenseList] = useState([]);

    const getCommon = async () => {
        const res = await GlobalService.getCommon({
            group: "driver_license",
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setdriverLicenseList(res.data.data.driver_license);
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
                                        marginRight: 1,
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

    const handleShowAddress = (e) => {
        const address = `${e.address} - ${e.ward.name} - ${e.district.name} - ${e.province.name}`;
        setShowAddress(address);
        setDataSendApi({
            ...dataSendApi,
            address: e.address,
            ward: e.ward,
            district: e.district,
            province: e.province,
        });
    };

    const handleSelectDriverLicense = (e) => {
        setDataSendApi({
            ...dataSendApi,
            driverLicense: e,
        });
        e &&
            setErrorData({
                ...errorData,
                driverLicense: false,
            });
    };

    const handleChangePhone = (e) => {
        setDataSendApi({
            ...dataSendApi,
            phone: e.target.value,
        });
    };

    const handleChangePassword = (e) => {
        setDataSendApi({
            ...dataSendApi,
            password: e.target.value,
        });
    };

    const handleChangeEmail = (e) => {
        setDataSendApi({
            ...dataSendApi,
            email: e.target.value,
        });
    };

    const handleChangeFullName = (e) => {
        setDataSendApi({
            ...dataSendApi,
            fullName: e.target.value,
        });
    };

    const handleChangeCode = (e) => {
        setDataSendApi({
            ...dataSendApi,
            code: e.target.value,
        });
    };

    const handleChangeDate = (dates) => {
        const [start, end] = dates;
        setSelectDates({
            startDate: start,
            endDate: end,
        });
        setDataSendApi({
            ...dataSendApi,
            startDate: Math.floor(new Date(start).getTime()),
            endDate: Math.floor(new Date(end).getTime()),
        });
        setErrorData({
            ...errorData,
            date: !start || !end ? true : false,
        });
    };

    const handleValidateData = () => {
        // if (
        //     !dataSendApi.image ||
        //     !dataSendApi.licensePlates ||
        //     !dataSendApi.carBrand ||
        //     !dataSendApi.carColor ||
        //     !dataSendApi.carType ||
        //     helper.isArrayEmpty(dataSendApi.dateCarRegistrationCertificate) ||
        //     helper.isArrayEmpty(
        //         dataSendApi.datePeriodicInspectionCertificate
        //     ) ||
        //     helper.isArrayEmpty(dataSendApi.dateCarInsurance) ||
        //     !helper.isValidStringBetweenMinMaxLength(
        //         dataSendApi.licensePlates,
        //         Constants.Common.CHARACTERS_MIN_LENGTH_LICENSE_PLATES,
        //         Constants.Common.CHARACTERS_MAX_LENGTH_LICENSE_PLATES
        //     )
        // ) {
        //     setErrorData({
        //         ...errorData,
        //         errorImage: helper.isNullOrEmpty(dataSendApi.image),
        //         errorLicensePlates: helper.isNullOrEmpty(
        //             dataSendApi.licensePlates
        //         ),
        //         errorLicensePlatesLength:
        //             !helper.isValidStringBetweenMinMaxLength(
        //                 dataSendApi.licensePlates,
        //                 Constants.Common.CHARACTERS_MIN_LENGTH_LICENSE_PLATES,
        //                 Constants.Common.CHARACTERS_MAX_LENGTH_LICENSE_PLATES
        //             ),
        //         errorCarType: helper.isNullOrEmpty(dataSendApi.carType),
        //         errorCarBrand: helper.isNullOrEmpty(dataSendApi.carBrand),
        //         errorCarColor: helper.isNullOrEmpty(dataSendApi.carColor),
        //         errorDateCarRegistrationCertificate: helper.isArrayEmpty(
        //             dataSendApi.dateCarRegistrationCertificate
        //         ),
        //         errorDatePeriodicInspectionCertificate: helper.isArrayEmpty(
        //             dataSendApi.datePeriodicInspectionCertificate
        //         ),
        //         errorDateCarInsurance: helper.isArrayEmpty(
        //             dataSendApi.dateCarInsurance
        //         ),
        //     });
        //     return false;
        // } else {
        //     return true;
        // }
    };

    const handleRefreshInput = () => {};

    const onSubmit = async () => {
        // const resultValidate = await handleValidateData();
        // if (resultValidate) {
        //     setDialogConfirmation({
        //         ...dialogConfirmation,
        //         open: true,
        //         handleSubmit: () => {
        //             createCar();
        //         },
        //     });
        // }
    };

    const run = async () => {
        await setBackDrop(true);
        (await open) && getCommon();
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
                <Title>{Strings.DialogCreateDriver.TITLE}</Title>

                {/* CONTENT */}
                <Box>
                    <BoxLeft>
                        {/* FULL NAME */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogCreateDriver.FULL_NAME}
                            </TextStyle>
                            <TextInput
                                placeholder={
                                    Strings.DialogCreateDriver.ENTER_FULL_NAME
                                }
                                variant="outlined"
                                size="small"
                                value={dataSendApi.fullName || ""}
                                onChange={(e) => handleChangeFullName(e)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon
                                                sx={{
                                                    color: errorData.fullName
                                                        ? theme.palette.error
                                                              .main
                                                        : theme.palette.primary
                                                              .main,
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                error={errorData.fullName}
                                helperText={
                                    errorData.fullName &&
                                    errorData.helperTextFullName
                                }
                            />
                        </Box>

                        {/* CODE */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogCreateDriver.CODE_DRIVER}
                            </TextStyle>
                            <TextInput
                                placeholder={
                                    Strings.DialogCreateDriver.ENTER_CODE_DRIVER
                                }
                                variant="outlined"
                                size="small"
                                value={dataSendApi.code || ""}
                                onChange={(e) => handleChangeCode(e)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <QrCodeIcon
                                                sx={{
                                                    color: errorData.code
                                                        ? theme.palette.error
                                                              .main
                                                        : theme.palette.primary
                                                              .main,
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                error={errorData.code}
                                helperText={
                                    errorData.code && errorData.helperTextCode
                                }
                            />
                        </Box>

                        {/* EMAIL */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogCreateDriver.EMAIL}
                            </TextStyle>
                            <TextInput
                                placeholder={
                                    Strings.DialogCreateDriver.ENTER_EMAIL
                                }
                                variant="outlined"
                                size="small"
                                value={dataSendApi.email || ""}
                                onChange={(e) => handleChangeEmail(e)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon
                                                sx={{
                                                    color: errorData.email
                                                        ? theme.palette.error
                                                              .main
                                                        : theme.palette.primary
                                                              .main,
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                error={errorData.email}
                                helperText={
                                    errorData.email && errorData.helperTextEmail
                                }
                            />
                        </Box>

                        {/* PASSWORD */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogCreateDriver.PASSWORD}
                            </TextStyle>
                            <TextInput
                                placeholder={
                                    Strings.DialogCreateDriver.ENTER_PASSWORD
                                }
                                variant="outlined"
                                type={"password"}
                                size="small"
                                value={dataSendApi.password || ""}
                                onChange={(e) => handleChangePassword(e)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <KeyIcon
                                                sx={{
                                                    color: errorData.password
                                                        ? theme.palette.error
                                                              .main
                                                        : theme.palette.primary
                                                              .main,
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                error={errorData.password}
                                helperText={
                                    errorData.password &&
                                    errorData.helperTextPassword
                                }
                            />
                        </Box>
                    </BoxLeft>

                    <BoxRight>
                        {/* PHONE */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogCreateDriver.PHONE}
                            </TextStyle>
                            <TextInput
                                placeholder={
                                    Strings.DialogCreateDriver.ENTER_PHONE
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
                                                    color: errorData.phone
                                                        ? theme.palette.error
                                                              .main
                                                        : theme.palette.primary
                                                              .main,
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                error={errorData.phone}
                                helperText={
                                    errorData.phone && errorData.helperTextPhone
                                }
                            />
                        </Box>

                        {/* LICENSE_TERM */}
                        <Box sx={{ marginBottom: 1 }}>
                            <TextStyle>
                                {Strings.DialogCreateDriver.LICENSE_TERM}
                            </TextStyle>
                            <DatePicker
                                locale="vi"
                                dateFormat={Constants.Styled.DATE_FORMAT}
                                selectsRange={true}
                                startDate={selectDates.startDate}
                                endDate={selectDates.endDate}
                                withPortal
                                customInput={
                                    <ButtonDate
                                        handleRemoveDate={() =>
                                            handleChangeDate([null, null])
                                        }
                                        error={errorData.date}
                                        helperText={
                                            Strings.DialogCreateDriver
                                                .CHOOSE_TIME_PLEASE
                                        }
                                    />
                                }
                                selected={selectDates.startDate}
                                onChange={handleChangeDate}
                            />
                        </Box>

                        {/* DRIVER LICENSE */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogCreateDriver.DRIVER_LICENSE}
                            </TextStyle>
                            <AutocompleteStyle
                                disablePortal={false}
                                size="small"
                                sx={{ marginBottom: 1 }}
                                noOptionsText={Strings.Common.NO_DATA}
                                options={driverLicenseList}
                                getOptionLabel={(option) => `${option.name}`}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder={
                                            Strings.DialogCreateDriver
                                                .CHOOSE_DRIVER_LICENSE
                                        }
                                        error={errorData.driverLicense}
                                        helperText={
                                            errorData.driverLicense &&
                                            Strings.DialogCreateDriver
                                                .CHOOSE_DRIVER_LICENSE_PLEASE
                                        }
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    handleSelectDriverLicense(newValue);
                                }}
                                value={dataSendApi.driverLicense || null}
                                isOptionEqualToValue={(option, value) =>
                                    option.idDriverLicense ===
                                    value.idDriverLicense
                                }
                            />
                        </Box>

                        <Box>
                            <TitleInput variant="p" component="div">
                                {Strings.DialogCreateDriver.ADDRESS}
                                <span
                                    style={{
                                        display: errorData.address
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
                                onClick={() => setModalShowAddress(true)}
                                variant="outlined"
                                endIcon={
                                    <LocationOnIcon
                                        sx={{
                                            marginRight: 1,
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                }
                                sx={{
                                    color:
                                        (errorData.address ||
                                            errorData.idWardAddress) &&
                                        theme.palette.error.light,
                                    borderColor:
                                        (errorData.address ||
                                            errorData.idWardAddress) &&
                                        theme.palette.error.dark,
                                }}
                            >
                                <Tooltip
                                    title={
                                        showAddress
                                            ? showAddress
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
                                                showAddress &&
                                                theme.palette.text.primary,
                                        }}
                                    >
                                        {showAddress
                                            ? showAddress
                                            : Strings.DialogCreateDriver
                                                  .ENTER_ADDRESS}
                                    </Box>
                                </Tooltip>
                            </ButtonStyled>
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

            <ModalShowAddress
                open={modalShowAddress}
                handleClose={() => setModalShowAddress(false)}
                labelInput={Strings.DialogCreateDriver.CHOOSE_ADDRESS}
                titleModal={Strings.DialogCreateDriver.TITLE_MODAL_ADDRESS}
                onConfirm={(e) => handleShowAddress(e)}
                // ref={ModalShowEndAddressRef}
                // defaultAddress={defaultAddress}
                // defaultProvince={defaultProvince}
                // defaultDistrict={defaultDistrict}
                // defaultWard={defaultWard}
                // notValidateAddress={true}
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

export default DialogCreateDriver;
