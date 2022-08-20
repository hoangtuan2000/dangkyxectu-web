import {
    Box,
    Button,
    IconButton,
    Rating,
    Tooltip,
    useTheme,
} from "@mui/material";
import React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DataGridCustom from "../../components/dataGridCustom/DataGridCustom";
import Strings from "../../constants/Strings";

const rowsTest = [
    {
        id: 1,
        fullName: "Nguyễn Văn A",
        code: "TX123",
        numberPhone: "0123456789",
        license: "Hạng C",
        numberOfTrips: "20",
        status: "Hoạt Động",
    },
    {
        id: 2,
        fullName: "Nguyễn Văn A",
        code: "TX123",
        numberPhone: "0123456789",
        license: "Hạng C",
        numberOfTrips: "20",
        status: "Hoạt Động",
    },
    {
        id: 3,
        fullName: "Nguyễn Văn A",
        code: "TX123",
        numberPhone: "0123456789",
        license: "Hạng C",
        numberOfTrips: "20",
        status: "Hoạt Động",
    },
    {
        id: 4,
        fullName: "Nguyễn Văn A",
        code: "TX123",
        numberPhone: "0123456789",
        license: "Hạng C",
        numberOfTrips: "20",
        status: "Ngừng Hoạt Động",
    },
    {
        id: 5,
        fullName: "Nguyễn Văn A",
        code: "TX123",
        numberPhone: "0123456789",
        license: "Hạng C",
        numberOfTrips: "20",
        status: "Hoạt Động",
    },
];

function DriverManagement() {
    const theme = useTheme();
    // const [rows, setRows] = useState<GridRowsProp>([])

    const status = ["Hoạt Động", "Ngừng Hoạt Động"];

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
            width: 150,
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
            width: 110,
            sortable: false,
        },
        {
            field: "numberPhone",
            headerName: Strings.Common.NUMBER_PHONE,
            description: Strings.Common.NUMBER_PHONE,
            width: 120,
            sortable: false,
        },
        {
            field: "license",
            headerName: Strings.Common.LICENSE,
            description: Strings.Common.LICENSE,
            width: 140,
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
                        bgColor = "green";
                        break;
                    case status[1]:
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
                startIcon={<PersonAddIcon />}
            >
                {Strings.DriverManagement.ADD_DRIVER}
            </Button>
            <DataGridCustom columns={columns} rows={rowsTest} />
        </Box>
    );
}

export default DriverManagement;
