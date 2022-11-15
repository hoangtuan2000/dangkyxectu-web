import React from "react";
import { Box, IconButton, Rating, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Strings from "../../../constants/Strings";
import Constants from "../../../constants/Constants";

const col = (handleOpenDialogUpdateCar) => {
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
            field: "carBrand",
            headerName: Strings.Common.BRAND,
            description: Strings.Common.BRAND,
            width: 110,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.carBrand} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.carBrand}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "type",
            headerName: Strings.Common.CAR_TYPE,
            description: Strings.Common.CAR_TYPE,
            width: 150,
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
            width: 120,
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
            field: "numberOfTrips",
            headerName: Strings.Common.NUMBER_OF_TRIPS,
            description: Strings.Common.NUMBER_OF_TRIPS,
            width: 110,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip
                        title={
                            params.row.numberOfTrips + " Chuyến Đi Hoàn Thành"
                        }
                        arrow
                    >
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
            field: "numberOfMaintenance",
            headerName: Strings.Common.NUMBER_OF_MAINTENANCE,
            description: Strings.Common.NUMBER_OF_MAINTENANCE,
            width: 120,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.numberOfMaintenance} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.numberOfMaintenance}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "status",
            headerName: Strings.Common.STATUS,
            description: Strings.Common.STATUS,
            width: 140,
            sortable: false,
            renderCell: (params) => {
                let bgColor = "white";
                let textColor = "white";
                switch (params.value) {
                    case Constants.CarStatus.WORK:
                        bgColor = Constants.ColorOfCarStatus.Background.WORK;
                        break;
                    case Constants.CarStatus.STOP_WORKING:
                        bgColor =
                            Constants.ColorOfCarStatus.Background.STOP_WORKING;
                        break;
                    case Constants.CarStatus.MAINTENANCE:
                        bgColor =
                            Constants.ColorOfCarStatus.Background.MAINTENANCE;
                        break;
                }
                return (
                    <Box
                        style={{
                            width: "130px",
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
            field: "license",
            headerName: Strings.Common.LICENSE,
            description: Strings.Common.LICENSE,
            width: 90,
            sortable: false,
            renderCell: (params) => {
                let bgColor = "gray";
                let textColor = "white";
                let textContent = Strings.Common.NOT_EXPIRED;
                if (params.value > 0) {
                    textContent =
                        params.row.license + " " + Strings.Common.EXPIRED;
                    bgColor = "red";
                }
                return (
                    <Tooltip
                        title={
                            params.value > 0
                                ? `${params.row.license} Giấy Phép Hết Hạn`
                                : textContent
                        }
                        arrow
                    >
                        <Box
                            style={{
                                width: "90px",
                                textAlign: "center",
                                backgroundColor: bgColor,
                                color: textColor,
                                padding: "2px 6px",
                                borderRadius: "10px",
                                fontSize: "12px",
                                fontWeight: "bold",
                                WebkitBoxShadow:
                                    "3px 4px 15px -1px rgba(0,0,0,0.25)",
                                boxShadow: "3px 4px 15px -1px rgba(0,0,0,0.25)",
                            }}
                        >
                            {textContent}
                        </Box>
                    </Tooltip>
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
                                handleOpenDialogUpdateCar(params.row.carCode)
                            }
                        >
                            <ModeEditIcon />
                        </IconButton>
                    </Tooltip>
                );
            },
        },
        {
            field: "carCode",
            headerName: Strings.CarManager.CAR_CODE,
            description: Strings.CarManager.CAR_CODE,
            width: 65,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.carCode} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.carCode}
                        </span>
                    </Tooltip>
                );
            },
        },
    ]);
};

export default col;
