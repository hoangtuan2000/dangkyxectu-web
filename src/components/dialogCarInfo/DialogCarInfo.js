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
import { Link, useNavigate } from "react-router-dom";
import RoutesPath from "../../constants/RoutesPath";
import helper from "../../common/helper";

export default function DialogCarInfo({
    open,
    handleClose,
    // handleOpenDialogCarRental,
    carData,
    carTypeData,
    carStatusData,
    carColorData,
    carBrandData,
    carScheduleList,
}) {
    const theme = useTheme();
    let navigate = useNavigate();

    const type =
        carTypeData &&
        carData &&
        carData[0] &&
        carTypeData.filter((item) => {
            if (item.idCarType == carData[0].idCarType) {
                return item;
            }
        });
    const status =
        carStatusData &&
        carData &&
        carData[0] &&
        carStatusData.filter((item) => {
            if (item.idCarStatus == carData[0].idCarStatus) {
                return item;
            }
        });
    const color =
        carColorData &&
        carData &&
        carData[0] &&
        carColorData.filter((item) => {
            if (item.idCarColor == carData[0].idCarColor) {
                return item;
            }
        });
    const brand =
        carBrandData &&
        carData &&
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
                {carData && carData[0] ? (
                    <Box>
                        <Box sx={{ float: "left" }}>
                            <Img src={carData[0].image} />
                        </Box>
                        <Box sx={{ float: "left" }}>
                            <CarTypeTitle variant="p" component="div">
                                {type &&
                                    `${type[0].name} ${type[0].seatNumber} Ch???`}
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
                                onClick={() =>
                                    navigate(
                                        RoutesPath.RENTAL_CAR +
                                            `/${carData[0].idCar}`
                                    )
                                }
                            >
                                <CreateIcon
                                    fontSize="small"
                                    sx={{ marginRight: "5px" }}
                                />
                                ????ng K?? L???ch Tr??nh
                            </ButtonStyled>
                        </Box>
                        <Box sx={{ clear: "both" }}></Box>
                        <Box>
                            <TextContent variant="p" component="div">
                                L???ch tr??nh:
                            </TextContent>
                            {carScheduleList.length > 0 ? (
                                <ListContainer>
                                    {carScheduleList.map((val) => {
                                        const startDate =
                                            val.startDate &&
                                            helper.formatDateStringFromTimeStamp(
                                                val.startDate
                                            );
                                        const endDate =
                                            val.endDate &&
                                            helper.formatDateStringFromTimeStamp(
                                                val.endDate
                                            );
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
                                                    secondary={`${startDate} - ${endDate}`}
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
                    Tho??t
                </Button>
            </DialogActions>
        </Dialog>
    );
}
