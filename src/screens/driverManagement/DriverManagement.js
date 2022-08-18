import {
    Box,
    Button,
    IconButton,
    Pagination,
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
        name: "hình",
        type: "46 chổ",
        description: "65A - 123456",
        startTime: "29/06/2022 07:00",
        endTime: "30/06/2022 06:59",
        status: "Deleted",
    },
    {
        id: 2,
        name: "hình",
        type: "46 chổ",
        description: "65A - 123456",
        startTime: "29/06/2022 07:00",
        endTime: "30/06/2022 06:59",
        status: "New",
    },
    {
        id: 3,
        name: "hình",
        type: "46 chổ",
        description: "65A - 123456",
        startTime: "29/06/2022 07:00",
        endTime: "30/06/2022 06:59",
        status: "Auditing",
    },
    {
        id: 4,
        name: "hình",
        type: "46 chổ",
        description: "65A - 123456",
        startTime: "29/06/2022 07:00",
        endTime: "30/06/2022 06:59",
        status: "Completed",
    },
    {
        id: 5,
        name: "hình",
        type: "46 chổ",
        description: "65A - 123456",
        startTime: "29/06/2022 07:00",
        endTime: "30/06/2022 06:59",
        status: "Expired",
    },
];

function DriverManagement() {
    const theme = useTheme();
    // const [rows, setRows] = useState<GridRowsProp>([])

    const status = ["Deleted", "New", "Auditing", "Completed", "Expired"];
    // const type = ["Daily audit", "Audited by 5s"]
    const columns = [
        {
            field: "id",
            headerName: "STT",
            width: 50,
            sortable: false,
        },
        {
            field: "name",
            headerName: "Mã",
            description: "Mã",
            width: 100,
            sortable: false,
        },
        {
            field: "type",
            headerName: "Họ Tên",
            description: "Họ Tên",
            width: 120,
            sortable: false,
        },
        {
            field: "description",
            headerName: "Giấy Phép Lái Xe",
            description: "Giấy Phép Lái Xe",
            width: 180,
            sortable: false,
        },
        {
            field: "status",
            headerName: "Số Điện Thoại",
            description: "Số Điện Thoại",
            width: 165,
            sortable: false,
            renderCell: (params) => {
                let bgColor = "white";
                let textColor = "white";
                switch (params.value) {
                    case status[0]:
                        bgColor = "red";
                        break;
                    case status[1]:
                        textColor = "black";
                        break;
                    case status[2]:
                        bgColor = "green";
                        break;
                    case status[3]:
                        bgColor = "blue";
                        break;
                    case status[4]:
                        bgColor = "gray";
                        break;
                }
                return (
                    <>
                        <Box
                            sx={{
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
            field: "total",
            headerName: "Tổng Số Chuyến Đi",
            description: "Tổng Số Chuyến Đi",
            width: 180,
            sortable: false,
        },
        {
            field: "reviews",
            headerName: "Đánh Giá",
            description: "Đánh Giá",
            width: 180,
            sortable: false,
        },
        {
            field: "update",
            headerName: "Cập Nhật",
            description: "Cập Nhật",
            width: 165,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title="Xem chi tiết" arrow>
                        <IconButton color="primary">
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                );
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
                pageSize={2}
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
