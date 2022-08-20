import {
    Box,
    Button,
    IconButton,
    Pagination,
    Rating,
    Tab,
    Tabs,
    Tooltip,
    useTheme,
} from "@mui/material";
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    gridPaginationRowRangeSelector,
    gridRowCountSelector,
    useGridApiContext,
    useGridSelector,
} from "@mui/x-data-grid";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Strings from "../../constants/Strings";
import DataGridCustom from "../../components/dataGridCustom/DataGridCustom";

const rowsTest = [
    {
        id: 1,
        imageCar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
        carBrand: "Honda",
        type: "46 Chỗ",
        licensePlates: "65A - 123456",
        numberOfTrips: "20",
        numberOfFailures: "1",
        status: "Hoạt Động",
        license: "Còn Hạn",
    },
    {
        id: 2,
        imageCar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
        carBrand: "Honda",
        type: "46 Chỗ",
        licensePlates: "65A - 123456",
        numberOfTrips: "20",
        numberOfFailures: "1",
        status: "Đang Bảo Trì",
        license: "Còn Hạn",
    },
    {
        id: 3,
        imageCar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
        carBrand: "Honda",
        type: "46 Chỗ",
        licensePlates: "65A - 123456",
        numberOfTrips: "20",
        numberOfFailures: "1",
        status: "Hỏng Hóc",
        license: "Hết Hạn",
    },
    {
        id: 4,
        imageCar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
        carBrand: "Honda",
        type: "46 Chỗ",
        licensePlates: "65A - 123456",
        numberOfTrips: "20",
        numberOfFailures: "1",
        status: "Ngừng Hoạt Động",
        license: "Còn Hạn",
    },
    {
        id: 5,
        imageCar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
        carBrand: "Honda",
        type: "46 Chỗ",
        licensePlates: "65A - 123456",
        numberOfTrips: "20",
        numberOfFailures: "1",
        status: "Hoạt Động",
        license: "Còn Hạn",
    },
];

function CarManager() {
    const theme = useTheme();
    // const [rows, setRows] = useState<GridRowsProp>([])

    const [value, setValue] = React.useState("Tất Cả");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const status = ["Hoạt Động", "Đang Bảo Trì", "Hỏng Hóc", "Ngừng Hoạt Động"];
    const statusLicense = ["Còn Hạn", "Hết Hạn"];
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
            headerName: Strings.Common.IMAGE,
            description: Strings.Common.IMAGE,
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
            field: "carBrand",
            headerName: Strings.Common.BRAND,
            description: Strings.Common.BRAND,
            width: 120,
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
            width: 100,
            sortable: false,
        },
        {
            field: "licensePlates",
            headerName: Strings.Common.LICENSE_PLATES,
            description: Strings.Common.LICENSE_PLATES,
            width: 120,
            sortable: false,
        },
        {
            field: "numberOfTrips",
            headerName: Strings.Common.NUMBER_OF_TRIPS,
            description: Strings.Common.NUMBER_OF_TRIPS,
            width: 110,
            sortable: false,
        },
        {
            field: "numberOfFailures",
            headerName: Strings.Common.NUMBER_OF_FAILURES,
            description: Strings.Common.NUMBER_OF_FAILURES,
            width: 140,
            sortable: false,
        },
        {
            field: "status",
            headerName: Strings.Common.STATUS,
            description: Strings.Common.STATUS,
            width: 125,
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
                        bgColor = "red";
                        break;
                    case status[3]:
                        bgColor = "gray";
                        break;
                }
                return (
                    <Box
                        style={{
                            width: "110px",
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
                let bgColor = "white";
                let textColor = "white";
                switch (params.value) {
                    case statusLicense[0]:
                        bgColor = "gray";
                        break;
                    case statusLicense[1]:
                        bgColor = "red";
                        break;
                }
                return (
                    <Box
                        style={{
                            width: "80px",
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
                if (params.row.status != status[3]) {
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
            <Button
                variant="contained"
                sx={{
                    marginBottom: "10px",
                    backgroundColor: theme.palette.success.main,
                }}
                startIcon={<DirectionsCarIcon />}
            >
                {Strings.CarManager.ADD_CAR}
            </Button>

            <Tabs
                value={value}
                onChange={handleChange}
                sx={{ marginBottom: "10px" }}
            >
                <Tab value="Tất Cả" label="Tất Cả" wrapped />
                <Tab value="Xe 4 Chỗ" label="Xe 4 Chỗ" />
                <Tab value="Xe 16 Chỗ" label="Xe 16 Chỗ" />
                <Tab value="Xe 32 Chỗ" label="Xe 32 Chỗ" />
            </Tabs>

            <DataGridCustom columns={columns} rows={rowsTest} />
        </Box>
    );
}

export default CarManager;
