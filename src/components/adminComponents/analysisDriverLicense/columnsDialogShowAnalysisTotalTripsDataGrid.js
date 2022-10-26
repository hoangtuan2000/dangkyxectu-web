import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
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
            field: "date",
            headerName: Strings.DialogShowAnalysisTotalTrips.DATE,
            description: Strings.DialogShowAnalysisTotalTrips.DATE,
            width: 150,
            sortable: false,
            renderCell: (params) => {
                const date = helper.formatDateStringFromTimeStamp(
                    params.row.date
                );
                return (
                    <Tooltip title={`${date}`} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {`${date}`}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "idSchedule",
            headerName: Strings.DialogShowAnalysisTotalTrips.SCHEDULE_CODE,
            description: Strings.DialogShowAnalysisTotalTrips.SCHEDULE_CODE,
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
            headerName: Strings.DialogShowAnalysisTotalTrips.TIME,
            description: Strings.DialogShowAnalysisTotalTrips.TIME,
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
            headerName: Strings.DialogShowAnalysisTotalTrips.SUBSCRIBERS,
            description: Strings.DialogShowAnalysisTotalTrips.SUBSCRIBERS,
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
            flex: 1,
            field: "infoDriver",
            headerName: Strings.DialogShowAnalysisTotalTrips.DRIVER,
            description: Strings.DialogShowAnalysisTotalTrips.DRIVER,
            minWidth: 120,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.infoDriver || ""} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.infoDriver}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "scheduleStatusCode",
            hide: true,
        },
        {
            field: "scheduleStatus",
            headerName: Strings.Common.STATUS,
            description: Strings.Common.STATUS,
            width: 120,
            sortable: false,
            renderCell: (params) => {
                let bgColor = "#969696";
                let textColor = "white";
                const objScheduleStatusCode = Constants.ScheduleStatusCode;
                for (const property in objScheduleStatusCode) {
                    if (
                        params.row.scheduleStatusCode ==
                        `${objScheduleStatusCode[property]}`
                    ) {
                        bgColor =
                            Constants.ColorOfScheduleStatus.Background[
                                property
                            ];
                        textColor =
                            Constants.ColorOfScheduleStatus.Text[property];
                        break;
                    }
                }

                if (params.row.idSchedule) {
                    return (
                        <>
                            <Box
                                style={{
                                    width: "100px",
                                    textAlign: "center",
                                    backgroundColor: bgColor,
                                    color: textColor,
                                    padding: "2px 6px",
                                    borderRadius: "10px",
                                    fontSize: "12px",
                                    WebkitBoxShadow:
                                        "3px 4px 15px -1px rgba(0,0,0,0.25)",
                                    boxShadow:
                                        "3px 4px 15px -1px rgba(0,0,0,0.25)",
                                }}
                            >
                                {params.value}
                            </Box>
                        </>
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
