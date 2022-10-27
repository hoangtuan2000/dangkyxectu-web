import { useState, useEffect, useRef } from "react";
import {
    Box,
    DialogActions,
    DialogContent,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Radio,
    TextField,
    Tooltip,
    useTheme,
} from "@mui/material";
import {
    AutocompleteStyle,
    BoxContent,
    ButtonFeatures,
    ButtonStyled,
    DialogContainer,
    RadioGroupStyle,
    TextInput,
    TextStyle,
    Title,
} from "./DialogShowAnalysisDriverLicenseFilterCustomStyles";
import QrCodeIcon from "@mui/icons-material/QrCode";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import ClearIcon from "@mui/icons-material/Clear";
import CancelIcon from "@mui/icons-material/Cancel";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import Constants from "../../../constants/Constants";
import ModalShowAddress from "../../modalShowAddress/ModalShowAddress";
import { GlobalService } from "../../../services/GlobalServices";
import helper from "../../../common/helper";

function DialogShowAnalysisDriverLicenseFilter({
    open,
    handleClose,
    onSubmit = () => {},
    handleRefreshDataFilter,
    defaultHaveDriver,
    defaultDriverLicense,
    defaultCodeDriver,
    defaultFullNameDriver,
    defaultEmailDriver,
    defaultPhoneDriver,
    defaultUserStatus,
    defaultAddress,
    defaultWard,
    defaultDistrict,
    defaultProvince,
}) {
    const theme = useTheme();

    const ModalShowEndAddressRef = useRef(); // use call reset address function

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [modalShowStartAdderss, setModalShowStartAdderss] = useState(false);

    const [driverLicenseList, setDriverLicenseList] = useState([]);
    const [userStatusList, setUserStatusList] = useState([]);

    const [showAddress, setShowAddress] = useState();
    const [dataSendApi, setDataSendApi] = useState({
        driverLicense: defaultDriverLicense ? [...defaultDriverLicense] : [],
        userStatus: defaultUserStatus ? [...defaultUserStatus] : [],
        haveDriver: defaultHaveDriver || null,
        codeDriver: defaultCodeDriver || null,
        fullNameDriver: defaultFullNameDriver || null,
        emailDriver: defaultEmailDriver || null,
        phoneDriver: defaultPhoneDriver || null,
        address: defaultAddress || null,
        ward: defaultWard || null,
        district: defaultDistrict || null,
        province: defaultProvince || null,
    });

    const getCommon = async () => {
        const res = await GlobalService.getCommon({
            group: "driver_license, user_status",
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setDriverLicenseList(res.data.data.driver_license);
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

    const handleChangeHaveDriver = (e) => {
        setDataSendApi({
            ...dataSendApi,
            haveDriver: e.target.value === "true", // e.target.value === 'true' => convert boolean
        });
    };

    const handleDeleteHaveDriver = () => {
        setDataSendApi({
            ...dataSendApi,
            haveDriver: null,
        });
    };

    const handleSelectDriverLicense = (valueArray) => {
        setDataSendApi({
            ...dataSendApi,
            driverLicense: [...valueArray],
        });
    };

    const handleChangeCodeDriver = (e) => {
        setDataSendApi({
            ...dataSendApi,
            codeDriver: e.target.value ? e.target.value : null,
        });
    };

    const handleChangeFullNameDriver = (e) => {
        setDataSendApi({
            ...dataSendApi,
            fullNameDriver: e.target.value ? e.target.value : null,
        });
    };

    const handleChangeEmailDriver = (e) => {
        setDataSendApi({
            ...dataSendApi,
            emailDriver: e.target.value ? e.target.value : null,
        });
    };

    const handleChangePhoneDriver = (e) => {
        setDataSendApi({
            ...dataSendApi,
            phoneDriver: e.target.value ? e.target.value : null,
        });
    };

    const handleSelectUserStatus = (valueArray) => {
        setDataSendApi({
            ...dataSendApi,
            userStatus: [...valueArray],
        });
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
    };

    const handleRefreshFilter = () => {
        let dataRefresh = {
            driverLicense: [],
            userStatus: [],
            haveDriver: null,
            codeDriver: null,
            fullNameDriver: null,
            emailDriver: null,
            phoneDriver: null,
            address: null,
            ward: null,
            district: null,
            province: null,
        };
        //call function => return submit
        onSubmit(dataRefresh);

        //refresh data
        setDataSendApi(dataRefresh);

        //refresh address
        setShowAddress();

        //call function
        handleRefreshDataFilter();

        //call function of child component: modalShowEndAdderss
        //=> reset value in modal choosse end address
        ModalShowEndAddressRef.current.handleResetAddress();
    };

    const handleSubmit = () => {
        onSubmit(dataSendApi);
        handleClose();
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
                <Title>
                    {Strings.DialogShowAnalysisDriverLicenseFilter.TITLE}
                </Title>

                {/* HAVE DRIVER */}
                <BoxContent>
                    <TextStyle>
                        {
                            Strings.DialogShowAnalysisDriverLicenseFilter
                                .HAVE_DRIVER
                        }
                    </TextStyle>
                    <RadioGroupStyle
                        row
                        onChange={handleChangeHaveDriver}
                        value={dataSendApi.haveDriver}
                    >
                        <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label={Strings.Common.YES}
                        />
                        <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label={Strings.Common.NO}
                        />
                        {!helper.isNullOrEmpty(dataSendApi.haveDriver) && (
                            <Tooltip arrow title={Strings.Common.DETELE}>
                                <IconButton
                                    color="error"
                                    onClick={handleDeleteHaveDriver}
                                >
                                    <ClearIcon
                                        sx={{
                                            fontSize: "17px !important",
                                            fontWeight: "bold",
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        )}
                    </RadioGroupStyle>
                </BoxContent>

                {/* SELECT DRIVER LICENSE */}
                <BoxContent>
                    <TextStyle>
                        {
                            Strings.DialogShowAnalysisDriverLicenseFilter
                                .DRIVER_LICENSE
                        }
                    </TextStyle>
                    <AutocompleteStyle
                        disablePortal={false}
                        multiple
                        disableCloseOnSelect
                        size="small"
                        noOptionsText={Strings.Common.NO_DATA}
                        options={driverLicenseList}
                        getOptionLabel={(option) => `${option.name}`}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={
                                    Strings
                                        .DialogShowAnalysisDriverLicenseFilter
                                        .CHOOSE_DRIVER_LICENSE
                                }
                            />
                        )}
                        onChange={(event, newValue) => {
                            handleSelectDriverLicense(newValue);
                        }}
                        value={dataSendApi.driverLicense || null}
                        isOptionEqualToValue={(option, value) =>
                            option.idDriverLicense === value.idDriverLicense
                        }
                    />
                </BoxContent>

                {/* DRIVER CODE */}
                <BoxContent>
                    <TextStyle>
                        {
                            Strings.DialogShowAnalysisDriverLicenseFilter
                                .DRIVER_CODE
                        }
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings.DialogShowAnalysisDriverLicenseFilter
                                .ENTER_DRIVER_CODE
                        }
                        variant="outlined"
                        size="small"
                        value={dataSendApi.codeDriver || ""}
                        onChange={(e) => handleChangeCodeDriver(e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <QrCodeIcon
                                        sx={{
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </BoxContent>

                {/* FULL NAME DRIVER */}
                <BoxContent>
                    <TextStyle>
                        {
                            Strings.DialogShowAnalysisDriverLicenseFilter
                                .FULL_NAME
                        }
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings.DialogShowAnalysisDriverLicenseFilter
                                .ENTER_FULL_NAME
                        }
                        variant="outlined"
                        size="small"
                        value={dataSendApi.fullNameDriver || ""}
                        onChange={(e) => handleChangeFullNameDriver(e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon
                                        sx={{
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </BoxContent>

                {/* EMAIL */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogShowAnalysisDriverLicenseFilter.EMAIL}
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings.DialogShowAnalysisDriverLicenseFilter
                                .ENTER_EMAIL
                        }
                        variant="outlined"
                        size="small"
                        value={dataSendApi.emailDriver || ""}
                        onChange={(e) => handleChangeEmailDriver(e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon
                                        sx={{
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </BoxContent>

                {/* PHONE */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogShowAnalysisDriverLicenseFilter.PHONE}
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings.DialogShowAnalysisDriverLicenseFilter
                                .ENTER_PHONE
                        }
                        variant="outlined"
                        size="small"
                        value={dataSendApi.phoneDriver || ""}
                        onChange={(e) => handleChangePhoneDriver(e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <PhoneEnabledIcon
                                        sx={{
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </BoxContent>

                {/* SELECT USER STATUS */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogShowAnalysisDriverLicenseFilter.STATUS}
                    </TextStyle>
                    <AutocompleteStyle
                        disablePortal={false}
                        multiple
                        disableCloseOnSelect
                        size="small"
                        noOptionsText={Strings.Common.NO_DATA}
                        options={userStatusList}
                        getOptionLabel={(option) => `${option.name}`}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={
                                    Strings
                                        .DialogShowAnalysisDriverLicenseFilter
                                        .CHOOSE_STATUS
                                }
                            />
                        )}
                        onChange={(event, newValue) => {
                            handleSelectUserStatus(newValue);
                        }}
                        value={dataSendApi.userStatus || null}
                        isOptionEqualToValue={(option, value) =>
                            option.idUserStatus === value.idUserStatus
                        }
                    />
                </BoxContent>

                {/* SELECT ADDRESS */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogShowAnalysisDriverLicenseFilter.ADDRESS}{" "}
                    </TextStyle>
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
                                showAddress
                                    ? showAddress
                                    : Strings
                                          .DialogShowAnalysisDriverLicenseFilter
                                          .ENTER_ADDRESS
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
                                    : Strings
                                          .DialogShowAnalysisDriverLicenseFilter
                                          .ENTER_ADDRESS}
                            </Box>
                        </Tooltip>
                    </ButtonStyled>
                </BoxContent>
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
                        endIcon={<RestartAltIcon />}
                        color="warning"
                        sx={{ marginRight: 1 }}
                        onClick={handleRefreshFilter}
                    >
                        {Strings.Common.REFRESH}
                    </ButtonFeatures>

                    {/* SEARCH BUTTON / SUBMIT BUTTON */}
                    <ButtonFeatures
                        size="small"
                        variant="contained"
                        endIcon={<CheckCircleIcon />}
                        color="primary"
                        sx={{ marginRight: 1 }}
                        onClick={() => handleSubmit()}
                    >
                        {Strings.Common.SEARCH}
                    </ButtonFeatures>
                </Box>
            </DialogActions>

            <ModalShowAddress
                open={modalShowStartAdderss}
                handleClose={() => setModalShowStartAdderss(false)}
                labelInput={
                    Strings.DialogShowAnalysisTotalTripsFilter.ENTER_LOCATION
                }
                titleModal={Strings.ModalShowAddress.TITLE_LOCATION}
                onConfirm={(e) => handleShowAddress(e)}
                ref={ModalShowEndAddressRef}
                defaultAddress={defaultAddress}
                defaultProvince={defaultProvince}
                defaultDistrict={defaultDistrict}
                defaultWard={defaultWard}
                notValidateAddress={true}
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

export default DialogShowAnalysisDriverLicenseFilter;
