import {
    Box,
    IconButton,
    Rating,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DataGridCustom from "../../components/dataGridCustom/DataGridCustom";
import Strings from "../../constants/Strings";
import { RentedCarService } from "../../services/RentedCarServices";
import ModalError from "../../components/modalError/ModalError";
import ModalSuccess from "../../components/modalSuccess/ModalSuccess";
import BackDrop from "../../components/backDrop/BackDrop";
import Constants from "../../constants/Constants";
import { useState, useEffect } from "react";
import helper from "../../common/helper";

const rowsTest = [
    {
        id: 1,
        imageCar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
        type: "46 Chỗ",
        licensePlates: "65A - 123456",
        reason: "Đi Tham Quan",
        endLocation: "Khu Hòa An",
        startDay: "29/06/2022",
        endDay: "30/06/2022",
        status: "Hoàn Thành",
    },
    {
        id: 2,
        imageCar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
        type: "46 Chỗ",
        licensePlates: "65A - 123456",
        reason: "Đi Tham Quan",
        endLocation: "Khu Hòa An",
        startDay: "29/06/2022",
        endDay: "30/06/2022",
        status: "Thành Công",
    },
    {
        id: 3,
        imageCar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
        type: "46 Chỗ",
        licensePlates: "65A - 123456",
        reason: "Đi Tham Quan",
        endLocation: "Khu Hòa An",
        startDay: "29/06/2022",
        endDay: "30/06/2022",
        status: "Chờ Xác Nhận",
    },
    {
        id: 4,
        imageCar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
        type: "46 Chỗ",
        licensePlates: "65A - 123456",
        reason: "Đi Tham Quan",
        endLocation: "Khu Hòa An",
        startDay: "29/06/2022",
        endDay: "30/06/2022",
        status: "Đã Hủy",
    },
    {
        id: 5,
        imageCar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
        type: "46 Chỗ",
        licensePlates: "65A - 123456",
        reason: "Đi Tham Quan",
        endLocation: "Khu Hòa An",
        startDay: "29/06/2022",
        endDay: "30/06/2022",
        status: "Từ Chối",
    },
];

function RentedCar() {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [scheduleList, setScheduleList] = useState([]);

    const status = [
        "Hoàn Thành",
        "Thành Công",
        "Chờ Xác Nhận",
        "Đã Hủy",
        "Từ Chối",
    ];

    const columns = [
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
            width: 190,
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
            width: 190,
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
                switch (params.value) {
                    case Constants.scheduleStatus.COMPLETE:
                        bgColor = "Blue";
                        break;
                    case Constants.scheduleStatus.APPROVED:
                        bgColor = "green";
                        break;
                    case Constants.scheduleStatus.PENDING:
                        bgColor = "#ffcffb";
                        textColor = "black";
                        break;
                    case Constants.scheduleStatus.CANCELLED:
                        bgColor = "gray";
                        break;
                    case Constants.scheduleStatus.REFUSE:
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
            width: 85,
            sortable: false,
            renderCell: (params) => {
                if (
                    params.row.status == Constants.scheduleStatus.PENDING ||
                    params.row.status == Constants.scheduleStatus.APPROVED
                ) {
                    return (
                        <Tooltip title="Cập Nhật" arrow>
                            <IconButton color="primary">
                                <ModeEditIcon />
                            </IconButton>
                        </Tooltip>
                    );
                } else {
                    return (
                        <Tooltip title="Xem Chi Tiết" arrow>
                            <IconButton color="primary">
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
                    params.row.status == Constants.scheduleStatus.PENDING ||
                    params.row.status == Constants.scheduleStatus.APPROVED
                ) {
                    return (
                        <Tooltip title="Hủy Đăng Ký Xe" arrow>
                            <IconButton color="error">
                                <DeleteForeverIcon />
                            </IconButton>
                        </Tooltip>
                    );
                }
            },
        },
        {
            field: "reviews",
            headerName: Strings.Common.REVIEW,
            description: Strings.Common.REVIEW,
            width: 165,
            sortable: false,
            renderCell: (params) => {
                return (
                    params.row.status == Constants.scheduleStatus.COMPLETE && (
                        <Rating
                            name="read-only"
                            value={2}
                            readOnly
                            size="small"
                        />
                    )
                );
            },
        },
    ];

    const getUserRegisteredScheduleList = async () => {
        const res = await RentedCarService.getUserRegisteredScheduleList();
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setScheduleList(
                    res.data.data.map((item, index) => {
                        const startDate = helper.formatDateStringFromTimeStamp(item.startDate)
                        const endDate = helper.formatDateStringFromTimeStamp(item.endDate)
                        return {
                            id: index,
                            imageCar: item.image,
                            type: `${item.carType} ${item.seatNumber} Chổ`,
                            licensePlates: item.licensePlates,
                            reason: item.reason,
                            destination: `${item.endLocation} - ${item.wardEnd} - ${item.districtEnd} - ${item.provinceEnd}`,
                            dateRange: `${startDate} - ${endDate}`,
                            status: item.scheduleStatus,
                        };
                    })
                );
            } else {
                setModalError({
                    ...modalError,
                    open: true,
                    title: res.data.message,
                });
            }
        }
        // axios fail
        else {
            setModalError({
                ...modalError,
                open: true,
                title: `${Strings.Common.AN_ERROR_OCCURRED} (${res.request.status})`,
                content: res.name,
            });
        }
    };

    const run = async () => {
        await setBackDrop(true);
        await getUserRegisteredScheduleList();
        await setBackDrop(false);
    };

    useEffect(() => {
        run();
    }, []);

    return (
        <Box>
            <Typography variant="h6" component="div">
                {Strings.RentedCar.RENTED_CAR_LIST}
            </Typography>

            <DataGridCustom columns={columns} rows={scheduleList} />

            <ModalError
                open={modalError.open}
                handleClose={() =>
                    setModalError({ ...modalError, open: false })
                }
                content={modalError.content}
                title={modalError.title}
            />

            <ModalSuccess
                open={modalSuccess}
                handleClose={() => setModalSuccess(false)}
            />
            <BackDrop open={backDrop} />
        </Box>
    );
}

export default RentedCar;
