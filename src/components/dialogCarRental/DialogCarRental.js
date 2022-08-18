import * as React from "react";
import {
    Box,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Radio,
    RadioGroup,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function DialogCarRental({ open, handleClose }) {
    return (
        <Dialog
            onClose={handleClose}
            open={open}
            sx={{ zIndex: 9999999 }}
            scroll="body"
            fullWidth={true}
        >
            <DialogTitle sx={{ textAlign: "center" }}>
                Form Đăng Ký Xe
            </DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        padding: "10px",
                    }}
                >
                    <Typography>Họ tên: Dương Hoàng Tuấn</Typography>
                    <Typography>Mã cán bộ: ABC123</Typography>
                    <TextField
                        label="Điểm đến"
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        label="--Chọn Thời Gian--"
                        variant="outlined"
                        size="small"
                        sx={{ float: "right" }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <IconButton>
                                        <CalendarMonthIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField label="Lý Do" variant="outlined" size="small" fullWidth />

                    <Typography>Thuê Tài Xế Lái</Typography>
                    <RadioGroup defaultValue="Có" row>
                        <FormControlLabel
                            value="Có"
                            control={<Radio />}
                            label="Có"
                        />
                        <FormControlLabel
                            value="Không"
                            control={<Radio />}
                            label="Không"
                        />
                    </RadioGroup>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="error">Hủy</Button>
                <Button>Đăng Ký</Button>
            </DialogActions>
        </Dialog>
    );
}
