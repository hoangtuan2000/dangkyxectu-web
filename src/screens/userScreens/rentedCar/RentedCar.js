import React from "react";
import { Badge, Box, Tooltip, Typography } from "@mui/material";
import DataGridCustom from "../../../components/dataGridCustom/DataGridCustom";
import Strings from "../../../constants/Strings";
import { RentedCarService } from "../../../services/userServices/RentedCarServices";
import ModalError from "../../../components/modalError/ModalError";
import ModalSuccess from "../../../components/modalSuccess/ModalSuccess";
import BackDrop from "../../../components/backDrop/BackDrop";
import Constants from "../../../constants/Constants";
import { useState, useEffect } from "react";
import helper from "../../../common/helper";
import col from "./columnsRentedCarDataGrid";
import DialogShowScheduleUser from "../../../components/userComponents/dialogShowScheduleUser/DialogShowScheduleUser";
import { useNavigate } from "react-router-dom";
import RoutesPath from "../../../constants/RoutesPath";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { FabStyle } from "./RentedCarCustomStyles";
import DialogRentedCarFilter from "../../../components/userComponents/dialogRentedCarFilter/DialogRentedCarFilter";

function RentedCar() {
    const navigate = useNavigate();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [totalDataFilter, setTotalDataFilter] = useState(null);
    const [dialogRentedCarFilter, setDialogRentedCarFilter] = useState(false);
    const [dialogShowScheduleUser, setDialogShowScheduleUser] = useState({
        open: false,
        idSchedule: null,
    });
    const [scheduleList, setScheduleList] = useState([]);
    const [dataInfo, setDataInfo] = useState({
        page: Constants.Common.PAGE,
        pageSize: Constants.Common.LIMIT_ENTRY,
        totalRows: 0,
    });
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

    const getUserRegisteredScheduleList = async (
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
        const res = await RentedCarService.getUserRegisteredScheduleList({
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
                            reason: item.reason,
                            destination: `${item.endLocation} - ${item.wardEnd} - ${item.districtEnd} - ${item.provinceEnd}`,
                            dateRange: `${startDate} - ${endDate}`,
                            status: item.scheduleStatus,
                            review: item.starNumber,
                            scheduleCode: item.idSchedule,
                            cancel: item.startDate, //check startdate > current date => cancel schedule
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

    const handleChangePage = async (e) => {
        setDataInfo({ ...dataInfo, page: e });
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getUserRegisteredScheduleList(
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
        await getUserRegisteredScheduleList(
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

    const handleOpenDialogSchedule = (e) => {
        setDialogShowScheduleUser({
            open: true,
            idSchedule: e,
        });
    };

    const handleUpdateSchedulePending = (e) => {
        navigate(RoutesPath.UPDATE_SCHEDULE_PENDING + "/" + e);
    };

    const handleCancelSchedule = async (e) => {
        const res = await RentedCarService.cancelSchedule({
            idSchedule: e,
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setModalSuccess(true);
                await setBackDrop(true);
                await getUserRegisteredScheduleList();
                await setTimeout(() => {
                    setBackDrop(false);
                }, 1000);
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

        //reset page and pageSize => call getUserRegisteredScheduleList function
        getUserRegisteredScheduleList(
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

        // save data filter in dialogRentedCarFilter => default value in dialogRentedCarFilter
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
        await getUserRegisteredScheduleList();
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
                {Strings.RentedCar.RENTED_CAR_LIST}
            </Typography>

            {/* FILTER BUTTON */}
            <Tooltip title={Strings.Common.FILTER}>
                <FabStyle
                    color="primary"
                    size="small"
                    onClick={() => setDialogRentedCarFilter(true)}
                >
                    <Badge badgeContent={totalDataFilter} color="error">
                        <FilterAltIcon />
                    </Badge>
                </FabStyle>
            </Tooltip>

            <DialogRentedCarFilter
                open={dialogRentedCarFilter}
                handleClose={() => setDialogRentedCarFilter(false)}
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

            <DataGridCustom
                columns={col(
                    (e) => {
                        handleOpenDialogSchedule(e);
                    },
                    (e) => {
                        handleCancelSchedule(e);
                    },
                    (e) => {
                        handleUpdateSchedulePending(e);
                    }
                )}
                rows={scheduleList}
                {...dataInfo}
                onChangePage={(e) => {
                    handleChangePage(e);
                }}
                onChangeRowsPerPage={(e) => {
                    handleChangeRowsPerPage(e);
                }}
            />

            <DialogShowScheduleUser
                open={dialogShowScheduleUser.open}
                handleClose={() =>
                    setDialogShowScheduleUser({
                        ...dialogShowScheduleUser,
                        open: false,
                    })
                }
                idSchedule={dialogShowScheduleUser.idSchedule}
                titleDialog={Strings.Common.UPDATE_SCHEDULE}
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

export default RentedCar;
