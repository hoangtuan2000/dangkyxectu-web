import { useState, useEffect, useRef } from "react";
import {
    Box,
    Checkbox,
    Collapse,
    DialogActions,
    DialogContent,
    Divider,
    FormControlLabel,
    Radio,
    useTheme,
} from "@mui/material";
import {
    BoxImg,
    ButtonFeatures,
    BoxFloatLeft,
    DialogContainer,
    FormGroupStyle,
    Img,
    RadioGroupStyle,
    TextInput,
    Title,
} from "./DialogCarStatusConfirmationCustomStyles";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import Constants from "../../../constants/Constants";

function DialogCarStatusConfirmation({ open, handleClose, idSchedule }) {
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

    const [schedule, setSchedule] = useState([]);
    const [dataSendApi, setDataSendApi] = useState({
        isCarFail: false,
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

    const handleChangeIsCarFail = (e) => {
        setDataSendApi({
            ...dataSendApi,
            isCarFail: e.target.value === "true", // e.target.value === 'true' => convert boolean
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
        console.log("call handleFormatArrayChecked", objDataBrokenCarParts);
        if (objDataBrokenCarParts) {
            let arr = [];
            for (const nameBroken in objDataBrokenCarParts) {
                if (objDataBrokenCarParts[nameBroken]["idBrokenCarParts"]) {
                    console.log(
                        "push",
                        objDataBrokenCarParts[nameBroken]["idBrokenCarParts"]
                    );
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
        // console.log("e.target.value", e.target.value);
        // console.log("e", e);
        let data =  dataSendApi.brokenCarParts;
        data[`${nameBrokenCarParts}`] = {
            ...data[`${nameBrokenCarParts}`],
            comment: e.target.value,
        };
        setDataSendApi({
            ...dataSendApi,
            brokenCarParts: { ...data },
        });
    };

    console.log("3", dataSendApi);
    console.log("4", checkedBrokenCarParts);

    // const getSchedule = async () => {
    //     const res = await DialogShowScheduleDriverServices.getSchedule({
    //         idSchedule: idSchedule,
    //     });
    //     // axios success
    //     if (res.data) {
    //         if (res.data.status == Constants.ApiCode.OK) {
    //             setSchedule(res.data.data);
    //         } else {
    //             setModalError({
    //                 ...modalError,
    //                 open: true,
    //                 title: res.data.message,
    //             });
    //         }
    //     }
    //     // axios fail
    //     else {
    //         setModalError({
    //             ...modalError,
    //             open: true,
    //             title:
    //                 (res.request &&
    //                     `${Strings.Common.AN_ERROR_OCCURRED} (${res.request.status})`) ||
    //                 Strings.Common.ERROR,
    //             content: res.name || null,
    //         });
    //     }
    // };

    const run = async () => {
        await setBackDrop(true);
        // (await open) && getSchedule();
        await handleFormatArrayChecked({ ...dataSendApi.brokenCarParts });
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    const CheckBoxBrokenCar = ({
        handleCheckBrokenCarParts,
        handleChangeDescription,
        nameBrokenCarParts,
        brokenCarPartsCode,
        labelCheckBox,
        inputImageRef,
    }) => {
        return (
            <Box>
                <FormGroupStyle
                    onChange={(e) =>
                        handleCheckBrokenCarParts(e, nameBrokenCarParts)
                    }
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checkedBrokenCarParts.includes(
                                    brokenCarPartsCode
                                )}
                            />
                        }
                        label={labelCheckBox}
                        value={brokenCarPartsCode}
                    />
                </FormGroupStyle>
                <Collapse
                    in={checkedBrokenCarParts.includes(brokenCarPartsCode)}
                >
                    <Box mb={1}>
                        <TextInput
                            id={`${nameBrokenCarParts}`}
                            onChange={(e) =>
                                handleChangeDescription(e, nameBrokenCarParts)
                            }
                            label={Strings.Common.DESCRIPTION}
                            value={dataSendApi.brokenCarParts[`${nameBrokenCarParts}`].comment}
                            multiline
                        />
                    </Box>
                    <Box>
                        <input
                            ref={inputImageRef}
                            type="file"
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={(e) =>
                                handleChooseImage(e, nameBrokenCarParts)
                            }
                        />
                        <BoxImg
                            onClick={() => onOpenChooseImage(inputImageRef)}
                            sx={
                                {
                                    // borderColor:
                                    //     errorData.errorImage &&
                                    //     theme.palette.error.main,
                                }
                            }
                        >
                            {imagePreview[`${nameBrokenCarParts}`] && (
                                <Img
                                    src={imagePreview[`${nameBrokenCarParts}`]}
                                />
                            )}
                            <CameraAltIcon
                                sx={{
                                    fontSize: "40px !important",
                                    // color: errorData.errorImage
                                    //     ? theme.palette.error.main
                                    //     : theme.palette.text
                                    //           .secondary,
                                    opacity: "0.3 !important",
                                    zIndex: 999999,
                                    position: "absolute",
                                    top: "35%",
                                }}
                            />
                        </BoxImg>
                    </Box>
                </Collapse>
            </Box>
        );
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
                    <Title>
                        {
                            Strings.DialogCarStatusConfirmation
                                .CAR_STATUS_BEFORE_DEPARTURE
                        }
                    </Title>

                    {/* CONTENT */}
                    <Box>
                        <Box>
                            <RadioGroupStyle
                                row
                                onChange={handleChangeIsCarFail}
                                value={dataSendApi.isCarFail}
                            >
                                <FormControlLabel
                                    value={false}
                                    control={
                                        <Radio
                                            checked={
                                                dataSendApi.isCarFail == false
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
                                                dataSendApi.isCarFail == true
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

                        <Collapse in={dataSendApi.isCarFail}>
                            <BoxFloatLeft>
                                {/* FRONT OF CAR */}
                                <CheckBoxBrokenCar
                                    handleCheckBrokenCarParts={
                                        handleCheckBrokenCarParts
                                    }
                                    handleChangeDescription={
                                        handleChangeDescription
                                    }
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

export default DialogCarStatusConfirmation;
