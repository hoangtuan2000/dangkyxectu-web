import React from "react";
import { Box, IconButton, Rating, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Strings from "../../../constants/Strings";
import Constants from "../../../constants/Constants";
import helper from "../../../common/helper";

const col = (handleGetCode) => {
    let columns = [];
    return (columns = [
        {
            field: "id",
            headerName: "STT",
            width: 30,
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
                    <Tooltip
                        title={`${params.row.type} - ${params.row.licensePlates}`}
                        arrow
                    >
                        <img
                            src={params.row.imageCar}
                            alt={params.row.imageCar}
                            style={{
                                width: "70px",
                                borderRadius: "10px",
                                padding: "3px",
                            }}
                        />
                    </Tooltip>
                );
            },
        },
        {
            field: "type",
            hide: true,
        },
        {
            field: "licensePlates",
            hide: true,
        },
        {
            flex: 1,
            field: "fullName",
            headerName: Strings.Common.FULL_NAME,
            description: Strings.Common.FULL_NAME,
            minWidth: 160,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip
                        title={`${params.row.fullName} - ${params.row.faculty}`}
                        arrow
                    >
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.fullName}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "faculty",
            hide: true,
        },
        {
            flex: 1,
            field: "destination",
            headerName: Strings.Common.DESTINATION,
            description: Strings.Common.DESTINATION,
            minWidth: 130,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.destination} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.destination}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "dateRange",
            headerName: Strings.Common.TIME,
            description: Strings.Common.TIME,
            width: 190,
            sortable: false,
            renderCell: (params) => {
                const startDate = helper.formatDateStringFromTimeStamp(
                    params.row.startDate
                );
                const endDate = helper.formatDateStringFromTimeStamp(
                    params.row.endDate
                );
                return (
                    <Tooltip title={`${startDate} - ${endDate}`} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {`${startDate} - ${endDate}`}
                        </span>
                    </Tooltip>
                );
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
            field: "status",
            headerName: Strings.Common.STATUS,
            description: Strings.Common.STATUS,
            width: 120,
            sortable: false,
            renderCell: (params) => {
                let bgColor = "#969696";
                let textColor = "white";
                const objScheduleStatus = Constants.ScheduleStatus;
                for (const property in objScheduleStatus) {
                    if (params.value == `${objScheduleStatus[property]}`) {
                        bgColor =
                            Constants.ColorOfScheduleStatus.Background[
                                property
                            ];
                        textColor =
                            Constants.ColorOfScheduleStatus.Text[property];
                        break;
                    }
                }
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
            field: "review",
            headerName: Strings.Common.REVIEW,
            description: Strings.Common.REVIEW,
            width: 120,
            sortable: false,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        params.row.status ==
                            Constants.ScheduleStatus.COMPLETE && (
                            <Rating
                                name="read-only"
                                defaultValue={params.row.review}
                                precision={0.1}
                                readOnly
                                size="small"
                            />
                        )
                    );
                }
            },
        },
        {
            field: "scheduleCode",
            headerName: Strings.Common.SCHEDULE_CODE,
            description: Strings.Common.SCHEDULE_CODE,
            width: 110,
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
        {
            field: "detail",
            headerName: Strings.Common.DETAIL,
            description: Strings.Common.DETAIL,
            width: 80,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title="Xem Chi Tiết" arrow>
                        <IconButton
                            color="primary"
                            onClick={() => {
                                handleGetCode(params.row.scheduleCode);
                            }}
                        >
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                );
            },
        },
    ]);
};

export default col;
