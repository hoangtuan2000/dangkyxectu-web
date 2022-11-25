import React from "react";
import { Box, IconButton, Rating, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Strings from "../../../constants/Strings";
import Constants from "../../../constants/Constants";
import helper from "../../../common/helper";

const col = (handleModalShowSchedule) => {
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
            headerName: Strings.Common.CAR_TYPE,
            description: Strings.Common.CAR_TYPE,
            width: 140,
            sortable: false,
            hide: true,
            // renderCell: (params) => {
            //     return (
            //         <Tooltip title={params.row.type} arrow>
            //             <span
            //                 style={{
            //                     whiteSpace: "nowrap",
            //                     overflow: "hidden",
            //                     textOverflow: "ellipsis",
            //                 }}
            //             >
            //                 {params.row.type}
            //             </span>
            //         </Tooltip>
            //     );
            // },
        },
        {
            field: "licensePlates",
            headerName: Strings.Common.LICENSE_PLATES,
            description: Strings.Common.LICENSE_PLATES,
            width: 100,
            sortable: false,
            hide: true,
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
            flex: 1,
            field: "faculty",
            headerName: Strings.Common.FACULTY,
            description: Strings.Common.FACULTY,
            minWidth: 180,
            sortable: false,
            hide: true,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.faculty} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.faculty}
                        </span>
                    </Tooltip>
                );
            },
        },
        // {
        // flex: 1,
        //     field: "startLocation",
        //     headerName: Strings.Common.START_LOCATION,
        //     description: Strings.Common.START_LOCATION,
        //     minWidth: 180,
        //     sortable: false,
        //     renderCell: (params) => {
        //         return (
        //             <Tooltip title={params.row.startLocation} arrow>
        //                 <span
        //                     style={{
        //                         whiteSpace: "nowrap",
        //                         overflow: "hidden",
        //                         textOverflow: "ellipsis",
        //                     }}
        //                 >
        //                     {params.row.startLocation}
        //                 </span>
        //             </Tooltip>
        //         );
        //     },
        // },
        // {
        // flex: 1,
        //     field: "endLocation",
        //     headerName: Strings.Common.END_LOCATION,
        //     description: Strings.Common.END_LOCATION,
        //     minWidth: 180,
        //     sortable: false,
        //     renderCell: (params) => {
        //         return (
        //             <Tooltip title={params.row.endLocation} arrow>
        //                 <span
        //                     style={{
        //                         whiteSpace: "nowrap",
        //                         overflow: "hidden",
        //                         textOverflow: "ellipsis",
        //                     }}
        //                 >
        //                     {params.row.endLocation}
        //                 </span>
        //             </Tooltip>
        //         );
        //     },
        // },
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
            flex: 1,
            field: "reason",
            headerName: Strings.Common.REASON,
            description: Strings.Common.REASON,
            minWidth: 120,
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
            headerName: Strings.Common.START_DATE,
            description: Strings.Common.START_DATE,
            width: 100,
            sortable: false,
            hide: true,
        },
        {
            field: "endDate",
            headerName: Strings.Common.END_DATE,
            description: Strings.Common.END_DATE,
            width: 100,
            sortable: false,
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
            field: "update",
            headerName: Strings.Common.UPDATE,
            description: Strings.Common.UPDATE,
            width: 80,
            sortable: false,
            renderCell: (params) => {
                if (
                    params.row.status == Constants.ScheduleStatus.PENDING &&
                    helper.isDateTimeStampGreaterThanOrEqualCurrentDate(
                        params.row.startDate
                    )
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
                } else if (
                    params.row.status == Constants.ScheduleStatus.APPROVED &&
                    helper.isDateTimeStampGreaterThanOrEqualCurrentDate(
                        params.row.startDate
                    )
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
            field: "driver",
            headerName: Strings.Common.DRIVER,
            description: Strings.Common.DRIVER,
            width: 150,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.driver} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.driver}
                        </span>
                    </Tooltip>
                );
            },
        },
    ]);
};

export default col;
