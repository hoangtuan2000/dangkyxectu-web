import { useState, useEffect } from "react";
import {
    Box,
    Checkbox,
    DialogActions,
    DialogContent,
    Divider,
    FormControlLabel,
    FormGroup,
    Radio,
    useTheme,
} from "@mui/material";
import {
    BoxLeft,
    BoxRight,
    ButtonFeatures,
    DialogContainer,
    FormGroupStyle,
    RadioGroupStyle,
    Title,
} from "./DialogCarStatusConfirmationCustomStyles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Constants from "../../../constants/Constants";
import { DialogShowScheduleDriverServices } from "../../../services/driverServices/DialogShowScheduleDriverServices";
import helper from "../../../common/helper";

function DialogCarStatusConfirmation({
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
    const [dataSendApi, setDataSendApi] = useState({
        isCarFail: false,
    });

    const handleChangeIsCarFail = (e) => {
        setDataSendApi({
            ...dataSendApi,
            isCarFail: e.target.value === "true", // e.target.value === 'true' => convert boolean
        });
    };

    console.log(dataSendApi);

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

    // const run = async () => {
    //     await setBackDrop(true);
    //     (await open) && getSchedule();
    //     await setTimeout(() => {
    //         setBackDrop(false);
    //     }, 1000);
    // };

    // useEffect(() => {
    //     run();
    // }, [idSchedule]);

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
                    <Title>{titleDialog}</Title>

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
                                    control={<Radio />}
                                    label={
                                        Strings.DialogCarStatusConfirmation.GOOD
                                    }
                                />
                                <FormControlLabel
                                    value={true}
                                    control={<Radio />}
                                    label={
                                        Strings.DialogCarStatusConfirmation
                                            .HAVE_BROKEN_PARTS
                                    }
                                />
                            </RadioGroupStyle>
                        </Box>

                        <Divider />

                        {dataSendApi.isCarFail && (
                            <>
                                <BoxLeft>
                                    <FormGroupStyle>
                                        <FormControlLabel
                                            control={
                                                <Checkbox defaultChecked />
                                            }
                                            label="Label"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            label="Disabled"
                                        />
                                    </FormGroupStyle>
                                </BoxLeft>

                                <BoxRight>
                                    <FormGroupStyle>
                                        <FormControlLabel
                                            control={
                                                <Checkbox defaultChecked />
                                            }
                                            label="Label"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            label="Disabled"
                                        />
                                    </FormGroupStyle>
                                </BoxRight>
                            </>
                        )}
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
