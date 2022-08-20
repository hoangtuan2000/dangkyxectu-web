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

const rowsTest = [
    {
        id: 1,
        imageCar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
        type: "46 Chỗ",
        licensePlates: "65A - 123456",
        startLocation: "Khu II Đại Học Cần Thơ",
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
        startLocation: "Khu II Đại Học Cần Thơ",
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
        startLocation: "Khu II Đại Học Cần Thơ",
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
        startLocation: "Khu II Đại Học Cần Thơ",
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
        startLocation: "Khu II Đại Học Cần Thơ",
        endLocation: "Khu Hòa An",
        startDay: "29/06/2022",
        endDay: "30/06/2022",
        status: "Từ Chối",
    },
];

function RentedCar() {
    const theme = useTheme();
    // const [rows, setRows] = useState<GridRowsProp>([])

    const status = [
        "Hoàn Thành",
        "Thành Công",
        "Chờ Xác Nhận",
        "Đã Hủy",
        "Từ Chối",
    ];
    // const type = ["Daily audit", "Audited by 5s"]
    const columns = [
        {
            field: "id",
            headerName: "STT",
            width: 50,
            sortable: false,
        },
        {
            field: "imageCar",
            headerName: Strings.RentedCar.IMAGE,
            description: Strings.RentedCar.IMAGE,
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <img
                        src={params.row.imageCar}
                        alt={params.row.imageCar}
                        style={{
                            width: "80px",
                            borderRadius: "10px",
                        }}
                    />
                );
            },
        },
        {
            field: "type",
            headerName: Strings.RentedCar.CAR_TYPE,
            description: Strings.RentedCar.CAR_TYPE,
            width: 100,
            sortable: false,
        },
        {
            field: "licensePlates",
            headerName: Strings.RentedCar.LICENSE_PLATES,
            description: Strings.RentedCar.LICENSE_PLATES,
            width: 120,
            sortable: false,
        },
        {
            field: "startLocation",
            headerName: Strings.RentedCar.START_LOCATION,
            description: Strings.RentedCar.START_LOCATION,
            width: 180,
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
            headerName: Strings.RentedCar.END_LOCATION,
            description: Strings.RentedCar.END_LOCATION,
            width: 180,
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
            field: "startDay",
            headerName: Strings.RentedCar.START_DAY,
            description: Strings.RentedCar.START_DAY,
            width: 110,
            sortable: false,
        },
        {
            field: "endDay",
            headerName: Strings.RentedCar.END_DAY,
            description: Strings.RentedCar.END_DAY,
            width: 110,
            sortable: false,
        },
        {
            field: "status",
            headerName: Strings.RentedCar.STATUS,
            description: Strings.RentedCar.STATUS,
            width: 120,
            sortable: false,
            renderCell: (params) => {
                let bgColor = "white";
                let textColor = "white";
                switch (params.value) {
                    case status[0]:
                        bgColor = "Blue";
                        break;
                    case status[1]:
                        bgColor = "green";
                        break;
                    case status[2]:
                        bgColor = "pink";
                        textColor = "black";
                        break;
                    case status[3]:
                        bgColor = "gray";
                        break;
                    case status[4]:
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
            headerName: Strings.RentedCar.UPDATE,
            description: Strings.RentedCar.UPDATE,
            width: 80,
            sortable: false,
            renderCell: (params) => {
                if (
                    params.row.status == status[1] ||
                    params.row.status == status[2]
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
            headerName: Strings.RentedCar.CANCEL,
            description: Strings.RentedCar.CANCEL,
            width: 50,
            sortable: false,
            renderCell: (params) => {
                if (
                    params.row.status == status[1] ||
                    params.row.status == status[2]
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
            headerName: Strings.RentedCar.REVIEW,
            description: Strings.RentedCar.REVIEW,
            width: 165,
            sortable: false,
            renderCell: (params) => {
                return (
                    params.row.status == status[0] && (
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

    return (
        <Box>
            <Typography variant="h6" component="div">
                {Strings.RentedCar.RENTED_CAR_LIST}
            </Typography>

            <DataGridCustom columns={columns} rows={rowsTest} />
        </Box>
    );
}

export default RentedCar;
