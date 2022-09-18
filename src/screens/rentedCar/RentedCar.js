import React from "react";
import { Box, Typography } from "@mui/material";
import DataGridCustom from "../../components/dataGridCustom/DataGridCustom";
import Strings from "../../constants/Strings";
import { RentedCarService } from "../../services/RentedCarServices";
import ModalError from "../../components/modalError/ModalError";
import ModalSuccess from "../../components/modalSuccess/ModalSuccess";
import BackDrop from "../../components/backDrop/BackDrop";
import Constants from "../../constants/Constants";
import { useState, useEffect } from "react";
import helper from "../../common/helper";
import col from "./columnsRentedCarDataGrid";
import DialogShowSchedule from "../../components/dialogShowSchedule/DialogShowSchedule";
import { useNavigate } from "react-router-dom";
import RoutesPath from "../../constants/RoutesPath";

function RentedCar() {

    const navigate = useNavigate()

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
    const [scheduleList, setScheduleList] = useState([]);
    const [dataInfo, setDataInfo] = useState({
        page: Constants.Common.PAGE,
        pageSize: Constants.Common.LIMIT_ENTRY,
        totalRows: 0,
    });

    const getUserRegisteredScheduleList = async (
        page = dataInfo.page,
        pageSize = dataInfo.pageSize
    ) => {
        const res = await RentedCarService.getUserRegisteredScheduleList({
            page: page,
            limitEntry: pageSize,
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
                            cancel: item.startDate //check startdate > current date => cancel schedule
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

    const handleChangePage = (e) => {
        setDataInfo({ ...dataInfo, page: e });
        getUserRegisteredScheduleList(e);
    };

    const handleChangeRowsPerPage = (e) => {
        setDataInfo({ ...dataInfo, pageSize: e });
        getUserRegisteredScheduleList(Constants.Common.PAGE, e);
    };

    const handleOpenDialogSchedule = (e) => {
        setDialogShowSchedule({
            open: true,
            idSchedule: e,
        });
    };

    const handleUpdateSchedulePending = (e) => {
        navigate(RoutesPath.UPDATE_SCHEDULE_PENDING +"/"+ e)
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
            <Typography variant="h6" component="div">
                {Strings.RentedCar.RENTED_CAR_LIST}
            </Typography>

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

            <DialogShowSchedule
                open={dialogShowSchedule.open}
                handleClose={() =>
                    setDialogShowSchedule({
                        ...dialogShowSchedule,
                        open: false,
                    })
                }
                idSchedule={dialogShowSchedule.idSchedule}
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
