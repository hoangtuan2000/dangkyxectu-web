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

    const getDriverScheduleList = async (
        page = dataInfo.page,
        pageSize = dataInfo.pageSize
    ) => {
        const res = await DriverTripManagerService.getDriverScheduleList({
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
                    <Badge badgeContent={4} color="error">
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
