import {
    Box,
    Button,
    IconButton,
    Pagination,
    Rating,
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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const CustomNoRowsOverlay = () => {
    return (
        <Box>
            <p>Không có dữ liệu</p>
        </Box>
    );
};

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
            headerName: "Họ Tên",
            description: "Họ Tên",
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
            headerName: "Mã Tài Xế",
            description: "Mã Tài Xế",
            width: 110,
            sortable: false,
        },
        {
            field: "numberPhone",
            headerName: "Số Điện Thoại",
            description: "Số Điện Thoại",
            width: 120,
            sortable: false,
        },
        {
            field: "license",
            headerName: "Giấy Phép Lái Xe",
            description: "Giấy Phép Lái Xe",
            width: 140,
            sortable: false,
        },
        {
            field: "numberOfTrips",
            headerName: "Số Chuyến Đi",
            description: "Số Chuyến Đi",
            width: 110,
            sortable: false,
        },
        {
            field: "reviews",
            headerName: "đánh giá",
            description: "đánh giá",
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
            headerName: "trạng thái",
            description: "trạng thái",
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
            headerName: "cập nhật",
            description: "cập nhật",
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

    const CustomPagination = () => {
        const apiRef = useGridApiContext();
        const page = useGridSelector(apiRef, gridPageSelector);
        const pageCount = useGridSelector(apiRef, gridPageCountSelector);
        const rowRangeVisible = useGridSelector(
            apiRef,
            gridPaginationRowRangeSelector
        );
        const totalRows = useGridSelector(apiRef, gridRowCountSelector);

        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "15px" }}>
                    {rowRangeVisible &&
                        `${rowRangeVisible?.firstRowIndex + 1} - ${
                            rowRangeVisible?.lastRowIndex + 1
                        } trên tổng ${totalRows} mẫu tin`}
                </span>
                <Pagination
                    showFirstButton
                    showLastButton
                    color="primary"
                    shape="rounded"
                    // count={auditData?.totalPages}
                    // page={auditData?.currentPage}
                    count={pageCount}
                    page={page + 1}
                    onChange={(event, value) => {
                        apiRef.current.setPage(value - 1);
                    }}
                />
            </div>
        );
    };

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
                Thêm Tài Xế
            </Button>
            <DataGrid
                columns={columns}
                rows={rowsTest}
                autoHeight
                disableColumnMenu
                disableSelectionOnClick
                pageSize={5}
                // sx={{
                //     ".MuiDataGrid-columnSeparator": {
                //         display: "none"
                //     },
                //     ".MuiDataGrid-columnHeaderTitle": {
                //         fontWeight: "bold",
                //         fontSize: Constants.Styles.FONT_SIZE_SMALL
                //     },
                //     ".MuiDataGrid-cell": {
                //         fontSize: Constants.Styles.FONT_SIZE_SMALL
                //     },
                //     "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus": {
                //         outline: "none",
                //     },
                // }}
                components={{
                    Pagination: CustomPagination,
                    NoRowsOverlay: CustomNoRowsOverlay,
                }}
            />
        </Box>
    );
}

export default DriverManagement;
