import { useState, useEffect, forwardRef, useRef } from "react";
import {
    Box,
    Button,
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
    ButtonStyled,
    DialogContainer,
    RadioGroupStyle,
    TextInput,
    TextStyle,
    Title,
} from "./DialogShowAnalysisTotalTripsOfDriverFilterCustomStyles";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ClearIcon from "@mui/icons-material/Clear";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CancelIcon from "@mui/icons-material/Cancel";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import Constants from "../../../constants/Constants";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import ModalShowAddress from "../../modalShowAddress/ModalShowAddress";
import { GlobalService } from "../../../services/GlobalServices";
import helper from "../../../common/helper";
registerLocale("vi", vi);

function DialogShowAnalysisTotalTripsOfDriverFilter({
    open,
    handleClose,
    onSubmit = () => {},
    handleRefreshDataFilter,
    defaultStatus,
    defaultCarType,
    defaultScheduleCode,
    defaultInfoUser,
    defaultInfoDriver,
    defaultLicensePlates,
    defaultFaculty,
    defaultAddress,
    defaultWard,
    defaultDistrict,
    defaultProvince,
    defaultStartDateSchedule,
    defaultEndDateSchedule,
    defaultHaveSchedule,
    defaultStarRating
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
    const [selectedDates, setSelectedDates] = useState({
        startDate: null,
        endDate: null,
    });

    const [facultyList, setFacultyList] = useState([]);
    const [scheduleStatusList, setScheduleStatusList] = useState([]);
    const [carTypeList, setCarTypeList] = useState([]);

    const [showAddress, setShowAddress] = useState();
    const [dataSendApi, setDataSendApi] = useState({
        status: defaultStatus ? [...defaultStatus] : [],
        carType: defaultCarType ? [...defaultCarType] : [],
        faculty: defaultFaculty ? [...defaultFaculty] : [],
        haveSchedule: defaultHaveSchedule || null,
        starRating: defaultStarRating || null,
        scheduleCode: defaultScheduleCode || null,
        infoUser: defaultInfoUser || null,
        infoDriver: defaultInfoDriver || null,
        licensePlates: defaultLicensePlates || null,
        address: defaultAddress || null,
        ward: defaultWard || null,
        district: defaultDistrict || null,
        province: defaultProvince || null,
        startDateSchedule: defaultStartDateSchedule || null,
        endDateSchedule: defaultEndDateSchedule || null,
    });

    const ButtonDate = forwardRef(({ value, onClick }, ref) => {
        return (
            <Tooltip
                title={
                    value
                        ? value
                        : Strings.DialogShowAnalysisTotalTripsOfFacultiesFilter
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
                            : Strings
                                  .DialogShowAnalysisTotalTripsOfFacultiesFilter
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

    const getCommon = async () => {
        const res = await GlobalService.getCommon({
            group: "schedule_status, car_type, faculty",
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setCarTypeList(res.data.data.car_type);
                setScheduleStatusList(res.data.data.schedule_status);
                setFacultyList(res.data.data.faculty);
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

    const handleChangeHaveSchedule = (e) => {
        setDataSendApi({
            ...dataSendApi,
            haveSchedule: e.target.value === "true", // e.target.value === 'true' => convert boolean
        });
    };

    const handleDeleteHaveSchedule = () => {
        setDataSendApi({
            ...dataSendApi,
            haveSchedule: null,
        });
    };

    const handleChangeRating = (val) => {
        if (helper.isValidStarNumber(val) || val == null) {
            setDataSendApi({
                ...dataSendApi,
                starRating: val == null ? "0" : val,
            });
        }
    };

    const handleDeleteRating = (val) => {
        setDataSendApi({
            ...dataSendApi,
            starRating: null,
        });
    };

    const handleChangeDate = (dates) => {
        const [start, end] = dates;
        setSelectedDates({
            startDate: start,
            endDate: end,
        });
        setDataSendApi({
            ...dataSendApi,
            startDateSchedule: Math.floor(new Date(start).getTime()),
            endDateSchedule: Math.floor(new Date(end).getTime()),
        });
    };

    const handleChangeInfoUser = (e) => {
        setDataSendApi({
            ...dataSendApi,
            infoUser: e.target.value ? e.target.value : null,
        });
    };

    const handleChangeInfoDriver = (e) => {
        setDataSendApi({
            ...dataSendApi,
            infoDriver: e.target.value ? e.target.value : null,
        });
    };

    const handleChangeLicensePlates = (e) => {
        setDataSendApi({
            ...dataSendApi,
            licensePlates: e.target.value ? e.target.value : null,
        });
    };

    const handleChangeScheduleCode = (e) => {
        setDataSendApi({
            ...dataSendApi,
            scheduleCode: e.target.value ? e.target.value : null,
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

    const handleSelectFaculty = (valueArray) => {
        setDataSendApi({
            ...dataSendApi,
            faculty: [...valueArray],
        });
    };

    const handleSelectStatus = (valueArray) => {
        setDataSendApi({
            ...dataSendApi,
            status: [...valueArray],
        });
    };

    const handleSelectCarType = (valueArray) => {
        setDataSendApi({
            ...dataSendApi,
            carType: [...valueArray],
        });
    };

    const handleRefreshFilter = () => {
        //call function => return submit
        onSubmit({
            status: [],
            carType: [],
            faculty: [],
            haveSchedule: null,
            scheduleCode: null,
            infoUser: null,
            infoDriver: null,
            licensePlates: null,
            address: null,
            ward: null,
            district: null,
            province: null,
            startDateSchedule: null,
            endDateSchedule: null,
            starRating: null
        });

        //refresh dates
        setSelectedDates({
            startDate: null,
            endDate: null,
        });

        //refresh address
        setShowAddress();

        //refresh data
        setDataSendApi({
            status: [],
            carType: [],
            faculty: [],
            haveSchedule: null,
            scheduleCode: null,
            infoUser: null,
            infoDriver: null,
            licensePlates: null,
            address: null,
            ward: null,
            district: null,
            province: null,
            startDateSchedule: null,
            endDateSchedule: null,
            starRating: null
        });

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
                    {
                        Strings.DialogShowAnalysisTotalTripsOfFacultiesFilter
                            .TITLE
                    }
                </Title>

                {/* CHOOSE STAR NUMBER REVIEW */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogDriverManagementFilter.REVIEW}
                    </TextStyle>
                    <Rating
                        sx={{ marginLeft: 1 }}
                        value={dataSendApi.starRating}
                        precision={0.5}
                        // size="small"
                        onChange={(e, val) => {
                            handleChangeRating(val);
                        }}
                    />
                    {dataSendApi.starRating && dataSendApi.starRating >= 0 && (
                        <>
                            <span style={{ marginLeft: 5 }}>
                                {dataSendApi.starRating}
                            </span>
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
                        </>
                    )}
                </BoxContent>

                {/* HAVE SCHEDULE */}
                <BoxContent>
                    <TextStyle>
                        {
                            Strings
                                .DialogShowAnalysisTotalTripsOfFacultiesFilter
                                .HAVE_SCHEDULE
                        }
                    </TextStyle>
                    <RadioGroupStyle
                        row
                        onChange={handleChangeHaveSchedule}
                        value={dataSendApi.haveSchedule}
                    >
                        <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label={
                                Strings
                                    .DialogShowAnalysisTotalTripsOfFacultiesFilter
                                    .YES
                            }
                        />
                        <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label={
                                Strings
                                    .DialogShowAnalysisTotalTripsOfFacultiesFilter
                                    .NO
                            }
                        />
                        {!helper.isNullOrEmpty(dataSendApi.haveSchedule) && (
                            <Tooltip arrow title={Strings.Common.DETELE}>
                                <IconButton
                                    color="error"
                                    onClick={handleDeleteHaveSchedule}
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

                {/* SCHEDULE CODE */}
                <BoxContent>
                    <TextStyle>
                        {
                            Strings
                                .DialogShowAnalysisTotalTripsOfFacultiesFilter
                                .SCHEDULE_CODE
                        }
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings
                                .DialogShowAnalysisTotalTripsOfFacultiesFilter
                                .ENTER_SCHEDULE_CODE
                        }
                        variant="outlined"
                        size="small"
                        value={dataSendApi.scheduleCode || ""}
                        onChange={(e) => handleChangeScheduleCode(e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <AssignmentIcon
                                        sx={{
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </BoxContent>

                {/* USER */}
                <BoxContent>
                    <TextStyle>
                        {
                            Strings
                                .DialogShowAnalysisTotalTripsOfFacultiesFilter
                                .SUBSCRIBERS
                        }
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings
                                .DialogShowAnalysisTotalTripsOfFacultiesFilter
                                .ENTER_NAME_CODE_USER
                        }
                        variant="outlined"
                        size="small"
                        value={dataSendApi.infoUser || ""}
                        onChange={(e) => handleChangeInfoUser(e)}
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

                {/* DRIVER */}
                <BoxContent>
                    <TextStyle>
                        {
                            Strings
                                .DialogShowAnalysisTotalTripsOfFacultiesFilter
                                .DRIVER
                        }
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings
                                .DialogShowAnalysisTotalTripsOfFacultiesFilter
                                .ENTER_NAME_CODE_DRIVER
                        }
                        variant="outlined"
                        size="small"
                        value={dataSendApi.infoDriver || ""}
                        onChange={(e) => handleChangeInfoDriver(e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <AirlineSeatReclineExtraIcon
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
                        {
                            Strings
                                .DialogShowAnalysisTotalTripsOfFacultiesFilter
                                .LICENSE_PLATES
                        }
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings
                                .DialogShowAnalysisTotalTripsOfFacultiesFilter
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

                {/* SELECT FACULTY */}
                <BoxContent>
                    <TextStyle>
                        {
                            Strings
                                .DialogShowAnalysisTotalTripsOfFacultiesFilter
                                .FACULTY
                        }
                    </TextStyle>
                    <AutocompleteStyle
                        disablePortal={false}
                        multiple
                        disableCloseOnSelect
                        size="small"
                        sx={{ marginBottom: 1 }}
                        noOptionsText={Strings.Common.NO_DATA}
                        options={facultyList}
                        getOptionLabel={(option) => `${option.name}`}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={
                                    Strings
                                        .DialogCarRegistrationManagementFilter
                                        .CHOOSE_FACULTY
                                }
                            />
                        )}
                        onChange={(event, newValue) => {
                            handleSelectFaculty(newValue);
                        }}
                        value={dataSendApi.faculty || null}
                        isOptionEqualToValue={(option, value) =>
                            option.idFaculty === value.idFaculty
                        }
                    />
                </BoxContent>

                {/* SELECT STATUS */}
                <BoxContent>
                    <TextStyle>
                        {
                            Strings
                                .DialogShowAnalysisTotalTripsOfFacultiesFilter
                                .STATUS
                        }
                    </TextStyle>
                    <AutocompleteStyle
                        disablePortal={false}
                        multiple
                        disableCloseOnSelect
                        size="small"
                        sx={{ marginBottom: 1 }}
                        noOptionsText={Strings.Common.NO_DATA}
                        options={scheduleStatusList}
                        getOptionLabel={(option) => `${option.name}`}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={
                                    Strings
                                        .DialogCarRegistrationManagementFilter
                                        .CHOOSE_STATUS
                                }
                            />
                        )}
                        onChange={(event, newValue) => {
                            handleSelectStatus(newValue);
                        }}
                        value={dataSendApi.status || null}
                        isOptionEqualToValue={(option, value) =>
                            option.idScheduleStatus === value.idScheduleStatus
                        }
                    />
                </BoxContent>

                {/* SELECT CAR TYPE */}
                <BoxContent>
                    <TextStyle>
                        {
                            Strings
                                .DialogShowAnalysisTotalTripsOfFacultiesFilter
                                .CAR_TYPE
                        }
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
                                    Strings
                                        .DialogCarRegistrationManagementFilter
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

                {/* SELECT DATES */}
                <BoxContent>
                    <TextStyle>
                        {
                            Strings
                                .DialogShowAnalysisTotalTripsOfFacultiesFilter
                                .TIME
                        }{" "}
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

                {/* SELECT ADDRESS */}
                <BoxContent>
                    <TextStyle>
                        {
                            Strings
                                .DialogShowAnalysisTotalTripsOfFacultiesFilter
                                .ADDRESS
                        }{" "}
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
                                          .DialogCarRegistrationManagementFilter
                                          .ENTER_LOCATION
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
                                          .DialogCarRegistrationManagementFilter
                                          .ENTER_LOCATION}
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
                    Strings.DialogShowAnalysisTotalTripsOfFacultiesFilter
                        .ENTER_LOCATION
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

export default DialogShowAnalysisTotalTripsOfDriverFilter;
