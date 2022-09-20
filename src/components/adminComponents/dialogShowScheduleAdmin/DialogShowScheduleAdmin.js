import { useState, useEffect } from "react";
import {
    Box,
    DialogActions,
    DialogContent,
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
} from "./DialogShowScheduleAdminCustomStyles";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import NearMeIcon from "@mui/icons-material/NearMe";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import Constants from "../../../constants/Constants";
import { DialogShowScheduleAdminServices } from "../../../services/adminServices/DialogShowScheduleAdminServices";
import helper from "../../../common/helper";

function DialogShowScheduleAdmin({
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
        const res = await DialogShowScheduleAdminServices.getSchedule({
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

                const objScheduleStatus = Constants.ScheduleStatus;
                let colorScheduleStatus = theme.palette.text.primary;
                for (const property in objScheduleStatus) {
                    if (
                        item.scheduleStatus == `${objScheduleStatus[property]}`
                    ) {
                        colorScheduleStatus =
                            Constants.ColorOfScheduleStatus.TextNoBackground[
                                property
                            ];
                        break;
                    }
                }

                const objCarStatus = Constants.CarStatusCode;
                let colorCarStatus = theme.palette.text.primary;
                for (const property in objCarStatus) {
                    if (item.idCarStatus == `${objCarStatus[property]}`) {
                        colorCarStatus = Constants.ColorOfCarStatus[property];
                        break;
                    }
                }
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
                                    {/* INFO CAR AND INFO ADMIN */}
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
                                                        .DialogShowScheduleAdmin
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
                                                        .DialogShowScheduleAdmin
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
                                                        .DialogShowScheduleAdmin
                                                        .CAR_STATUS
                                                }
                                                <Tooltip
                                                    title={item.carStatus}
                                                    arrow
                                                >
                                                    <span
                                                        style={{
                                                            fontWeight: "bold",
                                                            color: colorCarStatus,
                                                        }}
                                                    >
                                                        {item.carStatus}
                                                    </span>
                                                </Tooltip>
                                            </TextContent>

                                            {/* INFO ADMIN */}
                                            <Box>
                                                {/* TITLE */}
                                                <TextContent
                                                    variant="p"
                                                    component="div"
                                                >
                                                    {
                                                        Strings
                                                            .DialogShowScheduleAdmin
                                                            .INFO_ADMIN
                                                    }
                                                    {!item.fullNameAdmin && (
                                                        <Tooltip
                                                            title={
                                                                Strings.Common
                                                                    .UPDATING
                                                            }
                                                            arrow
                                                        >
                                                            <span>
                                                                {
                                                                    Strings
                                                                        .Common
                                                                        .UPDATING
                                                                }
                                                            </span>
                                                        </Tooltip>
                                                    )}
                                                </TextContent>

                                                {/* LIST INFO ADMIN */}
                                                {item.fullNameAdmin && (
                                                    <ListStyle>
                                                        {/* FULL NAME ADMIN */}
                                                        <ListItem>
                                                            <PersonIcon />
                                                            <Tooltip
                                                                title={
                                                                    item.fullNameAdmin
                                                                }
                                                                arrow
                                                            >
                                                                <ListItemText
                                                                    primary={
                                                                        Strings
                                                                            .DialogShowScheduleAdmin
                                                                            .FULL_NAME
                                                                    }
                                                                    secondary={
                                                                        item.fullNameAdmin
                                                                    }
                                                                />
                                                            </Tooltip>
                                                        </ListItem>
                                                    </ListStyle>
                                                )}
                                            </Box>
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
                                                Strings.DialogShowScheduleAdmin
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

                                        {/* STATUS SCHEDULE */}
                                        <TextContent
                                            variant="p"
                                            component="div"
                                        >
                                            {
                                                Strings.DialogShowScheduleAdmin
                                                    .SCHEDULE_STATUS
                                            }
                                            <Tooltip
                                                title={item.scheduleStatus}
                                                arrow
                                            >
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                        color: colorScheduleStatus,
                                                    }}
                                                >
                                                    {item.scheduleStatus}
                                                </span>
                                            </Tooltip>
                                        </TextContent>

                                        {/* INFO DRIVER */}
                                        <Box>
                                            <TextContent
                                                variant="p"
                                                component="div"
                                            >
                                                {
                                                    Strings
                                                        .DialogShowScheduleAdmin
                                                        .DRIVER
                                                }
                                                {!item.fullNameDriver && (
                                                    <Tooltip
                                                        title={
                                                            Strings.Common
                                                                .UPDATING
                                                        }
                                                        arrow
                                                    >
                                                        <span>
                                                            {
                                                                Strings.Common
                                                                    .UPDATING
                                                            }
                                                        </span>
                                                    </Tooltip>
                                                )}
                                            </TextContent>

                                            {/* LIST INFO DRIVER */}
                                            {item.fullNameDriver && (
                                                <ListStyle>
                                                    {/* FULL NAME DRIVER */}
                                                    <ListItem>
                                                        <PersonIcon />
                                                        <Tooltip
                                                            title={
                                                                item.fullNameDriver
                                                            }
                                                            arrow
                                                        >
                                                            <ListItemText
                                                                primary={
                                                                    Strings
                                                                        .DialogShowScheduleAdmin
                                                                        .FULL_NAME
                                                                }
                                                                secondary={
                                                                    item.fullNameDriver
                                                                }
                                                            />
                                                        </Tooltip>
                                                    </ListItem>

                                                    {/* PHONE DRIVER */}
                                                    <ListItem>
                                                        <LocalPhoneIcon />
                                                        <Tooltip
                                                            title={
                                                                item.phoneDriver
                                                            }
                                                            arrow
                                                        >
                                                            <ListItemText
                                                                primary={
                                                                    Strings
                                                                        .DialogShowScheduleAdmin
                                                                        .PHONE
                                                                }
                                                                secondary={
                                                                    item.phoneDriver
                                                                }
                                                            />
                                                        </Tooltip>
                                                    </ListItem>

                                                    {/* EMAIL DRIVER */}
                                                    <ListItem>
                                                        <EmailIcon />
                                                        <Tooltip
                                                            title={
                                                                item.emailDriver
                                                            }
                                                            arrow
                                                        >
                                                            <ListItemText
                                                                primary={
                                                                    Strings
                                                                        .DialogShowScheduleAdmin
                                                                        .EMAIL
                                                                }
                                                                secondary={
                                                                    item.emailDriver
                                                                }
                                                            />
                                                        </Tooltip>
                                                    </ListItem>
                                                </ListStyle>
                                            )}
                                        </Box>

                                        {/* INFO USER */}
                                        <Box>
                                            {/* TITLE */}
                                            <TextContent
                                                variant="p"
                                                component="div"
                                            >
                                                {
                                                    Strings
                                                        .DialogShowScheduleAdmin
                                                        .INFO_SUBSCRIBERS
                                                }
                                            </TextContent>

                                            {/* LIST INFO USER */}
                                            <ListStyle>
                                                {/* FULL NAME USER */}
                                                <ListItem>
                                                    <PersonIcon />
                                                    <Tooltip
                                                        title={
                                                            item.fullNameUser
                                                        }
                                                        arrow
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                Strings
                                                                    .DialogShowScheduleAdmin
                                                                    .FULL_NAME
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
                                                                    .DialogShowScheduleAdmin
                                                                    .PHONE
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
                                                        title={item.emailUser}
                                                        arrow
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                Strings
                                                                    .DialogShowScheduleAdmin
                                                                    .EMAIL
                                                            }
                                                            secondary={
                                                                item.emailUser
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
                                                        .DialogShowScheduleAdmin
                                                        .SCHEDULE
                                                }
                                            </TextContent>

                                            {/* LIST LOCATION */}
                                            <ListStyle>
                                                {/* NOTE */}
                                                <ListItem>
                                                    <CreateIcon />
                                                    <Tooltip
                                                        title={item.note}
                                                        arrow
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                Strings
                                                                    .DialogShowScheduleAdmin
                                                                    .NOTE
                                                            }
                                                            secondary={
                                                                item.note
                                                            }
                                                        />
                                                    </Tooltip>
                                                </ListItem>

                                                {/* REASON */}
                                                <ListItem>
                                                    <TextSnippetIcon />
                                                    <Tooltip
                                                        title={item.reason}
                                                        arrow
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                Strings
                                                                    .DialogShowScheduleAdmin
                                                                    .CAR_RENTAL_REASON
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
                                                                Strings
                                                                    .DialogShowScheduleAdmin
                                                                    .START_LOCATION
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
                                                                Strings
                                                                    .DialogShowScheduleAdmin
                                                                    .END_LOCATION
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

export default DialogShowScheduleAdmin;
