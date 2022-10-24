import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
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
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CountUp from "react-countup";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Strings from "../../../constants/Strings";
import {
    BoxContainerCount,
    BoxTextCount,
    TypographyHeaderCount,
} from "./StatisticalCustomStyles";
import ModalError from "../../../components/modalError/ModalError";
import ModalSuccess from "../../../components/modalSuccess/ModalSuccess";
import BackDrop from "../../../components/backDrop/BackDrop";
import { StatisticalServices } from "../../../services/adminServices/StatisticalServices";
import Constants from "../../../constants/Constants";
import helper from "../../../common/helper";

const BoxCount = ({
    title,
    icon,
    content,
    colorBorderLeft,
    colorHeader,
    colorContent,
}) => {
    return (
        <BoxContainerCount sx={{ borderLeft: `5px solid ${colorBorderLeft}` }}>
            <TypographyHeaderCount
                variant="h6"
                component="div"
                sx={{ color: colorHeader }}
            >
                {icon}
                {title}
            </TypographyHeaderCount>
            <BoxTextCount sx={{ color: colorContent }}>
                <Typography variant="p" component="div">
                    <CountUp end={content} duration={2.75} delay={0.5} />
                </Typography>
            </BoxTextCount>
        </BoxContainerCount>
    );
};

function Statistical() {
    const data = [
        {
            name: "Page A",
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [analysisComon, setAnalysisComon] = useState({
        totalCar: null,
        totalDriver: null,
        totalScheduleComplete: null,
        totalSchedulePending: null,
        totalLicenseCarExpires: null,
    });

    const [totalScheduleListOverTime, setTotalScheduleListOverTime] = useState(
        []
    );

    const getAnalysisTotalCommon = async () => {
        const res = await StatisticalServices.getAnalysisTotalCommon();
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                let data = res.data.data;
                setAnalysisComon({
                    totalCar: data.totalCar,
                    totalDriver: data.totalDriver,
                    totalScheduleComplete: data.totalScheduleComplete,
                    totalSchedulePending: data.totalSchedulePending,
                    totalLicenseCarExpires: data.totalLicenseCarExpires,
                });
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

    const getTotalNumberOfTripsOverTime = async () => {
        const res = await StatisticalServices.getTotalNumberOfTripsOverTime();
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
    };

    const run = async () => {
        await setBackDrop(true);
        await getAnalysisTotalCommon();
        await getTotalNumberOfTripsOverTime();
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    useEffect(() => {
        run();
    }, []);
    return (
        <Box>
            <BoxCount
                title={Strings.Statistical.TOTAL_CAR}
                icon={<PeopleAltIcon sx={{ marginRight: "5px" }} />}
                content={analysisComon.totalCar}
                colorBorderLeft={theme.palette.error.main}
                colorHeader={theme.palette.error.main}
                colorContent={theme.palette.error.main}
            />

            <BoxCount
                title={Strings.Statistical.TOTAL_DRIVER}
                icon={<PeopleAltIcon sx={{ marginRight: "5px" }} />}
                content={analysisComon.totalDriver}
                colorBorderLeft={theme.palette.primary.main}
                colorHeader={theme.palette.primary.main}
                colorContent={theme.palette.primary.main}
            />

            <BoxCount
                title={Strings.Statistical.TOTAL_TRIPS}
                icon={<AirportShuttleIcon sx={{ marginRight: "5px" }} />}
                content={analysisComon.totalScheduleComplete}
                colorBorderLeft={theme.palette.success.main}
                colorHeader={theme.palette.success.main}
                colorContent={theme.palette.success.main}
            />

            <BoxCount
                title={Strings.Statistical.FORM_IS_PENDING_CONFIRMATION}
                icon={<LibraryBooksIcon sx={{ marginRight: "5px" }} />}
                content={analysisComon.totalSchedulePending}
                colorBorderLeft={theme.palette.secondary.main}
                colorHeader={theme.palette.secondary.main}
                colorContent={theme.palette.secondary.main}
            />

            <BoxCount
                title={Strings.Statistical.LICENSE_CAR_EXPIRES}
                icon={<LibraryBooksIcon sx={{ marginRight: "5px" }} />}
                content={analysisComon.totalLicenseCarExpires}
                colorBorderLeft={theme.palette.warning.main}
                colorHeader={theme.palette.warning.main}
                colorContent={theme.palette.warning.main}
            />

            <Box sx={{ clear: "both" }}></Box>

            <Box>
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
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip
                            formatter={(value, name, props) => [
                                value,
                                "Số Chuyến Đi",
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
        </Box>
    );
}

export default Statistical;
