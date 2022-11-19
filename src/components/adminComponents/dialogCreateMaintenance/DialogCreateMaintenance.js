import { useState, useEffect, useRef } from "react";
import {
    Box,
    DialogActions,
    DialogContent,
    InputAdornment,
    useTheme,
} from "@mui/material";
import {
    BoxImg,
    BoxLeft,
    BoxRight,
    ButtonFeatures,
    DialogContainer,
    Img,
    TextError,
    TextInput,
    TextStyle,
    Title,
} from "./DialogCreateMaintenanceCustomStyles";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import BackDrop from "../../backDrop/BackDrop";
import Constants from "../../../constants/Constants";
import helper from "../../../common/helper";
import InfoIcon from "@mui/icons-material/Info";
import PaidIcon from "@mui/icons-material/Paid";
import DialogConfirmation from "../../dialogConfirmation/DialogConfirmation";
import { DialogCreateMaintenanceServices } from "../../../services/adminServices/DialogCreateMaintenanceServices";

function DialogCreateMaintenance({
    open,
    handleClose,
    idCar,
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
        idCar: idCar,
        image: null,
        description: null,
        repairCost: null,
    });

    const createCarMaintenance = async () => {
        await setBackDrop(true);
        const formData = await handleFormDataSendApi();
        const res = await DialogCreateMaintenanceServices.createCarMaintenance(
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
        if (!dataSendApi.image || !dataSendApi.description) {
            setErrorData({
                ...errorData,
                image: helper.isNullOrEmpty(dataSendApi.image),
                description: helper.isNullOrEmpty(dataSendApi.description),
                helperDescription:
                    Strings.DialogCreateMaintenance.SUPPORT_EMPTY_DESCRIPTION,
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
                    Strings.DialogCreateMaintenance.SUPPORT_LENGTH_DESCRIPTION,
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
        formData.append("idCar", dataSendApi.idCar);
        formData.append("image", dataSendApi.image);
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
                    createCarMaintenance();
                },
            });
        }
    };

    const run = async (idCar) => {
        await setBackDrop(true);
        await setDataSendApi({
            ...dataSendApi,
            idCar: idCar,
            image: null,
            description: null,
            repairCost: null,
        });
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    useEffect(() => {
        run(idCar);
    }, [idCar]);

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
                <Title>{Strings.DialogCreateMaintenance.TITLE}</Title>

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
                                            Strings.DialogCreateMaintenance
                                                .CHOOSE_IMAGE_PLEASE
                                        }
                                    </TextError>
                                </Box>
                            )}
                        </Box>
                    </BoxLeft>

                    <BoxRight>
                        {/* MAINTENANCE DESCRIPTION */}
                        <Box>
                            <TextStyle>
                                {
                                    Strings.DialogCreateMaintenance
                                        .MAINTENANCE_DESCRIPTION
                                }
                            </TextStyle>
                            <TextInput
                                multiline
                                placeholder={
                                    Strings.DialogCreateMaintenance
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
                                {Strings.DialogCreateMaintenance.REPAIR_COST}
                            </TextStyle>
                            <TextInput
                                placeholder={
                                    Strings.DialogCreateMaintenance
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

export default DialogCreateMaintenance;
