import { useState, useEffect, useRef } from "react";
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    InputAdornment,
    TextField,
    Tooltip,
    useTheme,
    IconButton,
} from "@mui/material";
import {
    AutocompleteStyle,
    BoxLeft,
    BoxRight,
    ButtonFeatures,
    ButtonStyled,
    DialogContainer,
    TextInput,
    TextStyle,
    Title,
    TitleInput,
} from "./DialogCreateUserCustomStyles";
import QrCodeIcon from "@mui/icons-material/QrCode";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RefreshIcon from "@mui/icons-material/Refresh";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import Constants from "../../../constants/Constants";
import { GlobalService } from "../../../services/GlobalServices";
import helper from "../../../common/helper";
import DialogConfirmation from "../../dialogConfirmation/DialogConfirmation";
import ModalShowAddress from "../../modalShowAddress/ModalShowAddress";
import { DialogCreateUserServices } from "../../../services/adminServices/DialogCreateUserServices";

function DialogCreateUser({
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
        title: Strings.Common.DO_YOU_WANT_TO_ADD_USER,
        content: Strings.Common.ADD_USER_CONFIRMATION,
        handleSubmit: () => {},
    });
    const [showPassword, setShowPassword] = useState(false);

    const [errorData, setErrorData] = useState({
        fullName: false,
        code: false,
        email: false,
        pass: false,
        phone: false,
        faculty: false,
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
        faculty: null,
        fullName: null,
        code: null,
        email: null,
        pass: null,
        phone: null,
        address: null,
        ward: null,
        district: null,
        province: null,
    });

    const [facultyList, setFacultyList] = useState([]);

    const getCommon = async () => {
        const res = await GlobalService.getCommon({
            group: "faculty",
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setFacultyList(res.data.data.faculty);
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

    const createUser = async () => {
        await setBackDrop(true);
        const res = await DialogCreateUserServices.createUser({
            idFaculty: dataSendApi.faculty.idFaculty,
            fullName: dataSendApi.fullName,
            code: dataSendApi.code,
            email: dataSendApi.email,
            pass: dataSendApi.pass,
            phone: dataSendApi.phone,
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

    const handleSelectFaculty = (e) => {
        setDataSendApi({
            ...dataSendApi,
            faculty: e,
        });
        e &&
            setErrorData({
                ...errorData,
                faculty: false,
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
                  helperTextPhone: Strings.DialogCreateUser.SUPPORT_PHONE,
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
                  helperTextPass: Strings.DialogCreateUser.SUPPORT_PASSWORD,
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
                  helperTextEmail: Strings.DialogCreateUser.SUPPORT_EMAIL,
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
                      Strings.DialogCreateUser.SUPPORT_FULL_NAME,
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
                  helperTextCode: Strings.DialogCreateUser.SUPPORT_CODE,
              })
            : setErrorData({
                  ...errorData,
                  code: false,
                  helperTextCode: null,
              });
    };

    const handleValidateData = () => {
        if (
            !dataSendApi.fullName ||
            !dataSendApi.code ||
            !dataSendApi.email ||
            !dataSendApi.pass ||
            !dataSendApi.phone ||
            !dataSendApi.faculty ||
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
                faculty: !dataSendApi.faculty ? true : false,
                address: !dataSendApi.address ? true : false,
                idWardAddress: !dataSendApi.idWardAddress ? true : false,
                helperTextCode: !dataSendApi.code
                    ? Strings.DialogCreateUser.ENTER_CODE_PLEASE
                    : null,
                helperTextFullName: !dataSendApi.fullName
                    ? Strings.DialogCreateUser.ENTER_FULL_NAME_PLEASE
                    : null,
                helperTextEmail: !dataSendApi.email
                    ? Strings.DialogCreateUser.ENTER_EMAIL_PLEASE
                    : null,
                helperTextPass: !dataSendApi.pass
                    ? Strings.DialogCreateUser.ENTER_PASSWORD_PLEASE
                    : null,
                helperTextPhone: !dataSendApi.phone
                    ? Strings.DialogCreateUser.ENTER_PHONE_PLEASE
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
                    ? Strings.DialogCreateUser.SUPPORT_CODE
                    : null,
                helperTextFullName: !helper.isValidStringBetweenMinMaxLength(
                    dataSendApi.fullName,
                    Constants.Common.MIN_LENGTH_FULL_NAME,
                    Constants.Common.MAX_LENGTH_FULL_NAME
                )
                    ? Strings.DialogCreateUser.SUPPORT_FULL_NAME
                    : null,
                helperTextEmail: !helper.isValidEmail(dataSendApi.email)
                    ? Strings.DialogCreateUser.SUPPORT_EMAIL
                    : null,
                helperTextPass: !helper.isValidStringBetweenMinMaxLength(
                    dataSendApi.pass,
                    Constants.Common.MIN_LENGTH_PASSWORD,
                    Constants.Common.MAX_LENGTH_PASSWORD
                )
                    ? Strings.DialogCreateUser.SUPPORT_PASSWORD
                    : null,
                helperTextPhone: !helper.isValidPhoneNumber(dataSendApi.phone)
                    ? Strings.DialogCreateUser.SUPPORT_PHONE
                    : null,
            });
            return false;
        } else {
            return true;
        }
    };

    const handleRefreshInput = () => {
        setDataSendApi({
            faculty: null,
            fullName: null,
            code: null,
            email: null,
            pass: null,
            phone: null,
            address: null,
            ward: null,
            district: null,
            province: null,
        });

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
                    createUser();
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
                <Title>{Strings.DialogCreateUser.TITLE}</Title>

                {/* CONTENT */}
                <Box>
                    <BoxLeft>
                        {/* FULL NAME */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogCreateUser.FULL_NAME}
                            </TextStyle>
                            <TextInput
                                placeholder={
                                    Strings.DialogCreateUser.ENTER_FULL_NAME
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
                                {Strings.DialogCreateUser.CODE_DRIVER}
                            </TextStyle>
                            <TextInput
                                placeholder={
                                    Strings.DialogCreateUser.ENTER_CODE_DRIVER
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
                                {Strings.DialogCreateUser.EMAIL}
                            </TextStyle>
                            <TextInput
                                placeholder={
                                    Strings.DialogCreateUser.ENTER_EMAIL
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
                                {Strings.DialogCreateUser.PASSWORD}
                            </TextStyle>
                            <TextInput
                                placeholder={
                                    Strings.DialogCreateUser.ENTER_PASSWORD
                                }
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                size="small"
                                value={dataSendApi.pass || ""}
                                onChange={(e) => handleChangePassword(e)}
                                InputProps={{
                                    endAdornment: showPassword ? (
                                        <InputAdornment position="start">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(false)
                                                }
                                            >
                                                <VisibilityIcon
                                                    sx={{
                                                        color: errorData.pass
                                                            ? theme.palette
                                                                  .error.main
                                                            : theme.palette
                                                                  .primary.main,
                                                    }}
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    ) : (
                                        <InputAdornment position="start">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(true)
                                                }
                                            >
                                                <VisibilityOffIcon
                                                    sx={{
                                                        color: errorData.pass
                                                            ? theme.palette
                                                                  .error.main
                                                            : theme.palette
                                                                  .primary.main,
                                                    }}
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={errorData.pass}
                                helperText={
                                    errorData.pass && errorData.helperTextPass
                                }
                            />
                        </Box>
                    </BoxLeft>

                    <BoxRight>
                        {/* PHONE */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogCreateUser.PHONE}
                            </TextStyle>
                            <TextInput
                                placeholder={
                                    Strings.DialogCreateUser.ENTER_PHONE
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

                        {/* FACULTY */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogCreateUser.FACULTY}
                            </TextStyle>
                            <AutocompleteStyle
                                disablePortal={false}
                                size="small"
                                sx={{ marginBottom: 1 }}
                                noOptionsText={Strings.Common.NO_DATA}
                                options={facultyList}
                                getOptionLabel={(option) => `${option.name}`}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder={
                                            Strings.DialogCreateUser
                                                .CHOOSE_FACULTY
                                        }
                                        error={errorData.driverLicense}
                                        helperText={
                                            errorData.driverLicense &&
                                            Strings.DialogCreateUser
                                                .CHOOSE_FACULTY_PLEASE
                                        }
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    handleSelectFaculty(newValue);
                                }}
                                value={dataSendApi.driverLicense || null}
                                isOptionEqualToValue={(option, value) =>
                                    option.idFaculty ===
                                    value.idFaculty
                                }
                            />
                        </Box>

                        {/* ADDRESS */}
                        <Box>
                            <TitleInput variant="p" component="div">
                                {Strings.DialogCreateUser.ADDRESS}
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
                                            : Strings.DialogCreateUser
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
                                {Strings.DialogCreateUser.ENTER_ADDRESS_PLEASE}
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
                labelInput={Strings.DialogCreateUser.CHOOSE_ADDRESS}
                titleModal={Strings.DialogCreateUser.TITLE_MODAL_ADDRESS}
                onConfirm={(e) => handleShowAddress(e)}
                ref={ModalShowAddressRef}
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

export default DialogCreateUser;
