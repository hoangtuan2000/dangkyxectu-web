import { Box, IconButton, Rating, Tooltip, Typography } from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DataGridCustom from "../../components/dataGridCustom/DataGridCustom";
import Strings from "../../constants/Strings";
import { RentedCarService } from "../../services/RentedCarServices";
import ModalError from "../../components/modalError/ModalError";
import ModalSuccess from "../../components/modalSuccess/ModalSuccess";
import BackDrop from "../../components/backDrop/BackDrop";
import Constants from "../../constants/Constants";
import { useState, useEffect } from "react";
import helper from "../../common/helper";

const columns = [
    {
        field: "id",
        headerName: "STT",
        width: 50,
        sortable: false,
    },
    {
        field: "imageCar",
        headerName: Strings.Common.IMAGE,
        description: Strings.Common.IMAGE,
        width: 90,
        sortable: false,
        renderCell: (params) => {
            return (
                <img
                    src={params.row.imageCar}
                    alt={params.row.imageCar}
                    style={{
                        width: "70px",
                        borderRadius: "10px",
                        padding: "3px",
                    }}
                />
            );
        },
    },
    {
        field: "type",
        headerName: Strings.Common.CAR_TYPE,
        description: Strings.Common.CAR_TYPE,
        width: 140,
        sortable: false,
        renderCell: (params) => {
            return (
                <Tooltip title={params.row.type} arrow>
                    <span
                        style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {params.row.type}
                    </span>
                </Tooltip>
            );
        },
    },
    {
        field: "licensePlates",
        headerName: Strings.Common.LICENSE_PLATES,
        description: Strings.Common.LICENSE_PLATES,
        width: 100,
        sortable: false,
        renderCell: (params) => {
            return (
                <Tooltip title={params.row.licensePlates} arrow>
                    <span
                        style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {params.row.licensePlates}
                    </span>
                </Tooltip>
            );
        },
    },
    {
        field: "reason",
        headerName: Strings.Common.REASON,
        description: Strings.Common.REASON,
        width: 190,
        sortable: false,
        renderCell: (params) => {
            return (
                <Tooltip title={params.row.reason} arrow>
                    <span
                        style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {params.row.reason}
                    </span>
                </Tooltip>
            );
        },
    },
    {
        field: "destination",
        headerName: Strings.Common.DESTINATION,
        description: Strings.Common.DESTINATION,
        width: 190,
        sortable: false,
        renderCell: (params) => {
            return (
                <Tooltip title={params.row.destination} arrow>
                    <span
                        style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {params.row.destination}
                    </span>
                </Tooltip>
            );
        },
    },
    {
        field: "dateRange",
        headerName: Strings.Common.TIME,
        description: Strings.Common.TIME,
        width: 200,
        sortable: false,
        renderCell: (params) => {
            return (
                <Tooltip title={params.row.dateRange} arrow>
                    <span
                        style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {params.row.dateRange}
                    </span>
                </Tooltip>
            );
        },
    },
    {
        field: "status",
        headerName: Strings.Common.STATUS,
        description: Strings.Common.STATUS,
        width: 120,
        sortable: false,
        renderCell: (params) => {
            let bgColor = "#969696";
            let textColor = "white";
            switch (params.value) {
                case Constants.ScheduleStatus.COMPLETE:
                    bgColor = "Blue";
                    break;
                case Constants.ScheduleStatus.APPROVED:
                    bgColor = "green";
                    break;
                case Constants.ScheduleStatus.PENDING:
                    bgColor = "#ffcffb";
                    textColor = "black";
                    break;
                case Constants.ScheduleStatus.CANCELLED:
                    bgColor = "gray";
                    break;
                case Constants.ScheduleStatus.REFUSE:
                    bgColor = "red";
                    break;
            }
            return (
                <>
                    <Box
                        style={{
                            width: "90px",
                            textAlign: "center",
                            backgroundColor: bgColor,
                            color: textColor,
                            padding: "2px 6px",
                            borderRadius: "10px",
                            fontSize: "12px",
                            WebkitBoxShadow:
                                "3px 4px 15px -1px rgba(0,0,0,0.25)",
                            boxShadow: "3px 4px 15px -1px rgba(0,0,0,0.25)",
                        }}
                    >
                        {params.value}
                    </Box>
                </>
            );
        },
    },
    {
        field: "update",
        headerName: Strings.Common.UPDATE,
        description: Strings.Common.UPDATE,
        width: 85,
        sortable: false,
        renderCell: (params) => {
            if (
                params.row.status == Constants.ScheduleStatus.PENDING ||
                params.row.status == Constants.ScheduleStatus.APPROVED
            ) {
                return (
                    <Tooltip title="Cập Nhật" arrow>
                        <IconButton color="primary">
                            <ModeEditIcon />
                        </IconButton>
                    </Tooltip>
                );
            } else {
                return (
                    <Tooltip title="Xem Chi Tiết" arrow>
                        <IconButton color="primary">
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                );
            }
        },
    },
    {
        field: "cancel",
        headerName: Strings.Common.CANCEL,
        description: Strings.Common.CANCEL,
        width: 60,
        sortable: false,
        renderCell: (params) => {
            if (
                params.row.status == Constants.ScheduleStatus.PENDING ||
                params.row.status == Constants.ScheduleStatus.APPROVED
            ) {
                return (
                    <Tooltip title="Hủy Đăng Ký Xe" arrow>
                        <IconButton color="error">
                            <DeleteForeverIcon />
                        </IconButton>
                    </Tooltip>
                );
            }
        },
    },
    {
        field: "reviews",
        headerName: Strings.Common.REVIEW,
        description: Strings.Common.REVIEW,
        width: 165,
        sortable: false,
        renderCell: (params) => {
            return (
                params.row.status == Constants.ScheduleStatus.COMPLETE && (
                    <Rating name="read-only" value={2} readOnly size="small" />
                )
            );
        },
    },
];

function RentedCar() {
    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
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
                            id: index,
                            imageCar: item.image,
                            type: `${item.carType} ${item.seatNumber} Chổ`,
                            licensePlates: item.licensePlates,
                            reason: item.reason,
                            destination: `${item.endLocation} - ${item.wardEnd} - ${item.districtEnd} - ${item.provinceEnd}`,
                            dateRange: `${startDate} - ${endDate}`,
                            status: item.scheduleStatus,
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
                title: `${Strings.Common.AN_ERROR_OCCURRED} (${res.request.status})`,
                content: res.name,
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
                columns={columns}
                rows={scheduleList}
                {...dataInfo}
                onChangePage={(e) => {
                    handleChangePage(e);
                }}
                onChangeRowsPerPage={(e) => {
                    handleChangeRowsPerPage(e);
                }}
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
