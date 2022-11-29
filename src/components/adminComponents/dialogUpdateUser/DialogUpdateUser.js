import { useState, useEffect, useRef } from "react";
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    IconButton,
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
    TextInput,
    TextStyle,
    Title,
} from "./DialogUpdateUserCustomStyles";
import QrCodeIcon from "@mui/icons-material/QrCode";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { DialogUpdateUserServices } from "../../../services/adminServices/DialogUpdateUserServices";

function DialogUpdateUser({
    open,
    handleClose,
    idUser,
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
        title: Strings.Common.DO_YOU_WANT_TO_UPDATE_USER,
        content: Strings.Common.UPDATE_USER_CONFIRMATION,
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
        userStatus: false,
        helperTextCode: null,
        helperTextFullName: null,
        helperTextEmail: null,
        helperTextPass: null,
        helperTextPhone: null,
    });
    const [showAddress, setShowAddress] = useState();
    const [defaultAddress, setDefaultAddress] = useState({
        address: "",
        ward: {},
        district: {},
        province: {},
    });
    const [dataSendApi, setDataSendApi] = useState({});
    const [dataOld, setDataOld] = useState({
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
        userStatus: null,
    });

    const [facultyList, setFacultyList] = useState([]);
    const [userStatusList, setUserStatusList] = useState([]);

    const getCommon = async () => {
        const res = await GlobalService.getCommon({
            group: "faculty, user_status",
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setFacultyList(res.data.data.faculty);
                setUserStatusList(res.data.data.user_status);
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

    const getUserToUpdate = async () => {
        const res = await DialogUpdateUserServices.getUserToUpdate({
            idUser: idUser,
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                const data = res.data.data[0];
                setDefaultAddress({
                    address: data.address,
                    ward: {
                        idWard: data.idWard,
                        name: data.nameWard,
                        type: data.typeWard,
                        idDistrict: data.idDistrictWard,
                    },
                    district: {
                        idDistrict: data.idDistrict,
                        name: data.nameDistrict,
                        type: data.typeDistrict,
                        idProvince: data.idProvinceDistrict,
                    },
                    province: {
                        idProvince: data.idProvince,
                        name: data.nameProvince,
                        type: data.typeProvince,
                    },
                });

                setShowAddress(
                    `${data.address} - ${data.nameWard} - ${data.nameDistrict} - ${data.nameProvince}`
                );

                setDataOld({
                    userStatus: {
                        idUserStatus: data.idUserStatus,
                        name: data.nameUserStatus,
                    },
                    faculty: {
                        idFaculty: data.idFaculty,
                        name: data.nameFaculty,
                    },
                    fullName: data.fullName,
                    code: data.code,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    ward: {
                        idWard: data.idWard,
                        name: data.nameWard,
                        type: data.typeWard,
                        idDistrict: data.idDistrictWard,
                    },
                    district: {
                        idDistrict: data.idDistrict,
                        name: data.nameDistrict,
                        type: data.typeDistrict,
                        idProvince: data.idProvinceDistrict,
                    },
                    province: {
                        idProvince: data.idProvince,
                        name: data.nameProvince,
                        type: data.typeProvince,
                    },
                });
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

    const updateUser = async () => {
        await setBackDrop(true);
        const data = await handleFormatData();
        const res = await DialogUpdateUserServices.updateUser(data);
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                handleGetDriverListForAdminWithFilter();
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

    const handleFormatData = () => {
        let data = {
            idUser: idUser,
        };
        dataSendApi.hasOwnProperty("fullName") &&
            (data["fullName"] = dataSendApi.fullName);
        dataSendApi.hasOwnProperty("code") && (data["code"] = dataSendApi.code);
        dataSendApi.hasOwnProperty("email") &&
            (data["email"] = dataSendApi.email);
        dataSendApi.hasOwnProperty("pass") && (data["pass"] = dataSendApi.pass);
        dataSendApi.hasOwnProperty("phone") &&
            (data["phone"] = dataSendApi.phone);
        dataSendApi.hasOwnProperty("address") &&
            (data["address"] = dataSendApi.address);
        dataSendApi.hasOwnProperty("address") &&
            (data["address"] = dataSendApi.address);
        dataSendApi.hasOwnProperty("faculty") &&
            (data["idFaculty"] = dataSendApi.faculty.idFaculty);
        dataSendApi.hasOwnProperty("userStatus") &&
            (data["idUserStatus"] = dataSendApi.userStatus.idUserStatus);
        dataSendApi.hasOwnProperty("ward") &&
            (data["idWard"] = dataSendApi.ward.idWard);

        return data;
    };

    const handleShowAddress = (e) => {
        const address = `${e.address} - ${e.ward.name} - ${e.district.name} - ${e.province.name}`;
        setShowAddress(address);
        setDataOld({
            ...dataOld,
            address: e.address,
            ward: e.ward,
            district: e.district,
            province: e.province,
        });
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
        setDataOld({
            ...dataOld,
            faculty: e,
        });
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

    const handleSelectUserStatus = (e) => {
        setDataOld({
            ...dataOld,
            userStatus: e,
        });
        setDataSendApi({
            ...dataSendApi,
            userStatus: e,
        });
        e &&
            setErrorData({
                ...errorData,
                userStatus: false,
            });
    };

    const handleChangePhone = (e) => {
        setDataOld({
            ...dataOld,
            phone: e.target.value,
        });
        setDataSendApi({
            ...dataSendApi,
            phone: e.target.value,
        });
        !helper.isValidPhoneNumber(e.target.value)
            ? setErrorData({
                  ...errorData,
                  phone: true,
                  helperTextPhone: Strings.DialogUpdateUser.SUPPORT_PHONE,
              })
            : setErrorData({
                  ...errorData,
                  phone: false,
                  helperTextPhone: null,
              });
    };

    const handleChangePassword = (e) => {
        setDataOld({
            ...dataOld,
            pass: e.target.value,
        });
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
                  helperTextPass: Strings.DialogUpdateUser.SUPPORT_PASSWORD,
              })
            : setErrorData({
                  ...errorData,
                  pass: false,
                  helperTextPass: null,
              });
    };

    const handleChangeEmail = (e) => {
        setDataOld({
            ...dataOld,
            email: e.target.value,
        });
        setDataSendApi({
            ...dataSendApi,
            email: e.target.value,
        });
        !helper.isValidEmail(e.target.value)
            ? setErrorData({
                  ...errorData,
                  email: true,
                  helperTextEmail: Strings.DialogUpdateUser.SUPPORT_EMAIL,
              })
            : setErrorData({
                  ...errorData,
                  email: false,
                  helperTextEmail: null,
              });
    };

    const handleChangeFullName = (e) => {
        setDataOld({
            ...dataOld,
            fullName: e.target.value,
        });
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
                      Strings.DialogUpdateUser.SUPPORT_FULL_NAME,
              })
            : setErrorData({
                  ...errorData,
                  fullName: false,
                  helperTextFullName: null,
              });
    };

    const handleChangeCode = (e) => {
        setDataOld({
            ...dataOld,
            code: e.target.value,
        });
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
                  helperTextCode: Strings.DialogUpdateUser.SUPPORT_CODE,
              })
            : setErrorData({
                  ...errorData,
                  code: false,
                  helperTextCode: null,
              });
    };

    const handleValidateData = () => {
        if (
            dataSendApi.hasOwnProperty("faculty") ||
            dataSendApi.hasOwnProperty("fullName") ||
            dataSendApi.hasOwnProperty("code") ||
            dataSendApi.hasOwnProperty("email") ||
            dataSendApi.hasOwnProperty("pass") ||
            dataSendApi.hasOwnProperty("phone") ||
            dataSendApi.hasOwnProperty("address") ||
            dataSendApi.hasOwnProperty("ward") ||
            dataSendApi.hasOwnProperty("userStatus")
        ) {
            if (
                (dataSendApi.hasOwnProperty("fullName") &&
                    !dataSendApi.fullName) ||
                (dataSendApi.hasOwnProperty("code") && !dataSendApi.code) ||
                (dataSendApi.hasOwnProperty("email") && !dataSendApi.email) ||
                (dataSendApi.hasOwnProperty("pass") && !dataSendApi.pass) ||
                (dataSendApi.hasOwnProperty("phone") && !dataSendApi.phone) ||
                (dataSendApi.hasOwnProperty("faculty") &&
                    !dataSendApi.faculty) ||
                (dataSendApi.hasOwnProperty("address") &&
                    !dataSendApi.address) ||
                (dataSendApi.hasOwnProperty("ward") && !dataSendApi.ward) ||
                (dataSendApi.hasOwnProperty("userStatus") &&
                    !dataSendApi.userStatus)
            ) {
                setErrorData({
                    ...errorData,
                    fullName:
                        dataSendApi.hasOwnProperty("fullName") &&
                        !dataSendApi.fullName
                            ? true
                            : false,
                    code:
                        dataSendApi.hasOwnProperty("code") && !dataSendApi.code
                            ? true
                            : false,
                    email:
                        dataSendApi.hasOwnProperty("email") &&
                        !dataSendApi.email
                            ? true
                            : false,
                    pass:
                        dataSendApi.hasOwnProperty("pass") && !dataSendApi.pass
                            ? true
                            : false,
                    phone:
                        dataSendApi.hasOwnProperty("phone") &&
                        !dataSendApi.phone
                            ? true
                            : false,
                    faculty:
                        dataSendApi.hasOwnProperty("faculty") &&
                        !dataSendApi.faculty
                            ? true
                            : false,
                    address:
                        dataSendApi.hasOwnProperty("address") &&
                        !dataSendApi.address
                            ? true
                            : false,
                    idWardAddress:
                        dataSendApi.hasOwnProperty("idWardAddress") &&
                        !dataSendApi.idWardAddress
                            ? true
                            : false,
                    userStatus:
                        dataSendApi.hasOwnProperty("userStatus") &&
                        !dataSendApi.userStatus
                            ? true
                            : false,
                    helperTextCode:
                        dataSendApi.hasOwnProperty("code") && !dataSendApi.code
                            ? Strings.DialogUpdateUser.ENTER_CODE_PLEASE
                            : null,
                    helperTextFullName:
                        dataSendApi.hasOwnProperty("fullName") &&
                        !dataSendApi.fullName
                            ? Strings.DialogUpdateUser.ENTER_FULL_NAME_PLEASE
                            : null,
                    helperTextEmail:
                        dataSendApi.hasOwnProperty("email") &&
                        !dataSendApi.email
                            ? Strings.DialogUpdateUser.ENTER_EMAIL_PLEASE
                            : null,
                    helperTextPass:
                        dataSendApi.hasOwnProperty("pass") && !dataSendApi.pass
                            ? Strings.DialogUpdateUser.ENTER_PASSWORD_PLEASE
                            : null,
                    helperTextPhone:
                        dataSendApi.hasOwnProperty("phone") &&
                        !dataSendApi.phone
                            ? Strings.DialogUpdateUser.ENTER_PHONE_PLEASE
                            : null,
                });
                return false;
            } else if (
                (dataSendApi.hasOwnProperty("fullName") &&
                    !helper.isValidStringBetweenMinMaxLength(
                        dataSendApi.fullName,
                        Constants.Common.MIN_LENGTH_FULL_NAME,
                        Constants.Common.MAX_LENGTH_FULL_NAME
                    )) ||
                (dataSendApi.hasOwnProperty("code") &&
                    !helper.isValidStringBetweenMinMaxLength(
                        dataSendApi.code,
                        Constants.Common.MIN_LENGTH_CODE,
                        Constants.Common.MAX_LENGTH_CODE
                    )) ||
                (dataSendApi.hasOwnProperty("email") &&
                    !helper.isValidEmail(dataSendApi.email)) ||
                (dataSendApi.hasOwnProperty("pass") &&
                    !helper.isValidStringBetweenMinMaxLength(
                        dataSendApi.pass,
                        Constants.Common.MIN_LENGTH_PASSWORD,
                        Constants.Common.MAX_LENGTH_PASSWORD
                    )) ||
                (dataSendApi.hasOwnProperty("phone") &&
                    !helper.isValidPhoneNumber(dataSendApi.phone))
            ) {
                setErrorData({
                    ...errorData,
                    fullName:
                        dataSendApi.hasOwnProperty("fullName") &&
                        !helper.isValidStringBetweenMinMaxLength(
                            dataSendApi.fullName,
                            Constants.Common.MIN_LENGTH_FULL_NAME,
                            Constants.Common.MAX_LENGTH_FULL_NAME
                        )
                            ? true
                            : false,
                    code:
                        dataSendApi.hasOwnProperty("code") &&
                        !helper.isValidStringBetweenMinMaxLength(
                            dataSendApi.code,
                            Constants.Common.MIN_LENGTH_CODE,
                            Constants.Common.MAX_LENGTH_CODE
                        )
                            ? true
                            : false,
                    email:
                        dataSendApi.hasOwnProperty("email") &&
                        !helper.isValidEmail(dataSendApi.email)
                            ? true
                            : false,
                    pass:
                        dataSendApi.hasOwnProperty("pass") &&
                        !helper.isValidStringBetweenMinMaxLength(
                            dataSendApi.pass,
                            Constants.Common.MIN_LENGTH_PASSWORD,
                            Constants.Common.MAX_LENGTH_PASSWORD
                        )
                            ? true
                            : false,
                    phone:
                        dataSendApi.hasOwnProperty("phone") &&
                        !helper.isValidPhoneNumber(dataSendApi.phone)
                            ? true
                            : false,
                    helperTextCode:
                        dataSendApi.hasOwnProperty("code") &&
                        !helper.isValidStringBetweenMinMaxLength(
                            dataSendApi.code,
                            Constants.Common.MIN_LENGTH_CODE,
                            Constants.Common.MAX_LENGTH_CODE
                        )
                            ? Strings.DialogUpdateUser.SUPPORT_CODE
                            : null,
                    helperTextFullName:
                        dataSendApi.hasOwnProperty("fullName") &&
                        !helper.isValidStringBetweenMinMaxLength(
                            dataSendApi.fullName,
                            Constants.Common.MIN_LENGTH_FULL_NAME,
                            Constants.Common.MAX_LENGTH_FULL_NAME
                        )
                            ? Strings.DialogUpdateUser.SUPPORT_FULL_NAME
                            : null,
                    helperTextEmail:
                        dataSendApi.hasOwnProperty("email") &&
                        !helper.isValidEmail(dataSendApi.email)
                            ? Strings.DialogUpdateUser.SUPPORT_EMAIL
                            : null,
                    helperTextPass:
                        dataSendApi.hasOwnProperty("pass") &&
                        !helper.isValidStringBetweenMinMaxLength(
                            dataSendApi.pass,
                            Constants.Common.MIN_LENGTH_PASSWORD,
                            Constants.Common.MAX_LENGTH_PASSWORD
                        )
                            ? Strings.DialogUpdateUser.SUPPORT_PASSWORD
                            : null,
                    helperTextPhone:
                        dataSendApi.hasOwnProperty("phone") &&
                        !helper.isValidPhoneNumber(dataSendApi.phone)
                            ? Strings.DialogUpdateUser.SUPPORT_PHONE
                            : null,
                });
                return false;
            } else {
                return true;
            }
        } else {
            setModalError({
                ...modalError,
                open: true,
                title: Strings.Common.DATA_IS_UNCHANGED,
                content: null,
            });
            return false;
        }
    };

    const onSubmit = async () => {
        const resultValidate = await handleValidateData();
        if (resultValidate) {
            setDialogConfirmation({
                ...dialogConfirmation,
                open: true,
                handleSubmit: () => {
                    updateUser();
                },
            });
        }
    };

    const run = async () => {
        await setBackDrop(true);
        await getCommon();
        await getUserToUpdate();
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    useEffect(() => {
        setDataSendApi({});
        setErrorData({
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
        setModalError({
            open: false,
            title: null,
            content: null,
        });
        run();
    }, [idUser, open]);

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
                <Title>{Strings.DialogUpdateUser.TITLE}</Title>

                {/* CONTENT */}
                <Box>
                    <BoxLeft>
                        {/* FULL NAME */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogUpdateUser.FULL_NAME}
                            </TextStyle>
                            <TextInput
                                placeholder={
                                    Strings.DialogUpdateUser.ENTER_FULL_NAME
                                }
                                variant="outlined"
                                size="small"
                                value={dataOld.fullName || ""}
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
                                {Strings.DialogUpdateUser.CODE_USER}
                            </TextStyle>
                            <TextInput
                                placeholder={
                                    Strings.DialogUpdateUser.ENTER_CODE_USER
                                }
                                variant="outlined"
                                size="small"
                                value={dataOld.code || ""}
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
                                {Strings.DialogUpdateUser.EMAIL}
                            </TextStyle>
                            <TextInput
                                placeholder={
                                    Strings.DialogUpdateUser.ENTER_EMAIL
                                }
                                variant="outlined"
                                size="small"
                                value={dataOld.email || ""}
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

                        {/* PHONE */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogUpdateUser.PHONE}
                            </TextStyle>
                            <TextInput
                                placeholder={
                                    Strings.DialogUpdateUser.ENTER_PHONE
                                }
                                variant="outlined"
                                size="small"
                                value={dataOld.phone || ""}
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

                        {/* PASSWORD */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogUpdateUser.PASSWORD}
                            </TextStyle>
                            <TextInput
                                placeholder={
                                    Strings.DialogUpdateUser.ENTER_PASSWORD
                                }
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                size="small"
                                value={dataOld.pass || ""}
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
                        {/* FACULTY */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogUpdateUser.FACULTY}
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
                                            Strings.DialogCreateDriver
                                                .CHOOSE_FACULTY
                                        }
                                        error={errorData.faculty}
                                        helperText={
                                            errorData.faculty &&
                                            Strings.DialogCreateDriver
                                                .CHOOSE_FACULTY_PLEASE
                                        }
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    handleSelectFaculty(newValue);
                                }}
                                value={dataOld.faculty || null}
                                isOptionEqualToValue={(option, value) =>
                                    option.idFaculty ===
                                    value.idFaculty
                                }
                            />
                        </Box>

                        <Box mb={1}>
                            <TextStyle>
                                {Strings.DialogUpdateUser.ADDRESS}
                            </TextStyle>
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

                        {/* USER STATUS */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogUpdateUser.STATUS}
                            </TextStyle>
                            <AutocompleteStyle
                                disablePortal={false}
                                size="small"
                                sx={{ marginBottom: 1 }}
                                noOptionsText={Strings.Common.NO_DATA}
                                options={userStatusList}
                                getOptionLabel={(option) => `${option.name}`}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder={
                                            Strings.DialogUpdateUser
                                                .CHOOSE_STATUS_LICENSE
                                        }
                                        error={errorData.userStatus}
                                        helperText={
                                            errorData.userStatus &&
                                            Strings.DialogUpdateUser
                                                .CHOOSE_STATUS_PLEASE
                                        }
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    handleSelectUserStatus(newValue);
                                }}
                                value={dataOld.userStatus || null}
                                isOptionEqualToValue={(option, value) =>
                                    option.idUserStatus === value.idUserStatus
                                }
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
            />

            <ModalShowAddress
                open={modalShowAddress}
                handleClose={() => setModalShowAddress(false)}
                labelInput={Strings.DialogUpdateUser.CHOOSE_ADDRESS}
                titleModal={Strings.DialogUpdateUser.TITLE_MODAL_ADDRESS}
                onConfirm={(e) => handleShowAddress(e)}
                ref={ModalShowAddressRef}
                defaultAddress={defaultAddress.address}
                defaultProvince={defaultAddress.province}
                defaultDistrict={defaultAddress.district}
                defaultWard={defaultAddress.ward}
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

export default DialogUpdateUser;
