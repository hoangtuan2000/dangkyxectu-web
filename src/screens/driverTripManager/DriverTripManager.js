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
import col from "./columnsDriverTripManagerDataGrid";

function DriverTripManager() {
    const theme = useTheme();

    const [value, setValue] = React.useState("Tất Cả");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Typography variant="h6" component="div">
                {Strings.DriverTripManager.TRIP_LIST}
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

            <DataGridCustom columns={col()} rows={[]} />
        </Box>
    );
}

export default DriverTripManager;
