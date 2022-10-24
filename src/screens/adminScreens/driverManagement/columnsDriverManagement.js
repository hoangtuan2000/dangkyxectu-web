import React from "react";
import { Box, IconButton, Rating, styled, Tooltip } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Strings from "../../../constants/Strings";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Constants from "../../../constants/Constants";

const col = (handleOpenDialogUpdateDriver) => {
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
            field: "code",
            headerName: Strings.DriverManagement.DRIVER_CODE,
            description: Strings.DriverManagement.DRIVER_CODE,
            width: 90,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.code} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.code}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            flex: 1,
            field: "email",
            headerName: Strings.DriverManagement.EMAIL,
            description: Strings.DriverManagement.EMAIL,
            minWidth: 210,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.email} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.email}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "phone",
            headerName: Strings.Common.PHONE_NUMBER,
            description: Strings.Common.PHONE_NUMBER,
            width: 120,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.phone} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.phone}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "driverLicense",
            headerName: Strings.Common.LICENSE,
            description: Strings.Common.LICENSE,
            width: 90,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.driverLicense} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.driverLicense}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "numberOfTrips",
            headerName: Strings.Common.NUMBER_OF_TRIPS,
            description: Strings.Common.NUMBER_OF_TRIPS,
            width: 110,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.numberOfTrips} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.numberOfTrips}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "reviews",
            headerName: Strings.Common.REVIEW,
            description: Strings.Common.REVIEW,
            width: 110,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Rating
                        name="read-only"
                        value={params.value}
                        readOnly
                        size="small"
                    />
                );
            },
        },
        {
            field: "status",
            headerName: Strings.Common.STATUS,
            description: Strings.Common.STATUS,
            width: 100,
            sortable: false,
            renderCell: (params) => {
                let bgColor = "#969696";
                let textColor = "white";
                const objUserStatus = Constants.UserStatus;
                for (const property in objUserStatus) {
                    if (params.value == `${objUserStatus[property]}`) {
                        bgColor =
                            Constants.ColorOfUserStatus.Background[property];
                        textColor =
                            Constants.ColorOfUserStatus.TextHaveBackground[
                                property
                            ];
                        break;
                    }
                }
                return (
                    <Box
                        style={{
                            width: "100%",
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
                return (
                    <Tooltip title="Cập Nhật" arrow>
                        <IconButton
                            color="primary"
                            onClick={() =>
                                handleOpenDialogUpdateDriver(
                                    params.row.update
                                )
                            }
                        >
                            <ModeEditIcon />
                        </IconButton>
                    </Tooltip>
                );
            },
        },
    ]);
};

const TextContainer = styled("span")(({ theme }) => ({
    display: "flex",
    alignContent: "center",
}));

const TextLabel = styled("span")(({ theme }) => ({
    fontWeight: "bold",
    marginRight: "3px",
}));

const DoneOutlineIconStyle = styled(DoneOutlineIcon)(({ theme }) => ({
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
    marginRight: 2,
}));

const HighlightOffOutlinedIconStyle = styled(HighlightOffOutlinedIcon)(
    ({ theme }) => ({
        fontSize: 20,
        color: "red",
        fontWeight: "bold",
        marginRight: 2,
    })
);

export default col;
