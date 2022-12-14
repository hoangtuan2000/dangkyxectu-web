import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import Strings from "../../../constants/Strings";
import Constants from "../../../constants/Constants";
import helper from "../../../common/helper";

const col = (handleModalShowSchedule) => {
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
            field: "startDate",
            headerName: Strings.Common.START_DATE,
            description: Strings.Common.START_DATE,
            width: 200,
            sortable: false,
            hide: true,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.startDate} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.startDate}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "endDate",
            headerName: Strings.Common.END_DATE,
            description: Strings.Common.END_DATE,
            width: 200,
            sortable: false,
            hide: true,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.endDate} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.endDate}
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
                    <Tooltip
                        title={`${helper.formatDateStringFromTimeStamp(
                            params.row.startDate
                        )} - ${helper.formatDateStringFromTimeStamp(
                            params.row.endDate
                        )}`}
                        arrow
                    >
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {`${helper.formatDateStringFromTimeStamp(
                                params.row.startDate
                            )} - ${helper.formatDateStringFromTimeStamp(
                                params.row.endDate
                            )}`}
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
            field: "detail",
            headerName: Strings.Common.DETAIL,
            description: Strings.Common.DETAIL,
            width: 85,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title="Xem Chi Ti???t" arrow>
                        <IconButton
                            color="primary"
                            onClick={() => {
                                handleModalShowSchedule(
                                    params.row.scheduleCode
                                );
                            }}
                        >
                            {(params.row.status ==
                                Constants.ScheduleStatus.APPROVED &&
                                helper.isDateTimeStampGreaterThanOrEqualCurrentDate(
                                    params.row.startDate
                                )) ||
                            params.row.status ==
                                Constants.ScheduleStatus.RECEIVED ||
                            params.row.status ==
                                Constants.ScheduleStatus.MOVING ? (
                                <CreateIcon />
                            ) : (
                                <VisibilityIcon />
                            )}
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
