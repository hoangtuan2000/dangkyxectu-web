import React from "react";
import {
    Box,
    IconButton,
    Rating,
    styled,
    Tooltip,
    useTheme,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Strings from "../../../constants/Strings";
import Constants from "../../../constants/Constants";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import helper from "../../../common/helper";

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
                    <Tooltip
                        title={`${params.row.carBrand}`}
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
            field: "idSchedule",
            headerName: Strings.Common.SCHEDULE_CODE,
            description: Strings.Common.SCHEDULE_CODE,
            width: 110,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.row.idSchedule} arrow>
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.row.idSchedule}
                        </span>
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
        {
            // flex: 1,
            field: "infoCar",
            headerName: Strings.Common.INFO_CAR,
            description: Strings.Common.INFO_CAR,
            // minWidth: 200,
            width: 210,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Box>
                        <Tooltip
                            title={`Biển Số Xe: ${params.row.licensePlates}`}
                            arrow
                        >
                            <TextContainer>
                                <TextLabel>Biển Số Xe:</TextLabel>
                                {params.row.licensePlates}
                            </TextContainer>
                        </Tooltip>

                        <Tooltip title={`Loại Xe: ${params.row.type}`} arrow>
                            <TextContainer>
                                <TextLabel>Loại Xe:</TextLabel>
                                {params.row.type}
                            </TextContainer>
                        </Tooltip>
                    </Box>
                );
            },
        },
        {
            field: "carBrand",
            headerName: Strings.Common.BRAND,
            description: Strings.Common.BRAND,
            width: 110,
            sortable: false,
            hide: true,
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
            hide: true,
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
            field: "infoSchedule",
            headerName: Strings.Common.INFO_SCHEDULE,
            description: Strings.Common.INFO_SCHEDULE,
            minWidth: 250,
            sortable: false,
            renderCell: (params) => {
                let textColor = null;
                const objScheduleStatus = Constants.ScheduleStatus;
                for (const property in objScheduleStatus) {
                    if (
                        params.row.scheduleStatus ==
                        `${objScheduleStatus[property]}`
                    ) {
                        textColor =
                            Constants.ColorOfScheduleStatus.TextNoBackground[
                                property
                            ];
                        break;
                    }
                }
                const startDate = helper.formatDateStringFromTimeStamp(
                    params.row.startDate
                );
                const endDate = helper.formatDateStringFromTimeStamp(
                    params.row.endDate
                );
                return (
                    <Box>
                        <Tooltip
                            title={`Trạng Thái: ${params.row.scheduleStatus}`}
                            arrow
                        >
                            <TextContainer>
                                <TextLabel>Trạng Thái:</TextLabel>
                                <span
                                    style={{
                                        color: textColor,
                                        fontWeight: "bold",
                                    }}
                                >
                                    {params.row.scheduleStatus}
                                </span>
                            </TextContainer>
                        </Tooltip>

                        <Tooltip
                            title={`Tài Xế: ${params.row.infoDriver}`}
                            arrow
                        >
                            <TextContainer>
                                <TextLabel>Tài Xế:</TextLabel>
                                {params.row.infoDriver}
                            </TextContainer>
                        </Tooltip>
                    </Box>
                );
            },
        },
        {
            field: "scheduleStatus",
            headerName: Strings.Common.CAR_STATUS,
            description: Strings.Common.CAR_STATUS,
            hide: true,
        },
        {
            field: "infoDriver",
            headerName: Strings.Common.CAR_STATUS,
            description: Strings.Common.CAR_STATUS,
            hide: true,
        },
        {
            field: "infoUser",
            headerName: Strings.Common.CAR_STATUS,
            description: Strings.Common.CAR_STATUS,
            hide: true,
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
                    <Box>
                        <Tooltip
                            title={`Thời Gian: ${startDate} - ${endDate}`}
                            arrow
                        >
                            <TextContainer>
                                {` ${startDate} - ${endDate}`}
                            </TextContainer>
                        </Tooltip>
                    </Box>
                );
            },
        },
        {
            field: "startDate",
            headerName: Strings.Common.CAR_STATUS,
            description: Strings.Common.CAR_STATUS,
            hide: true,
        },
        {
            field: "endDate",
            headerName: Strings.Common.CAR_STATUS,
            description: Strings.Common.CAR_STATUS,
            hide: true,
        },
        {
            field: "carStatus",
            headerName: Strings.Common.CAR_STATUS,
            description: Strings.Common.CAR_STATUS,
            width: 240,
            sortable: false,
            renderCell: (params) => {
                let beforeTrip = (
                    <span>
                        Trước Khi Đi:
                        {params.row.totalBrokenPartsBeforeTrip <= 0
                            ? " Tốt"
                            : ` ${params.row.totalBrokenPartsBeforeTrip} Bộ Phận Hỏng`}
                    </span>
                );
                let afterTrip = (
                    <span>
                        Sau Khi Đi:
                        {params.row.totalBrokenPartsAfterTrip <= 0
                            ? " Tốt"
                            : ` ${params.row.totalBrokenPartsAfterTrip} Bộ Phận Hỏng`}
                    </span>
                );
                return (
                    <Box
                        sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        <Tooltip title={beforeTrip} arrow>
                            <TextContainer>
                                {params.row.totalBrokenPartsBeforeTrip <= 0 ? (
                                    <DoneOutlineIconStyle />
                                ) : (
                                    <HighlightOffOutlinedIconStyle />
                                )}
                                {beforeTrip}
                            </TextContainer>
                        </Tooltip>

                        <Tooltip title={afterTrip} arrow>
                            <TextContainer>
                                {params.row.totalBrokenPartsAfterTrip <= 0 ? (
                                    <DoneOutlineIconStyle />
                                ) : (
                                    <HighlightOffOutlinedIconStyle />
                                )}
                                {afterTrip}
                            </TextContainer>
                        </Tooltip>
                    </Box>
                );
            },
        },
        {
            field: "totalBrokenPartsBeforeTrip",
            headerName: Strings.Common.CAR_STATUS,
            description: Strings.Common.CAR_STATUS,
            sortable: false,
            hide: true,
        },
        {
            field: "totalBrokenPartsAfterTrip",
            headerName: Strings.Common.CAR_STATUS,
            description: Strings.Common.CAR_STATUS,
            sortable: false,
            hide: true,
        },
        {
            field: "detail",
            headerName: Strings.Common.DETAIL,
            description: Strings.Common.DETAIL,
            width: 70,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title="Cập Nhật" arrow>
                        <IconButton
                            color="primary"
                            // onClick={() =>
                            //     // handleOpenDialogUpdateCar(params.row.carCode)
                            // }
                        >
                            <VisibilityIcon />
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
