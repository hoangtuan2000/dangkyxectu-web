import { useState, useEffect, useRef } from "react";
import {
    Box,
    Collapse,
    DialogActions,
    DialogContent,
    Divider,
    FormControlLabel,
    FormHelperText,
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
import DialogConfirmation from "../../dialogConfirmation/DialogConfirmation";
import { DialogCarStatusConfirmationServices } from "../../../services/driverServices/DialogCarStatusConfirmationServices";

const nameCarParts = {
    FRONT_OF_CAR: "frontOfCar",
    BACK_OF_CAR: "backOfCar",
    CAR_FRONT_LIGHTS: "carFrontLights",
    CAR_BACK_LIGHTS: "carBackLights",
    LEFT_CAR_BODY: "leftCarBody",
    RIGHT_CAR_BODY: "rightCarBody",
    CAR_CONTROL_CENTER: "carControlCenter",
    OTHER_CAR_PARTS: "otherCarParts",
};

const interfaceBrokenCarParts = {
    idCarParts: null,
    image: null,
    comment: "",
};

const interfaceErrorData = {
    image: false,
    comment: false,
};

function DialogCarStatusConfirmation({
    open,
    handleClose,
    idSchedule,
    idScheduleStatus,
    openModalSuccessOfDialogShowSheduleDriver,
    getScheduleOfDialogShowSheduleDriver,
    getDriverScheduleListOfDriverTripManager
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
        title: Strings.Common.DO_YOU_WANT_TO_UPDATE,
        content: Strings.Common.UPDATE_CONFIRMATION,
        handleSubmit: () => {},
    });

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

    const [formatContentDialog, setFormatContentDialog] = useState({
        title: "",
        nameButtonSubmit: "",
        colorButtonSubmit: "",
    });

    const [checkedCarParts, setCheckedCarParts] = useState([]);

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

    const [errorData, setErrorData] = useState({
        isCarBroken: false,
        errorAllCarParts: false,
        frontOfCar: { ...interfaceErrorData },
        backOfCar: { ...interfaceErrorData },
        carFrontLights: { ...interfaceErrorData },
        carBackLights: { ...interfaceErrorData },
        leftCarBody: { ...interfaceErrorData },
        rightCarBody: { ...interfaceErrorData },
        carControlCenter: { ...interfaceErrorData },
        otherCarParts: { ...interfaceErrorData },
    });

    const handleChangeIsCarBroken = (e) => {
        setDataSendApi({
            ...dataSendApi,
            isCarBroken: e.target.value === "true", // e.target.value === 'true' => convert boolean
        });
    };

    const handleCheckBrokenCarParts = async (e, nameCarParts) => {
        if (e.target.checked) {
            let data = await { ...dataSendApi.brokenCarParts };
            data[`${nameCarParts}`] = await {
                ...data[`${nameCarParts}`],
                idCarParts: e.target.value,
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
            data[`${nameCarParts}`] = await {
                ...data[`${nameCarParts}`],
                idCarParts: null,
            };
            handleFormatArrayChecked(data);
            setDataSendApi({
                ...dataSendApi,
                brokenCarParts: { ...data },
            });
        }

        setErrorData({
            ...errorData,
            errorAllCarParts: false,
        });
    };

    const handleFormatArrayChecked = (objDataCarParts) => {
        if (objDataCarParts) {
            let arr = [];
            for (const nameBroken in objDataCarParts) {
                if (objDataCarParts[nameBroken]["idCarParts"]) {
                    arr.push(
                        parseInt(objDataCarParts[nameBroken]["idCarParts"])
                    );
                }
            }
            setCheckedCarParts([...arr]);
        }
    };

    // OPEN FOLDER CHOOSE IMAGE
    const onOpenChooseImage = (inputRef) => {
        eval(inputRef.current.click());
    };

    // CHOOSE IMAGE
    const handleChooseImage = async (e, nameCarParts) => {
        let urlImgPreview = await URL.createObjectURL(e.target.files[0]);
        // IMAGE PREVIEW
        let obj = await { ...imagePreview };
        obj[`${nameCarParts}`] = urlImgPreview;
        setImagePreview({ ...obj });

        // SET DATA SEND API
        let data = await dataSendApi.brokenCarParts;
        data[`${nameCarParts}`] = {
            ...data[`${nameCarParts}`],
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

    const handleChangeDescription = (e, nameCarParts) => {
        let data = dataSendApi.brokenCarParts;
        data[`${nameCarParts}`] = {
            ...data[`${nameCarParts}`],
            comment: e.target.value,
        };
        setDataSendApi({
            ...dataSendApi,
            brokenCarParts: { ...data },
        });
    };

    const carBrokenPartsConfirmation = async () => {
        await setBackDrop(true);
        let formData = new FormData();
        formData.append("idSchedule", idSchedule);
        formData.append("isCarBroken", dataSendApi.isCarBroken);

        for (const property in dataSendApi.brokenCarParts) {
            if (dataSendApi.brokenCarParts[property].idCarParts) {
                formData.append(
                    "arrayIdCarParts[]",
                    dataSendApi.brokenCarParts[property].idCarParts
                );
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
        }

        const res =
            await DialogCarStatusConfirmationServices.carBrokenPartsConfirmation(
                formData
            );
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                openModalSuccessOfDialogShowSheduleDriver()
                getScheduleOfDialogShowSheduleDriver()
                getDriverScheduleListOfDriverTripManager()
                handleClose()
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

    const handleValidateData = () => {
        if (dataSendApi.isCarBroken == true) {
            const arrNameCarParts = [
                nameCarParts.FRONT_OF_CAR,
                nameCarParts.BACK_OF_CAR,
                nameCarParts.CAR_FRONT_LIGHTS,
                nameCarParts.CAR_BACK_LIGHTS,
                nameCarParts.LEFT_CAR_BODY,
                nameCarParts.RIGHT_CAR_BODY,
                nameCarParts.CAR_CONTROL_CENTER,
                nameCarParts.OTHER_CAR_PARTS,
            ];

            let error = errorData;
            let numberBrokenCarParts = 0;
            let numberError = 0;
            // CHECK EMPTY IMAGE OR COMMENT
            arrNameCarParts.map((item) => {
                if (dataSendApi.brokenCarParts[`${item}`].idCarParts) {
                    numberBrokenCarParts += 1;
                    if (!dataSendApi.brokenCarParts[`${item}`].image) {
                        error[`${item}`].image = true;
                        numberError += 1;
                    } else {
                        error[`${item}`].image = false;
                    }

                    if (!dataSendApi.brokenCarParts[`${item}`].comment) {
                        error[`${item}`].comment = true;
                        numberError += 1;
                    } else {
                        error[`${item}`].comment = false;
                    }
                }
            });

            // NOT CHECK CAR PARTS
            if (numberBrokenCarParts <= 0) {
                error.errorAllCarParts = true;
                numberError += 1;
            }else{
                error.errorAllCarParts = false;
            }

            setErrorData({
                ...error,
            });

            return numberError > 0 ? false : true;
        } else if (dataSendApi.isCarBroken == false) {
            setErrorData({
                ...errorData,
                isCarBroken: false,
            });
            return true;
        } else {
            setErrorData({
                ...errorData,
                isCarBroken: true,
            });
            return false;
        }
    };

    const onSubmit = async () => {
        const resultValidate = await handleValidateData();
        if (resultValidate) {
            setDialogConfirmation({
                ...dialogConfirmation,
                open: true,
                handleSubmit: () => {
                    carBrokenPartsConfirmation();
                },
            });
        }
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
            setDialogConfirmation({
                ...dialogConfirmation,
                title: Strings.Common.DO_YOU_WANT_TO_RECEIVE_CAR,
                content: Strings.Common.RECEIVE_CAR_CONFIRMATION,
            });
        } else if (idScheduleStatus == Constants.ScheduleStatusCode.MOVING) {
            setFormatContentDialog({
                title: `${Strings.DialogCarStatusConfirmation.CAR_STATUS_AFTER_DEPARTURE} (Số: ${idSchedule})`,
                nameButtonSubmit:
                    Strings.DialogCarStatusConfirmation.COMPLETE_SCHEDULE,
                colorButtonSubmit:
                    Constants.ColorOfScheduleStatus.Background.COMPLETE,
            });
            setDialogConfirmation({
                ...dialogConfirmation,
                title: Strings.Common.DO_YOU_WANT_TO_RETURN_CAR,
                content: Strings.Common.RETURN_CAR_CONFIRMATION,
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
                                {errorData.isCarBroken && (
                                    <FormHelperText error={true}>
                                        {
                                            Strings.DialogCarStatusConfirmation
                                                .PLEASE_CHOOSE_CAR_STATUS
                                        }
                                    </FormHelperText>
                                )}
                                {errorData.errorAllCarParts && (
                                    <FormHelperText error={true}>
                                        {
                                            Strings.DialogCarStatusConfirmation
                                                .PLEASE_CHOOSE_BROKEN_CAR_PARTS
                                        }
                                    </FormHelperText>
                                )}
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
                                    checkedCarParts={checkedCarParts}
                                    valueInput={
                                        dataSendApi.brokenCarParts.frontOfCar
                                            .comment
                                    }
                                    imagePreview={imagePreview.frontOfCar}
                                    nameCarParts={nameCarParts.FRONT_OF_CAR}
                                    carPartsCode={
                                        Constants.CarPartsCode.FRONT_OF_CAR
                                    }
                                    labelCheckBox={
                                        Strings.DialogCarStatusConfirmation
                                            .FRONT_OF_CAR
                                    }
                                    inputImageRef={inputImgFrontOfCar}
                                    errorComment={errorData.frontOfCar.comment}
                                    errorImage={errorData.frontOfCar.image}
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
                                    checkedCarParts={checkedCarParts}
                                    valueInput={
                                        dataSendApi.brokenCarParts
                                            .carFrontLights.comment
                                    }
                                    imagePreview={imagePreview.carFrontLights}
                                    nameCarParts={nameCarParts.CAR_FRONT_LIGHTS}
                                    carPartsCode={
                                        Constants.CarPartsCode.CAR_FRONT_LIGHTS
                                    }
                                    labelCheckBox={
                                        Strings.DialogCarStatusConfirmation
                                            .CAR_FRONT_LIGHTS
                                    }
                                    inputImageRef={inputImgCarFrontLights}
                                    errorComment={
                                        errorData.carFrontLights.comment
                                    }
                                    errorImage={errorData.carFrontLights.image}
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
                                    checkedCarParts={checkedCarParts}
                                    valueInput={
                                        dataSendApi.brokenCarParts.backOfCar
                                            .comment
                                    }
                                    imagePreview={imagePreview.backOfCar}
                                    nameCarParts={nameCarParts.BACK_OF_CAR}
                                    carPartsCode={
                                        Constants.CarPartsCode.BACK_OF_CAR
                                    }
                                    labelCheckBox={
                                        Strings.DialogCarStatusConfirmation
                                            .BACK_OF_CAR
                                    }
                                    inputImageRef={inputImgBackOfCar}
                                    errorComment={errorData.backOfCar.comment}
                                    errorImage={errorData.backOfCar.image}
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
                                    checkedCarParts={checkedCarParts}
                                    valueInput={
                                        dataSendApi.brokenCarParts.carBackLights
                                            .comment
                                    }
                                    imagePreview={imagePreview.carBackLights}
                                    nameCarParts={nameCarParts.CAR_BACK_LIGHTS}
                                    carPartsCode={
                                        Constants.CarPartsCode.CAR_BACK_LIGHTS
                                    }
                                    labelCheckBox={
                                        Strings.DialogCarStatusConfirmation
                                            .CAR_BACK_LIGHTS
                                    }
                                    inputImageRef={inputImgCarBackLights}
                                    errorComment={
                                        errorData.carBackLights.comment
                                    }
                                    errorImage={errorData.carBackLights.image}
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
                                    checkedCarParts={checkedCarParts}
                                    valueInput={
                                        dataSendApi.brokenCarParts.leftCarBody
                                            .comment
                                    }
                                    imagePreview={imagePreview.leftCarBody}
                                    nameCarParts={nameCarParts.LEFT_CAR_BODY}
                                    carPartsCode={
                                        Constants.CarPartsCode.LEFT_CAR_BODY
                                    }
                                    labelCheckBox={
                                        Strings.DialogCarStatusConfirmation
                                            .LEFT_CAR_BODY
                                    }
                                    inputImageRef={inputImgLeftCarBody}
                                    errorComment={errorData.leftCarBody.comment}
                                    errorImage={errorData.leftCarBody.image}
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
                                    checkedCarParts={checkedCarParts}
                                    valueInput={
                                        dataSendApi.brokenCarParts.rightCarBody
                                            .comment
                                    }
                                    imagePreview={imagePreview.rightCarBody}
                                    nameCarParts={nameCarParts.RIGHT_CAR_BODY}
                                    carPartsCode={
                                        Constants.CarPartsCode.RIGHT_CAR_BODY
                                    }
                                    labelCheckBox={
                                        Strings.DialogCarStatusConfirmation
                                            .RIGHT_CAR_BODY
                                    }
                                    inputImageRef={inputImgRightCarBody}
                                    errorComment={
                                        errorData.rightCarBody.comment
                                    }
                                    errorImage={errorData.rightCarBody.image}
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
                                    checkedCarParts={checkedCarParts}
                                    valueInput={
                                        dataSendApi.brokenCarParts
                                            .carControlCenter.comment
                                    }
                                    imagePreview={imagePreview.carControlCenter}
                                    nameCarParts={
                                        nameCarParts.CAR_CONTROL_CENTER
                                    }
                                    carPartsCode={
                                        Constants.CarPartsCode
                                            .CAR_CONTROL_CENTER
                                    }
                                    labelCheckBox={
                                        Strings.DialogCarStatusConfirmation
                                            .CAR_CONTROL_CENTER
                                    }
                                    inputImageRef={inputImgCarControlCenter}
                                    errorComment={
                                        errorData.carControlCenter.comment
                                    }
                                    errorImage={
                                        errorData.carControlCenter.image
                                    }
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
                                    checkedCarParts={checkedCarParts}
                                    valueInput={
                                        dataSendApi.brokenCarParts.otherCarParts
                                            .comment
                                    }
                                    imagePreview={imagePreview.otherCarParts}
                                    nameCarParts={nameCarParts.OTHER_CAR_PARTS}
                                    carPartsCode={
                                        Constants.CarPartsCode.OTHER_CAR_PARTS
                                    }
                                    labelCheckBox={
                                        Strings.DialogCarStatusConfirmation
                                            .OTHER_CAR_PARTS
                                    }
                                    inputImageRef={inputImgOtherCarParts}
                                    errorComment={
                                        errorData.otherCarParts.comment
                                    }
                                    errorImage={errorData.otherCarParts.image}
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
