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
    BoxLeft,
    BoxRight,
    ButtonFeatures,
    ButtonStyled,
    DialogContainer,
    TextError,
    TextInput,
    TextStyle,
    Title,
    TitleInput,
} from "./DialogCreateDriverCustomStyles";
import QrCodeIcon from "@mui/icons-material/QrCode";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import RefreshIcon from "@mui/icons-material/Refresh";
import KeyIcon from "@mui/icons-material/Key";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import CancelIcon from "@mui/icons-material/Cancel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
import DialogConfirmation from "../../dialogConfirmation/DialogConfirmation";
import ModalShowAddress from "../../modalShowAddress/ModalShowAddress";
import { DialogCreateDriverServices } from "../../../services/adminServices/DialogCreateDriverServices";
registerLocale("vi", vi);

function DialogCreateDriver({
    open,
    handleClose,
    handleGetDriverListForAdminWithFilter,
}) {
    const theme = useTheme();

    const ModalShowAddressRef = useRef(); // use call reset address function

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
        title: Strings.Common.DO_YOU_WANT_TO_ADD_DRIVER,
        content: Strings.Common.ADD_DRIVER_CONFIRMATION,
        handleSubmit: () => {},
    });

    const [selectDates, setSelectDates] = useState();
    const [errorData, setErrorData] = useState({
        fullName: false,
        code: false,
        email: false,
        pass: false,
        phone: false,
        driverLicenseExpirationDate: false,
        driverLicense: false,
        address: false,
        idWardAddress: false,
        helperTextCode: null,
        helperTextFullName: null,
        helperTextEmail: null,
        helperTextPass: null,
        helperTextPhone: null,
    });
    const [showAddress, setShowAddress] = useState();
    const [dataSendApi, setDataSendApi] = useState({
        driverLicense: null,
        fullName: null,
        code: null,
        email: null,
        pass: null,
        phone: null,
        driverLicenseExpirationDate: null,
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
    const createDriver = async () => {
        await setBackDrop(true);
        const res = await DialogCreateDriverServices.createDriver({
            idDriverLicense: dataSendApi.driverLicense.idDriverLicense,
            fullName: dataSendApi.fullName,
            code: dataSendApi.code,
            email: dataSendApi.email,
            pass: dataSendApi.pass,
            phone: dataSendApi.phone,
            driverLicenseExpirationDate:
                dataSendApi.driverLicenseExpirationDate,
            address: dataSendApi.address,
            idWard: dataSendApi.ward.idWard,
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                handleGetDriverListForAdminWithFilter();
                handleRefreshInput();
                setModalSuccess(true);
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
        setErrorData({
            ...errorData,
            address: helper.isNullOrEmpty(address) ? true : false,
            idWardAddress: helper.isNullOrEmpty(address) ? true : false,
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
        !helper.isValidPhoneNumber(e.target.value)
            ? setErrorData({
                  ...errorData,
                  phone: true,
                  helperTextPhone: Strings.DialogCreateDriver.SUPPORT_PHONE,
              })
            : setErrorData({
                  ...errorData,
                  phone: false,
                  helperTextPhone: null,
              });
    };

    const handleChangePassword = (e) => {
        setDataSendApi({
            ...dataSendApi,
            pass: e.target.value,
        });
        !helper.isValidStringBetweenMinMaxLength(
            e.target.value,
            Constants.Common.MIN_LENGTH_PASSWORD,
            Constants.Common.MAX_LENGTH_PASSWORD
        )
            ? setErrorData({
                  ...errorData,
                  pass: true,
                  helperTextPass:
                      Strings.DialogCreateDriver.SUPPORT_PASSWORD,
              })
            : setErrorData({
                  ...errorData,
                  pass: false,
                  helperTextPass: null,
              });
    };

    const handleChangeEmail = (e) => {
        setDataSendApi({
            ...dataSendApi,
            email: e.target.value,
        });
        !helper.isValidEmail(e.target.value)
            ? setErrorData({
                  ...errorData,
                  email: true,
                  helperTextEmail: Strings.DialogCreateDriver.SUPPORT_EMAIL,
              })
            : setErrorData({
                  ...errorData,
                  email: false,
                  helperTextEmail: null,
              });
    };

    const handleChangeFullName = (e) => {
        setDataSendApi({
            ...dataSendApi,
            fullName: e.target.value,
        });
        !helper.isValidStringBetweenMinMaxLength(
            e.target.value,
            Constants.Common.MIN_LENGTH_FULL_NAME,
            Constants.Common.MAX_LENGTH_FULL_NAME
        )
            ? setErrorData({
                  ...errorData,
                  fullName: true,
                  helperTextFullName:
                      Strings.DialogCreateDriver.SUPPORT_FULL_NAME,
              })
            : setErrorData({
                  ...errorData,
                  fullName: false,
                  helperTextFullName: null,
              });
    };

    const handleChangeCode = (e) => {
        setDataSendApi({
            ...dataSendApi,
            code: e.target.value,
        });
        !helper.isValidStringBetweenMinMaxLength(
            e.target.value,
            Constants.Common.MIN_LENGTH_CODE,
            Constants.Common.MAX_LENGTH_CODE
        )
            ? setErrorData({
                  ...errorData,
                  code: true,
                  helperTextCode: Strings.DialogCreateDriver.SUPPORT_CODE,
              })
            : setErrorData({
                  ...errorData,
                  code: false,
                  helperTextCode: null,
              });
    };

    const handleChangeDate = (dates) => {
        setSelectDates(dates);
        setDataSendApi({
            ...dataSendApi,
            driverLicenseExpirationDate: Math.floor(new Date(dates).getTime()),
        });
        setErrorData({
            ...errorData,
            driverLicenseExpirationDate: !dates ? true : false,
        });
    };

    const handleValidateData = () => {
        if (
            !dataSendApi.fullName ||
            !dataSendApi.code ||
            !dataSendApi.email ||
            !dataSendApi.pass ||
            !dataSendApi.phone ||
            !dataSendApi.driverLicenseExpirationDate ||
            !dataSendApi.driverLicense ||
            !dataSendApi.address ||
            !dataSendApi.ward ||
            !dataSendApi.district ||
            !dataSendApi.province
        ) {
            setErrorData({
                ...errorData,
                fullName: !dataSendApi.fullName ? true : false,
                code: !dataSendApi.code ? true : false,
                email: !dataSendApi.email ? true : false,
                pass: !dataSendApi.pass ? true : false,
                phone: !dataSendApi.phone ? true : false,
                driverLicenseExpirationDate:
                    !dataSendApi.driverLicenseExpirationDate ? true : false,
                driverLicense: !dataSendApi.driverLicense ? true : false,
                address: !dataSendApi.address ? true : false,
                idWardAddress: !dataSendApi.idWardAddress ? true : false,
                helperTextCode: !dataSendApi.code
                    ? Strings.DialogCreateDriver.ENTER_CODE_PLEASE
                    : null,
                helperTextFullName: !dataSendApi.fullName
                    ? Strings.DialogCreateDriver.ENTER_FULL_NAME_PLEASE
                    : null,
                helperTextEmail: !dataSendApi.email
                    ? Strings.DialogCreateDriver.ENTER_EMAIL_PLEASE
                    : null,
                helperTextPass: !dataSendApi.pass
                    ? Strings.DialogCreateDriver.ENTER_PASSWORD_PLEASE
                    : null,
                helperTextPhone: !dataSendApi.phone
                    ? Strings.DialogCreateDriver.ENTER_PHONE_PLEASE
                    : null,
            });
            return false;
        } else if (
            !helper.isValidStringBetweenMinMaxLength(
                dataSendApi.fullName,
                Constants.Common.MIN_LENGTH_FULL_NAME,
                Constants.Common.MAX_LENGTH_FULL_NAME
            ) ||
            !helper.isValidStringBetweenMinMaxLength(
                dataSendApi.code,
                Constants.Common.MIN_LENGTH_CODE,
                Constants.Common.MAX_LENGTH_CODE
            ) ||
            !helper.isValidEmail(dataSendApi.email) ||
            !helper.isValidStringBetweenMinMaxLength(
                dataSendApi.pass,
                Constants.Common.MIN_LENGTH_PASSWORD,
                Constants.Common.MAX_LENGTH_PASSWORD
            ) ||
            !helper.isValidPhoneNumber(dataSendApi.phone)
        ) {
            setErrorData({
                ...errorData,
                fullName: !helper.isValidStringBetweenMinMaxLength(
                    dataSendApi.fullName,
                    Constants.Common.MIN_LENGTH_FULL_NAME,
                    Constants.Common.MAX_LENGTH_FULL_NAME
                )
                    ? true
                    : false,
                code: !helper.isValidStringBetweenMinMaxLength(
                    dataSendApi.code,
                    Constants.Common.MIN_LENGTH_CODE,
                    Constants.Common.MAX_LENGTH_CODE
                )
                    ? true
                    : false,
                email: !helper.isValidEmail(dataSendApi.email) ? true : false,
                pass: !helper.isValidStringBetweenMinMaxLength(
                    dataSendApi.pass,
                    Constants.Common.MIN_LENGTH_PASSWORD,
                    Constants.Common.MAX_LENGTH_PASSWORD
                )
                    ? true
                    : false,
                phone: !helper.isValidPhoneNumber(dataSendApi.phone)
                    ? true
                    : false,

                helperTextCode: !helper.isValidStringBetweenMinMaxLength(
                    dataSendApi.code,
                    Constants.Common.MIN_LENGTH_CODE,
                    Constants.Common.MAX_LENGTH_CODE
                )
                    ? Strings.DialogCreateDriver.SUPPORT_CODE
                    : null,
                helperTextFullName: !helper.isValidStringBetweenMinMaxLength(
                    dataSendApi.fullName,
                    Constants.Common.MIN_LENGTH_FULL_NAME,
                    Constants.Common.MAX_LENGTH_FULL_NAME
                )
                    ? Strings.DialogCreateDriver.SUPPORT_FULL_NAME
                    : null,
                helperTextEmail: !helper.isValidEmail(dataSendApi.email)
                    ? Strings.DialogCreateDriver.SUPPORT_EMAIL
                    : null,
                helperTextPass: !helper.isValidStringBetweenMinMaxLength(
                    dataSendApi.pass,
                    Constants.Common.MIN_LENGTH_PASSWORD,
                    Constants.Common.MAX_LENGTH_PASSWORD
                )
                    ? Strings.DialogCreateDriver.SUPPORT_PASSWORD
                    : null,
                helperTextPhone: !helper.isValidPhoneNumber(dataSendApi.phone)
                    ? Strings.DialogCreateDriver.SUPPORT_PHONE
                    : null,
            });
            return false;
        } else {
            return true;
        }
    };

    const handleRefreshInput = () => {
        setDataSendApi({
            driverLicense: null,
            fullName: null,
            code: null,
            email: null,
            pass: null,
            phone: null,
            driverLicenseExpirationDate: null,
            address: null,
            ward: null,
            district: null,
            province: null,
        });

        setSelectDates();

        setShowAddress();

        //call function of child component: modalShowEndAdderss
        //=> reset value in modal choosse end address
        ModalShowAddressRef.current.handleResetAddress();
    };

    const onSubmit = async () => {
        const resultValidate = await handleValidateData();
        if (resultValidate) {
            setDialogConfirmation({
                ...dialogConfirmation,
                open: true,
                handleSubmit: () => {
                    createDriver();
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
                                value={dataSendApi.pass || ""}
                                onChange={(e) => handleChangePassword(e)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <KeyIcon
                                                sx={{
                                                    color: errorData.pass
                                                        ? theme.palette.error
                                                              .main
                                                        : theme.palette.primary
                                                              .main,
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                error={errorData.pass}
                                helperText={
                                    errorData.pass &&
                                    errorData.helperTextPass
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

                        {/* CHOOSE DATE LICENSE_TERM */}
                        <Box sx={{ marginBottom: 1 }}>
                            <TextStyle>
                                {Strings.DialogCreateDriver.LICENSE_TERM}
                            </TextStyle>
                            <DatePicker
                                locale="vi"
                                dateFormat={Constants.Styled.DATE_FORMAT}
                                withPortal
                                customInput={
                                    <ButtonDate
                                        handleRemoveDate={() =>
                                            handleChangeDate(null)
                                        }
                                        error={
                                            errorData.driverLicenseExpirationDate
                                        }
                                        helperText={
                                            Strings.DialogCreateDriver
                                                .CHOOSE_TIME_PLEASE
                                        }
                                    />
                                }
                                selected={selectDates}
                                onChange={handleChangeDate}
                                showYearDropdown
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
                            <span
                                style={{
                                    display: errorData.address
                                        ? "contents"
                                        : "none",
                                    color: theme.palette.error.light,
                                    fontStyle: "normal",
                                    fontSize: 12,
                                    marginLeft: 10,
                                }}
                            >
                                {
                                    Strings.DialogCreateDriver
                                        .ENTER_ADDRESS_PLEASE
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

                    {/* REFRESH BUTTON */}
                    <ButtonFeatures
                        size="small"
                        variant="contained"
                        endIcon={<RefreshIcon />}
                        color="warning"
                        sx={{ marginRight: 1 }}
                        onClick={handleRefreshInput}
                    >
                        {Strings.Common.REFRESH}
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
                ref={ModalShowAddressRef}
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
