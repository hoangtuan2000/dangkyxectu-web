import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
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
} from "recharts";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Strings from "../../../constants/Strings";

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

function Statistical() {
    const theme = useTheme();
    return (
        <Box>
            <Box
                sx={{
                    width: "280px",
                    height: "130px",
                    backgroundColor: theme.palette.action.selected,
                    boxShadow: `${theme.palette.text.disabled} 0px 5px 15px`,
                    borderRadius: "10px",
                    borderLeft: `5px solid ${theme.palette.error.main}`,
                    padding: theme.spacing(2),
                    margin: theme.spacing(1),
                    float: "left",
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        color: theme.palette.error.main,
                        fontWeight: "bold",
                    }}
                >
                    <DirectionsCarIcon sx={{ marginRight: "5px" }} />
                    {Strings.Statistical.TOTAL_CAR}
                </Typography>
                <Box sx={{ paddingLeft: "15px" }}>
                    <Typography variant="p" component="div">
                        Xe 4 chỗ: 20
                    </Typography>
                    <Typography variant="p" component="div">
                        Xe 16 chỗ: 12
                    </Typography>
                    <Typography variant="p" component="div">
                        Xe 32 chỗ: 25
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    width: "280px",
                    height: "130px",
                    backgroundColor: theme.palette.action.selected,
                    boxShadow: `${theme.palette.text.disabled} 0px 5px 15px`,
                    borderRadius: "10px",
                    borderLeft: `5px solid ${theme.palette.primary.main}`,
                    padding: theme.spacing(2),
                    margin: theme.spacing(1),
                    float: "left",
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        color: theme.palette.primary.main,
                        fontWeight: "bold",
                    }}
                >
                    <PeopleAltIcon sx={{ marginRight: "5px" }} />
                    {Strings.Statistical.TOTAL_DRIVER}
                </Typography>
                <Box sx={{ paddingLeft: "15px" }}>
                    <Typography variant="p" component="div">
                        Hạng B1: 20
                    </Typography>
                    <Typography variant="p" component="div">
                        Hạng B2: 12
                    </Typography>
                    <Typography variant="p" component="div">
                        Hạng C: 25
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    width: "280px",
                    height: "130px",
                    backgroundColor: theme.palette.action.selected,
                    boxShadow: `${theme.palette.text.disabled} 0px 5px 15px`,
                    borderRadius: "10px",
                    borderLeft: `5px solid ${theme.palette.success.main}`,
                    padding: theme.spacing(2),
                    margin: theme.spacing(1),
                    float: "left",
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        color: theme.palette.success.main,
                        fontWeight: "bold",
                    }}
                >
                    <AirportShuttleIcon sx={{ marginRight: "5px" }} />
                    {Strings.Statistical.TOTAL_TRIPS}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "40px",
                    }}
                >
                    <Typography variant="p" component="div">
                        50
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    width: "280px",
                    height: "130px",
                    backgroundColor: theme.palette.action.selected,
                    boxShadow: `${theme.palette.text.disabled} 0px 5px 15px`,
                    borderRadius: "10px",
                    borderLeft: `5px solid ${theme.palette.secondary.main}`,
                    padding: theme.spacing(2),
                    margin: theme.spacing(1),
                    float: "left",
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        color: theme.palette.secondary.main,
                        fontWeight: "bold",
                    }}
                >
                    <LibraryBooksIcon sx={{ marginRight: "5px" }} />
                    {Strings.Statistical.FORM_IS_PENDING_CONFIRMATION}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "40px",
                    }}
                >
                    <Typography variant="p" component="div">
                        5
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    width: "280px",
                    height: "130px",
                    backgroundColor: theme.palette.action.selected,
                    boxShadow: `${theme.palette.text.disabled} 0px 5px 15px`,
                    borderRadius: "10px",
                    borderLeft: `5px solid ${theme.palette.warning.main}`,
                    padding: theme.spacing(2),
                    margin: theme.spacing(1),
                    float: "left",
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        color: theme.palette.warning.main,
                        fontWeight: "bold",
                    }}
                >
                    <LibraryBooksIcon sx={{ marginRight: "5px" }} />
                    {Strings.Statistical.LICENSE_EXPIRES}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "40px",
                    }}
                >
                    <Typography variant="p" component="div">
                        0
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ clear: "both" }}></Box>

            <BarChart
                width={730}
                height={250}
                data={data}
                margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name">
                    <Label value="Pages of my website" position="insideTop" />
                </XAxis>
                <YAxis
                    label={{
                        value: "pv of page",
                        angle: -90,
                        position: "insideLeft",
                    }}
                />
                <Bar dataKey="pv" fill="#8884d8">
                    <LabelList dataKey="name" position="top" />
                </Bar>
            </BarChart>
        </Box>
    );
}

export default Statistical;
