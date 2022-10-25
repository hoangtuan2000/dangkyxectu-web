import {
    Badge,
    Box,
    Typography,
    useTheme,
    Tooltip,
    IconButton,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as TooltipChart,
    Legend,
    Label,
    ResponsiveContainer,
    LabelList,
    AreaChart,
    ReferenceLine,
    Area,
    LineChart,
    Line,
} from "recharts";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EventIcon from "@mui/icons-material/Event";
import TodayIcon from "@mui/icons-material/Today";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InfoIcon from "@mui/icons-material/Info";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CountUp from "react-countup";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Strings from "../../../constants/Strings";
import {
    BoxContainerChart,
    BoxContainerCount,
    BoxTextCount,
    BoxTitleChart,
    FabStyle,
    TitleChart,
    TypographyHeaderCount,
} from "./StatisticalCustomStyles";
import ModalError from "../../../components/modalError/ModalError";
import ModalSuccess from "../../../components/modalSuccess/ModalSuccess";
import BackDrop from "../../../components/backDrop/BackDrop";
import { StatisticalServices } from "../../../services/adminServices/StatisticalServices";
import Constants from "../../../constants/Constants";
import helper from "../../../common/helper";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
registerLocale("vi", vi);

function AnalysisTotalTrips() {
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

    const [selectedDates, setSelectedDates] = useState({
        startDate: null,
        endDate: null,
    });

    const [totalScheduleListOverTime, setTotalScheduleListOverTime] = useState(
        []
    );

    const [speedDial, setSpeedDial] = useState(false);

    const getTotalNumberOfTripsOverTime = async (startDate, endDate) => {
        await setBackDrop(true);
        const res = await StatisticalServices.getTotalNumberOfTripsOverTime({
            startDate: startDate,
            endDate: endDate,
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setTotalScheduleListOverTime([
                    ...res.data.data.map((item) => {
                        return {
                            totalSchedule: item.totalSchedule,
                            date: helper.formatDateStringFromTimeStamp(
                                item.date
                            ),
                        };
                    }),
                ]);
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
            getTotalNumberOfTripsOverTime(
                Math.floor(new Date(start).getTime()),
                Math.floor(new Date(lastQuarter).getTime())
            );
        } else {
            getTotalNumberOfTripsOverTime();
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
            getTotalNumberOfTripsOverTime(
                Math.floor(new Date(start).getTime()),
                Math.floor(new Date(lastDayOfEndMonth).getTime())
            );
        } else {
            getTotalNumberOfTripsOverTime();
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
            getTotalNumberOfTripsOverTime(
                Math.floor(new Date(start).getTime()),
                Math.floor(new Date(end).getTime())
            );
        } else {
            getTotalNumberOfTripsOverTime();
        }
    };

    const run = async () => {
        await setBackDrop(true);
        await getTotalNumberOfTripsOverTime();
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
                        {Strings.Statistical.TOTAL_TRIPS_FROM}
                        {totalScheduleListOverTime.length > 0 &&
                            totalScheduleListOverTime[0].date +
                                " - " +
                                totalScheduleListOverTime[
                                    totalScheduleListOverTime.length - 1
                                ].date}
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
                                key={"Ngày"}
                                icon={<TodayIcon />}
                                tooltipTitle={"Ngày"}
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
                                key={"Tháng"}
                                icon={<CalendarMonthIcon />}
                                tooltipTitle={"Tháng"}
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
                                key={"Quí"}
                                icon={<EventNoteIcon />}
                                tooltipTitle={"Quí"}
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

                <ResponsiveContainer width={"100%"} height={250}>
                    <AreaChart
                        data={totalScheduleListOverTime}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id="colorPv"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#82ca9d"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#82ca9d"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Legend
                            verticalAlign="bottom"
                            height={20}
                            formatter={(value, entry, index) => {
                                return "Tổng Số Chuyến Đi";
                            }}
                        />
                        <CartesianGrid strokeDasharray="3 3" />
                        <TooltipChart
                            formatter={(value, name, props) => [
                                value,
                                "Tổng Số Chuyến Đi",
                            ]}
                        />
                        <Area
                            type="monotone"
                            dataKey="totalSchedule"
                            stroke="#82ca9d"
                            fillOpacity={1}
                            fill="url(#colorPv)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>

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

export default AnalysisTotalTrips;
