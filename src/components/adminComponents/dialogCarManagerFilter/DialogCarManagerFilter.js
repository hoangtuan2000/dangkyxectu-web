import { useState, useEffect } from "react";
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
    DialogContainer,
    RadioGroupStyle,
    TextInput,
    TextStyle,
    Title,
} from "./DialogCarManagerFilterCustomStyles";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CancelIcon from "@mui/icons-material/Cancel";
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

function DialogCarManagerFilter({
    open,
    handleClose,
    onSubmit = () => {},
    handleRefreshDataFilter,
    defaultCarStatus,
    defaultCarType,
    defaultCarBrand,
    defaultLicensePlates,
    defaultCarCode,
    defaultLicenseExpires,
    defaultHaveTrip,
    defaultHaveMaintenance,
}) {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [carTypeList, setCarTypeList] = useState([]);
    const [carStatusList, setCarStatusList] = useState([]);
    const [carBrandList, setCarBrandList] = useState([]);

    const [dataSendApi, setDataSendApi] = useState({
        carStatus: defaultCarStatus ? [...defaultCarStatus] : [],
        carType: defaultCarType ? [...defaultCarType] : [],
        carBrand: defaultCarBrand ? [...defaultCarBrand] : [],
        licensePlates: defaultLicensePlates || null,
        carCode: defaultCarCode || null,
        licenseExpires: defaultLicenseExpires || null,
        haveTrip: defaultHaveTrip || null,
        haveMaintenance: defaultHaveMaintenance || null,
    });

    const getCommon = async () => {
        const res = await GlobalService.getCommon({
            group: "car_status, car_type, car_brand",
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setCarTypeList(res.data.data.car_type);
                setCarStatusList(res.data.data.car_status);
                setCarBrandList(res.data.data.car_brand);
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

    const handleChangeHaveMaintenance = (e) => {
        setDataSendApi({
            ...dataSendApi,
            haveMaintenance: e.target.value === "true", // e.target.value === 'true' => convert boolean
        });
    };

    const handleDeleteHaveMaintenance = () => {
        setDataSendApi({
            ...dataSendApi,
            haveMaintenance: null,
        });
    };

    const handleChangeHaveTrip = (e) => {
        setDataSendApi({
            ...dataSendApi,
            haveTrip: e.target.value === "true", // e.target.value === 'true' => convert boolean
        });
    };

    const handleDeleteHaveTrip = () => {
        setDataSendApi({
            ...dataSendApi,
            haveTrip: null,
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

    const handleChangeCarCode = (e) => {
        setDataSendApi({
            ...dataSendApi,
            carCode: e.target.value ? e.target.value : null,
        });
    };

    const handleChangeLicensePlates = (e) => {
        setDataSendApi({
            ...dataSendApi,
            licensePlates: e.target.value ? e.target.value : null,
        });
    };

    const handleSelectCarBrand = (valueArray) => {
        setDataSendApi({
            ...dataSendApi,
            carBrand: [...valueArray],
        });
    };

    const handleSelectCarStatus = (valueArray) => {
        setDataSendApi({
            ...dataSendApi,
            carStatus: [...valueArray],
        });
    };

    const handleSelectCarType = (valueArray) => {
        setDataSendApi({
            ...dataSendApi,
            carType: [...valueArray],
        });
    };

    const handleRefreshFilter = () => {
        // call function => return submit
        onSubmit({
            carStatus: [],
            carType: [],
            carBrand: [],
            licensePlates: null,
            carCode: null,
            licenseExpires: null,
            haveTrip: null,
            haveMaintenance: null,
        });
        //refresh data
        setDataSendApi({
            carStatus: [],
            carType: [],
            carBrand: [],
            licensePlates: null,
            carCode: null,
            licenseExpires: null,
            haveTrip: null,
            haveMaintenance: null,
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
                <Title>{Strings.DialogCarManagerFilter.TITLE}</Title>

                {/* HAVE MAINTENANCE */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogCarManagerFilter.HAVE_MAINTENANCE}
                    </TextStyle>
                    <RadioGroupStyle
                        row
                        onChange={handleChangeHaveMaintenance}
                        value={dataSendApi.haveMaintenance}
                    >
                        <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label={Strings.DialogCarManagerFilter.YES}
                        />
                        <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label={Strings.DialogCarManagerFilter.NO}
                        />
                        {!helper.isNullOrEmpty(dataSendApi.haveMaintenance) && (
                            <Tooltip arrow title={Strings.Common.DETELE}>
                                <IconButton
                                    color="error"
                                    onClick={handleDeleteHaveMaintenance}
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

                {/* HAVE TRIPS */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogCarManagerFilter.HAVE_TRIP}
                    </TextStyle>
                    <RadioGroupStyle
                        row
                        onChange={handleChangeHaveTrip}
                        value={dataSendApi.haveTrip}
                    >
                        <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label={Strings.DialogCarManagerFilter.YES}
                        />
                        <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label={Strings.DialogCarManagerFilter.NO}
                        />
                        {!helper.isNullOrEmpty(dataSendApi.haveTrip) && (
                            <Tooltip arrow title={Strings.Common.DETELE}>
                                <IconButton
                                    color="error"
                                    onClick={handleDeleteHaveTrip}
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

                {/* CHOOSE EXPIRE LICENSE */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogCarManagerFilter.LICENSE}
                    </TextStyle>
                    <RadioGroupStyle
                        row
                        onChange={handleChangeLicense}
                        value={dataSendApi.licenseExpires}
                    >
                        <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label={Strings.DialogCarManagerFilter.NOT_EXPIRES}
                        />
                        <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label={Strings.DialogCarManagerFilter.EXPIRES}
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

                {/* CAR CODE */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogCarManagerFilter.CAR_CODE}
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings.DialogCarManagerFilter.ENTER_CAR_CODE
                        }
                        variant="outlined"
                        size="small"
                        value={dataSendApi.carCode || ""}
                        onChange={(e) => handleChangeCarCode(e)}
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

                {/* LICENSEPLATES */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogCarManagerFilter.LICENSE_PLATES}
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings.DialogCarManagerFilter.ENTER_LICENSE_PLATES
                        }
                        variant="outlined"
                        size="small"
                        value={dataSendApi.licensePlates || ""}
                        onChange={(e) => handleChangeLicensePlates(e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <AirportShuttleIcon
                                        sx={{
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </BoxContent>

                {/* SELECT BRAND */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogCarManagerFilter.BRAND}
                    </TextStyle>
                    <AutocompleteStyle
                        disablePortal={false}
                        multiple
                        disableCloseOnSelect
                        size="small"
                        sx={{ marginBottom: 1 }}
                        noOptionsText={Strings.Common.NO_DATA}
                        options={carBrandList}
                        getOptionLabel={(option) => `${option.name}`}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={
                                    Strings.DialogCarManagerFilter.CHOOSE_BRAND
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
                </BoxContent>

                {/* SELECT CAR STATUS */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogCarManagerFilter.CAR_STATUS}
                    </TextStyle>
                    <AutocompleteStyle
                        disablePortal={false}
                        multiple
                        disableCloseOnSelect
                        size="small"
                        sx={{ marginBottom: 1 }}
                        noOptionsText={Strings.Common.NO_DATA}
                        options={carStatusList}
                        getOptionLabel={(option) => `${option.name}`}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={
                                    Strings.DialogCarManagerFilter
                                        .CHOOSE_CAR_STATUS
                                }
                            />
                        )}
                        onChange={(event, newValue) => {
                            handleSelectCarStatus(newValue);
                        }}
                        value={dataSendApi.carStatus || null}
                        isOptionEqualToValue={(option, value) =>
                            option.idCarStatus === value.idCarStatus
                        }
                    />
                </BoxContent>

                {/* SELECT CAR TYPE */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogCarManagerFilter.CAR_TYPE}
                    </TextStyle>
                    <AutocompleteStyle
                        disablePortal={false}
                        multiple
                        disableCloseOnSelect
                        size="small"
                        sx={{ marginBottom: 1 }}
                        noOptionsText={Strings.Common.NO_DATA}
                        options={carTypeList}
                        getOptionLabel={(option) =>
                            `${option.name} ${option.seatNumber} Ch???`
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={
                                    Strings.DialogCarManagerFilter
                                        .CHOOSE_CAR_TYPE
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

export default DialogCarManagerFilter;
