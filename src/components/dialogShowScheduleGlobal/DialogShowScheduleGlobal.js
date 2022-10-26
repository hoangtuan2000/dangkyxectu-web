import { useState, useEffect } from "react";
import {
    Box,
    DialogActions,
    DialogContent,
    ListItem,
    ListItemText,
    Rating,
    Tooltip,
    useTheme,
} from "@mui/material";
import {
    BoxComment,
    BoxLeft,
    BoxRight,
    ButtonFeatures,
    CarTypeTitle,
    DialogContainer,
    Img,
    ListStyle,
    MultipleTextInput,
    TextContent,
    Title,
} from "./DialogShowScheduleGlobalCustomStyles";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import NearMeIcon from "@mui/icons-material/NearMe";
import UpdateIcon from "@mui/icons-material/Update";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import Strings from "../../constants/Strings";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Constants from "../../constants/Constants";
import helper from "../../common/helper";
import ModalError from "../modalError/ModalError";
import ModalSuccess from "../modalSuccess/ModalSuccess";
import BackDrop from "../backDrop/BackDrop";
import { GlobalService } from "../../services/GlobalServices";

function DialogShowScheduleGlobal({ open, handleClose, idSchedule }) {
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
        const res = await GlobalService.getSchedule({
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
                    content: null,
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
        open && run();
    }, [idSchedule, open]);

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
                        colorCarStatus =
                            Constants.ColorOfCarStatus.Text[property];
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
                                    {Strings.Common.INFO_SCHEDULE} (Số:{" "}
                                    {item.idSchedule})
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
                                                        .DialogShowScheduleGlobal
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
                                                        .DialogShowScheduleGlobal
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
                                                        .DialogShowScheduleGlobal
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

                                            {/* INFO CREATED AT AND UPDATED AT */}
                                            <Box>
                                                {/* TITLE */}
                                                <TextContent
                                                    variant="p"
                                                    component="div"
                                                >
                                                    {
                                                        Strings
                                                            .DialogShowScheduleGlobal
                                                            .TIME
                                                    }
                                                </TextContent>

                                                {/* LIST INFO TIME */}
                                                <ListStyle>
                                                    {/* CREATED AT */}
                                                    <ListItem>
                                                        <AccessTimeIcon />
                                                        <Tooltip
                                                            title={helper.formatDateTimeStringFromTimeStamp(
                                                                item.createdAt
                                                            )}
                                                            arrow
                                                        >
                                                            <ListItemText
                                                                primary={
                                                                    Strings
                                                                        .DialogShowScheduleGlobal
                                                                        .CREATED_AT
                                                                }
                                                                secondary={helper.formatDateTimeStringFromTimeStamp(
                                                                    item.createdAt
                                                                )}
                                                            />
                                                        </Tooltip>
                                                    </ListItem>

                                                    {/* UPDATED AT */}
                                                    {item.updatedAt && (
                                                        <ListItem>
                                                            <UpdateIcon />
                                                            <Tooltip
                                                                title={helper.formatDateTimeStringFromTimeStamp(
                                                                    item.updatedAt
                                                                )}
                                                                arrow
                                                            >
                                                                <ListItemText
                                                                    primary={
                                                                        Strings
                                                                            .DialogShowScheduleGlobal
                                                                            .UPDATED_AT
                                                                    }
                                                                    secondary={helper.formatDateTimeStringFromTimeStamp(
                                                                        item.updatedAt
                                                                    )}
                                                                />
                                                            </Tooltip>
                                                        </ListItem>
                                                    )}

                                                    {/* USER UPDATE */}
                                                    {item.fullNameUserUpdate &&
                                                        item.codeUserUpdate && (
                                                            <ListItem>
                                                                <PersonIcon />
                                                                <Tooltip
                                                                    title={`${item.fullNameUserUpdate} - ${item.codeUserUpdate}`}
                                                                    arrow
                                                                >
                                                                    <ListItemText
                                                                        primary={
                                                                            Strings
                                                                                .DialogShowScheduleGlobal
                                                                                .RECENT_UPDATE_USER
                                                                        }
                                                                        secondary={`${item.fullNameUserUpdate} - ${item.codeUserUpdate}`}
                                                                    />
                                                                </Tooltip>
                                                            </ListItem>
                                                        )}
                                                </ListStyle>
                                            </Box>

                                            {/* INFO ADMIN */}
                                            <Box>
                                                {/* TITLE */}
                                                <TextContent
                                                    variant="p"
                                                    component="div"
                                                >
                                                    {
                                                        Strings
                                                            .DialogShowScheduleGlobal
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
                                                                title={`${item.fullNameAdmin} - ${item.codeAdmin}`}
                                                                arrow
                                                            >
                                                                <ListItemText
                                                                    primary={
                                                                        Strings
                                                                            .DialogShowScheduleGlobal
                                                                            .NAME_CODE
                                                                    }
                                                                    secondary={`${item.fullNameAdmin} - ${item.codeAdmin}`}
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
                                                Strings.DialogShowScheduleGlobal
                                                    .TIME
                                            }
                                            <Tooltip
                                                title={`${startDate} - ${endDate}`}
                                                arrow
                                            >
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                        color:
                                                            !helper.isDateTimeStampGreaterThanCurrentDate(
                                                                item.startDate
                                                            ) &&
                                                            item.scheduleStatus ==
                                                                Constants
                                                                    .ScheduleStatus
                                                                    .PENDING
                                                                ? theme.palette
                                                                      .error
                                                                      .main
                                                                : theme.palette
                                                                      .text
                                                                      .primary,
                                                    }}
                                                >
                                                    {`${startDate} - ${endDate}`}
                                                    {!helper.isDateTimeStampGreaterThanCurrentDate(
                                                        item.startDate
                                                    ) &&
                                                    item.scheduleStatus ==
                                                        Constants.ScheduleStatus
                                                            .PENDING
                                                        ? ` ( ${Strings.Common.OUT_OF_DATE} )`
                                                        : null}
                                                </span>
                                            </Tooltip>
                                        </TextContent>

                                        {/* STATUS SCHEDULE */}
                                        <Box>
                                            {/* TEXT SCHEDULE STATUS */}
                                            <TextContent
                                                variant="p"
                                                component="div"
                                            >
                                                {
                                                    Strings
                                                        .DialogShowScheduleGlobal
                                                        .SCHEDULE_STATUS
                                                }
                                                {(item.scheduleStatus ==
                                                    Constants.ScheduleStatus
                                                        .PENDING &&
                                                    !helper.isDateTimeStampGreaterThanCurrentDate(
                                                        item.startDate
                                                    )) ||
                                                item.scheduleStatus !=
                                                    Constants.ScheduleStatus
                                                        .PENDING ? (
                                                    <Tooltip
                                                        title={
                                                            item.scheduleStatus
                                                        }
                                                        arrow
                                                    >
                                                        <span
                                                            style={{
                                                                fontWeight:
                                                                    "bold",
                                                                color: colorScheduleStatus,
                                                            }}
                                                        >
                                                            {
                                                                item.scheduleStatus
                                                            }
                                                        </span>
                                                    </Tooltip>
                                                ) : null}
                                            </TextContent>
                                        </Box>

                                        {/* REVIEWS */}
                                        {item.idReview && (
                                            <>
                                                <TextContent
                                                    variant="p"
                                                    component="div"
                                                >
                                                    {
                                                        Strings
                                                            .DialogShowScheduleGlobal
                                                            .REVIEW
                                                    }
                                                </TextContent>

                                                <Rating
                                                    name="read-only"
                                                    defaultValue={
                                                        item.starNumber
                                                    }
                                                    precision={0.1}
                                                    readOnly
                                                    size="small"
                                                    sx={{ marginLeft: 2 }}
                                                />

                                                <BoxComment>
                                                    <MultipleTextInput
                                                        disabled
                                                        label={
                                                            Strings
                                                                .DialogShowScheduleGlobal
                                                                .COMMENT
                                                        }
                                                        value={
                                                            item.commentReview
                                                        }
                                                        multiline
                                                        sx={{
                                                            width: "100% !important",
                                                        }}
                                                    />
                                                </BoxComment>
                                            </>
                                        )}

                                        {/* INFO DRIVER */}
                                        <Box>
                                            {/* TEXT INFO DRIVER */}
                                            <TextContent
                                                variant="p"
                                                component="div"
                                            >
                                                {
                                                    Strings
                                                        .DialogShowScheduleGlobal
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
                                                            title={`${item.fullNameDriver} - ${item.codeDriver}`}
                                                            arrow
                                                        >
                                                            <ListItemText
                                                                primary={
                                                                    Strings
                                                                        .DialogShowScheduleGlobal
                                                                        .NAME_CODE
                                                                }
                                                                secondary={`${item.fullNameDriver} - ${item.codeDriver}`}
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
                                                                        .DialogShowScheduleGlobal
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
                                                                        .DialogShowScheduleGlobal
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
                                                        .DialogShowScheduleGlobal
                                                        .INFO_SUBSCRIBERS
                                                }
                                            </TextContent>

                                            {/* LIST INFO USER */}
                                            <ListStyle>
                                                {/* FULL NAME USER */}
                                                <ListItem>
                                                    <PersonIcon />
                                                    <Tooltip
                                                        title={`${item.fullNameUser} - ${item.codeUser}`}
                                                        arrow
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                Strings
                                                                    .DialogShowScheduleGlobal
                                                                    .NAME_CODE_FACULTY
                                                            }
                                                            secondary={`${item.fullNameUser} - ${item.codeUser} - ${item.nameFaculty}`}
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
                                                                    .DialogShowScheduleGlobal
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
                                                                    .DialogShowScheduleGlobal
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
                                                        .DialogShowScheduleGlobal
                                                        .SCHEDULE
                                                }
                                            </TextContent>

                                            {/* LIST LOCATION */}
                                            <ListStyle>
                                                {/* NOTE */}
                                                <ListItem>
                                                    <CreateIcon />
                                                    <Tooltip
                                                        title={item.note || ""}
                                                        arrow
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                Strings
                                                                    .DialogShowScheduleGlobal
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
                                                                    .DialogShowScheduleGlobal
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
                                                                    .DialogShowScheduleGlobal
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
                                                                    .DialogShowScheduleGlobal
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
                    </Box>
                );
            })}

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

export default DialogShowScheduleGlobal;
