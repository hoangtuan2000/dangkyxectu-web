import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Strings from "../../../constants/Strings";

const col = (handleOpenDialogUpdateMaintenance) => {
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
            flex: 1,
            field: "repairCost",
            headerName: Strings.MaintenanceManager.REPAIR_COST,
            description: Strings.MaintenanceManager.REPAIR_COST,
            minWidth: 200,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.repairCost} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.repairCost}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            flex: 1,
            field: "description",
            headerName: Strings.MaintenanceManager.MAINTENANCE_DESCRIPTION,
            description: Strings.MaintenanceManager.MAINTENANCE_DESCRIPTION,
            minWidth: 200,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.description} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.description}
                        </span>
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
                                handleOpenDialogUpdateMaintenance(
                                    params.row.maintenanceCode
                                )
                            }
                        >
                            <ModeEditIcon />
                        </IconButton>
                    </Tooltip>
                );
            },
        },
        {
            field: "maintenanceCode",
            headerName: Strings.MaintenanceManager.MAINTENANCE_CODE,
            description: Strings.MaintenanceManager.MAINTENANCE_CODE,
            width: 90,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.maintenanceCode} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.maintenanceCode}
                        </span>
                    </Tooltip>
                );
            },
        },
    ]);
};

export default col;
