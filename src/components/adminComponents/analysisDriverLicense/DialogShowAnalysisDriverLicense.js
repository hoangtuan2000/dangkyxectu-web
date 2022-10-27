import { useState, useEffect } from "react";
import {
    Badge,
    Box,
    Checkbox,
    DialogActions,
    DialogContent,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Tooltip,
    useTheme,
} from "@mui/material";
import {
    ButtonFeatures,
    DialogContainer,
    FormGroupStyle,
    TextInput,
    Title,
} from "./DialogShowAnalysisDriverLicenseCustomStyles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import DataGridCustom from "../../dataGridCustom/DataGridCustom";
import Constants from "../../../constants/Constants";
import col from "./columnsDialogShowAnalysisDriverLicenseDataGrid";
import { DialogChangeCarServices } from "../../../services/adminServices/DialogChangeCarServices";
import DialogConfirmation from "../../dialogConfirmation/DialogConfirmation";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { AnalysisTotalTripsServices } from "../../../services/adminServices/AnalysisTotalTripsServices";
import helper from "../../../common/helper";
import DialogShowScheduleGlobal from "../../dialogShowScheduleGlobal/DialogShowScheduleGlobal";
import { FabStyle } from "./DialogShowAnalysisDriverLicenseCustomStyles";
import DialogShowAnalysisTotalTripsFilter from "./DialogShowAnalysisDriverLicenseFilter";
import { AnalysisDriverLicenseServices } from "../../../services/adminServices/AnalysisDriverLicenseServices";
import DialogShowAnalysisDriverLicenseFilter from "./DialogShowAnalysisDriverLicenseFilter";
import DialogShowInfoDriver from "../dialogShowInfoDriver/DialogShowInfoDriver";

function DialogShowAnalysisDriverLicense({ open, handleClose }) {
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

    const [totalDataFilter, setTotalDataFilter] = useState(null);

    const [
        dialogShowAnalysisTotalTripsFilter,
        setDialogShowAnalysisTotalTripsFilter,
    ] = useState(false);

    const [dialogShowInfoDriver, setDialogShowInfoDriver] = useState({
        open: false,
        idDriver: null,
    });

    const [dataFilter, setDataFilter] = useState({
        driverLicense: [],
        userStatus: [],
        haveDriver: null,
        codeDriver: null,
        fullNameDriver: null,
        emailDriver: null,
        phoneDriver: null,
        address: null,
        ward: null,
        district: null,
        province: null,
    });

    const [driverLicenseList, setDriverLicenseList] = useState([]);

    const getDataAnalysisDriverLicense = async (
        page = dataInfo.page,
        pageSize = dataInfo.pageSize,
        driverLicense,
        userStatus,
        haveDriver,
        codeDriver,
        fullNameDriver,
        emailDriver,
        phoneDriver,
        address,
        idWard
    ) => {
        const data = {
            page: page,
            limitEntry: pageSize,
            driverLicense,
            userStatus,
            haveDriver,
            codeDriver,
            fullNameDriver,
            emailDriver,
            phoneDriver,
            address,
            idWard,
        };
        const res =
            await AnalysisDriverLicenseServices.getDataAnalysisDriverLicense({
                ...data,
            });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setDataInfo({
                    page: res.data.page,
                    pageSize: res.data.limitEntry,
                    totalRows: res.data.sizeQuerySnapshot,
                });
                setDriverLicenseList(
                    res.data.data.map((item, index) => {
                        return {
                            id:
                                res.data.limitEntry * res.data.page -
                                res.data.limitEntry +
                                index +
                                1,
                            driverLicense: item.nameDriverLicense,
                            idDriver: item.idDriver,
                            code: item.codeDriver,
                            fullName: item.idDriver,
                            fullName: item.fullNameDriver,
                            email: item.emailDriver,
                            phoneNumber: item.phoneDriver,
                            userStatusCode: item.idUserStatus,
                            userStatus: item.nameUserStatus,
                        };
                    })
                );
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

    const handleChangePage = async (e) => {
        setDataInfo({ ...dataInfo, page: e });
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getDataAnalysisDriverLicense(
            e,
            dataInfo.pageSize,
            data.driverLicense,
            data.userStatus,
            data.haveDriver,
            data.codeDriver,
            data.fullNameDriver,
            data.emailDriver,
            data.phoneDriver,
            data.address,
            data.idWard
        );
    };

    const handleChangeRowsPerPage = async (e) => {
        setDataInfo({ ...dataInfo, pageSize: e });
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getDataAnalysisDriverLicense(
            dataInfo.page,
            e,
            data.driverLicense,
            data.userStatus,
            data.haveDriver,
            data.codeDriver,
            data.fullNameDriver,
            data.emailDriver,
            data.phoneDriver,
            data.address,
            data.idWard
        );
    };

    const handleFormatDataFilterSendApi = (data) => {
        //format data to send API
        let driverLicense = [];
        let userStatus = [];
        if (
            helper.isArray(data.driverLicense) &&
            data.driverLicense.length > 0
        ) {
            driverLicense = data.driverLicense.map((item) => {
                return item.idDriverLicense;
            });
        }
        if (helper.isArray(data.userStatus) && data.userStatus.length > 0) {
            userStatus = data.userStatus.map((item) => {
                return item.idUserStatus;
            });
        }
        return {
            driverLicense,
            userStatus,
            driverLicense: data.driverLicense,
            userStatus: data.userStatus,
            haveDriver: data.haveDriver,
            codeDriver: data.codeDriver,
            fullNameDriver: data.fullNameDriver,
            emailDriver: data.emailDriver,
            phoneDriver: data.phoneDriver,
            address: data.address,
            idWard: data.ward && data.ward.idWard,
        };
    };

    const handleFilter = (e) => {
        //format data to send API
        let driverLicense = [];
        let userStatus = [];
        if (helper.isArray(e.driverLicense) && e.driverLicense.length > 0) {
            driverLicense = e.driverLicense.map((item) => {
                return item.idDriverLicense;
            });
        }
        if (helper.isArray(e.userStatus) && e.userStatus.length > 0) {
            userStatus = e.userStatus.map((item) => {
                return item.idUserStatus;
            });
        }

        //reset page and pageSize => call getDataAnalysisDriverLicense function
        getDataAnalysisDriverLicense(
            Constants.Common.PAGE,
            dataInfo.pageSize,
            driverLicense,
            userStatus,
            e.haveDriver,
            e.codeDriver,
            e.fullNameDriver,
            e.emailDriver,
            e.phoneDriver,
            e.address,
            e.ward && e.ward.idWard
        );

        // save data filter in DialogShowAnalysisDriverLicenseFilter => default value in DialogShowAnalysisDriverLicenseFilter
        setDataFilter({
            driverLicense: [...e.driverLicense],
            userStatus: [...e.userStatus],
            haveDriver: e.haveDriver,
            codeDriver: e.codeDriver,
            fullNameDriver: e.fullNameDriver,
            emailDriver: e.emailDriver,
            phoneDriver: e.phoneDriver,
            address: e.address,
            ward: e.ward,
            district: e.district,
            province: e.province,
        });

        // show total data to filter in UI => button filter
        let total = driverLicense.length + userStatus.length;
        if (e.haveDriver) total += 1;
        if (e.codeDriver) total += 1;
        if (e.fullNameDriver) total += 1;
        if (e.emailDriver) total += 1;
        if (e.phoneDriver) total += 1;
        if (e.ward) total += 1;
        setTotalDataFilter(total > 0 ? total : null);
    };

    const handleRefreshDataFilter = () => {
        setDataFilter({
            driverLicense: [],
            userStatus: [],
            haveDriver: null,
            codeDriver: null,
            fullNameDriver: null,
            emailDriver: null,
            phoneDriver: null,
            address: null,
            ward: null,
            district: null,
            province: null,
        });
    };

    const handleShowInfoDriver = (e) => {
        setDialogShowInfoDriver({
            ...dialogShowInfoDriver,
            open: true,
            idDriver: e,
        });
    };

    const run = async () => {
        await setBackDrop(true);
        (await open) &&
            getDataAnalysisDriverLicense(
                Constants.Common.PAGE,
                Constants.Common.LIMIT_ENTRY
            );
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
            <DialogContent>
                <Box>
                    {/* TITLE */}
                    <Title>
                        {Strings.DialogShowAnalysisDriverLicense.TITLE}
                    </Title>

                    {/* FILTER BUTTON */}
                    <Tooltip title={Strings.Common.FILTER}>
                        <FabStyle
                            color="primary"
                            size="small"
                            onClick={() =>
                                setDialogShowAnalysisTotalTripsFilter(true)
                            }
                        >
                            <Badge badgeContent={totalDataFilter} color="error">
                                <FilterAltIcon />
                            </Badge>
                        </FabStyle>
                    </Tooltip>

                    {/* CONTENT */}
                    <Box>
                        <DataGridCustom
                            columns={col((e) => handleShowInfoDriver(e))}
                            rows={driverLicenseList}
                            {...dataInfo}
                            onChangePage={(e) => {
                                handleChangePage(e);
                            }}
                            onChangeRowsPerPage={(e) => {
                                handleChangeRowsPerPage(e);
                            }}
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

            <DialogShowInfoDriver
                open={dialogShowInfoDriver.open}
                handleClose={() =>
                    setDialogShowInfoDriver({
                        ...dialogShowInfoDriver,
                        open: false,
                    })
                }
                idDriver={dialogShowInfoDriver.idDriver}
            />

            <DialogShowAnalysisDriverLicenseFilter
                open={dialogShowAnalysisTotalTripsFilter}
                handleClose={() => setDialogShowAnalysisTotalTripsFilter(false)}
                onSubmit={(e) => handleFilter(e)}
                defaultStatus={dataFilter.status}
                defaultCarType={dataFilter.carType}
                defaultFaculty={dataFilter.faculty}
                defaultInfoUser={dataFilter.infoUser}
                defaultInfoDriver={dataFilter.infoDriver}
                defaultLicensePlates={dataFilter.licensePlates}
                defaultScheduleCode={dataFilter.scheduleCode}
                defaultAddress={dataFilter.address}
                defaultWard={dataFilter.ward}
                defaultDistrict={dataFilter.district}
                defaultProvince={dataFilter.province}
                defaultStartDateSchedule={dataFilter.startDateSchedule}
                defaultEndDateSchedule={dataFilter.endDateSchedule}
                handleRefreshDataFilter={handleRefreshDataFilter}
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

export default DialogShowAnalysisDriverLicense;
