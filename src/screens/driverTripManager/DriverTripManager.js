import { useState, useEffect } from "react";
import { Badge, Box, Tooltip, Typography } from "@mui/material";
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
import DialogDriverTripManagerFilter from "../../components/driverComponents/dialogDriverTripManagerFilter/DialogDriverTripManagerFilter";

function DriverTripManager() {
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
    const [dialogDriverTripManagerFilter, setDialogDriverTripManagerFilter] = useState(false);
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

    const handleChangePage = async (e) => {
        setDataInfo({ ...dataInfo, page: e });
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getDriverScheduleList(
            e,
            dataInfo.pageSize,
            data.status,
            data.carType,
            data.scheduleCode,
            data.address,
            data.idWard,
            data.startDate,
            data.endDate
        );
    };

    const handleChangeRowsPerPage = async (e) => {
        setDataInfo({ ...dataInfo, pageSize: e });
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getDriverScheduleList(
            dataInfo.page,
            e,
            data.status,
            data.carType,
            data.scheduleCode,
            data.address,
            data.idWard,
            data.startDate,
            data.endDate
        );
    };

    const handleFormatDataFilterSendApi = (data) => {
        //format data to send API
        let status = [];
        let carType = [];
        if (helper.isArray(data.status) && data.status.length > 0) {
            status = data.status.map((item) => {
                return item.idScheduleStatus;
            });
        }
        if (helper.isArray(data.carType) && data.carType.length > 0) {
            carType = data.carType.map((item) => {
                return item.idCarType;
            });
        }

        return {
            status,
            carType,
            scheduleCode: data.scheduleCode,
            address: data.address,
            idWard: data.ward && data.ward.idWard,
            startDate: data.startDate,
            endDate: data.endDate,
        };
    };

    const handleFilter = (e) => {
        //format data to send API
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
            dataInfo.pageSize,
            status,
            carType,
            e.scheduleCode,
            e.address,
            e.ward && e.ward.idWard,
            e.startDate,
            e.endDate
        );

        // save data filter in dialogDriverTripManagerFilter => default value in dialogDriverTripManagerFilter
        setDataFilter({
            status: [...e.status],
            carType: [...e.carType],
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
        if (e.ward) total += 1;
        if (e.startDate && e.endDate) total += 1;
        setTotalDataFilter(total > 0 ? total : null);
    };

    const handleRefreshDataFilter = () => {
        setDataFilter({
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
            {/* TITLE HEADER */}
            <Typography variant="h6" component="div">
                {Strings.DriverTripManager.TRIP_LIST}
            </Typography>

            {/* FILTER BUTTON */}
            <Tooltip title={Strings.Common.FILTER}>
                <FabStyle
                    color="primary"
                    size="small"
                    onClick={() => setDialogDriverTripManagerFilter(true)}
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

            <DialogDriverTripManagerFilter
                open={dialogDriverTripManagerFilter}
                handleClose={() => setDialogDriverTripManagerFilter(false)}
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
                handleRefreshDataFilter={handleRefreshDataFilter}
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
