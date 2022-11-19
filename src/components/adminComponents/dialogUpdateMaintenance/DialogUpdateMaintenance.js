import { useState, useEffect, useRef } from "react";
import {
    Box,
    DialogActions,
    DialogContent,
    InputAdornment,
    ListItem,
    ListItemText,
    Tooltip,
    useTheme,
} from "@mui/material";
import {
    BoxImg,
    BoxLeft,
    BoxRight,
    ButtonFeatures,
    DialogContainer,
    Img,
    ListStyle,
    TextError,
    TextInput,
    TextStyle,
    Title,
} from "./DialogUpdateMaintenanceCustomStyles";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UpdateIcon from "@mui/icons-material/Update";
import PersonIcon from "@mui/icons-material/Person";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import BackDrop from "../../backDrop/BackDrop";
import Constants from "../../../constants/Constants";
import helper from "../../../common/helper";
import InfoIcon from "@mui/icons-material/Info";
import PaidIcon from "@mui/icons-material/Paid";
import DialogConfirmation from "../../dialogConfirmation/DialogConfirmation";
import { DialogCreateMaintenanceServices } from "../../../services/adminServices/DialogCreateMaintenanceServices";
import { DialogUploadMaintenanceServices } from "../../../services/adminServices/DialogUpdateMaintenanceServices";

function DialogUpdateMaintenance({
    open,
    handleClose,
    idCarMaintenance,
    callFunctionParent,
}) {
    const theme = useTheme();

    const inputImage = useRef();

    const [backDrop, setBackDrop] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });
    const [dialogConfirmation, setDialogConfirmation] = useState({
        open: false,
        title: Strings.Common.DO_YOU_WANT_TO_CREATE_MAINTENANCE,
        content: Strings.Common.CREATE_MAINTENANCE_CONFIRMATION,
        handleSubmit: () => {},
    });
    const [imagePreview, setImagePreview] = useState();
    const [errorData, setErrorData] = useState({
        image: false,
        description: false,
        helperDescription: null,
    });
    const [dataSendApi, setDataSendApi] = useState({
        idCarMaintenance: idCarMaintenance,
        image: null,
        description: null,
        repairCost: null,
    });

    const [carMaintenance, setCarMaintenance] = useState([]);

    const getCarMaintenance = async () => {
        await setBackDrop(true);
        const res = await DialogUploadMaintenanceServices.getCarMaintenance({
            idCarMaintenance: idCarMaintenance,
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                await setCarMaintenance(res.data.data);
                await setImagePreview(res.data.data[0].image);
                await setDataSendApi({
                    ...dataSendApi,
                    idCarMaintenance: res.data.data[0].idCarMaintenance,
                    description: res.data.data[0].description,
                    repairCost: helper.formatMoney(res.data.data[0].repairCost),
                });
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
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    const updateCarMaintenance = async () => {
        await setBackDrop(true);
        const formData = await handleFormDataSendApi();
        const res = await DialogUploadMaintenanceServices.updateCarMaintenance(
            formData
        );
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                await handleRefreshInput();
                await callFunctionParent();
                await setBackDrop(false);
                await handleClose();
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
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    // OPEN FOLDER CHOOSE IMAGE
    const onOpenChooseImage = () => {
        inputImage.current.click();
    };

    // CHOOSE IMAGE
    const handleChooseImage = (e) => {
        let imgPreview = URL.createObjectURL(e.target.files[0]);
        setImagePreview(imgPreview);
        setDataSendApi({
            ...dataSendApi,
            image: e.target.files[0],
        });
        setErrorData({
            ...errorData,
            image: false,
        });
    };

    const handleChangeDescription = (e) => {
        setDataSendApi({
            ...dataSendApi,
            description: e.target.value,
        });
    };

    const handleChangeRepairCost = (e) => {
        if (helper.isNullOrEmpty(e.target.value)) {
            setDataSendApi({
                ...dataSendApi,
                repairCost: null,
            });
        } else {
            let removeFormatMoney = e.target.value.replace(/\./g, "");
            let formatMoney = helper.formatMoney(removeFormatMoney);
            setDataSendApi({
                ...dataSendApi,
                repairCost: formatMoney,
            });
        }
    };

    const handleValidateData = () => {
        if (!dataSendApi.description) {
            setErrorData({
                ...errorData,
                description: helper.isNullOrEmpty(dataSendApi.description),
                helperDescription:
                    Strings.DialogUpdateMaintenance.SUPPORT_EMPTY_DESCRIPTION,
            });
            return false;
        } else if (
            !helper.isValidStringLength(
                dataSendApi.description,
                Constants.Common.MAX_LENGTH_MAINTENANCE_DESCRIPTION
            )
        ) {
            setErrorData({
                ...errorData,
                description: helper.isNullOrEmpty(dataSendApi.description),
                helperDescription:
                    Strings.DialogUpdateMaintenance.SUPPORT_LENGTH_DESCRIPTION,
            });
            return false;
        } else {
            return true;
        }
    };

    const handleRefreshInput = () => {
        //REFRESH IMAGE PREVIEW
        setImagePreview();

        setDataSendApi({
            image: null,
            description: null,
            repairCost: null,
        });
    };

    const handleFormDataSendApi = () => {
        const formData = new FormData();
        formData.append("idCarMaintenance", dataSendApi.idCarMaintenance);
        dataSendApi.image && formData.append("image", dataSendApi.image);
        formData.append("description", dataSendApi.description);
        if (dataSendApi.repairCost) {
            let repairCost = dataSendApi.repairCost.replace(/\./g, "");
            formData.append("repairCost", repairCost);
        }
        return formData;
    };

    const onSubmit = async () => {
        const resultValidate = await handleValidateData();
        if (resultValidate) {
            setDialogConfirmation({
                ...dialogConfirmation,
                open: true,
                handleSubmit: () => {
                    updateCarMaintenance();
                },
            });
        }
    };

    const run = async () => {
        await setBackDrop(true);
        (await open) && getCarMaintenance();
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    useEffect(() => {
        run();
    }, [open]);

    return (
        <DialogContainer
            open={open}
            onClose={handleClose}
            scroll="body"
            fullWidth={true}
        >
            {/* FORM */}
            <DialogContent>
                {/* TITLE */}
                <Title>{Strings.DialogUpdateMaintenance.TITLE}</Title>

                {/* CONTENT */}
                <Box>
                    <BoxLeft>
                        {/* CHOOSE IMAGE */}
                        <Box
                            sx={{
                                marginBottom: "30px",
                            }}
                        >
                            <input
                                ref={inputImage}
                                type="file"
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={(e) => handleChooseImage(e)}
                            />
                            <BoxImg
                                onClick={onOpenChooseImage}
                                sx={{
                                    borderColor:
                                        errorData.image &&
                                        theme.palette.error.main,
                                }}
                            >
                                {imagePreview && <Img src={imagePreview} />}
                                <CameraAltIcon
                                    sx={{
                                        fontSize: "50px",
                                        color: errorData.image
                                            ? theme.palette.error.main
                                            : theme.palette.text.secondary,
                                        opacity: 0.5,
                                        zIndex: 999999,
                                        position: "absolute",
                                        top: "35%",
                                    }}
                                />
                            </BoxImg>
                            {errorData.image && (
                                <Box sx={{ textAlign: "center" }}>
                                    <TextError variant="span" component="div">
                                        {
                                            Strings.DialogUpdateMaintenance
                                                .CHOOSE_IMAGE_PLEASE
                                        }
                                    </TextError>
                                </Box>
                            )}
                        </Box>

                        {carMaintenance.map((item) => {
                            return (
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
                                                        .DialogUpdateMaintenance
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
                                                            .DialogUpdateMaintenance
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
                                                                .DialogUpdateMaintenance
                                                                .RECENT_UPDATE_USER
                                                        }
                                                        secondary={`${item.fullNameUserUpdate} - ${item.codeUserUpdate}`}
                                                    />
                                                </Tooltip>
                                            </ListItem>
                                        )}
                                </ListStyle>
                            );
                        })}
                    </BoxLeft>

                    <BoxRight>
                        {/* MAINTENANCE DESCRIPTION */}
                        <Box>
                            <TextStyle>
                                {
                                    Strings.DialogUpdateMaintenance
                                        .MAINTENANCE_DESCRIPTION
                                }
                            </TextStyle>
                            <TextInput
                                multiline
                                placeholder={
                                    Strings.DialogUpdateMaintenance
                                        .ENTER_MAINTENANCE_DESCRIPTION
                                }
                                variant="outlined"
                                size="small"
                                value={dataSendApi.description || ""}
                                onChange={(e) => handleChangeDescription(e)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <InfoIcon
                                                sx={{
                                                    color: errorData.description
                                                        ? theme.palette.error
                                                              .main
                                                        : theme.palette.primary
                                                              .main,
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                error={errorData.description}
                                helperText={errorData.helperDescription}
                            />
                        </Box>

                        {/* REPAIR COST */}
                        <Box>
                            <TextStyle>
                                {Strings.DialogUpdateMaintenance.REPAIR_COST}
                            </TextStyle>
                            <TextInput
                                placeholder={
                                    Strings.DialogUpdateMaintenance
                                        .ENTER_REPAIR_COST
                                }
                                variant="outlined"
                                size="small"
                                value={dataSendApi.repairCost || ""}
                                onChange={(e) => handleChangeRepairCost(e)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <PaidIcon
                                                sx={{
                                                    color: theme.palette.primary
                                                        .main,
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    </BoxRight>
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

                    {/* SUBMIT BUTTON */}
                    <ButtonFeatures
                        size="small"
                        variant="contained"
                        endIcon={<CheckCircleIcon />}
                        color="primary"
                        sx={{ marginRight: 1 }}
                        onClick={onSubmit}
                    >
                        {Strings.Common.CONFIRM}
                    </ButtonFeatures>
                </Box>
            </DialogActions>

            <DialogConfirmation
                open={dialogConfirmation.open}
                handleClose={() =>
                    setDialogConfirmation({
                        ...dialogConfirmation,
                        open: false,
                    })
                }
                content={dialogConfirmation.content}
                title={dialogConfirmation.title}
                handleSubmit={dialogConfirmation.handleSubmit}
            />

            <ModalError
                open={modalError.open}
                handleClose={() =>
                    setModalError({ ...modalError, open: false })
                }
                content={modalError.content}
                title={modalError.title}
            />

            <BackDrop open={backDrop} />
        </DialogContainer>
    );
}

export default DialogUpdateMaintenance;
