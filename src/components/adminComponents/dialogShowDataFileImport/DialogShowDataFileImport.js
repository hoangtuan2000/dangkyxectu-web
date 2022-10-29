import { useState, useEffect } from "react";
import {
    Box,
    DialogActions,
    DialogContent,
    Tooltip,
    useTheme,
} from "@mui/material";
import {
    ButtonFeatures,
    DialogContainer,
    Title,
} from "./DialogShowDataFileImportCustomStyles";
import CancelIcon from "@mui/icons-material/Cancel";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import BackDrop from "../../backDrop/BackDrop";
import BackupIcon from "@mui/icons-material/Backup";
import DataGridCustomModeClient from "../../dataGridCustomModeClient/DataGridCustomModeClient";
import DialogConfirmation from "../../dialogConfirmation/DialogConfirmation";

function DialogShowDataFileImport({ open, handleClose, data, nameFile, onSubmit }) {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [dialogConfirmation, setDialogConfirmation] = useState({
        open: false,
        title: Strings.Common.DO_YOU_WANT_TO_UPLOAD_FILE,
        content: Strings.Common.UPLOAD_FILE_CONFIRMATION,
        handleSubmit: () => {},
    });

    const [title, setTitle] = useState(Strings.Common.FILE_CONTENT);

    const [columns, setColumns] = useState([
        {
            field: "id",
            headerName: "STT",
            width: 30,
            sortable: false,
        },
    ]);
    const [rows, setRows] = useState([]);

    const handleFormatColumns = () => {
        Array.isArray(data) &&
            data.length > 0 &&
            setColumns([
                {
                    field: "id",
                    headerName: "STT",
                    width: 30,
                    sortable: false,
                },
                ...data[0].map((item, index) => {
                    return {
                        flex: 1,
                        field: `${index}`,
                        headerName: item,
                        description: item,
                        minWidth: 137,
                        sortable: false,
                        renderCell: (params) => {
                            return (
                                <Tooltip title={params.value || ""} arrow>
                                    <span
                                        style={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {params.value || ""}
                                    </span>
                                </Tooltip>
                            );
                        },
                    };
                }),
            ]);
    };

    const handleFormatRows = () => {
        if (Array.isArray(data) && data.length > 1) {
            let dataRows = [...data].slice(1);
            let rowsTemp = [];
            for (let i = 0; i < dataRows.length; i++) {
                let objTemp = { id: i + 1 };
                for (let j = 0; j < dataRows[i].length; j++) {
                    objTemp[`${j}`] = dataRows[i][j];
                }
                rowsTemp.push(objTemp);
            }
            setRows(rowsTemp);
        }else{
            setRows([])
        }
    };

    const handleSubmit = () => {
        if (Array.isArray(data) && data.length > 1) {
            setDialogConfirmation({
                ...dialogConfirmation,
                open: true,
                handleSubmit: () => {
                    onSubmit();
                    setRows([])
                    setColumns([
                        {
                            field: "id",
                            headerName: "STT",
                            width: 30,
                            sortable: false,
                        },
                    ])
                    setTitle(Strings.Common.FILE_CONTENT)
                    handleClose()
                },
            });
        } else {
            setModalError({
                ...modalError,
                open: true,
                title: Strings.Common.NO_DATA,
            });
        }
    };

    const run = async () => {
        await setBackDrop(true);
        (await open) && handleFormatColumns();
        (await open) && handleFormatRows();
        (await open) && setTitle(`${Strings.Common.FILE_CONTENT}: ${nameFile}`);
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    useEffect(() => {
        run();
    }, [open, data]);

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
                    <Title>{title}</Title>

                    {/* CONTENT */}
                    <Box>
                        <DataGridCustomModeClient
                            columns={columns}
                            rows={rows}
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

                    {/* IMPORT BUTTON */}
                    <ButtonFeatures
                        size="small"
                        variant="contained"
                        endIcon={<BackupIcon />}
                        color="primary"
                        sx={{ marginRight: 1 }}
                        onClick={handleSubmit}
                    >
                        {Strings.Common.UPLOAD_FILE}
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
                colorButtonSubmit={theme.palette.warning.main}
                colorTitle={theme.palette.warning.main}
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

export default DialogShowDataFileImport;
