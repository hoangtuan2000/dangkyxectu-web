import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Strings from "../../../constants/Strings";
import Constants from "../../../constants/Constants";

const col = (
    handleModalShowSchedule
) => {
    let columns = [];
    return (columns = [
        {
            field: "id",
            headerName: "STT",
            width: 50,
            sortable: false,
        },
        {
            field: "imageCar",
            headerName: Strings.Common.IMAGE,
            description: Strings.Common.IMAGE,
            width: 90,
            sortable: false,
            renderCell: (params) => {
                return (
                    <img
                        src={params.row.imageCar}
                        alt={params.row.imageCar}
                        style={{
                            width: "70px",
                            borderRadius: "10px",
                            padding: "3px",
                        }}
                    />
                );
            },
        },
        {
            field: "type",
            headerName: Strings.Common.CAR_TYPE,
            description: Strings.Common.CAR_TYPE,
            width: 140,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.type} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.type}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "licensePlates",
            headerName: Strings.Common.LICENSE_PLATES,
            description: Strings.Common.LICENSE_PLATES,
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.licensePlates} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.licensePlates}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "startLocation",
            headerName: Strings.Common.START_LOCATION,
            description: Strings.Common.START_LOCATION,
            flex: 1,
            minWidth: 190,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.startLocation} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.startLocation}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "endLocation",
            headerName: Strings.Common.END_LOCATION,
            description: Strings.Common.END_LOCATION,
            flex: 1,
            minWidth: 190,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.endLocation} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.endLocation}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "dateRange",
            headerName: Strings.Common.TIME,
            description: Strings.Common.TIME,
            width: 200,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.dateRange} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.dateRange}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "status",
            headerName: Strings.Common.STATUS,
            description: Strings.Common.STATUS,
            width: 120,
            sortable: false,
            renderCell: (params) => {
                let bgColor = "#969696";
                let textColor = "white";
                switch (params.value) {
                    case Constants.ScheduleStatus.COMPLETE:
                        bgColor =
                            Constants.ColorOfScheduleStatus.Background.COMPLETE;
                        textColor =
                            Constants.ColorOfScheduleStatus.Text.COMPLETE;
                        break;
                    case Constants.ScheduleStatus.APPROVED:
                        bgColor =
                            Constants.ColorOfScheduleStatus.Background.APPROVED;
                        textColor =
                            Constants.ColorOfScheduleStatus.Text.APPROVED;
                        break;
                    case Constants.ScheduleStatus.PENDING:
                        bgColor =
                            Constants.ColorOfScheduleStatus.Background.PENDING;
                        textColor =
                            Constants.ColorOfScheduleStatus.Text.PENDING;
                        break;
                    case Constants.ScheduleStatus.CANCELLED:
                        bgColor =
                            Constants.ColorOfScheduleStatus.Background
                                .CANCELLED;
                        textColor =
                            Constants.ColorOfScheduleStatus.Text.CANCELLED;
                        break;
                    case Constants.ScheduleStatus.REFUSE:
                        bgColor =
                            Constants.ColorOfScheduleStatus.Background.REFUSE;
                        textColor = Constants.ColorOfScheduleStatus.Text.REFUSE;
                        break;
                }
                return (
                    <>
                        <Box
                            style={{
                                width: "90px",
                                textAlign: "center",
                                backgroundColor: bgColor,
                                color: textColor,
                                padding: "2px 6px",
                                borderRadius: "10px",
                                fontSize: "12px",
                                WebkitBoxShadow:
                                    "3px 4px 15px -1px rgba(0,0,0,0.25)",
                                boxShadow: "3px 4px 15px -1px rgba(0,0,0,0.25)",
                            }}
                        >
                            {params.value}
                        </Box>
                    </>
                );
            },
        },
        {
            field: "detail",
            headerName: Strings.Common.DETAIL,
            description: Strings.Common.DETAIL,
            width: 85,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title="Xem Chi Tiết" arrow>
                        <IconButton
                            color="primary"
                            onClick={() => {
                                handleModalShowSchedule(
                                    params.row.scheduleCode
                                );
                            }}
                        >
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                );
            },
        },
        {
            field: "scheduleCode",
            headerName: Strings.Common.SCHEDULE_CODE,
            description: Strings.Common.SCHEDULE_CODE,
            width: 120,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.scheduleCode} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.scheduleCode}
                        </span>
                    </Tooltip>
                );
            },
        },
    ]);
};

export default col;
