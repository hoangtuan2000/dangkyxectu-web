import { useState, useEffect } from "react";
import {
    Badge,
    Box,
    Fab,
    Tab,
    Tabs,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import DataGridCustom from "../../components/dataGridCustom/DataGridCustom";
import Strings from "../../constants/Strings";
import col from "./columnsDriverTripManagerDataGrid";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ModalError from "../../components/modalError/ModalError";
import ModalSuccess from "../../components/modalSuccess/ModalSuccess";
import BackDrop from "../../components/backDrop/BackDrop";
import helper from "../../common/helper";
import Constants from "../../constants/Constants";
import { DriverTripManagerService } from "../../services/DriverTripManagerServices";
import DialogShowSchedule from "../../components/dialogShowSchedule/DialogShowSchedule";
import { FabStyle } from "./DriverTripManagerCustomStyles";
import DialogDriverFilter from "../../components/dialogDriverFilter/DialogDriverFilter";

function DriverTripManager() {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [dialogShowSchedule, setDialogShowSchedule] = useState({
        open: false,
        idSchedule: null,
    });
    const [dialogDriverFilter, setDialogDriverFilter] = useState(false);
    const [scheduleList, setScheduleList] = useState([]);
    const [dataInfo, setDataInfo] = useState({
        page: Constants.Common.PAGE,
        pageSize: Constants.Common.LIMIT_ENTRY,
        totalRows: 0,
    });
    const [totalDataFilter, setTotalDataFilter] = useState(null);
    const [dataFilter, setDataFilter] = useState({
        status: [],
        carType: [],
        scheduleCode: null,
        address: null,
        ward: null,
        district: null,
        province: null,
        startDate: null,
        endDate: null,
    });

    const getDriverScheduleList = async (
        page = dataInfo.page,
        pageSize = dataInfo.pageSize,
        status,
        carType,
        scheduleCode,
        address,
        idWard,
        startDate,
        endDate
    ) => {
        const data = {
            page: page,
            limitEntry: pageSize,
            status,
            carType,
            scheduleCode,
            address,
            idWard,
            startDate,
            endDate,
        };
        const res = await DriverTripManagerService.getDriverScheduleList({
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
                setScheduleList(
                    res.data.data.map((item, index) => {
                        const startDate = helper.formatDateStringFromTimeStamp(
                            item.startDate
                        );
                        const endDate = helper.formatDateStringFromTimeStamp(
                            item.endDate
                        );
                        return {
                            id:
                                res.data.limitEntry * res.data.page -
                                res.data.limitEntry +
                                index +
                                1,
                            imageCar: item.image,
                            type: `${item.carType} ${item.seatNumber} Chổ`,
                            licensePlates: item.licensePlates,
                            startLocation: `${item.startLocation} - ${item.wardStart} - ${item.districtStart} - ${item.provinceStart}`,
                            endLocation: `${item.endLocation} - ${item.wardEnd} - ${item.districtEnd} - ${item.provinceEnd}`,
                            dateRange: `${startDate} - ${endDate}`,
                            status: item.scheduleStatus,
                            scheduleCode: item.idSchedule,
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

    const handleOpenDialogSchedule = (e) => {
        setDialogShowSchedule({
            open: true,
            idSchedule: e,
        });
    };

    const handleChangePage = (e) => {
        setDataInfo({ ...dataInfo, page: e });
        getDriverScheduleList(e);
    };

    const handleChangeRowsPerPage = (e) => {
        setDataInfo({ ...dataInfo, pageSize: e });
        getDriverScheduleList(Constants.Common.PAGE, e);
    };

    const handleFilter = (e) => {
        let status = [];
        let carType = [];
        if (helper.isArray(e.status) && e.status.length > 0) {
            status = e.status.map((item) => {
                return item.idScheduleStatus;
            });
        }
        if (helper.isArray(e.carType) && e.carType.length > 0) {
            carType = e.carType.map((item) => {
                return item.idCarType;
            });
        }

        //reset page and pageSize => call getDriverScheduleList function
        getDriverScheduleList(
            Constants.Common.PAGE,
            Constants.Common.LIMIT_ENTRY,
            status,
            carType,
            e.scheduleCode,
            e.address,
            e.ward && e.ward.idWard,
            e.startDate,
            e.endDate
        );

        setDataFilter({
            status: [e.status],
            carType: [e.carType],
            scheduleCode: e.scheduleCode,
            address: e.address,
            ward: e.ward,
            district: e.district,
            province: e.province,
            startDate: e.startDate,
            endDate: e.endDate,
        });

        // show total data to filter in UI => button filter
        let total = status.length + carType.length;
        if (e.scheduleCode) total += 1;
        if (e.address) total += 1;
        if (e.ward) total += 1;
        if (e.startDate && e.endDate) total += 1;
        setTotalDataFilter(total > 0 ? total : null);
    };

    const run = async () => {
        await setBackDrop(true);
        await getDriverScheduleList();
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    useEffect(() => {
        run();
    }, []);

    return (
        <Box>
            <Typography variant="h6" component="div">
                {Strings.DriverTripManager.TRIP_LIST}
            </Typography>

            <Tooltip title={Strings.Common.FILTER}>
                <FabStyle
                    color="primary"
                    size="small"
                    onClick={() => setDialogDriverFilter(true)}
                >
                    <Badge badgeContent={totalDataFilter} color="error">
                        <FilterAltIcon />
                    </Badge>
                </FabStyle>
            </Tooltip>

            <DataGridCustom
                columns={col((e) => {
                    handleOpenDialogSchedule(e);
                })}
                rows={scheduleList}
                {...dataInfo}
                onChangePage={(e) => {
                    handleChangePage(e);
                }}
                onChangeRowsPerPage={(e) => {
                    handleChangeRowsPerPage(e);
                }}
            />

            <DialogDriverFilter
                open={dialogDriverFilter}
                handleClose={() => setDialogDriverFilter(false)}
                onSubmit={(e) => handleFilter(e)}
                defaultStatus={dataFilter.status}
                defaultCarType={dataFilter.carType}
                defaultScheduleCode={dataFilter.scheduleCode}
                defaultAddress={dataFilter.address}
                defaultWard={dataFilter.ward}
                defaultDistrict={dataFilter.district}
                defaultProvince={dataFilter.province}
                defaultStartDate={dataFilter.startDate}
                defaultEndDate={dataFilter.endDate}
            />

            <DialogShowSchedule
                open={dialogShowSchedule.open}
                handleClose={() =>
                    setDialogShowSchedule({
                        ...dialogShowSchedule,
                        open: false,
                    })
                }
                idSchedule={dialogShowSchedule.idSchedule}
                titleDialog={Strings.Common.INFO_SCHEDULE}
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
        </Box>
    );
}

export default DriverTripManager;
