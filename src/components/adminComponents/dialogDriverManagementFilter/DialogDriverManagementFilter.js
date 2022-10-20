import { useState, useEffect } from "react";
import {
    Box,
    DialogActions,
    DialogContent,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Radio,
    Rating,
    TextField,
    Tooltip,
    useTheme,
} from "@mui/material";
import {
    AutocompleteStyle,
    BoxContent,
    ButtonFeatures,
    DialogContainer,
    RadioGroupStyle,
    TextInput,
    TextStyle,
    Title,
} from "./DialogDriverManagementFilterCustomStyles";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import EmailIcon from "@mui/icons-material/Email";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import QrCodeIcon from "@mui/icons-material/QrCode";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import CodeIcon from "@mui/icons-material/Code";
import Constants from "../../../constants/Constants";
import { GlobalService } from "../../../services/GlobalServices";
import helper from "../../../common/helper";

function DialogDriverManagementFilter({
    open,
    handleClose,
    onSubmit = () => {},
    handleRefreshDataFilter,
    defaultDriverLicense,
    defaultDriverStatus,
    defaultStarNumber,
    defaultLicenseExpires,
    defaultNumberOfTrip,
    defaultCodeDriver,
    defaultFullNameDriver,
    defaultEmailDriver,
    defaultPhoneDriver,
}) {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });
    const [userStatusList, setUserStatusList] = useState([]);
    const [driverLicenseList, setDriverLicenseList] = useState([]);

    const [dataSendApi, setDataSendApi] = useState({
        driverLicense: defaultDriverLicense ? [...defaultDriverLicense] : [],
        driverStatus: defaultDriverStatus ? [...defaultDriverStatus] : [],
        starNumber: defaultStarNumber || null,
        licenseExpires: defaultLicenseExpires || null,
        numberOfTrip: defaultNumberOfTrip || null,
        codeDriver: defaultCodeDriver || null,
        fullNameDriver: defaultFullNameDriver || null,
        emailDriver: defaultEmailDriver || null,
        phoneDriver: defaultPhoneDriver || null,
    });

    const getCommon = async () => {
        const res = await GlobalService.getCommon({
            group: "user_status, driver_license",
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                // setCarTypeList(res.data.data.car_type);
                // setCarStatusList(res.data.data.car_status);
                // setCarBrandList(res.data.data.car_brand);

                setUserStatusList(res.data.data.user_status);
                setDriverLicenseList(res.data.data.driver_license);
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

    const handleChangeRating = (val) => {
        if (helper.isValidStarNumber(val) || val == null) {
            setDataSendApi({
                ...dataSendApi,
                starNumber: val == null ? 0 : val,
            });
        }
    };

    const handleDeleteRating = (val) => {
        setDataSendApi({
            ...dataSendApi,
            starNumber: null,
        });
    };

    const handleChangeLicense = (e) => {
        setDataSendApi({
            ...dataSendApi,
            licenseExpires: e.target.value === "true", // e.target.value === 'true' => convert boolean
        });
    };

    const handleDeleteLicense = () => {
        setDataSendApi({
            ...dataSendApi,
            licenseExpires: null,
        });
    };

    const handleChangeNumberOfTrips = (e) => {
        setDataSendApi({
            ...dataSendApi,
            numberOfTrip: e.target.value ? e.target.value : null,
        });
    };

    const handleChangeCode = (e) => {
        setDataSendApi({
            ...dataSendApi,
            codeDriver: e.target.value ? e.target.value : null,
        });
    };

    const handleChangeFullName = (e) => {
        setDataSendApi({
            ...dataSendApi,
            fullNameDriver: e.target.value ? e.target.value : null,
        });
    };

    const handleChangeEmail = (e) => {
        setDataSendApi({
            ...dataSendApi,
            emailDriver: e.target.value ? e.target.value : null,
        });
    };

    const handleChangePhone = (e) => {
        setDataSendApi({
            ...dataSendApi,
            phoneDriver: e.target.value ? e.target.value : null,
        });
    };

    const handleSelectDriverLicense = (valueArray) => {
        setDataSendApi({
            ...dataSendApi,
            driverLicense: [...valueArray],
        });
    };

    const handleSelectDriverStatus = (valueArray) => {
        setDataSendApi({
            ...dataSendApi,
            driverStatus: [...valueArray],
        });
    };

    const handleRefreshFilter = () => {
        // call function => return submit
        onSubmit({
            driverLicense: [],
            driverStatus: [],
            starNumber: null,
            licenseExpires: null,
            numberOfTrip: null,
            codeDriver: null,
            fullNameDriver: null,
            emailDriver: null,
            phoneDriver: null,
        });

        //refresh data
        setDataSendApi({
            driverLicense: [],
            driverStatus: [],
            starNumber: null,
            licenseExpires: null,
            numberOfTrip: null,
            codeDriver: null,
            fullNameDriver: null,
            emailDriver: null,
            phoneDriver: null,
        });
        //call function
        handleRefreshDataFilter();
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
                <Title>{Strings.DialogDriverManagementFilter.TITLE}</Title>

                {/* CHOOSE STAR NUMBER REVIEW */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogDriverManagementFilter.REVIEW}
                    </TextStyle>
                    <Rating
                        sx={{ marginLeft: 1 }}
                        value={dataSendApi.starNumber}
                        precision={0.5}
                        // size="small"
                        onChange={(e, val) => {
                            handleChangeRating(val);
                        }}
                    />
                    {dataSendApi.starNumber && (
                        <Tooltip arrow title={Strings.Common.DETELE}>
                            <IconButton
                                color="error"
                                onClick={handleDeleteRating}
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
                </BoxContent>

                {/* CHOOSE EXPIRE LICENSE */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogDriverManagementFilter.EXPIRE_LICENSE}
                    </TextStyle>
                    <RadioGroupStyle
                        row
                        onChange={handleChangeLicense}
                        value={dataSendApi.licenseExpires}
                    >
                        <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label={
                                Strings.DialogDriverManagementFilter.NOT_EXPIRES
                            }
                        />
                        <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label={Strings.DialogDriverManagementFilter.EXPIRES}
                        />
                        {!helper.isNullOrEmpty(dataSendApi.licenseExpires) && (
                            <Tooltip arrow title={Strings.Common.DETELE}>
                                <IconButton
                                    color="error"
                                    onClick={handleDeleteLicense}
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

                {/* NUMBER OF TRIPS */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogDriverManagementFilter.NUMBER_OF_TRIPS}
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings.DialogDriverManagementFilter
                                .ENTER_NUMBER_OF_TRIPS
                        }
                        variant="outlined"
                        size="small"
                        value={dataSendApi.numberOfTrip || ""}
                        onChange={(e) => handleChangeNumberOfTrips(e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <CodeIcon
                                        sx={{
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </BoxContent>

                {/* DRIVER CODE */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogDriverManagementFilter.DRIVER_CODE}
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings.DialogDriverManagementFilter
                                .ENTER_DRIVER_CODE
                        }
                        variant="outlined"
                        size="small"
                        value={dataSendApi.codeDriver || ""}
                        onChange={(e) => handleChangeCode(e)}
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

                {/* DRIVER FULLNAME */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogDriverManagementFilter.FULL_NAME}
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings.DialogDriverManagementFilter.ENTER_FULL_NAME
                        }
                        variant="outlined"
                        size="small"
                        value={dataSendApi.fullNameDriver || ""}
                        onChange={(e) => handleChangeFullName(e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon
                                        sx={{
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </BoxContent>

                {/* DRIVER EMAIL */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogDriverManagementFilter.EMAIL}
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings.DialogDriverManagementFilter.ENTER_EMAIL
                        }
                        variant="outlined"
                        size="small"
                        value={dataSendApi.emailDriver || ""}
                        onChange={(e) => handleChangeEmail(e)}
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

                {/* DRIVER PHONE */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogDriverManagementFilter.PHONE}
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings.DialogDriverManagementFilter.ENTER_PHONE
                        }
                        variant="outlined"
                        size="small"
                        value={dataSendApi.phoneDriver || ""}
                        onChange={(e) => handleChangePhone(e)}
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

                {/* SELECT DRIVER LICENSE */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogDriverManagementFilter.DRIVER_LICENSE}
                    </TextStyle>
                    <AutocompleteStyle
                        disablePortal={false}
                        multiple
                        disableCloseOnSelect
                        size="small"
                        sx={{ marginBottom: 1 }}
                        noOptionsText={Strings.Common.NO_DATA}
                        options={driverLicenseList}
                        getOptionLabel={(option) => `${option.name}`}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={
                                    Strings.DialogDriverManagementFilter
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

                {/* SELECT DRIVER STATUS */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogDriverManagementFilter.STATUS}
                    </TextStyle>
                    <AutocompleteStyle
                        disablePortal={false}
                        multiple
                        disableCloseOnSelect
                        size="small"
                        sx={{ marginBottom: 1 }}
                        noOptionsText={Strings.Common.NO_DATA}
                        options={userStatusList}
                        getOptionLabel={(option) => `${option.name}`}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={
                                    Strings.DialogDriverManagementFilter
                                        .CHOOSE_STATUS
                                }
                            />
                        )}
                        onChange={(event, newValue) => {
                            handleSelectDriverStatus(newValue);
                        }}
                        value={dataSendApi.driverStatus || null}
                        isOptionEqualToValue={(option, value) =>
                            option.idUserStatus === value.idUserStatus
                        }
                    />
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

export default DialogDriverManagementFilter;
