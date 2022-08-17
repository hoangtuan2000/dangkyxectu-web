import * as React from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";

export default function DialogCarInfo({
    open,
    handleClose,
    handleOpenDialogCarRental,
}) {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll="body"
            fullWidth={true}
        >
            <DialogTitle>Thông Tin Xe</DialogTitle>
            <DialogContent>
                <Box>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU"
                        style={{
                            float: "left",
                            width: "200px",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "10px",
                            marginRight: "10px",
                        }}
                    />
                </Box>
                <Box>
                    <Typography variant="p" component="div">
                        Xe 16 chỗ
                    </Typography>
                    <Typography variant="p" component="div">
                        Biển số: 65A-12345
                    </Typography>
                    <Typography variant="p" component="div">
                        Tình trạng: Hoạt Động
                    </Typography>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleOpenDialogCarRental()}
                    >
                        Đăng Ký Lịch Trình
                    </Button>
                    <Typography variant="p" component="div">
                        Lịch trình:
                    </Typography>
                    <List
                        sx={{
                            bgcolor: "background.paper",
                            padding: "0px",
                            float: "left",
                            borderRadius: "10px",
                        }}
                    >
                        <ListItem>
                            <NearMeIcon
                                fontSize="small"
                                sx={{ marginRight: "5px" }}
                            />
                            <ListItemText
                                primary="Đại Học Cần Thơ AAA SFD SDFD AA AA AA AA"
                                secondary="01/01/2022 - 03/01/2022"
                                primaryTypographyProps={{
                                    fontSize: "13px",
                                    fontWeight: "bold",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                                secondaryTypographyProps={{
                                    fontSize: "12px",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            />
                        </ListItem>
                    </List>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    sx={{ color: theme.palette.error.light }}
                >
                    Thoát
                </Button>
            </DialogActions>
        </Dialog>
    );
}
