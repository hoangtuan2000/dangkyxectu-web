import * as React from "react";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    List,
    ListItem,
    ListItemText,
    styled,
    Typography,
    useTheme,
} from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";

const data = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwhhFEsta01Sk0xhKOv41PbmJryOP_bPlSjg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIqvVFqLp_TvYGGHcFleqT8ldUtKWdYx0hxQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwhhFEsta01Sk0xhKOv41PbmJryOP_bPlSjg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIqvVFqLp_TvYGGHcFleqT8ldUtKWdYx0hxQ&usqp=CAU",
];

const CardContainer = styled(Card)(({ theme }) => ({
    float: "left",
    margin: "5px",
    [theme.breakpoints.up("xs")]: {
        maxWidth: 240,
    },
    [theme.breakpoints.up("mobileS")]: {
        maxWidth: 250,
    },
    [theme.breakpoints.up("mobileM")]: {
        maxWidth: 310,
    },
    [theme.breakpoints.up("mobileL")]: {
        maxWidth: 365,
        width: 365,
    },
    [theme.breakpoints.up("sm")]: {
        maxWidth: 230,
    },
    [theme.breakpoints.up("md")]: {
        maxWidth: 234,
    },
    [theme.breakpoints.up("lg")]: {
        maxWidth: 267,
    },
    [theme.breakpoints.up("xl")]: {
        maxWidth: 200,
    },
}));

export default function Home() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box>
            {data.map((srcImage, index) => {
                return (
                    <CardContainer
                        key={index}
                        onClick={handleClickOpen()}
                        data-aos="zoom-in"
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                alt="green iguana"
                                src={srcImage}
                            />
                            <CardContent>
                                <Typography
                                    // gutterBottom
                                    variant="h6"
                                    component="div"
                                >
                                    Xe 46 chổ
                                </Typography>
                                <Typography variant="p" component="div">
                                    Biển số: 65A-123456
                                </Typography>
                                <Typography variant="p" component="div">
                                    Tình trạng: bình thường
                                </Typography>
                                <Typography variant="p" color="text.secondary">
                                    Lịch trình:
                                </Typography>
                                <List
                                    sx={{
                                        width: "100%",
                                        // maxWidth: 360,
                                        bgcolor: "background.paper",
                                        padding: "0px",
                                    }}
                                >
                                    <ListItem
                                        sx={{
                                            padding: "0px",
                                        }}
                                    >
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
                            </CardContent>
                        </CardActionArea>
                    </CardContainer>
                );
            })}

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
                        <Button variant="contained" size="small">
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
        </Box>
    );
}
