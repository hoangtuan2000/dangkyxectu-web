import {
    Box,
    IconButton,
    Tab,
    Tabs,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DataGridCustom from "../../components/dataGridCustom/DataGridCustom";
import Strings from "../../constants/Strings";

const rowsTest = [
    {
        id: 1,
        type: "46 Chỗ",
        fullName: "Dương Hoàng Tuấn - B1809315",
        code: "B1809315",
        department: "Công Nghệ Thông Tin & Truyền Thông",
        startLocation: "Khu II Đại Học Cần Thơ",
        endLocation: "Khu Hòa An",
        reason: "Dự hội thảo tại Trường ABC DEF",
        startTime: "29/06/2022",
        endTime: "30/06/2022",
        status: "Hoàn Thành",
    },
    {
        id: 2,
        type: "46 Chỗ",
        fullName: "Dương Hoàng Tuấn - B1809315",
        code: "B1809315",
        department: "Công Nghệ Thông Tin & Truyền Thông",
        startLocation: "Khu II Đại Học Cần Thơ",
        endLocation: "Khu Hòa An",
        reason: "Dự hội thảo tại Trường ABC DEF",
        startTime: "29/06/2022",
        endTime: "30/06/2022",
        status: "Thành Công",
    },
    {
        id: 3,
        type: "46 Chỗ",
        fullName: "Dương Hoàng Tuấn - B1809315",
        code: "B1809315",
        department: "Công Nghệ Thông Tin & Truyền Thông",
        startLocation: "Khu II Đại Học Cần Thơ",
        endLocation: "Khu Hòa An",
        reason: "Dự hội thảo tại Trường ABC DEF",
        startTime: "29/06/2022",
        endTime: "30/06/2022",
        status: "Chờ Xác Nhận",
    },
    {
        id: 4,
        type: "46 Chỗ",
        fullName: "Dương Hoàng Tuấn - B1809315",
        code: "B1809315",
        department: "Công Nghệ Thông Tin & Truyền Thông",
        startLocation: "Khu II Đại Học Cần Thơ",
        endLocation: "Khu Hòa An",
        reason: "Dự hội thảo tại Trường ABC DEF",
        startTime: "29/06/2022",
        endTime: "30/06/2022",
        status: "Đã Hủy",
    },
    {
        id: 5,
        type: "46 Chỗ",
        fullName: "Dương Hoàng Tuấn - B1809315",
        code: "B1809315",
        department: "Công Nghệ Thông Tin & Truyền Thông",
        startLocation: "Khu II Đại Học Cần Thơ",
        endLocation: "Khu Hòa An",
        reason: "Dự hội thảo tại Trường ABC DEF",
        startTime: "29/06/2022",
        endTime: "30/06/2022",
        status: "Từ Chối",
    },
];

function CarRentalManager() {
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
            headerName: "Họ Tên - Mã Cán Bộ",
            description: "Họ Tên - Mã Cán Bộ",
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
            field: "department",
            headerName: "Thuộc Khoa",
            description: "Thuộc Khoa",
            width: 180,
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
        {
            field: "type",
            headerName: "Thuê Xe",
            description: "Thuê Xe",
            width: 100,
            sortable: false,
        },
        {
            field: "startLocation",
            headerName: "Vị trí Bắt Đầu",
            description: "Vị trí Bắt Đầu",
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
            headerName: "Vị trí Kết Thúc",
            description: "Vị trí Kết Thúc",
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
            field: "reason",
            headerName: "Lý Do",
            description: "Lý Do",
            width: 180,
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
            field: "startTime",
            headerName: "ngày đi",
            description: "ngày đi",
            width: 110,
            sortable: false,
        },
        {
            field: "endTime",
            headerName: "ngày về",
            description: "ngày về",
            width: 110,
            sortable: false,
        },
        {
            field: "status",
            headerName: "trạng thái",
            description: "trạng thái",
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
            headerName: "cập nhật",
            description: "cập nhật",
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
                }
            },
        },
    ];

    return (
        <Box>
            <Typography variant="h6" component="div">
                {Strings.CarRentalManager.CAR_RENTAL_LIST}
            </Typography>

            <Tabs
                value={value}
                onChange={handleChange}
                sx={{ marginBottom: "10px" }}
            >
                <Tab value="Tất Cả" label="Tất Cả" wrapped />
                <Tab value="Hoàn Thành" label="Hoàn Thành" />
                <Tab value="Thành Công" label="Thành Công" />
                <Tab value="Chờ Xác Nhận" label="Chờ Xác Nhận" />
                <Tab value="Từ Chối" label="Từ Chối" />
                <Tab value="Hủy" label="Hủy" />
            </Tabs>

            <DataGridCustom columns={columns} rows={rowsTest} />
        </Box>
    );
}

export default CarRentalManager;
