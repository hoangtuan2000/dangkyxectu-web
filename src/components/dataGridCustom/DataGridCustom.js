import { Box, Pagination } from "@mui/material";
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
import Strings from "../../constants/Strings";

function DataGridCustom({ columns, rows, pageSize }) {
    const CustomNoRowsOverlay = () => {
        return (
            <Box>
                <p>{Strings.Common.NO_DATA}</p>
            </Box>
        );
    };

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
        <DataGrid
            columns={columns}
            rows={rows}
            autoHeight
            disableColumnMenu
            disableSelectionOnClick
            pageSize={pageSize ? pageSize : 10}
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
    );
}

export default DataGridCustom;
