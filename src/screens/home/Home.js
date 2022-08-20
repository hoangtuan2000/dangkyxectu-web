import * as React from "react";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    List,
    ListItem,
    ListItemText,
    styled,
    Typography,
} from "@mui/material";
import { CardContainer } from "./HomeCustomStyles";
import NearMeIcon from "@mui/icons-material/NearMe";
import DialogCarInfo from "../../components/dialogCarInfo/DialogCarInfo";
import DialogCarRental from "../../components/dialogCarRental/DialogCarRental";

const data = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwhhFEsta01Sk0xhKOv41PbmJryOP_bPlSjg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIqvVFqLp_TvYGGHcFleqT8ldUtKWdYx0hxQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwhhFEsta01Sk0xhKOv41PbmJryOP_bPlSjg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIqvVFqLp_TvYGGHcFleqT8ldUtKWdYx0hxQ&usqp=CAU",
];

export default function Home() {
    const [openDialogCarInfo, setOpenDialogCarInfo] = React.useState(false);
    const [openDialogCarRental, setOpenDialogCarRental] = React.useState(false);

    const handleOpenDialogCarInfo = () => () => {
        setOpenDialogCarInfo(true);
    };

    const handleCloseDialogCarInfo = () => {
        setOpenDialogCarInfo(false);
    };

    const handleOpenDialogCarRental = () => () => {
        setOpenDialogCarRental(true);
        setOpenDialogCarInfo(false);
    };

    const handleCloseDialogCarRental = () => {
        setOpenDialogCarRental(false);
    };

    return (
        <Box>
            <Typography variant="h6" component="div">
                Danh sách xe
            </Typography>
            {data.map((srcImage, index) => {
                return (
                    <CardContainer
                        key={index}
                        onClick={handleOpenDialogCarInfo()}
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
                                    variant="h6"
                                    component="div"
                                >
                                    Xe 46 Chỗ
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

            <DialogCarInfo
                open={openDialogCarInfo}
                handleClose={handleCloseDialogCarInfo}
                handleOpenDialogCarRental={handleOpenDialogCarRental}
            />

            <DialogCarRental
                open={openDialogCarRental}
                handleClose={handleCloseDialogCarRental}
            />
        </Box>
    );
}
