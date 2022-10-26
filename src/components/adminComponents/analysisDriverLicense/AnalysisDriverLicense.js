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
    PieChart,
    Pie,
    Cell,
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
} from "./AnalysisDriverLicenseCustomStyles";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import { AnalysisTotalTripsServices } from "../../../services/adminServices/AnalysisTotalTripsServices";
import Constants from "../../../constants/Constants";
import helper from "../../../common/helper";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import DialogShowAnalysisTotalTrips from "./DialogShowAnalysisTotalTrips";
import { AnalysisDriverLicenseServices } from "../../../services/adminServices/AnalysisDriverLicenseServices";
registerLocale("vi", vi);

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

function AnalysisDriverLicense() {
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

    const [dialogShowAnalysisTotalTrips, setDialogShowAnalysisTotalTrips] =
        useState({
            open: false,
            startDate: null,
            endDate: null,
        });

    const [selectedDates, setSelectedDates] = useState({
        startDate: null,
        endDate: null,
    });

    const [driverLicense, setDriverLicense] = useState([]);

    const [speedDial, setSpeedDial] = useState(false);

    const getAnalysisDriverLicense = async () => {
        await setBackDrop(true);
        const res =
            await AnalysisDriverLicenseServices.getAnalysisDriverLicense();
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setDriverLicense([
                    ...res.data.data.map((item) => {
                        return {
                            name: item.nameDriverLicense,
                            value: item.totalDriversHasDriverLicense,
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
            // getTotalNumberOfTripsOverTime(
            //     Math.floor(new Date(start).getTime()),
            //     Math.floor(new Date(lastQuarter).getTime())
            // );
        } else if (!start && lastQuarter) {
            // getTotalNumberOfTripsOverTime();
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
            // getTotalNumberOfTripsOverTime(
            //     Math.floor(new Date(start).getTime()),
            //     Math.floor(new Date(lastDayOfEndMonth).getTime())
            // );
        } else if (!start && !lastDayOfEndMonth) {
            // getTotalNumberOfTripsOverTime();
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
            // getTotalNumberOfTripsOverTime(
            //     Math.floor(new Date(start).getTime()),
            //     Math.floor(new Date(end).getTime())
            // );
        } else if (!start && !end) {
            // getTotalNumberOfTripsOverTime();
        }
    };

    const handleOpenDialogShowAnalysisTotalTrips = () => {
        setDialogShowAnalysisTotalTrips({
            ...dialogShowAnalysisTotalTrips,
            open: true,
            startDate: Math.floor(new Date(selectedDates.startDate).getTime()),
            endDate: Math.floor(new Date(selectedDates.endDate).getTime()),
        });
    };

    const run = async () => {
        await setBackDrop(true);
        await getAnalysisDriverLicense();
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
                        {Strings.AnalysisDriverLicense.TITLE}
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

                <ResponsiveContainer width={"100%"} height={300}>
                    <PieChart>
                        <Pie
                            data={driverLicense}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {driverLicense.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={Constants.Colors[index]}
                                />
                            ))}
                        </Pie>
                        <TooltipChart />
                        <Legend verticalAlign="bottom" height={20} />
                    </PieChart>
                </ResponsiveContainer>

                {/* DETAIL BUTTON */}
                <Box>
                    <ButtonFeatures
                        size="small"
                        variant="contained"
                        endIcon={<VisibilityIcon />}
                        color="success"
                        onClick={handleOpenDialogShowAnalysisTotalTrips}
                    >
                        {Strings.Common.DETAIL}
                    </ButtonFeatures>
                </Box>
            </Box>

            <Box sx={{ position: "fixed", bottom: -500, left: -500 }}>
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

            <DialogShowAnalysisTotalTrips
                open={dialogShowAnalysisTotalTrips.open}
                handleClose={() =>
                    setDialogShowAnalysisTotalTrips({
                        ...dialogShowAnalysisTotalTrips,
                        open: false,
                    })
                }
                startDate={dialogShowAnalysisTotalTrips.startDate}
                endDate={dialogShowAnalysisTotalTrips.endDate}
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

export default AnalysisDriverLicense;
