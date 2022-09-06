import { useEffect } from "react";
import {
    Box,
    Button,
    CircularProgress,
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
import Strings from "../../constants/Strings";
import {
    ButtonStyled,
    CarTypeTitle,
    Img,
    ListContainer,
    TextContent,
    Title,
} from "./DialogCarInfoCustomStyles";
import CreateIcon from "@mui/icons-material/Create";

export default function DialogCarInfo({
    open,
    handleClose,
    handleOpenDialogCarRental,
    carData,
    carTypeData,
    carStatusData,
    carColorData,
    carBrandData,
    carScheduleList,
}) {
    const theme = useTheme();

    const type =
        carTypeData &&
        carData[0] &&
        carTypeData.filter((item) => {
            if (item.idCarType == carData[0].idCarType) {
                return item;
            }
        });
    const status =
        carStatusData &&
        carData[0] &&
        carStatusData.filter((item) => {
            if (item.idCarStatus == carData[0].idCarStatus) {
                return item;
            }
        });
    const color =
        carColorData &&
        carData[0] &&
        carColorData.filter((item) => {
            if (item.idCarColor == carData[0].idCarColor) {
                return item;
            }
        });
    const brand =
        carBrandData &&
        carData[0] &&
        carBrandData.filter((item) => {
            if (item.idCarBrand == carData[0].idCarBrand) {
                return item;
            }
        });

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll="body"
            fullWidth={true}
        >
            <Title>{Strings.Home.CAR_INFO}</Title>
            <DialogContent>
                {carData[0] ? (
                    <Box>
                        <Box sx={{ float: "left" }}>
                            <Img src={carData[0].image} />
                        </Box>
                        <Box sx={{ float: "left" }}>
                            <CarTypeTitle variant="p" component="div">
                                {type &&
                                    `${type[0].name} ${type[0].seatNumber} Chổ`}
                            </CarTypeTitle>
                            <TextContent variant="p" component="div">
                                {Strings.Home.LICENSE_PLATES}{" "}
                                {carData[0].licensePlates}
                            </TextContent>
                            <TextContent variant="p" component="div">
                                {Strings.Home.VEHICLE_CONDITION}{" "}
                                <span
                                    style={{
                                        fontWeight: "bold",
                                        color:
                                            status[0] &&
                                            status[0].idCarStatus == 2
                                                ? theme.palette.error.main
                                                : status[0].idCarStatus == 3
                                                ? theme.palette.warning.main
                                                : theme.palette.success.main,
                                    }}
                                >
                                    {status && status[0].name}
                                </span>
                            </TextContent>
                            <TextContent variant="p" component="div">
                                {Strings.Home.CAR_COLOR}{" "}
                                {color && color[0].name}
                            </TextContent>
                            <TextContent variant="p" component="div">
                                {Strings.Home.CAR_BRAND}{" "}
                                {brand && brand[0].name}
                            </TextContent>
                            <ButtonStyled
                                variant="contained"
                                size="small"
                                onClick={handleOpenDialogCarRental}
                            >
                                <CreateIcon
                                    fontSize="small"
                                    sx={{ marginRight: "5px" }}
                                />
                                Đăng Ký Lịch Trình
                            </ButtonStyled>
                        </Box>
                        <Box sx={{ clear: "both" }}></Box>
                        <Box>
                            <TextContent variant="p" component="div">
                                Lịch trình:
                            </TextContent>
                            {carScheduleList.length > 0 ? (
                                <ListContainer>
                                    {carScheduleList.map((val) => {
                                        const startDay =
                                            val.startDay &&
                                            new Date(
                                                val.startDay * 1000
                                            ).toLocaleDateString("en-GB");
                                        const endDay =
                                            val.endDay &&
                                            new Date(
                                                val.endDay * 1000
                                            ).toLocaleDateString("en-GB");
                                        return (
                                            <ListItem
                                                key={val.idSchedule}
                                                sx={{
                                                    padding: 0,
                                                    paddingLeft: 1,
                                                }}
                                            >
                                                <NearMeIcon
                                                    color="primary"
                                                    fontSize="small"
                                                    sx={{ marginRight: "5px" }}
                                                />
                                                <ListItemText
                                                    primary={val.reason}
                                                    secondary={`${startDay} - ${endDay}`}
                                                    primaryTypographyProps={{
                                                        fontSize: "13px",
                                                        fontWeight: "bold",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow:
                                                            "ellipsis",
                                                        color: theme.palette
                                                            .primary.main,
                                                    }}
                                                    secondaryTypographyProps={{
                                                        fontSize: "12px",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow:
                                                            "ellipsis",
                                                    }}
                                                />
                                            </ListItem>
                                        );
                                    })}
                                </ListContainer>
                            ) : (
                                <TextContent
                                    variant="p"
                                    component="div"
                                    sx={{
                                        color: theme.palette.success.main,
                                        fontWeight: "bold",
                                        marginLeft: 2,
                                    }}
                                >
                                    {Strings.Common.NO_SCHEDULE}
                                </TextContent>
                            )}
                        </Box>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
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
