import React from "react";
import { Box, IconButton, Rating, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import Strings from "../../../constants/Strings";
import Constants from "../../../constants/Constants";
import helper from "../../../common/helper";

const col = (handleGetScheduleCode) => {
    let columns = [];
    return (columns = [
        {
            field: "id",
            headerName: "STT",
            width: 30,
            sortable: false,
        },
        {
            flex: 1,
            field: "driver",
            headerName: Strings.DialogShowAnalysisTotalTripsOfDriver.DRIVER,
            description: Strings.DialogShowAnalysisTotalTripsOfDriver.DRIVER,
            minWidth: 150,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.value} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.value}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "idSchedule",
            headerName:
                Strings.DialogShowAnalysisTotalTripsOfDriver.SCHEDULE_CODE,
            description:
                Strings.DialogShowAnalysisTotalTripsOfDriver.SCHEDULE_CODE,
            width: 120,
            sortable: false,
            renderCell: (params) => {
                if (params.row.idSchedule) {
                    return (
                        <Tooltip title={params.row.idSchedule} arrow>
                            <span
                                style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {params.row.idSchedule}
                            </span>
                        </Tooltip>
                    );
                } else {
                    return (
                        <Tooltip title={Strings.Common.NO_SCHEDULE} arrow>
                            <DoDisturbIcon
                                sx={{ fontSize: 18, color: "red" }}
                            />
                        </Tooltip>
                    );
                }
            },
        },
        {
            field: "startDate",
            hide: true,
        },
        {
            field: "endDate",
            hide: true,
        },
        {
            field: "dateRange",
            headerName: Strings.DialogShowAnalysisTotalTripsOfDriver.TIME,
            description: Strings.DialogShowAnalysisTotalTripsOfDriver.TIME,
            width: 190,
            sortable: false,
            renderCell: (params) => {
                let startDate = null;
                let endDate = null;
                if (params.row.startDate && params.row.endDate) {
                    startDate = helper.formatDateStringFromTimeStamp(
                        params.row.startDate
                    );
                    endDate = helper.formatDateStringFromTimeStamp(
                        params.row.endDate
                    );
                }
                const dateRange =
                    startDate && endDate ? `${startDate} - ${endDate}` : "";
                return (
                    <Tooltip title={dateRange} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {dateRange}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            flex: 1,
            field: "infoUser",
            headerName:
                Strings.DialogShowAnalysisTotalTripsOfDriver.SUBSCRIBERS,
            description:
                Strings.DialogShowAnalysisTotalTripsOfDriver.SUBSCRIBERS,
            minWidth: 120,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.infoUser || ""} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.infoUser}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "review",
            headerName: Strings.DialogShowAnalysisTotalTripsOfDriver.REVIEW,
            description: Strings.DialogShowAnalysisTotalTripsOfDriver.REVIEW,
            width: 110,
            sortable: false,
            renderCell: (params) => {
                if (params.row.review) {
                    return (
                        <Rating
                            name="read-only"
                            value={params.value}
                            readOnly
                            precision={0.5}
                            size="small"
                        />
                    );
                }
            },
        },
        {
            field: "detail",
            headerName: Strings.Common.DETAIL,
            description: Strings.Common.DETAIL,
            width: 70,
            sortable: false,
            renderCell: (params) => {
                if (params.row.idSchedule) {
                    return (
                        <Tooltip title={Strings.Common.DETAIL} arrow>
                            <IconButton
                                color="primary"
                                onClick={() =>
                                    handleGetScheduleCode(params.row.idSchedule)
                                }
                            >
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>
                    );
                }
            },
        },
    ]);
};

export default col;
