import {
    Box,
    IconButton,
    Rating,
    Tab,
    Tabs,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DataGridCustom from "../../../components/dataGridCustom/DataGridCustom";
import Strings from "../../../constants/Strings";

const rowsTest = [
    {
        id: 1,
        type: "46 Chỗ",
        fullName: "Dương Hoàng Tuấn - B1809315",
        code: "B1809315",
        numberPhone: "0123456789",
        licensePlates: "65A-123456",
        startLocation: "Khu II Đại Học Cần Thơ",
        endLocation: "Khu Hòa An",
        startDay: "29/06/2022",
        endDay: "30/06/2022",
        status: "Hoàn Thành",
    },
    {
        id: 2,
        type: "46 Chỗ",
        fullName: "Dương Hoàng Tuấn - B1809315",
        code: "B1809315",
        numberPhone: "0123456789",
        licensePlates: "65A-123456",
        startLocation: "Khu II Đại Học Cần Thơ",
        endLocation: "Khu Hòa An",
        startDay: "29/06/2022",
        endDay: "30/06/2022",
        status: "Thành Công",
    },
    {
        id: 3,
        type: "46 Chỗ",
        fullName: "Dương Hoàng Tuấn - B1809315",
        code: "B1809315",
        numberPhone: "0123456789",
        licensePlates: "65A-123456",
        startLocation: "Khu II Đại Học Cần Thơ",
        endLocation: "Khu Hòa An",
        startDay: "29/06/2022",
        endDay: "30/06/2022",
        status: "Chờ Xác Nhận",
    },
    {
        id: 4,
        type: "46 Chỗ",
        fullName: "Dương Hoàng Tuấn - B1809315",
        code: "B1809315",
        numberPhone: "0123456789",
        licensePlates: "65A-123456",
        startLocation: "Khu II Đại Học Cần Thơ",
        endLocation: "Khu Hòa An",
        startDay: "29/06/2022",
        endDay: "30/06/2022",
        status: "Đã Hủy",
    },
    {
        id: 5,
        type: "46 Chỗ",
        fullName: "Dương Hoàng Tuấn - B1809315",
        code: "B1809315",
        numberPhone: "0123456789",
        licensePlates: "65A-123456",
        startLocation: "Khu II Đại Học Cần Thơ",
        endLocation: "Khu Hòa An",
        startDay: "29/06/2022",
        endDay: "30/06/2022",
        status: "Từ Chối",
    },
];

function TripManager() {
    const theme = useTheme();
    // const [rows, setRows] = useState<GridRowsProp>([])

    const [value, setValue] = React.useState("Tất Cả");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
            field: "fullName",
            headerName: Strings.Common.FULL_NAME,
            description: Strings.Common.FULL_NAME,
            width: 180,
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
            field: "numberPhone",
            headerName: Strings.Common.NUMBER_PHONE,
            description: Strings.Common.NUMBER_PHONE,
            width: 120,
            sortable: false,
        },
        {
            field: "type",
            headerName: Strings.Common.CAR_TYPE,
            description: Strings.Common.CAR_TYPE,
            width: 80,
            sortable: false,
        },
        {
            field: "licensePlates",
            headerName: Strings.Common.LICENSE_PLATES,
            description: Strings.Common.LICENSE_PLATES,
            width: 110,
            sortable: false,
        },
        {
            field: "startLocation",
            headerName: Strings.Common.START_LOCATION,
            description: Strings.Common.START_LOCATION,
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
            headerName: Strings.Common.END_LOCATION,
            description: Strings.Common.END_LOCATION,
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
            headerName: Strings.Common.START_DAY,
            description: Strings.Common.START_DAY,
            width: 110,
            sortable: false,
        },
        {
            field: "endDay",
            headerName: Strings.Common.END_DAY,
            description: Strings.Common.END_DAY,
            width: 110,
            sortable: false,
        },
        {
            field: "status",
            headerName: Strings.Common.STATUS,
            description: Strings.Common.STATUS,
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
            field: "reviews",
            headerName: Strings.Common.REVIEW,
            description: Strings.Common.REVIEW,
            width: 165,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Rating name="read-only" value={2} readOnly size="small" />
                );
            },
        },
    ];

    return (
        <Box>
            <Typography variant="h6" component="div">
                {Strings.TripManager.TRIP_LIST}
            </Typography>

            <Tabs
                value={value}
                onChange={handleChange}
                sx={{ marginBottom: "10px" }}
            >
                <Tab value="Tất Cả" label="Tất Cả" />
                <Tab value="Chuyến Đi Ngày Mai" label="Chuyến Đi Ngày Mai" />
                <Tab value="Hoàn Thành" label="Hoàn Thành" />
            </Tabs>

            <DataGridCustom columns={columns} rows={rowsTest} />
        </Box>
    );
}

export default TripManager;
