import { useState, useEffect } from "react";
import { Box, DialogActions, DialogContent, useTheme } from "@mui/material";
import {
    ButtonFeatures,
    DialogContainer,
    Title,
} from "./DialogChangeCarCustomStyles";
import CancelIcon from "@mui/icons-material/Cancel";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import DataGridCustom from "../../dataGridCustom/DataGridCustom";
import Constants from "../../../constants/Constants";
import col from "./columnsDialogChangeCarDataGrid";

function DialogChangeCar({ open, handleClose }) {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });
    const [dataInfo, setDataInfo] = useState({
        page: Constants.Common.PAGE,
        pageSize: Constants.Common.LIMIT_ENTRY,
        totalRows: 0,
    });
    const [dialogConfirmation, setDialogConfirmation] = useState({
        open: false,
        title: Strings.Common.DO_YOU_WANT_TO_CONFIRM_MOVING,
        content: Strings.Common.MOVING_CONFIRMATION,
        handleSubmit: () => {},
    });

    // const getSchedule = async () => {
    //     const res = await DialogShowScheduleDriverServices.getSchedule({
    //         idSchedule: idSchedule,
    //     });
    //     // axios success
    //     if (res.data) {
    //         if (res.data.status == Constants.ApiCode.OK) {
    //             setSchedule(res.data.data);
    //             setDialogCarStatusConfirmation({
    //                 ...dialogCarStatusConfirmation,
    //                 open: false,
    //                 idSchedule: res.data.data[0].idSchedule,
    //                 idScheduleStatus: res.data.data[0].idScheduleStatus,
    //             });
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
    //     // (await open) && getSchedule();
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
            <DialogContent>
                <Box>
                    {/* TITLE */}
                    <Title>title</Title>

                    {/* CONTENT */}
                    <Box>
                        <DataGridCustom
                            selectSingleRowOnClick={true}
                            columns={col()}
                            rows={[
                                {
                                    id: 1,
                                    imageCar: "",
                                    idCar: 3,
                                    type: "",
                                    licensePlates: "",
                                },
                                {
                                    id: 2,
                                    imageCar: "",
                                    idCar: 4,
                                    type: "",
                                    licensePlates: "",
                                },
                            ]}
                            {...dataInfo}
                            onChangePage={(e) => {
                                // handleChangePage(e);
                            }}
                            onChangeRowsPerPage={(e) => {
                                // handleChangeRowsPerPage(e);
                            }}
                            handleSelectRow={(e) => console.log("e", e)}
                        />
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

export default DialogChangeCar;
