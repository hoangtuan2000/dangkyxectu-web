import React from "react";
import { Box, IconButton, Rating, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Strings from "../../../constants/Strings";
import Constants from "../../../constants/Constants";

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
                    <Tooltip title={params.row.type} arrow>
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
            minWidth: 180,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.fullName} arrow>
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
            field: "department",
            headerName: Strings.Common.DEPARTMENT,
            description: Strings.Common.DEPARTMENT,
            minWidth: 180,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.department} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.department}
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
            flex: 1,
            field: "reason",
            headerName: Strings.Common.REASON,
            description: Strings.Common.REASON,
            minWidth: 180,
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
            field: "startDay",
            headerName: Strings.Common.START_DAY,
            description: Strings.Common.START_DAY,
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.startDay} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.startDay}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "endDay",
            headerName: Strings.Common.END_DAY,
            description: Strings.Common.END_DAY,
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.endDay} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.endDay}
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
                        bgColor = "Blue";
                        break;
                    case Constants.ScheduleStatus.APPROVED:
                        bgColor = "green";
                        break;
                    case Constants.ScheduleStatus.PENDING:
                        bgColor = "#ffcffb";
                        textColor = "black";
                        break;
                    case Constants.ScheduleStatus.CANCELLED:
                        bgColor = "gray";
                        break;
                    case Constants.ScheduleStatus.REFUSE:
                        bgColor = "red";
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
            field: "update",
            headerName: Strings.Common.UPDATE,
            description: Strings.Common.UPDATE,
            Width: 80,
            sortable: false,
            renderCell: (params) => {
                if (
                    params.row.status == Constants.ScheduleStatus.PENDING ||
                    params.row.status == Constants.ScheduleStatus.APPROVED
                ) {
                    return (
                        <Tooltip title="Cập Nhật" arrow>
                            <IconButton color="primary">
                                <ModeEditIcon />
                            </IconButton>
                        </Tooltip>
                    );
                }
            },
        },
    ]);
};

export default col;
