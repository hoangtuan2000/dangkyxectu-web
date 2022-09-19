import { useState, useEffect, forwardRef } from "react";
import {
    Box,
    Button,
    Checkbox,
    DialogActions,
    DialogContent,
    FormControlLabel,
    FormGroup,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    Rating,
    Tooltip,
    useTheme,
} from "@mui/material";
import {
    BoxContent,
    BoxLeft,
    BoxRight,
    ButtonFeatures,
    ButtonStyled,
    CarTypeTitle,
    DialogContainer,
    FormGroupStyle,
    Img,
    Text,
    TextContent,
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
registerLocale("vi", vi);

function DialogDriverFilter({ open, handleClose }) {
    const theme = useTheme();

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

    const [showAddress, setShowAddress] = useState();
    const [dataSendApi, setDataSendApi] = useState({
        status: [],
        carType: [],
        startLocation: null,
        idWardStartLocation: null,
        startDate: null,
        endDate: null,
    });
    const ButtonDate = forwardRef(({ value, onClick }, ref) => {
        return (
            <Tooltip
                title={value ? value : Strings.DialogDriverFilter.CHOOSE_TIME}
            >
                <>
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
                        sx={{
                            position: "relative",
                        }}
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
                                right: 5,
                                p: 0,
                                color: theme.palette.error.dark,
                                width: "24px !important",
                                minWidth: 24,
                            }}
                        >
                            <HighlightOffIcon />
                        </Button>
                    )}
                </>
            </Tooltip>
        );
    });

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

    const handleShowStartAddress = (e) => {
        const address = `${e.address} - ${e.ward.name} - ${e.district.name} - ${e.province.name}`;
        setShowAddress(address);
        setDataSendApi({
            ...dataSendApi,
            startLocation: e.address,
            idWardStartLocation: e.ward.idWard,
        });
    };

    const handleCheckStatus = (e, check) => {
        if (check) {
            setDataSendApi({
                ...dataSendApi,
                status: [...dataSendApi.status, e.target.value],
            });
        } else {
            setDataSendApi({
                ...dataSendApi,
                status: [
                    ...dataSendApi.status.filter((item) => {
                        if (item != e.target.value) return item;
                    }),
                ],
            });
        }
    };

    const handleCheckCarType = (e, check) => {
        if (check) {
            setDataSendApi({
                ...dataSendApi,
                carType: [...dataSendApi.carType, e.target.value],
            });
        } else {
            setDataSendApi({
                ...dataSendApi,
                carType: [
                    ...dataSendApi.carType.filter((item) => {
                        if (item != e.target.value) return item;
                    }),
                ],
            });
        }
    };

    const handleRefreshFilter = () => {};

    const run = async () => {
        await setBackDrop(true);
        // (await open) && getSchedule();
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
                <Title>Bộ Lọc Lịch Trình</Title>
                <BoxContent>
                    <TextStyle>{Strings.DialogDriverFilter.STATUS}</TextStyle>
                    <FormGroupStyle row>
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Chờ Xác Nhận"
                            value="Chờ Xác Nhận"
                            onChange={(e, check) => handleCheckStatus(e, check)}
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Đã Duyệt"
                            value="Đã Duyệt"
                            onChange={(e, check) => handleCheckStatus(e, check)}
                        />
                    </FormGroupStyle>
                </BoxContent>

                <BoxContent>
                    <TextStyle>{Strings.DialogDriverFilter.CAR_TYPE}</TextStyle>
                    <FormGroupStyle row>
                        <FormControlLabel
                            control={<Checkbox />}
                            label="4"
                            value="4"
                            onChange={(e, check) => handleCheckCarType(e, check)}
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="16"
                            value="16"
                            onChange={(e, check) => handleCheckCarType(e, check)}
                        />
                    </FormGroupStyle>
                </BoxContent>

                <BoxContent>
                    <TextStyle>Thời Gian: </TextStyle>
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
                        // excludeDates={[...disableDateSchedule]}
                        // selectsDisabledDaysInRange
                        // minDate={new Date()}
                    />
                </BoxContent>

                <BoxContent>
                    <TextStyle>Địa Chỉ: </TextStyle>
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
                        sx={
                            {
                                // color:
                                //     (errorData.errorStartLocation ||
                                //         errorData.idWardStartLocation) &&
                                //     theme.palette.error.light,
                                // borderColor:
                                //     (errorData.errorStartLocation ||
                                //         errorData.idWardStartLocation) &&
                                //     theme.palette.error.dark,
                            }
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
                        // onClick={handleSubmit}
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
                onConfirm={(e) => handleShowStartAddress(e)}
                // defaultAddress={defaultStartAddress.address}
                // defaultProvince={defaultStartAddress.province}
                // defaultDistrict={defaultStartAddress.district}
                // defaultWard={defaultStartAddress.ward}
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
