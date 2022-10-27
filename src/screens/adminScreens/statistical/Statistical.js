import {
    Badge,
    Box,
    Typography,
    useTheme,
    Tooltip,
    IconButton,
    Button,
} from "@mui/material";
import { useEffect, useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
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
    ButtonCount,
    ButtonNavigate,
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
import SendIcon from "@mui/icons-material/Send";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import AnalysisTotalTrips from "../../../components/adminComponents/analysisTotalTrips/AnalysisTotalTrips";
import AnalysisDriverLicense from "../../../components/adminComponents/analysisDriverLicense/AnalysisDriverLicense";
import { useNavigate } from "react-router-dom";
import RoutesPath from "../../../constants/RoutesPath";
registerLocale("vi", vi);

const BoxCount = ({
    title,
    icon,
    content,
    colorBorderLeft,
    colorHeader,
    colorContent,
    pathNavigate,
}) => {
    const navigate = useNavigate();
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
            <Box sx={{ textAlign: "right" }}>
                <Tooltip
                    arrow
                    title={Strings.Common.DETAIL}
                    sx={{ padding: 0 }}
                >
                    <IconButton
                        aria-label="delete"
                        onClick={() => navigate("/" + pathNavigate)}
                    >
                        <KeyboardDoubleArrowRightIcon
                            sx={{ color: colorBorderLeft }}
                        />
                    </IconButton>
                </Tooltip>
            </Box>
        </BoxContainerCount>
    );
};

function Statistical() {
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

    const run = async () => {
        await setBackDrop(true);
        await getAnalysisTotalCommon();
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    useEffect(() => {
        run();
    }, []);
    return (
        <Box>
            <Box
                sx={{
                    width: "100%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* TOTAL_CAR */}
                <BoxCount
                    title={Strings.Statistical.TOTAL_CAR}
                    icon={<PeopleAltIcon sx={{ marginRight: "5px" }} />}
                    content={analysisComon.totalCar}
                    colorBorderLeft={theme.palette.error.main}
                    colorHeader={theme.palette.error.main}
                    colorContent={theme.palette.error.main}
                    pathNavigate={RoutesPath.CAR_MANAGER}
                />

                {/* TOTAL_DRIVER */}
                <BoxCount
                    title={Strings.Statistical.TOTAL_DRIVER}
                    icon={<PeopleAltIcon sx={{ marginRight: "5px" }} />}
                    content={analysisComon.totalDriver}
                    colorBorderLeft={theme.palette.primary.main}
                    colorHeader={theme.palette.primary.main}
                    colorContent={theme.palette.primary.main}
                    pathNavigate={RoutesPath.DRIVER_MANAGEMENT}
                />

                {/* TOTAL_TRIPS */}
                <BoxCount
                    title={Strings.Statistical.TOTAL_TRIPS}
                    icon={<AirportShuttleIcon sx={{ marginRight: "5px" }} />}
                    content={analysisComon.totalScheduleComplete}
                    colorBorderLeft={theme.palette.success.main}
                    colorHeader={theme.palette.success.main}
                    colorContent={theme.palette.success.main}
                    pathNavigate={RoutesPath.CAR_REGISTRATION_MANAGEMENT}
                />

                {/* FORM_IS_PENDING_CONFIRMATION */}
                <BoxCount
                    title={Strings.Statistical.FORM_IS_PENDING_CONFIRMATION}
                    icon={<LibraryBooksIcon sx={{ marginRight: "5px" }} />}
                    content={analysisComon.totalSchedulePending}
                    colorBorderLeft={theme.palette.secondary.main}
                    colorHeader={theme.palette.secondary.main}
                    colorContent={theme.palette.secondary.main}
                    pathNavigate={RoutesPath.CAR_REGISTRATION_MANAGEMENT}
                />

                {/* LICENSE_CAR_EXPIRES */}
                <BoxCount
                    title={Strings.Statistical.LICENSE_CAR_EXPIRES}
                    icon={<LibraryBooksIcon sx={{ marginRight: "5px" }} />}
                    content={analysisComon.totalLicenseCarExpires}
                    colorBorderLeft={theme.palette.warning.main}
                    colorHeader={theme.palette.warning.main}
                    colorContent={theme.palette.warning.main}
                    pathNavigate={RoutesPath.CAR_REGISTRATION_MANAGEMENT}
                />
            </Box>

            <Box
                sx={{
                    width: "100%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <AnalysisTotalTrips />
                <AnalysisDriverLicense />
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
