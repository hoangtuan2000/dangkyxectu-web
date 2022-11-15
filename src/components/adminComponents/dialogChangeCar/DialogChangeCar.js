import { useState, useEffect } from "react";
import {
    Box,
    Checkbox,
    DialogActions,
    DialogContent,
    FormControlLabel,
    IconButton,
    InputAdornment,
    useTheme,
} from "@mui/material";
import {
    ButtonFeatures,
    DialogContainer,
    FormGroupStyle,
    TextInput,
    Title,
} from "./DialogChangeCarCustomStyles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import DataGridCustom from "../../dataGridCustom/DataGridCustom";
import Constants from "../../../constants/Constants";
import col from "./columnsDialogChangeCarDataGrid";
import { DialogChangeCarServices } from "../../../services/adminServices/DialogChangeCarServices";
import DialogConfirmation from "../../dialogConfirmation/DialogConfirmation";

function DialogChangeCar({
    open,
    handleClose,
    idCar,
    idSchedule,
    getScheduleOfParent,
    openModalSuccessOfParent,
}) {
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
        title: Strings.Common.DO_YOU_WANT_TO_CHANGE_CAR,
        content: Strings.Common.CHANGE_CAR_CONFIRMATION,
        handleSubmit: () => {},
    });

    const [dataSendApi, setDataSendApi] = useState({
        idSchedule: null,
        idCarNew: null,
    });

    const [dataFilter, setDataFilter] = useState({
        searchCar: null,
        isSearchCarCode: false,
        isSearchCarLicensePlates: false,
        isSearchCarSeatNumber: false,
    });

    const [carList, setCarList] = useState([]);

    const changeCarSchedule = async () => {
        console.log(dataSendApi.idSchedule);
        await setBackDrop(true);
        const res = await DialogChangeCarServices.changeCarSchedule({
            idSchedule: dataSendApi.idSchedule,
            idCarNew: dataSendApi.idCarNew,
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                await openModalSuccessOfParent();
                await getScheduleOfParent();
            } else {
                setModalError({
                    ...modalError,
                    open: true,
                    title: res.data.message,
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

    const getCarListToChangeCar = async (
        page = dataInfo.page,
        pageSize = dataInfo.pageSize,
        searchCar,
        isSearchCarCode,
        isSearchCarLicensePlates,
        isSearchCarSeatNumber
    ) => {
        const res = await DialogChangeCarServices.getCarListToChangeCar({
            page: page,
            limitEntry: pageSize,
            searchCar: searchCar,
            isSearchCarCode: isSearchCarCode,
            isSearchCarLicensePlates: isSearchCarLicensePlates,
            isSearchCarSeatNumber: isSearchCarSeatNumber,
            idCar: idCar,
            idSchedule: idSchedule,
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setDataInfo({
                    page: res.data.page,
                    pageSize: res.data.limitEntry,
                    totalRows: res.data.sizeQuerySnapshot,
                });
                setCarList(
                    res.data.data.map((item, index) => {
                        return {
                            id:
                                res.data.limitEntry * res.data.page -
                                res.data.limitEntry +
                                index +
                                1,
                            imageCar: item.image,
                            idCar: item.idCar,
                            type: `${item.nameCarType} ${item.seatNumber} Chổ`,
                            licensePlates: item.licensePlates,
                        };
                    })
                );
            } else {
                setModalError({
                    ...modalError,
                    open: true,
                    title: res.data.message,
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

    const handleFormatDataFilterSendApi = () => {
        return {
            searchCar: dataFilter.searchCar,
        };
    };

    const handleChangePage = async (e) => {
        setDataInfo({ ...dataInfo, page: e });
        const data = await handleFormatDataFilterSendApi();
        await getCarListToChangeCar(
            e,
            dataInfo.pageSize,
            data.searchCar,
            dataFilter.isSearchCarCode,
            dataFilter.isSearchCarLicensePlates,
            dataFilter.isSearchCarSeatNumber
        );
    };

    const handleChangeRowsPerPage = async (e) => {
        setDataInfo({ ...dataInfo, pageSize: e });
        const data = await handleFormatDataFilterSendApi();
        await getCarListToChangeCar(
            dataInfo.page,
            e,
            data.searchCar,
            dataFilter.isSearchCarCode,
            dataFilter.isSearchCarLicensePlates,
            dataFilter.isSearchCarSeatNumber
        );
    };

    const handleChangeSearch = (e) => {
        setDataFilter({
            ...dataFilter,
            searchCar: e.target.value,
        });
    };

    const handleCheckCarCode = (e) => {
        setDataFilter({
            ...dataFilter,
            isSearchCarCode: e.target.checked,
        });
    };

    const handleCheckSeatNumber = (e) => {
        setDataFilter({
            ...dataFilter,
            isSearchCarSeatNumber: e.target.checked,
        });
    };

    const handleCheckLicensePlates = (e) => {
        setDataFilter({
            ...dataFilter,
            isSearchCarLicensePlates: e.target.checked,
        });
    };

    const handleSearchCar = async () => {
        const data = await handleFormatDataFilterSendApi();
        await getCarListToChangeCar(
            dataInfo.page,
            dataInfo.pageSize,
            data.searchCar,
            dataFilter.isSearchCarCode,
            dataFilter.isSearchCarLicensePlates,
            dataFilter.isSearchCarSeatNumber
        );
    };

    const handleSelectCarNew = (e) => {
        if (e.length > 0) {
            setDataSendApi({
                ...dataSendApi,
                idCarNew: e[0].idCar,
            });
        } else {
            setDataSendApi({
                ...dataSendApi,
                idCarNew: null,
            });
        }
    };

    const handleChangeCar = () => {
        if (dataSendApi.idCarNew) {
            setDialogConfirmation({
                ...dialogConfirmation,
                open: true,
                title: `Bạn Có Muốn Đổi Sang Xe Mã ${dataSendApi.idCarNew} ?`,
                handleSubmit: () => {
                    changeCarSchedule();
                },
            });
        }
    };

    const run = async () => {
        await setBackDrop(true);
        (await open) && getCarListToChangeCar();
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    useEffect(() => {
        if (open) {
            setDataSendApi({
                ...dataSendApi,
                idSchedule: idSchedule,
            });
            run();
        }
    }, [idCar, idSchedule, open]);

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
                    <Title>{Strings.DialogChangeCar.TITLE}</Title>

                    {/* CONTENT */}
                    <Box>
                        {/* CHECK BOX */}
                        <FormGroupStyle row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={dataFilter.isSearchCarCode}
                                    />
                                }
                                label={Strings.DialogChangeCar.CAR_CODE}
                                value={true}
                                onChange={(e) => handleCheckCarCode(e)}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            dataFilter.isSearchCarSeatNumber
                                        }
                                    />
                                }
                                label={Strings.DialogChangeCar.SEAT_NUMBER}
                                value={true}
                                onChange={(e) => handleCheckSeatNumber(e)}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            dataFilter.isSearchCarLicensePlates
                                        }
                                    />
                                }
                                label={Strings.DialogChangeCar.LICENSE_PLATES}
                                value={true}
                                onChange={(e) => handleCheckLicensePlates(e)}
                            />
                        </FormGroupStyle>

                        {/* INPUT SEARCH */}
                        <TextInput
                            placeholder={Strings.DialogChangeCar.SEARCH}
                            variant="outlined"
                            size="small"
                            value={dataFilter.searchCar || ""}
                            onChange={(e) => handleChangeSearch(e)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleSearchCar}>
                                            <SearchIcon
                                                sx={{
                                                    color: theme.palette.primary
                                                        .main,
                                                }}
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <DataGridCustom
                            selectSingleRowOnClick={true}
                            columns={col()}
                            rows={carList}
                            {...dataInfo}
                            onChangePage={(e) => {
                                handleChangePage(e);
                            }}
                            onChangeRowsPerPage={(e) => {
                                handleChangeRowsPerPage(e);
                            }}
                            handleSelectRow={(e) => handleSelectCarNew(e)}
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

                    {/* SUBMIT BUTTON */}
                    <ButtonFeatures
                        size="small"
                        variant="contained"
                        endIcon={<CheckCircleIcon />}
                        color="primary"
                        sx={{ marginRight: 1 }}
                        onClick={handleChangeCar}
                        disabled={dataSendApi.idCarNew ? false : true}
                    >
                        {Strings.DialogChangeCar.CHANGE_CAR}
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
                colorButtonSubmit={theme.palette.error.main}
                colorTitle={theme.palette.error.main}
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

export default DialogChangeCar;
