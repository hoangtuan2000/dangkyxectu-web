import { useState, useEffect, useRef } from "react";
import {
    Box,
    Collapse,
    DialogActions,
    DialogContent,
    Divider,
    FormControlLabel,
    Radio,
    useTheme,
} from "@mui/material";
import {
    ButtonFeatures,
    BoxFloatLeft,
    DialogContainer,
    RadioGroupStyle,
    Title,
} from "./DialogCarStatusConfirmationCustomStyles";
import CancelIcon from "@mui/icons-material/Cancel";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import Constants from "../../../constants/Constants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckBoxBrokenCar from "./CheckBoxBrokenCar";
import { DialogShowScheduleDriverServices } from "../../../services/driverServices/DialogShowScheduleDriverServices";
import DialogConfirmation from "../../dialogConfirmation/DialogConfirmation";
import { DialogCarStatusConfirmationServices } from "../../../services/driverServices/DialogCarStatusConfirmationServices";

function DialogCarStatusConfirmation({
    open,
    handleClose,
    idSchedule,
    idScheduleStatus,
}) {
    const theme = useTheme();

    const inputImgFrontOfCar = useRef();
    const inputImgBackOfCar = useRef();
    const inputImgCarFrontLights = useRef();
    const inputImgCarBackLights = useRef();
    const inputImgLeftCarBody = useRef();
    const inputImgRightCarBody = useRef();
    const inputImgCarControlCenter = useRef();
    const inputImgOtherCarParts = useRef();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });
    const [dialogConfirmation, setDialogConfirmation] = useState({
        open: false,
        title: Strings.Common.DO_YOU_WANT_TO_ADD_CAR,
        content: Strings.Common.ADD_CAR_CONFIRMATION,
        handleSubmit: () => {},
    });

    const nameBrokenCarParts = {
        FRONT_OF_CAR: "frontOfCar",
        BACK_OF_CAR: "backOfCar",
        CAR_FRONT_LIGHTS: "carFrontLights",
        CAR_BACK_LIGHTS: "carBackLights",
        LEFT_CAR_BODY: "leftCarBody",
        RIGHT_CAR_BODY: "rightCarBody",
        CAR_CONTROL_CENTER: "carControlCenter",
        OTHER_CAR_PARTS: "otherCarParts",
    };

    const [imagePreview, setImagePreview] = useState({
        frontOfCar: null,
        backOfCar: null,
        carFrontLights: null,
        carBackLights: null,
        leftCarBody: null,
        rightCarBody: null,
        carControlCenter: null,
        otherCarParts: null,
    });

    const interfaceBrokenCarParts = {
        idBrokenCarParts: null,
        image: null,
        comment: "",
    };

    const [formatContentDialog, setFormatContentDialog] = useState({
        title: "",
        nameButtonSubmit: "",
        colorButtonSubmit: "",
    });
    const [dataSendApi, setDataSendApi] = useState({
        isCarBroken: false,
        brokenCarParts: {
            frontOfCar: { ...interfaceBrokenCarParts },
            backOfCar: { ...interfaceBrokenCarParts },
            carFrontLights: { ...interfaceBrokenCarParts },
            carBackLights: { ...interfaceBrokenCarParts },
            leftCarBody: { ...interfaceBrokenCarParts },
            rightCarBody: { ...interfaceBrokenCarParts },
            carControlCenter: { ...interfaceBrokenCarParts },
            otherCarParts: { ...interfaceBrokenCarParts },
        },
    });

    const [checkedBrokenCarParts, setCheckedBrokenCarParts] = useState([]);

    const handleChangeIsCarBroken = (e) => {
        setDataSendApi({
            ...dataSendApi,
            isCarBroken: e.target.value === "true", // e.target.value === 'true' => convert boolean
        });
    };

    const handleCheckBrokenCarParts = async (e, nameBrokenCarParts) => {
        if (e.target.checked) {
            let data = await { ...dataSendApi.brokenCarParts };
            data[`${nameBrokenCarParts}`] = await {
                ...data[`${nameBrokenCarParts}`],
                idBrokenCarParts: e.target.value,
            };
            handleFormatArrayChecked(data);
            setDataSendApi({
                ...dataSendApi,
                brokenCarParts: {
                    ...data,
                },
            });
        } else {
            let data = await dataSendApi.brokenCarParts;
            data[`${nameBrokenCarParts}`] = await {
                ...data[`${nameBrokenCarParts}`],
                idBrokenCarParts: null,
            };
            handleFormatArrayChecked(data);
            setDataSendApi({
                ...dataSendApi,
                brokenCarParts: { ...data },
            });
        }
    };

    const handleFormatArrayChecked = (objDataBrokenCarParts) => {
        if (objDataBrokenCarParts) {
            let arr = [];
            for (const nameBroken in objDataBrokenCarParts) {
                if (objDataBrokenCarParts[nameBroken]["idBrokenCarParts"]) {
                    arr.push(
                        parseInt(
                            objDataBrokenCarParts[nameBroken][
                                "idBrokenCarParts"
                            ]
                        )
                    );
                }
            }
            setCheckedBrokenCarParts([...arr]);
        }
    };

    // OPEN FOLDER CHOOSE IMAGE
    const onOpenChooseImage = (inputRef) => {
        eval(inputRef.current.click());
    };

    // CHOOSE IMAGE
    const handleChooseImage = async (e, nameBrokenCarParts) => {
        let urlImgPreview = await URL.createObjectURL(e.target.files[0]);
        // IMAGE PREVIEW
        let obj = await { ...imagePreview };
        obj[`${nameBrokenCarParts}`] = urlImgPreview;
        setImagePreview({ ...obj });

        // SET DATA SEND API
        let data = await dataSendApi.brokenCarParts;
        data[`${nameBrokenCarParts}`] = {
            ...data[`${nameBrokenCarParts}`],
            image: e.target.files[0],
        };
        setDataSendApi({
            ...dataSendApi,
            brokenCarParts: { ...data },
        });
        // setErrorData({
        //     ...errorData,
        //     errorImage: false,
        // });
    };

    const handleChangeDescription = (e, nameBrokenCarParts) => {
        let data = dataSendApi.brokenCarParts;
        data[`${nameBrokenCarParts}`] = {
            ...data[`${nameBrokenCarParts}`],
            comment: e.target.value,
        };
        setDataSendApi({
            ...dataSendApi,
            brokenCarParts: { ...data },
        });
    };

    const carBrokenPartsConfirmation = async () => {
        let formData = new FormData();
        formData.append("isCarBroken", dataSendApi.isCarBroken);

        for (const property in dataSendApi.brokenCarParts) {
            if (dataSendApi.brokenCarParts[property].idBrokenCarParts) {
                formData.append(
                    "arrayIdBrokenCarParts[]",
                    dataSendApi.brokenCarParts[property].idBrokenCarParts
                );
            }
            if (dataSendApi.brokenCarParts[property].image) {
                formData.append(
                    "multipleImages",
                    dataSendApi.brokenCarParts[property].image
                );
            }
            if (dataSendApi.brokenCarParts[property].comment) {
                formData.append(
                    "arrayComment[]",
                    dataSendApi.brokenCarParts[property].comment
                );
            }
        }

        const res =
            await DialogCarStatusConfirmationServices.carBrokenPartsConfirmation(
                formData
            );
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setModalSuccess(true);
            } else {
                setModalError({
                    ...modalError,
                    open: true,
                    title: res.data.message,
                    content: null
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

    const onSubmit = async () => {
        // const resultValidate = await handleValidateData();
        // if (resultValidate) {
        setDialogConfirmation({
            ...dialogConfirmation,
            open: true,
            handleSubmit: () => {
                carBrokenPartsConfirmation();
            },
        });
        // }
    };

    const run = async () => {
        await setBackDrop(true);
        if (idScheduleStatus == Constants.ScheduleStatusCode.APPROVED) {
            setFormatContentDialog({
                title: `${Strings.DialogCarStatusConfirmation.CAR_STATUS_BEFORE_DEPARTURE} (Số: ${idSchedule})`,
                nameButtonSubmit:
                    Strings.DialogCarStatusConfirmation.RECEIVE_CAR,
                colorButtonSubmit:
                    Constants.ColorOfScheduleStatus.Background.RECEIVED,
            });
        } else if (idScheduleStatus == Constants.ScheduleStatusCode.MOVING) {
            setFormatContentDialog({
                title: `${Strings.DialogCarStatusConfirmation.CAR_STATUS_AFTER_DEPARTURE} (Số: ${idSchedule})`,
                nameButtonSubmit:
                    Strings.DialogCarStatusConfirmation.COMPLETE_SCHEDULE,
                colorButtonSubmit:
                    Constants.ColorOfScheduleStatus.Background.COMPLETE,
            });
        }
        await handleFormatArrayChecked({ ...dataSendApi.brokenCarParts });
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
            {/* CONTENT */}
            <DialogContent>
                <Box>
                    {/* TITLE */}
                    <Title>{formatContentDialog.title}</Title>

                    {/* CONTENT */}
                    <Box>
                        <Box>
                            <RadioGroupStyle
                                row
                                onChange={handleChangeIsCarBroken}
                                value={dataSendApi.isCarBroken}
                            >
                                <FormControlLabel
                                    value={false}
                                    control={
                                        <Radio
                                            checked={
                                                dataSendApi.isCarBroken == false
                                            }
                                        />
                                    }
                                    label={
                                        Strings.DialogCarStatusConfirmation.GOOD
                                    }
                                />
                                <FormControlLabel
                                    value={true}
                                    control={
                                        <Radio
                                            checked={
                                                dataSendApi.isCarBroken == true
                                            }
                                        />
                                    }
                                    label={
                                        Strings.DialogCarStatusConfirmation
                                            .HAVE_BROKEN_PARTS
                                    }
                                />
                            </RadioGroupStyle>
                        </Box>

                        <Divider />

                        <Collapse in={dataSendApi.isCarBroken}>
                            <BoxFloatLeft>
                                {/* FRONT OF CAR */}
                                <CheckBoxBrokenCar
                                    handleCheckBrokenCarParts={
                                        handleCheckBrokenCarParts
                                    }
                                    handleChangeDescription={
                                        handleChangeDescription
                                    }
                                    onOpenChooseImage={onOpenChooseImage}
                                    handleChooseImage={handleChooseImage}
                                    checkedBrokenCarParts={
                                        checkedBrokenCarParts
                                    }
                                    valueInput={
                                        dataSendApi.brokenCarParts.frontOfCar
                                            .comment
                                    }
                                    imagePreview={imagePreview.frontOfCar}
                                    nameBrokenCarParts={
                                        nameBrokenCarParts.FRONT_OF_CAR
                                    }
                                    brokenCarPartsCode={
                                        Constants.BrokenCarPartsCode
                                            .FRONT_OF_CAR
                                    }
                                    labelCheckBox={
                                        Strings.DialogCarStatusConfirmation
                                            .FRONT_OF_CAR
                                    }
                                    inputImageRef={inputImgFrontOfCar}
                                />

                                {/* CAR_FRONT_LIGHTS */}
                                <CheckBoxBrokenCar
                                    handleCheckBrokenCarParts={
                                        handleCheckBrokenCarParts
                                    }
                                    handleChangeDescription={
                                        handleChangeDescription
                                    }
                                    onOpenChooseImage={onOpenChooseImage}
                                    handleChooseImage={handleChooseImage}
                                    checkedBrokenCarParts={
                                        checkedBrokenCarParts
                                    }
                                    valueInput={
                                        dataSendApi.brokenCarParts
                                            .carFrontLights.comment
                                    }
                                    imagePreview={imagePreview.carFrontLights}
                                    nameBrokenCarParts={
                                        nameBrokenCarParts.CAR_FRONT_LIGHTS
                                    }
                                    brokenCarPartsCode={
                                        Constants.BrokenCarPartsCode
                                            .CAR_FRONT_LIGHTS
                                    }
                                    labelCheckBox={
                                        Strings.DialogCarStatusConfirmation
                                            .CAR_FRONT_LIGHTS
                                    }
                                    inputImageRef={inputImgCarFrontLights}
                                />
                            </BoxFloatLeft>

                            <BoxFloatLeft
                                sx={{
                                    marginLeft: {
                                        xl: 1,
                                    },
                                }}
                            >
                                {/* BACK_OF_CAR */}
                                <CheckBoxBrokenCar
                                    handleCheckBrokenCarParts={
                                        handleCheckBrokenCarParts
                                    }
                                    handleChangeDescription={
                                        handleChangeDescription
                                    }
                                    onOpenChooseImage={onOpenChooseImage}
                                    handleChooseImage={handleChooseImage}
                                    checkedBrokenCarParts={
                                        checkedBrokenCarParts
                                    }
                                    valueInput={
                                        dataSendApi.brokenCarParts.backOfCar
                                            .comment
                                    }
                                    imagePreview={imagePreview.backOfCar}
                                    nameBrokenCarParts={
                                        nameBrokenCarParts.BACK_OF_CAR
                                    }
                                    brokenCarPartsCode={
                                        Constants.BrokenCarPartsCode.BACK_OF_CAR
                                    }
                                    labelCheckBox={
                                        Strings.DialogCarStatusConfirmation
                                            .BACK_OF_CAR
                                    }
                                    inputImageRef={inputImgBackOfCar}
                                />

                                {/* CAR_BACK_LIGHTS */}
                                <CheckBoxBrokenCar
                                    handleCheckBrokenCarParts={
                                        handleCheckBrokenCarParts
                                    }
                                    handleChangeDescription={
                                        handleChangeDescription
                                    }
                                    onOpenChooseImage={onOpenChooseImage}
                                    handleChooseImage={handleChooseImage}
                                    checkedBrokenCarParts={
                                        checkedBrokenCarParts
                                    }
                                    valueInput={
                                        dataSendApi.brokenCarParts.carBackLights
                                            .comment
                                    }
                                    imagePreview={imagePreview.carBackLights}
                                    nameBrokenCarParts={
                                        nameBrokenCarParts.CAR_BACK_LIGHTS
                                    }
                                    brokenCarPartsCode={
                                        Constants.BrokenCarPartsCode
                                            .CAR_BACK_LIGHTS
                                    }
                                    labelCheckBox={
                                        Strings.DialogCarStatusConfirmation
                                            .CAR_BACK_LIGHTS
                                    }
                                    inputImageRef={inputImgCarBackLights}
                                />
                            </BoxFloatLeft>

                            <BoxFloatLeft
                                sx={{
                                    marginLeft: {
                                        xl: 1,
                                    },
                                }}
                            >
                                {/* LEFT_CAR_BODY */}
                                <CheckBoxBrokenCar
                                    handleCheckBrokenCarParts={
                                        handleCheckBrokenCarParts
                                    }
                                    handleChangeDescription={
                                        handleChangeDescription
                                    }
                                    onOpenChooseImage={onOpenChooseImage}
                                    handleChooseImage={handleChooseImage}
                                    checkedBrokenCarParts={
                                        checkedBrokenCarParts
                                    }
                                    valueInput={
                                        dataSendApi.brokenCarParts.leftCarBody
                                            .comment
                                    }
                                    imagePreview={imagePreview.leftCarBody}
                                    nameBrokenCarParts={
                                        nameBrokenCarParts.LEFT_CAR_BODY
                                    }
                                    brokenCarPartsCode={
                                        Constants.BrokenCarPartsCode
                                            .LEFT_CAR_BODY
                                    }
                                    labelCheckBox={
                                        Strings.DialogCarStatusConfirmation
                                            .LEFT_CAR_BODY
                                    }
                                    inputImageRef={inputImgLeftCarBody}
                                />

                                {/* RIGHT_CAR_BODY */}
                                <CheckBoxBrokenCar
                                    handleCheckBrokenCarParts={
                                        handleCheckBrokenCarParts
                                    }
                                    handleChangeDescription={
                                        handleChangeDescription
                                    }
                                    onOpenChooseImage={onOpenChooseImage}
                                    handleChooseImage={handleChooseImage}
                                    checkedBrokenCarParts={
                                        checkedBrokenCarParts
                                    }
                                    valueInput={
                                        dataSendApi.brokenCarParts.rightCarBody
                                            .comment
                                    }
                                    imagePreview={imagePreview.rightCarBody}
                                    nameBrokenCarParts={
                                        nameBrokenCarParts.RIGHT_CAR_BODY
                                    }
                                    brokenCarPartsCode={
                                        Constants.BrokenCarPartsCode
                                            .RIGHT_CAR_BODY
                                    }
                                    labelCheckBox={
                                        Strings.DialogCarStatusConfirmation
                                            .RIGHT_CAR_BODY
                                    }
                                    inputImageRef={inputImgRightCarBody}
                                />
                            </BoxFloatLeft>

                            <BoxFloatLeft
                                sx={{
                                    marginLeft: {
                                        xl: 1,
                                    },
                                }}
                            >
                                {/* CAR_CONTROL_CENTER */}
                                <CheckBoxBrokenCar
                                    handleCheckBrokenCarParts={
                                        handleCheckBrokenCarParts
                                    }
                                    handleChangeDescription={
                                        handleChangeDescription
                                    }
                                    onOpenChooseImage={onOpenChooseImage}
                                    handleChooseImage={handleChooseImage}
                                    checkedBrokenCarParts={
                                        checkedBrokenCarParts
                                    }
                                    valueInput={
                                        dataSendApi.brokenCarParts
                                            .carControlCenter.comment
                                    }
                                    imagePreview={imagePreview.carControlCenter}
                                    nameBrokenCarParts={
                                        nameBrokenCarParts.CAR_CONTROL_CENTER
                                    }
                                    brokenCarPartsCode={
                                        Constants.BrokenCarPartsCode
                                            .CAR_CONTROL_CENTER
                                    }
                                    labelCheckBox={
                                        Strings.DialogCarStatusConfirmation
                                            .CAR_CONTROL_CENTER
                                    }
                                    inputImageRef={inputImgCarControlCenter}
                                />

                                {/* OTHER_CAR_PARTS */}
                                <CheckBoxBrokenCar
                                    handleCheckBrokenCarParts={
                                        handleCheckBrokenCarParts
                                    }
                                    handleChangeDescription={
                                        handleChangeDescription
                                    }
                                    onOpenChooseImage={onOpenChooseImage}
                                    handleChooseImage={handleChooseImage}
                                    checkedBrokenCarParts={
                                        checkedBrokenCarParts
                                    }
                                    valueInput={
                                        dataSendApi.brokenCarParts.otherCarParts
                                            .comment
                                    }
                                    imagePreview={imagePreview.otherCarParts}
                                    nameBrokenCarParts={
                                        nameBrokenCarParts.OTHER_CAR_PARTS
                                    }
                                    brokenCarPartsCode={
                                        Constants.BrokenCarPartsCode
                                            .OTHER_CAR_PARTS
                                    }
                                    labelCheckBox={
                                        Strings.DialogCarStatusConfirmation
                                            .OTHER_CAR_PARTS
                                    }
                                    inputImageRef={inputImgOtherCarParts}
                                />
                            </BoxFloatLeft>
                        </Collapse>
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

                    {/* SUBMIT BUTTON */}
                    <ButtonFeatures
                        size="small"
                        variant="contained"
                        endIcon={<CheckCircleIcon />}
                        sx={{
                            marginRight: 1,
                            backgroundColor:
                                formatContentDialog.colorButtonSubmit ||
                                theme.palette.primary.main,
                        }}
                        onClick={onSubmit}
                    >
                        {formatContentDialog.nameButtonSubmit}
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

            <ModalSuccess
                open={modalSuccess}
                handleClose={() => setModalSuccess(false)}
            />
            <BackDrop open={backDrop} />
        </DialogContainer>
    );
}

export default DialogCarStatusConfirmation;
