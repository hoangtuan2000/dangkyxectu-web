import { useState, useEffect } from "react";
import {
    Box,
    DialogActions,
    DialogContent,
    List,
    ListItem,
    ListItemText,
    Tooltip,
    useTheme,
} from "@mui/material";
import {
    BoxLeft,
    BoxRight,
    ButtonFeatures,
    CarTypeTitle,
    DialogContainer,
    Img,
    ListStyle,
    TextContent,
    Title,
} from "./DialogShowScheduleDriverCustomStyles";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import NearMeIcon from "@mui/icons-material/NearMe";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import Constants from "../../../constants/Constants";
import { DialogShowScheduleDriverServices } from "../../../services/driverServices/DialogShowScheduleDriverServices";
import helper from "../../../common/helper";

function DialogShowScheduleDriver({
    open,
    handleClose,
    idSchedule,
    titleDialog,
}) {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [schedule, setSchedule] = useState([]);

    const getSchedule = async () => {
        const res = await DialogShowScheduleDriverServices.getSchedule({
            idSchedule: idSchedule,
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setSchedule(res.data.data);
            } else {
                setModalError({
                    ...modalError,
                    open: true,
                    title: res.data.message,
                });
            }
        }
        // axios fail
        else {
            setModalError({
                ...modalError,
                open: true,
                title:
                    (res.request &&
                        `${Strings.Common.AN_ERROR_OCCURRED} (${res.request.status})`) ||
                    Strings.Common.ERROR,
                content: res.name || null,
            });
        }
    };

    const run = async () => {
        await setBackDrop(true);
        (await open) && getSchedule();
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    useEffect(() => {
        run();
    }, [idSchedule]);

    return (
        <DialogContainer
            open={open}
            onClose={handleClose}
            scroll="body"
            fullWidth={true}
        >
            {schedule.map((item) => {
                const startDate = helper.formatDateStringFromTimeStamp(
                    item.startDate
                );
                const endDate = helper.formatDateStringFromTimeStamp(
                    item.endDate
                );
                return (
                    <Box key={item.idSchedule}>
                        {/* CONTENT */}
                        <DialogContent>
                            <Box>
                                {/* TITLE */}
                                <Title>
                                    {titleDialog} (Số: {item.idSchedule})
                                </Title>

                                {/* CONTENT */}
                                <Box>
                                    {/* INFO CAR */}
                                    <BoxLeft>
                                        {/* IMAGE CAR */}
                                        <Img src={item.image} />

                                        {/* CONTENT INFO CAR */}
                                        <Box sx={{ textAlign: "start" }}>
                                            {/* SEAT NUMBER OF CAR */}
                                            <CarTypeTitle
                                                variant="p"
                                                component="div"
                                            >
                                                {`${item.carType} ${item.seatNumber} Chổ`}
                                            </CarTypeTitle>

                                            {/* LICENSEPLATES */}
                                            <TextContent
                                                variant="p"
                                                component="div"
                                            >
                                                {
                                                    Strings
                                                        .DialogShowScheduleDriver
                                                        .LICENSE_PLATES
                                                }
                                                <Tooltip
                                                    title={item.licensePlates}
                                                    arrow
                                                >
                                                    <span>
                                                        {item.licensePlates}
                                                    </span>
                                                </Tooltip>
                                            </TextContent>

                                            {/* CAR BRAND */}
                                            <TextContent
                                                variant="p"
                                                component="div"
                                            >
                                                {
                                                    Strings
                                                        .DialogShowScheduleDriver
                                                        .CAR_BRAND
                                                }
                                                <Tooltip
                                                    title={item.carBrand}
                                                    arrow
                                                >
                                                    <span>{item.carBrand}</span>
                                                </Tooltip>
                                            </TextContent>

                                            {/* CAR STATUS */}
                                            <TextContent
                                                variant="p"
                                                component="div"
                                            >
                                                {
                                                    Strings
                                                        .DialogShowScheduleDriver
                                                        .CAR_STATUS
                                                }
                                                <Tooltip
                                                    title={item.carStatus}
                                                    arrow
                                                >
                                                    <span
                                                        style={{
                                                            fontWeight: "bold",
                                                            color:
                                                                item.idCarStatus ==
                                                                Constants
                                                                    .CarStatusCode
                                                                    .WORK
                                                                    ? Constants
                                                                          .ColorOfCarStatus
                                                                          .WORK
                                                                    : item.idCarStatus ==
                                                                      Constants
                                                                          .CarStatusCode
                                                                          .STOP_WORKING
                                                                    ? Constants
                                                                          .ColorOfCarStatus
                                                                          .STOP_WORKING
                                                                    : item.idCarStatus ==
                                                                      Constants
                                                                          .CarStatusCode
                                                                          .MAINTENANCE
                                                                    ? Constants
                                                                          .ColorOfCarStatus
                                                                          .MAINTENANCE
                                                                    : theme
                                                                          .palette
                                                                          .text
                                                                          .primary,
                                                        }}
                                                    >
                                                        {item.carStatus}
                                                    </span>
                                                </Tooltip>
                                            </TextContent>
                                        </Box>
                                    </BoxLeft>

                                    {/* BOX CONTENT SCHEDULE */}
                                    <BoxRight>
                                        {/* DATE */}
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {
                                                Strings.DialogShowScheduleDriver
                                                    .TIME
                                            }
                                            <Tooltip
                                                title={`${startDate} - ${endDate}`}
                                                arrow
                                            >
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >{`${startDate} - ${endDate}`}</span>
                                            </Tooltip>
                                        </TextContent>

                                        {/* INFO DRIVER */}
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {
                                                Strings.DialogShowScheduleDriver
                                                    .DRIVER
                                            }
                                            <Tooltip
                                                title={
                                                    item.fullNameDriver &&
                                                    item.phoneDriver
                                                        ? `${item.fullNameDriver} (SĐT: ${item.phoneDriver})`
                                                        : Strings.Common
                                                              .UPDATING
                                                }
                                                arrow
                                            >
                                                <span>
                                                    {item.fullNameDriver &&
                                                    item.phoneDriver
                                                        ? `${item.fullNameDriver} (SĐT: ${item.phoneDriver})`
                                                        : Strings.Common
                                                              .UPDATING}
                                                </span>
                                            </Tooltip>
                                        </TextContent>

                                        {/* INFO USER */}
                                        <Box>
                                            {/* TITLE */}
                                            <TextContent
                                                variant="p"
                                                component="div"
                                            >
                                                {
                                                    Strings
                                                        .DialogShowScheduleDriver
                                                        .INFO_SUBSCRIBERS
                                                }
                                            </TextContent>

                                            {/* LIST INFO USER */}
                                            <ListStyle>
                                                {/* FULL NAME USER */}
                                                <ListItem>
                                                    <PersonIcon />
                                                    <Tooltip
                                                        title={item.fullNameUser}
                                                        arrow
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                Strings
                                                                    .DialogShowScheduleDriver
                                                                    .FULL_NAME_USER
                                                            }
                                                            secondary={
                                                                item.fullNameUser
                                                            }
                                                        />
                                                    </Tooltip>
                                                </ListItem>

                                                {/* PHONE USER */}
                                                <ListItem>
                                                    <LocalPhoneIcon />
                                                    <Tooltip
                                                        title={item.phoneUser}
                                                        arrow
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                Strings
                                                                    .DialogShowScheduleDriver
                                                                    .PHONE_USER
                                                            }
                                                            secondary={
                                                                item.phoneUser
                                                            }
                                                        />
                                                    </Tooltip>
                                                </ListItem>

                                                {/* EMAIL USER */}
                                                <ListItem>
                                                    <EmailIcon />
                                                    <Tooltip
                                                        title={item.email}
                                                        arrow
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                Strings
                                                                .DialogShowScheduleDriver
                                                                .EMAIL_USER
                                                            }
                                                            secondary={
                                                                item.email
                                                            }
                                                        />
                                                    </Tooltip>
                                                </ListItem>
                                            </ListStyle>
                                        </Box>

                                        {/* SCHEDULE */}
                                        <Box>
                                            {/* TITLE */}
                                            <TextContent
                                                variant="p"
                                                component="div"
                                            >
                                                {
                                                    Strings
                                                        .DialogShowScheduleDriver
                                                        .SCHEDULE
                                                }
                                            </TextContent>

                                            {/* LIST LOCATION */}
                                            <ListStyle>
                                                {/* REASON */}
                                                <ListItem>
                                                    <CreateIcon />
                                                    <Tooltip
                                                        title={item.reason}
                                                        arrow
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                "Mục Đích Sử Dụng Xe: "
                                                            }
                                                            secondary={
                                                                item.reason
                                                            }
                                                        />
                                                    </Tooltip>
                                                </ListItem>

                                                {/* START LOCATION */}
                                                <ListItem>
                                                    <NearMeIcon />
                                                    <Tooltip
                                                        title={`${item.startLocation} - ${item.wardStart} - ${item.districtStart} - ${item.provinceStart}`}
                                                        arrow
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                "Điểm xuất phát:"
                                                            }
                                                            secondary={`${item.startLocation} - ${item.wardStart} - ${item.districtStart} - ${item.provinceStart}`}
                                                        />
                                                    </Tooltip>
                                                </ListItem>

                                                {/* END LOCATION */}
                                                <ListItem>
                                                    <LocationOnIcon />
                                                    <Tooltip
                                                        title={`${item.endLocation} - ${item.wardEnd} - ${item.districtEnd} - ${item.provinceEnd}`}
                                                        arrow
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                "Điểm kết thúc:"
                                                            }
                                                            secondary={`${item.endLocation} - ${item.wardEnd} - ${item.districtEnd} - ${item.provinceEnd}`}
                                                        />
                                                    </Tooltip>
                                                </ListItem>
                                            </ListStyle>
                                        </Box>
                                    </BoxRight>
                                </Box>
                            </Box>
                        </DialogContent>

                        {/* BUTTON */}
                        <DialogActions>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginTop: 4,
                                }}
                            >
                                {/* EXIT BUTTON */}
                                <ButtonFeatures
                                    size="small"
                                    variant="contained"
                                    endIcon={<CancelIcon />}
                                    color="error"
                                    sx={{ marginRight: 1 }}
                                    onClick={handleClose}
                                >
                                    {Strings.Common.EXIT}
                                </ButtonFeatures>
                            </Box>
                        </DialogActions>
                    </Box>
                );
            })}

            <ModalError
                open={modalError.open}
                handleClose={() =>
                    setModalError({ ...modalError, open: false })
                }
                content={modalError.content}
                title={modalError.title}
            />

            <ModalSuccess
                open={modalSuccess}
                handleClose={() => setModalSuccess(false)}
            />
            <BackDrop open={backDrop} />
        </DialogContainer>
    );
}

export default DialogShowScheduleDriver;
