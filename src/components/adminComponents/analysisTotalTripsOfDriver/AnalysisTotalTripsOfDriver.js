import {
    Badge,
    Box,
    useTheme,
    Tooltip,
    IconButton,
    SpeedDial,
    SpeedDialAction,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as TooltipChart,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area,
} from "recharts";
import EventNoteIcon from "@mui/icons-material/EventNote";
import TodayIcon from "@mui/icons-material/Today";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Strings from "../../../constants/Strings";
import {
    BoxContainerChart,
    BoxTitleChart,
    ButtonFeatures,
    TitleChart,
} from "./AnalysisTotalTripsOfDriverCustomStyles";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import { AnalysisTotalTripsServices } from "../../../services/adminServices/AnalysisTotalTripsServices";
import Constants from "../../../constants/Constants";
import helper from "../../../common/helper";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import { AnalysisTotalTripsOfDriverServices } from "../../../services/adminServices/AnalysisTotalTripsOfDriverServices";
import DialogShowAnalysisTotalTripsOfDriver from "./DialogShowAnalysisTotalTripsOfDriver";
// import DialogShowAnalysisTotalTrips from "./DialogShowAnalysisTotalTrips";
registerLocale("vi", vi);

function AnalysisTotalTripsOfDriver() {
    const theme = useTheme();

    const refDate = useRef();
    const refDateMonth = useRef();
    const refDateQuarter = useRef();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [dialogShowDataAnalysis, setDialogShowDataAnalysis] = useState({
        open: false,
        startDate: null,
        endDate: null,
    });

    const [selectedDates, setSelectedDates] = useState({
        startDate: null,
        endDate: null,
    });

    const [title, setTitle] = useState(
        Strings.AnalysisTotalTripsOfDriver.TITLE
    );
    const [analysisList, setAnalysisList] = useState([]);

    const [speedDial, setSpeedDial] = useState(false);

    const getAnalysisTotalTripsOfDriver = async (startDate, endDate) => {
        await setBackDrop(true);
        const res =
            await AnalysisTotalTripsOfDriverServices.getAnalysisTotalTripsOfDriver(
                {
                    startDate,
                    endDate,
                }
            );
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                let result = res.data.data;
                setAnalysisList([...result.data.map(item => {
                    return {
                        totalSchedule: item.totalSchedule,
                        infoDriver: `${item.fullName}-${item.code}`
                    }
                })]);
                if (result.date.startDate && result.date.endDate) {
                    const startDate = helper.formatDateStringFromTimeStamp(
                        result.date.startDate
                    );
                    const endDate = helper.formatDateStringFromTimeStamp(
                        result.date.endDate
                    );
                    setTitle(
                        `${Strings.AnalysisTotalTripsOfDriver.TITLE} T???: ${startDate} - ${endDate}`
                    );
                } else {
                    setTitle(Strings.AnalysisTotalTripsOfDriver.TITLE);
                }
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

    const handleChangeDateQuarter = (dates) => {
        const [start, end] = dates;
        let lastQuarter = end && new Date(end.setMonth(end.getMonth() + 4));
        setSelectedDates({
            startDate: start,
            endDate: lastQuarter,
        });

        // SEND API
        if (start && lastQuarter) {
            getAnalysisTotalTripsOfDriver(
                Math.floor(new Date(start).getTime()),
                Math.floor(new Date(lastQuarter).getTime())
            );
        } else if (!start && lastQuarter) {
            getAnalysisTotalTripsOfDriver();
        }
    };

    const handleChangeDateMonth = (dates) => {
        const [start, end] = dates;
        let lastDayOfEndMonth =
            end && new Date(end.getFullYear(), end.getMonth() + 1, 0);
        setSelectedDates({
            startDate: start,
            endDate: lastDayOfEndMonth,
        });

        // SEND API
        if (start && lastDayOfEndMonth) {
            getAnalysisTotalTripsOfDriver(
                Math.floor(new Date(start).getTime()),
                Math.floor(new Date(lastDayOfEndMonth).getTime())
            );
        } else if (!start && !lastDayOfEndMonth) {
            getAnalysisTotalTripsOfDriver();
        }
    };

    const handleChangeDate = (dates) => {
        const [start, end] = dates;
        setSelectedDates({
            startDate: start,
            endDate: end,
        });

        // SEND API
        if (start && end) {
            getAnalysisTotalTripsOfDriver(
                Math.floor(new Date(start).getTime()),
                Math.floor(new Date(end).getTime())
            );
        } else if (!start && !end) {
            getAnalysisTotalTripsOfDriver();
        }
    };

    const handleOpenDialogShowDataAnalysis = () => {
        setDialogShowDataAnalysis({
            ...dialogShowDataAnalysis,
            open: true,
            startDate: Math.floor(new Date(selectedDates.startDate).getTime()),
            endDate: Math.floor(new Date(selectedDates.endDate).getTime()),
        });
    };

    const run = async () => {
        await setBackDrop(true);
        await getAnalysisTotalTripsOfDriver();
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    useEffect(() => {
        run();
    }, []);
    return (
        <BoxContainerChart>
            <Box>
                <BoxTitleChart>
                    <TitleChart variant="h6" component="div">
                        {title}
                    </TitleChart>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <SpeedDial
                            ariaLabel="SpeedDial controlled open example"
                            sx={{
                                position: "absolute",
                                top: -5,
                                right: 20,
                                height: 0,
                                "& .MuiFab-primary": { width: 40, height: 60 },
                                "& .MuiButtonBase-root": {
                                    scale: "0.7",
                                },
                                "& .MuiSpeedDial-actions": {
                                    paddingTop: "20px !important",
                                },
                            }}
                            icon={
                                <Box>
                                    <Tooltip
                                        title={
                                            selectedDates.startDate &&
                                            selectedDates.endDate
                                                ? `${new Date(
                                                      selectedDates.startDate
                                                  ).toLocaleDateString(
                                                      "en-GB"
                                                  )} - ${new Date(
                                                      selectedDates.endDate
                                                  ).toLocaleDateString(
                                                      "en-GB"
                                                  )}`
                                                : Strings.Common.TIME
                                        }
                                        placement="left"
                                    >
                                        <Badge
                                            color="error"
                                            invisible={
                                                selectedDates.startDate &&
                                                selectedDates.endDate
                                                    ? false
                                                    : true
                                            }
                                            badgeContent={"!"}
                                        >
                                            <CalendarMonthIcon />
                                        </Badge>
                                    </Tooltip>
                                </Box>
                            }
                            onClose={() => setSpeedDial(false)}
                            onOpen={() => setSpeedDial(true)}
                            open={speedDial}
                            direction={"down"}
                        >
                            <SpeedDialAction
                                key={"Ng??y"}
                                icon={<TodayIcon />}
                                tooltipTitle={"Ng??y"}
                                tooltipOpen
                                sx={{
                                    "& .MuiSpeedDialAction-fab": {
                                        margin: 0,
                                        marginTop: 2,
                                    },
                                }}
                                onClick={() => {
                                    refDate.current.setOpen(true);
                                }}
                            />
                            <SpeedDialAction
                                key={"Th??ng"}
                                icon={<CalendarMonthIcon />}
                                tooltipTitle={"Th??ng"}
                                tooltipOpen
                                sx={{
                                    "& .MuiSpeedDialAction-fab": {
                                        margin: 0,
                                    },
                                }}
                                onClick={() => {
                                    refDateMonth.current.setOpen(true);
                                }}
                            />
                            <SpeedDialAction
                                key={"Qu??"}
                                icon={<EventNoteIcon />}
                                tooltipTitle={"Qu??"}
                                tooltipOpen
                                sx={{
                                    "& .MuiSpeedDialAction-fab": {
                                        margin: 0,
                                    },
                                }}
                                onClick={() => {
                                    refDateQuarter.current.setOpen(true);
                                }}
                            />
                        </SpeedDial>

                        {/* REFRESH BUTTON */}
                        {selectedDates.startDate && selectedDates.endDate && (
                            <Tooltip title={Strings.Common.REFRESH}>
                                <IconButton
                                    sx={{ padding: 0 }}
                                    onClick={() =>
                                        handleChangeDate([null, null])
                                    }
                                >
                                    <CloseIcon
                                        color={"error"}
                                        sx={{ fontSize: 18 }}
                                    />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                </BoxTitleChart>

                <ResponsiveContainer width={"100%"} height={340}>
                    <AreaChart
                        data={analysisList}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id="00a2cf"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#00a2cf"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#00a2cf"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="infoDriver" />
                        <YAxis />
                        <Legend
                            verticalAlign="bottom"
                            height={20}
                            formatter={(value, entry, index) => {
                                return "T???ng S??? Chuy???n ??i";
                            }}
                        />
                        <CartesianGrid strokeDasharray="3 3" />
                        <TooltipChart
                            formatter={(value, name, props) => [
                                value,
                                "T???ng S??? Chuy???n ??i",
                            ]}
                        />
                        <Area
                            type="monotone"
                            dataKey="totalSchedule"
                            stroke="#00a2cf"
                            fillOpacity={1}
                            fill="url(#00a2cf)"
                            // fill="#a1bfed"
                        />
                    </AreaChart>
                </ResponsiveContainer>

                {/* DETAIL BUTTON */}
                <Box>
                    <ButtonFeatures
                        size="small"
                        variant="contained"
                        endIcon={<VisibilityIcon />}
                        color="success"
                        onClick={handleOpenDialogShowDataAnalysis}
                    >
                        {Strings.Common.DETAIL}
                    </ButtonFeatures>
                </Box>
            </Box>

            <Box
                sx={{
                    position: "fixed",
                    bottom: -500,
                    left: -500,
                    zIndex: 99999,
                }}
            >
                {/* DATE */}
                <DatePicker
                    locale="vi"
                    dateFormat={Constants.Styled.DATE_FORMAT}
                    selectsRange={true}
                    startDate={selectedDates.startDate}
                    endDate={selectedDates.endDate}
                    withPortal
                    customInput={<></>}
                    selected={selectedDates.startDate}
                    onChange={handleChangeDate}
                    ref={refDate}
                />

                {/* MONTH */}
                <DatePicker
                    locale="vi"
                    dateFormat={Constants.Styled.DATE_FORMAT}
                    selectsRange={true}
                    startDate={selectedDates.startDate}
                    endDate={selectedDates.endDate}
                    withPortal
                    customInput={<></>}
                    selected={selectedDates.startDate}
                    onChange={handleChangeDateMonth}
                    showMonthYearPicker
                    ref={refDateMonth}
                />

                {/* QUARTER */}
                <DatePicker
                    locale="vi"
                    dateFormat={Constants.Styled.DATE_FORMAT}
                    selectsRange={true}
                    startDate={selectedDates.startDate}
                    endDate={selectedDates.endDate}
                    withPortal
                    customInput={<></>}
                    selected={selectedDates.startDate}
                    onChange={handleChangeDateQuarter}
                    showQuarterYearPicker
                    ref={refDateQuarter}
                />
            </Box>

            <DialogShowAnalysisTotalTripsOfDriver
                open={dialogShowDataAnalysis.open}
                handleClose={() =>
                    setDialogShowDataAnalysis({
                        ...dialogShowDataAnalysis,
                        open: false,
                    })
                }
                startDate={dialogShowDataAnalysis.startDate}
                endDate={dialogShowDataAnalysis.endDate}
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
        </BoxContainerChart>
    );
}

export default AnalysisTotalTripsOfDriver;
