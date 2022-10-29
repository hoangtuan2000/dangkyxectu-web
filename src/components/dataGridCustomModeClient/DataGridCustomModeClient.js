import { useState } from "react";
import { Box, FormControl, MenuItem, Pagination, Select } from "@mui/material";
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    gridPageSizeSelector,
    gridPaginationRowRangeSelector,
    gridVisibleRowCountSelector,
    useGridApiContext,
    useGridSelector,
} from "@mui/x-data-grid";
import { Stack } from "@mui/system";
import Strings from "../../constants/Strings";

function DataGridCustomModeClient({columns, rows}) {
    const [dataInfo, setDataInfo] = useState({
        page: 0,
        pageSize: 5,
    });

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

    const onChangePage = (e) => {
        setDataInfo({
            ...dataInfo,
            page: e - 1,
        });
    };

    const onChangeRowsPerPage = (e) => {
        setDataInfo({
            ...dataInfo,
            pageSize: e,
            page: 0
        });
    };

    const CustomPagination = () => {
        const apiRef = useGridApiContext();
        const rowRangeVisible = useGridSelector(
            apiRef,
            gridPaginationRowRangeSelector
        );
        const totalRows = useGridSelector(apiRef, gridVisibleRowCountSelector);
        const totalPage = useGridSelector(apiRef, gridPageCountSelector);
        const page = useGridSelector(apiRef, gridPageSelector);
        const pageSize = useGridSelector(apiRef, gridPageSizeSelector);

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
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
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
                        page={page + 1}
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
            pageSize={dataInfo.pageSize}
            page={dataInfo.page}
            autoHeight
            sx={{
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

export default DataGridCustomModeClient;
