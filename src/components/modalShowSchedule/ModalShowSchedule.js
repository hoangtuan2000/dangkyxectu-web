import {
    Autocomplete,
    Box,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    Modal,
    Rating,
    TextField,
    Tooltip,
    useTheme,
} from "@mui/material";
import Strings from "../../constants/Strings";
import {
    BoxLeft,
    BoxRight,
    ButtonFeatures,
    CarTypeTitle,
    Img,
    ModalContainer,
    TextContent,
    TextInput,
    Title,
} from "./ModalShowScheduleCustomStyles";
import CommentIcon from '@mui/icons-material/Comment';
import NearMeIcon from "@mui/icons-material/NearMe";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { GlobalService } from "../../services/GlobalServices";
import ModalError from "../modalError/ModalError";
import Constants from "../../constants/Constants";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import helper from "../../common/helper";

const ModalShowSchedule = ({ open, handleClose }) => {
    const theme = useTheme();

    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    return (
        <Modal open={open} onClose={handleClose}>
            <ModalContainer
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    borderRadius: 5,
                    boxShadow: 24,
                    p: 3,
                    paddingTop: 2,
                }}
            >
                <Title>{Strings.ModalShowSchedule.TITLE} (Số: 1355654)</Title>

                <Box>
                    <BoxLeft>
                        <Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_2t7Pp8BRna5qfuUGHcR5zAbCtvhacY6tYw&usqp=CAU" />
                    </BoxLeft>
                    <BoxRight>
                        <CarTypeTitle variant="p" component="div">
                            Xe Khach 46 Cho
                        </CarTypeTitle>
                        <TextContent variant="p" component="div">
                            {Strings.RentedCar.LICENSE_PLATES}
                            <Tooltip
                                title={
                                    "a"
                                }
                                arrow
                            >
                                <span>
                                    a
                                </span>
                            </Tooltip>
                        </TextContent>
                        <TextContent variant="p" component="div">
                            {Strings.RentedCar.CAR_BRAND}
                            <Tooltip
                                title={
                                    "a"
                                }
                                arrow
                            >
                                <span>
                                    a
                                </span>
                            </Tooltip>
                        </TextContent>
                        <TextContent variant="p" component="div">
                            {Strings.RentedCar.USER_INFO}
                            <Tooltip
                                title={
                                    "sdfsgdfgh fgjdfg dghdfg odfjgdf hfgkjhkjdfgk sdfdkjgjdgfjk sdhfidhf AAAAAA"
                                }
                                arrow
                            >
                                <span>
                                    sdfsgdfgh fgjdfg dghdfg odfjgdf hfgkjhkjdfgk
                                    sdfdkjgjdgfjk sdhfidhf AAAAAA
                                </span>
                            </Tooltip>
                        </TextContent>
                        <TextContent variant="p" component="div">
                            {Strings.RentedCar.DRIVER_INFO}
                            <Tooltip
                                title={
                                    "sdfsgdfgh fgjdfg dghdfg odfjgdf hfgkjhkjdfgk sdfdkjgjdgfjk sdhfidhf AAAAAA"
                                }
                                arrow
                            >
                                <span>
                                    sdfsgdfgh fgjdfg dghdfg odfjgdf hfgkjhkjdfgk
                                    sdfdkjgjdgfjk sdhfidhf AAAAAA
                                </span>
                            </Tooltip>
                        </TextContent>
                        <TextContent variant="p" component="div">
                            {Strings.RentedCar.TIME}
                            <Tooltip
                                title={
                                    "a"
                                }
                                arrow
                            >
                                <span>
                                    a
                                </span>
                            </Tooltip>
                        </TextContent>
                        <TextContent variant="p" component="div">
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                {Strings.RentedCar.REVIEW}
                                <Rating
                                    defaultValue={2.5}
                                    precision={0.5}
                                    size="small"
                                    onChange={(e, val) => {
                                        console.log("e", e);
                                        console.log("val", val);
                                    }}
                                />
                            </Box>
                        </TextContent>
                        <TextInput
                            placeholder={Strings.RentedCar.COMMENT}
                            label={Strings.RentedCar.COMMENT}
                            variant="outlined"
                            size="small"
                            multiline
                            rows={2}
                            // value={dataSendApi.phone || ""}
                            // onChange={(e) => handleChangePhone(e)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <CommentIcon
                                            sx={{
                                                color: theme.palette.text.primary,
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </BoxRight>

                    <Box sx={{ clear: "both" }}></Box>
                    <Box>
                        <TextContent variant="p" component="div">
                            {Strings.RentedCar.SCHEDULE}
                        </TextContent>
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
                                    color="primary"
                                    fontSize="small"
                                    sx={{
                                        marginRight: "5px",
                                    }}
                                />
                                <ListItemText
                                    primary={"Điểm xuất phát:"}
                                    secondary={"Khu II Đại Học Cần Thơ"}
                                    primaryTypographyProps={{
                                        fontSize: "13px",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        color: theme.palette.primary.main,
                                    }}
                                    secondaryTypographyProps={{
                                        fontSize: "12px",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                />
                            </ListItem>

                            <ListItem
                                sx={{
                                    padding: "0px",
                                }}
                            >
                                <LocationOnIcon
                                    color="primary"
                                    fontSize="small"
                                    sx={{
                                        marginRight: "5px",
                                    }}
                                />
                                <ListItemText
                                    primary={"Điểm kết thúc:"}
                                    secondary={"Sóc Trăng"}
                                    primaryTypographyProps={{
                                        fontSize: "13px",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        color: theme.palette.primary.main,
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
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: 4,
                    }}
                >
                    <ButtonFeatures
                        size="small"
                        variant="contained"
                        endIcon={<CancelIcon />}
                        color="error"
                        sx={{ marginRight: 1 }}
                        onClick={handleClose}
                    >
                        {Strings.Common.CANCEL}
                    </ButtonFeatures>
                    <ButtonFeatures
                        size="small"
                        variant="contained"
                        endIcon={<CheckCircleIcon />}
                        color="primary"
                        sx={{ marginRight: 1 }}
                        // onClick={handleConfirm}
                    >
                        {Strings.Common.UPDATE}
                    </ButtonFeatures>
                </Box>

                <ModalError
                    open={modalError.open}
                    handleClose={() =>
                        setModalError({ ...modalError, open: false })
                    }
                    content={modalError.content}
                    title={modalError.title}
                />
            </ModalContainer>
        </Modal>
    );
};

export default ModalShowSchedule;
