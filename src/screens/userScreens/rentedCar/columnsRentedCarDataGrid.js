import React from "react";
import { Box, IconButton, Rating, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Strings from "../../../constants/Strings";
import Constants from "../../../constants/Constants";
import helper from "../../../common/helper";

const col = (
    handleModalShowSchedule,
    handleCancelSchedule,
    handleUpdateSchedulePending
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
            field: "reason",
            headerName: Strings.Common.REASON,
            description: Strings.Common.REASON,
            flex: 1,
            minWidth: 190,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.reason} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.reason}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "destination",
            headerName: Strings.Common.DESTINATION,
            description: Strings.Common.DESTINATION,
            flex: 1,
            minWidth: 190,
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
            field: "update",
            headerName: Strings.Common.UPDATE,
            description: Strings.Common.UPDATE,
            width: 85,
            sortable: false,
            renderCell: (params) => {
                if (params.row.status == Constants.ScheduleStatus.PENDING) {
                    return (
                        <Tooltip title="Cập Nhật" arrow>
                            <IconButton
                                color="primary"
                                onClick={() => {
                                    handleUpdateSchedulePending(
                                        params.row.scheduleCode
                                    );
                                }}
                            >
                                <ModeEditIcon />
                            </IconButton>
                        </Tooltip>
                    );
                } else if (
                    params.row.status == Constants.ScheduleStatus.APPROVED
                ) {
                    return (
                        <Tooltip title="Cập Nhật" arrow>
                            <IconButton
                                color="primary"
                                onClick={() => {
                                    handleModalShowSchedule(
                                        params.row.scheduleCode
                                    );
                                }}
                            >
                                <ModeEditIcon />
                            </IconButton>
                        </Tooltip>
                    );
                } else {
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
                }
            },
        },
        {
            field: "cancel",
            headerName: Strings.Common.CANCEL,
            description: Strings.Common.CANCEL,
            width: 60,
            sortable: false,
            renderCell: (params) => {
                if (
                    (params.row.status == Constants.ScheduleStatus.PENDING ||
                        params.row.status ==
                            Constants.ScheduleStatus.APPROVED) &&
                    helper.isDateTimeStampGreaterThanCurrentDate(
                        params.row.cancel
                    )
                ) {
                    return (
                        <Tooltip title="Hủy Đăng Ký Xe" arrow>
                            <IconButton
                                color="error"
                                onClick={() => {
                                    handleCancelSchedule(
                                        params.row.scheduleCode
                                    );
                                }}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        </Tooltip>
                    );
                } else {
                    return "";
                }
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
