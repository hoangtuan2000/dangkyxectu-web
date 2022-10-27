import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import Strings from "../../../constants/Strings";
import Constants from "../../../constants/Constants";
import helper from "../../../common/helper";

const col = (handleGetDriverCode) => {
    let columns = [];
    return (columns = [
        {
            field: "id",
            headerName: "STT",
            width: 30,
            sortable: false,
        },
        {
            field: "driverLicense",
            headerName: Strings.DialogShowAnalysisDriverLicense.DRIVER_LICENSE,
            description: Strings.DialogShowAnalysisDriverLicense.DRIVER_LICENSE,
            width: 100,
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
            field: "idDriver",
            hide: true,
        },
        {
            field: "code",
            headerName: Strings.DialogShowAnalysisDriverLicense.CODE_DRIVER,
            description: Strings.DialogShowAnalysisDriverLicense.CODE_DRIVER,
            width: 90,
            sortable: false,
            renderCell: (params) => {
                if (params.row.code) {
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
            flex: 1,
            field: "fullName",
            headerName: Strings.DialogShowAnalysisDriverLicense.FULL_NAME,
            description: Strings.DialogShowAnalysisDriverLicense.FULL_NAME,
            minWidth: 120,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.fullName || ""} arrow>
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
            field: "email",
            headerName: Strings.DialogShowAnalysisDriverLicense.EMAIL,
            description: Strings.DialogShowAnalysisDriverLicense.EMAIL,
            minWidth: 120,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.email || ""} arrow>
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
            field: "phoneNumber",
            headerName: Strings.DialogShowAnalysisDriverLicense.PHONE,
            description: Strings.DialogShowAnalysisDriverLicense.PHONE,
            width: 110,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.phoneNumber || ""} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.phoneNumber}
                        </span>
                    </Tooltip>
                );
            },
        },
        {
            field: "userStatusCode",
            hide: true,
        },
        {
            field: "userStatus",
            headerName: Strings.Common.STATUS,
            description: Strings.Common.STATUS,
            width: 120,
            sortable: false,
            renderCell: (params) => {
                let bgColor = "#969696";
                let textColor = "white";
                const objUserStatusCode = Constants.UserStatusCode;
                for (const property in objUserStatusCode) {
                    if (
                        params.row.userStatusCode ==
                        `${objUserStatusCode[property]}`
                    ) {
                        bgColor =
                            Constants.ColorOfUserStatus.Background[property];
                        textColor =
                            Constants.ColorOfUserStatus.TextHaveBackground[
                                property
                            ];
                        break;
                    }
                }

                if (params.row.userStatusCode) {
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
                if (params.row.idDriver) {
                    return (
                        <Tooltip title={Strings.Common.DETAIL} arrow>
                            <IconButton
                                color="primary"
                                onClick={() =>
                                    handleGetDriverCode(params.row.driverCode)
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
