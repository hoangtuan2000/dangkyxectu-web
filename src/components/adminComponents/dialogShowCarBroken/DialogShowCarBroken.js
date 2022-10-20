import { useState, useEffect } from "react";
import {
    Box,
    DialogActions,
    DialogContent,
    Tab,
    Tabs,
    useTheme,
} from "@mui/material";
import {
    ButtonFeatures,
    BoxFloatLeft,
    DialogContainer,
    Title,
    BoxImg,
    Img,
    TextInput,
} from "./DialogShowCarBrokenCustomStyles";
import CancelIcon from "@mui/icons-material/Cancel";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import Constants from "../../../constants/Constants";
import { DialogShowCarBrokenServices } from "../../../services/adminServices/DialogShowCarBrokenServices";

function DialogShowCarBroken({ open, handleClose, idSchedule }) {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [tab, setTab] = useState(0);
    const [carPartBroken, setCarPartBroken] = useState({});

    const getScheduleBrokenCarParts = async () => {
        const res = await DialogShowCarBrokenServices.getScheduleBrokenCarParts(
            {
                idSchedule: idSchedule,
            }
        );

        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setCarPartBroken({ ...res.data.data });
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

    const handleChangeTabs = (event, newValue) => {
        setTab(newValue);
    };

    const run = async () => {
        await setBackDrop(true);
        (await open) && getScheduleBrokenCarParts();
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    useEffect(() => {
        run();
    }, [idSchedule, open]);

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
                    <Title>{Strings.DialogShowCarBroken.TITLE}</Title>

                    {/* CONTENT */}
                    <Box>
                        <Tabs
                            value={tab}
                            onChange={handleChangeTabs}
                            sx={{ marginBottom: "10px" }}
                        >
                            <Tab value={0} label="Trước Khi Đi" />
                            <Tab value={1} label="Sau Khi Đi" />
                        </Tabs>

                        <Box>
                            {/* CAR PART BROKEN BEFORE RUNS */}
                            {tab == 0 &&
                                carPartBroken.hasOwnProperty("beforeCarRuns") &&
                                (carPartBroken.beforeCarRuns.isCarBroken ? (
                                    carPartBroken.beforeCarRuns.brokenCarParts.map(
                                        (item, index) => {
                                            return (
                                                <BoxFloatLeft key={index}>
                                                    <p
                                                        style={{
                                                            fontSize: "15px",
                                                            margin: 1,
                                                            marginTop: 8,
                                                            marginBottom: 8,
                                                            color: theme.palette
                                                                .error.main,
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {
                                                            item.nameBrokenCarParts
                                                        }
                                                    </p>
                                                    <TextInput
                                                        label={
                                                            Strings.Common
                                                                .DESCRIPTION
                                                        }
                                                        value={item.comment}
                                                        multiline
                                                        disabled
                                                    />
                                                    <BoxImg>
                                                        <Img src={item.image} />
                                                    </BoxImg>
                                                </BoxFloatLeft>
                                            );
                                        }
                                    )
                                ) : (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: "17px",
                                                margin: 1,
                                                marginTop: 8,
                                                marginBottom: 8,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Không Có Bộ Phận Bị Hỏng
                                        </p>
                                    </Box>
                                ))}

                            {/* CAR PART BROKEN AFTER RUNS */}
                            {tab == 1 &&
                                carPartBroken.hasOwnProperty("afterCarRuns") &&
                                (carPartBroken.afterCarRuns.isCarBroken ? (
                                    carPartBroken.afterCarRuns.brokenCarParts.map(
                                        (item, index) => {
                                            return (
                                                <BoxFloatLeft key={index}>
                                                    <p
                                                        style={{
                                                            fontSize: "15px",
                                                            margin: 1,
                                                            marginTop: 8,
                                                            marginBottom: 8,
                                                            color: theme.palette
                                                                .error.main,
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {
                                                            item.nameBrokenCarParts
                                                        }
                                                    </p>
                                                    <TextInput
                                                        label={
                                                            Strings.Common
                                                                .DESCRIPTION
                                                        }
                                                        value={item.comment}
                                                        multiline
                                                        disabled
                                                    />
                                                    <BoxImg>
                                                        <Img src={item.image} />
                                                    </BoxImg>
                                                </BoxFloatLeft>
                                            );
                                        }
                                    )
                                ) : (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: "17px",
                                                margin: 1,
                                                marginTop: 8,
                                                marginBottom: 8,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Không Có Bộ Phận Bị Hỏng
                                        </p>
                                    </Box>
                                ))}
                        </Box>
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

export default DialogShowCarBroken;
