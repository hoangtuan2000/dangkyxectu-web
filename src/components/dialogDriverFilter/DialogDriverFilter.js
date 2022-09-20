import { useState, useEffect, forwardRef, useRef } from "react";
import {
    Box,
    Button,
    Checkbox,
    DialogActions,
    DialogContent,
    FormControlLabel,
    InputAdornment,
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
    FormGroupStyle,
    TextInput,
    TextStyle,
    Title,
} from "./DialogDriverFilterCustomStyles";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CommentIcon from "@mui/icons-material/Comment";
import NearMeIcon from "@mui/icons-material/NearMe";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import CreateIcon from "@mui/icons-material/Create";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Strings from "../../constants/Strings";
import ModalError from "../modalError/ModalError";
import ModalSuccess from "../modalSuccess/ModalSuccess";
import BackDrop from "../backDrop/BackDrop";
import Constants from "../../constants/Constants";
import { DialogShowScheduleService } from "../../services/DialogShowScheduleServices";
import helper from "../../common/helper";
import { useSelector } from "react-redux";
import { Stack } from "@mui/system";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import ModalShowAddress from "../modalShowAddress/ModalShowAddress";
import { GlobalService } from "../../services/GlobalServices";
registerLocale("vi", vi);

function DialogDriverFilter({
    open,
    handleClose,
    onSubmit = () => {},
    handleRefreshDataFilter,
    defaultStatus,
    defaultCarType,
    defaultScheduleCode,
    defaultAddress,
    defaultWard,
    defaultDistrict,
    defaultProvince,
    defaultStartDate,
    defaultEndDate,
}) {
    const theme = useTheme();

    const ModalShowEndAddressRef = useRef(); // use call reset address function

    const currentUser = useSelector((state) => state.currentUser.user);

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

    const [scheduleStatusList, setScheduleStatusList] = useState([]);
    const [carTypeList, setCarTypeList] = useState([]);

    const [showAddress, setShowAddress] = useState();
    const [dataSendApi, setDataSendApi] = useState({
        status: defaultStatus ? [...defaultStatus] : [],
        carType: defaultCarType ? [...defaultCarType] : [],
        scheduleCode: defaultScheduleCode || null,
        address: defaultAddress || null,
        ward: defaultWard || null,
        district: defaultDistrict || null,
        province: defaultProvince || null,
        startDate: defaultStartDate || null,
        endDate: defaultEndDate || null,
    });

    const ButtonDate = forwardRef(({ value, onClick }, ref) => {
        return (
            <Tooltip
                title={value ? value : Strings.DialogDriverFilter.CHOOSE_TIME}
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
                        {value ? value : Strings.DialogDriverFilter.CHOOSE_TIME}
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
            group: "schedule_status, car_type",
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setCarTypeList(res.data.data.car_type);
                setScheduleStatusList(res.data.data.schedule_status);
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

    const handleCheckStatus = (valueArray) => {
        setDataSendApi({
            ...dataSendApi,
            status: [...valueArray],
        });
    };

    const handleCheckCarType = (valueArray) => {
        setDataSendApi({
            ...dataSendApi,
            carType: [...valueArray],
        });
    };

    const handleRefreshFilter = () => {
        onSubmit({
            status: [],
            carType: [],
            scheduleCode: null,
            address: null,
            ward: null,
            district: null,
            province: null,
            startDate: null,
            endDate: null,
        });
        setSelectedDates({
            startDate: null,
            endDate: null,
        });
        setShowAddress();
        setDataSendApi({
            status: [],
            carType: [],
            scheduleCode: null,
            address: null,
            ward: null,
            district: null,
            province: null,
            startDate: null,
            endDate: null,
        });
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
            <DialogContent>
                <Title>{Strings.DialogDriverFilter.TITLE}</Title>
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogDriverFilter.SCHEDULE_CODE}
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings.DialogDriverFilter.ENTER_SCHEDULE_CODE
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

                <BoxContent>
                    <TextStyle>{Strings.DialogDriverFilter.STATUS}</TextStyle>
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
                                    Strings.DialogDriverFilter.CHOOSE_STATUS
                                }
                            />
                        )}
                        onChange={(event, newValue) => {
                            handleCheckStatus(newValue);
                        }}
                        value={dataSendApi.status || null}
                        isOptionEqualToValue={(option, value) =>
                            option.idScheduleStatus === value.idScheduleStatus
                        }
                    />
                </BoxContent>

                <BoxContent>
                    <TextStyle>{Strings.DialogDriverFilter.CAR_TYPE}</TextStyle>
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
                                    Strings.DialogDriverFilter.CHOOSE_CAR_TYPE
                                }
                            />
                        )}
                        onChange={(event, newValue) => {
                            handleCheckCarType(newValue);
                        }}
                        value={dataSendApi.carType || null}
                        isOptionEqualToValue={(option, value) =>
                            option.idCarType === value.idCarType
                        }
                    />
                </BoxContent>

                <BoxContent>
                    <TextStyle>{Strings.DialogDriverFilter.TIME} </TextStyle>
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

                <BoxContent>
                    <TextStyle>{Strings.DialogDriverFilter.ADDRESS} </TextStyle>
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
                                    : Strings.DialogDriverFilter.ENTER_LOCATION
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
                                    : Strings.DialogDriverFilter.ENTER_LOCATION}
                            </Box>
                        </Tooltip>
                    </ButtonStyled>
                </BoxContent>
            </DialogContent>

            <DialogActions>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
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
                labelInput={Strings.DialogDriverFilter.ENTER_LOCATION}
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

export default DialogDriverFilter;
