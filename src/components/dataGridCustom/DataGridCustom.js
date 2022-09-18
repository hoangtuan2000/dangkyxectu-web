import {
    Box,
    FormControl,
    MenuItem,
    Pagination,
    Select,
    Stack,
} from "@mui/material";
import {
    DataGrid,
    gridPaginationRowRangeSelector,
    useGridApiContext,
    useGridSelector,
} from "@mui/x-data-grid";
import React from "react";
import Strings from "../../constants/Strings";

function DataGridCustom({
    columns,
    rows,
    pageSize,
    page,
    totalRows,
    onChangePage = () => {},
    onChangeRowsPerPage = () => {},
}) {
    const CustomNoRowsOverlay = () => {
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                }}
            >
                <p>{Strings.Common.NO_DATA}</p>
            </Box>
        );
    };

    const CustomPagination = () => {
        const apiRef = useGridApiContext();
        const rowRangeVisible = useGridSelector(
            apiRef,
            gridPaginationRowRangeSelector
        );

        const totalPage = Math.ceil(totalRows / pageSize) || 1;

        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    Số hàng hiển thị:
                    <FormControl
                        sx={{ minWidth: 60, marginLeft: "2px" }}
                        size="small"
                    >
                        <Select
                            value={pageSize}
                            onChange={(e) =>
                                onChangeRowsPerPage(e.target.value)
                            }
                            displayEmpty
                            sx={{
                                "& .MuiSelect-select": {
                                    paddingTop: "4px",
                                    paddingBottom: "4px",
                                    paddingLeft: "4px",
                                },
                            }}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={40}>40</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <span style={{ marginRight: "10px", marginLeft: "15px" }}>
                    {rowRangeVisible &&
                        `${rowRangeVisible?.firstRowIndex + 1} - ${
                            rowRangeVisible?.lastRowIndex + 1
                        } trên tổng ${totalRows} mẫu tin`}
                </span>
                <Stack spacing={2}>
                    <Pagination
                        showFirstButton
                        showLastButton
                        variant="outlined"
                        color="primary"
                        size="small"
                        siblingCount={1}
                        count={totalPage}
                        page={page}
                        onChange={(event, value) => {
                            onChangePage(value);
                        }}
                    />
                </Stack>
            </div>
        );
    };

    return (
        <DataGrid
            columns={columns}
            rows={rows}
            autoHeight
            disableColumnMenu
            disableSelectionOnClick
            pageSize={pageSize ? pageSize : 10}
            sx={{
                // ".MuiDataGrid-columnSeparator": {
                //     display: "none"
                // },
                ".MuiDataGrid-columnHeaderTitle": {
                    fontWeight: "bold",
                    fontSize: 14,
                },
                ".MuiDataGrid-cell": {
                    fontSize: 14,
                },
                "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
                    {
                        outline: "none",
                    },
            }}
            components={{
                Pagination: CustomPagination,
                NoRowsOverlay: CustomNoRowsOverlay,
            }}
        />
    );
}

export default DataGridCustom;
