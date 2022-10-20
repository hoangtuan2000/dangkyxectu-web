import { useState, useEffect, forwardRef } from "react";
import {
    Box,
    Button,
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
} from "./DialogCarStatusOfTripFilterCustomStyles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
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
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import { CarStatusOfTripServices } from "../../../services/adminServices/CarStatusOfTripServices";
registerLocale("vi", vi);

function DialogCarStatusOfTripFilter({
    open,
    handleClose,
    onSubmit = () => {},
    handleRefreshDataFilter,
    defaultCarType,
    defaultCarBrand,
    defaultDriver,
    defaultLicensePlates,
    defaultCarCode,
    defaultIsBrokenCarPartsBeforeTrip,
    defaultIsBrokenCarPartsAfterTrip,
    defaultStartDate,
    defaultEndDate,
}) {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [selectedDates, setSelectedDates] = useState({
        startDate: null,
        endDate: null,
    });

    const [carTypeList, setCarTypeList] = useState([]);
    const [carBrandList, setCarBrandList] = useState([]);
    const [driverList, setDriverList] = useState([]);

    const [dataSendApi, setDataSendApi] = useState({
        carType: defaultCarType ? [...defaultCarType] : [],
        carBrand: defaultCarBrand ? [...defaultCarBrand] : [],
        driver: defaultDriver ? [...defaultDriver] : [],
        licensePlates: defaultLicensePlates || null,
        carCode: defaultCarCode || null,
        isBrokenCarPartsBeforeTrip: defaultIsBrokenCarPartsBeforeTrip || null,
        isBrokenCarPartsAfterTrip: defaultIsBrokenCarPartsAfterTrip || null,
        startDate: defaultStartDate || null,
        endDate: defaultEndDate || null,
    });

    const ButtonDate = forwardRef(({ value, onClick }, ref) => {
        return (
            <Tooltip
                title={
                    value
                        ? value
                        : Strings.DialogCarRegistrationManagementFilter
                              .CHOOSE_TIME
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
                                    color: theme.palette.primary.main,
                                    display:
                                        selectedDates.startDate &&
                                        selectedDates.startDate &&
                                        "none",
                                }}
                            />
                        }
                    >
                        {value
                            ? value
                            : Strings.DialogCarRegistrationManagementFilter
                                  .CHOOSE_TIME}
                    </ButtonStyled>
                    {selectedDates.startDate && selectedDates.startDate && (
                        <Button
                            size="small"
                            onClick={() => {
                                handleChangeDate([null, null]);
                            }}
                            sx={{
                                zIndex: 99999,
                                position: "absolute",
                                top: 5,
                                right: 10,
                                p: 0,
                                color: theme.palette.error.dark,
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
    });

    const getDriverListForFilter = async () => {
        const res = await CarStatusOfTripServices.getDriverListForFilter();
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setDriverList(res.data.data);
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

    const getCommon = async () => {
        const res = await GlobalService.getCommon({
            group: "car_status, car_type, car_brand",
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setCarTypeList(res.data.data.car_type);
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

    const handleChangeIsBrokenCarPartsAfterTrip = (e) => {
        setDataSendApi({
            ...dataSendApi,
            isBrokenCarPartsAfterTrip: e.target.value === "true", // e.target.value === 'true' => convert boolean
        });
    };

    const handleDeleteIsBrokenCarPartsAfterTrip = () => {
        setDataSendApi({
            ...dataSendApi,
            isBrokenCarPartsAfterTrip: null,
        });
    };

    const handleChangeIsBrokenCarPartsBeforeTrip = (e) => {
        setDataSendApi({
            ...dataSendApi,
            isBrokenCarPartsBeforeTrip: e.target.value === "true", // e.target.value === 'true' => convert boolean
        });
    };

    const handleDeleteIsBrokenCarPartsBeforeTrip = () => {
        setDataSendApi({
            ...dataSendApi,
            isBrokenCarPartsBeforeTrip: null,
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

    const handleSelectDriver = (valueArray) => {
        setDataSendApi({
            ...dataSendApi,
            driver: [...valueArray],
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
            carType: [],
            carBrand: [],
            driver: [],
            licensePlates: null,
            carCode: null,
            isBrokenCarPartsBeforeTrip: null,
            isBrokenCarPartsAfterTrip: null,
            startDate: null,
            endDate: null,
        });
        //refresh data
        setDataSendApi({
            carType: [],
            carBrand: [],
            driver: [],
            licensePlates: null,
            carCode: null,
            isBrokenCarPartsBeforeTrip: null,
            isBrokenCarPartsAfterTrip: null,
            startDate: null,
            endDate: null,
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
        await getDriverListForFilter();
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
                <Title>{Strings.DialogCarStatusOfTripFilter.TITLE}</Title>

                {/* CHOOSE CAR STATUS AFTER TRIP */}
                <BoxContent>
                    <TextStyle>
                        {
                            Strings.DialogCarStatusOfTripFilter
                                .CAR_STATUS_AFTER_GOING
                        }
                    </TextStyle>
                    <RadioGroupStyle
                        row
                        onChange={handleChangeIsBrokenCarPartsAfterTrip}
                        value={dataSendApi.isBrokenCarPartsAfterTrip}
                    >
                        <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label={
                                Strings.DialogCarStatusOfTripFilter.HAS_DAMAGE
                            }
                        />
                        <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label={
                                Strings.DialogCarStatusOfTripFilter.NO_DAMAGE
                            }
                        />
                        {!helper.isNullOrEmpty(
                            dataSendApi.isBrokenCarPartsAfterTrip
                        ) && (
                            <Tooltip arrow title={Strings.Common.DETELE}>
                                <IconButton
                                    color="error"
                                    onClick={
                                        handleDeleteIsBrokenCarPartsAfterTrip
                                    }
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

                {/* CHOOSE CAR STATUS BEFORE TRIP */}
                <BoxContent>
                    <TextStyle>
                        {
                            Strings.DialogCarStatusOfTripFilter
                                .CAR_STATUS_BEFORE_GOING
                        }
                    </TextStyle>
                    <RadioGroupStyle
                        row
                        onChange={handleChangeIsBrokenCarPartsBeforeTrip}
                        value={dataSendApi.isBrokenCarPartsBeforeTrip}
                    >
                        <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label={
                                Strings.DialogCarStatusOfTripFilter.HAS_DAMAGE
                            }
                        />
                        <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label={
                                Strings.DialogCarStatusOfTripFilter.NO_DAMAGE
                            }
                        />
                        {!helper.isNullOrEmpty(
                            dataSendApi.isBrokenCarPartsBeforeTrip
                        ) && (
                            <Tooltip arrow title={Strings.Common.DETELE}>
                                <IconButton
                                    color="error"
                                    onClick={
                                        handleDeleteIsBrokenCarPartsBeforeTrip
                                    }
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

                {/* SELECT DRIVER */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogCarStatusOfTripFilter.DRIVER}
                    </TextStyle>
                    <AutocompleteStyle
                        disablePortal={false}
                        multiple
                        disableCloseOnSelect
                        size="small"
                        noOptionsText={Strings.Common.NO_DATA}
                        options={driverList}
                        getOptionLabel={(option) =>
                            `${option.fullNameDriver} - ${option.codeDriver}`
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={
                                    Strings.DialogCarStatusOfTripFilter
                                        .CHOOSE_DRIVER
                                }
                            />
                        )}
                        onChange={(event, newValue) => {
                            handleSelectDriver(newValue);
                        }}
                        value={dataSendApi.driver || null}
                        isOptionEqualToValue={(option, value) =>
                            option.idDriver === value.idDriver
                        }
                    />
                </BoxContent>

                {/* SELECT DATES */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogCarStatusOfTripFilter.TIME}{" "}
                    </TextStyle>
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
                    />
                </BoxContent>

                {/* CAR CODE */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogCarStatusOfTripFilter.CAR_CODE}
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings.DialogCarStatusOfTripFilter.ENTER_CAR_CODE
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
                        {Strings.DialogCarStatusOfTripFilter.LICENSE_PLATES}
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings.DialogCarStatusOfTripFilter
                                .ENTER_LICENSE_PLATES
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
                        {Strings.DialogCarStatusOfTripFilter.BRAND}
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
                                    Strings.DialogCarStatusOfTripFilter
                                        .CHOOSE_BRAND
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

                {/* SELECT CAR TYPE */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogCarStatusOfTripFilter.CAR_TYPE}
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
                            `${option.name} ${option.seatNumber} Chổ`
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={
                                    Strings.DialogCarStatusOfTripFilter
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

export default DialogCarStatusOfTripFilter;
