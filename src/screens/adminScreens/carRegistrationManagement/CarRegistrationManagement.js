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
import DataGridCustom from "../../../components/dataGridCustom/DataGridCustom";
import Strings from "../../../constants/Strings";
import col from "./columnsCarRegistrationManagementDataGrid";

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
            startDay: "29/06/2022",
            endDay: "30/06/2022",
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
            startDay: "29/06/2022",
            endDay: "30/06/2022",
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
            startDay: "29/06/2022",
            endDay: "30/06/2022",
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
            startDay: "29/06/2022",
            endDay: "30/06/2022",
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
            startDay: "29/06/2022",
            endDay: "30/06/2022",
            status: "Từ Chối",
        },
    ];

function CarRegistrationManagement() {
    const theme = useTheme();

    const [value, setValue] = React.useState("Tất Cả");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Typography variant="h6" component="div">
                {Strings.CarRegistrationManagement.LIST_OF_VEHICLE_REGISTRATION}
            </Typography>

            {/* <Tabs
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
            </Tabs> */}

            <DataGridCustom
                columns={col()}
                rows={rowsTest}
                // {...dataInfo}
                // onChangePage={(e) => {
                //     handleChangePage(e);
                // }}
                // onChangeRowsPerPage={(e) => {
                //     handleChangeRowsPerPage(e);
                // }}
            />
        </Box>
    );
}

export default CarRegistrationManagement;
