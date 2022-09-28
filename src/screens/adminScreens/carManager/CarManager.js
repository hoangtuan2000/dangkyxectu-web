import {
    Box,
    Button,
    IconButton,
    Pagination,
    Rating,
    Tab,
    Tabs,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    gridPaginationRowRangeSelector,
    gridRowCountSelector,
    useGridApiContext,
    useGridSelector,
} from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Strings from "../../../constants/Strings";
import DataGridCustom from "../../../components/dataGridCustom/DataGridCustom";
import Constants from "../../../constants/Constants";
import col from "./columnsCarManagerDataGrid";
import ModalError from "../../../components/modalError/ModalError";
import ModalSuccess from "../../../components/modalSuccess/ModalSuccess";
import BackDrop from "../../../components/backDrop/BackDrop";
import { CarManagerServices } from "../../../services/adminServices/CarManagerServices";

const rowsTest = [
    {
        id: 1,
        imageCar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
        carBrand: "Honda",
        type: "46 Chỗ",
        licensePlates: "65A - 123456",
        numberOfTrips: "20",
        numberOfFailures: "1",
        status: "Hoạt Động",
        license: "Còn Hạn",
    },
    {
        id: 2,
        imageCar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
        carBrand: "Honda",
        type: "46 Chỗ",
        licensePlates: "65A - 123456",
        numberOfTrips: "20",
        numberOfFailures: "1",
        status: "Đang Bảo Trì",
        license: "Còn Hạn",
    },
    {
        id: 3,
        imageCar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
        carBrand: "Honda",
        type: "46 Chỗ",
        licensePlates: "65A - 123456",
        numberOfTrips: "20",
        numberOfFailures: "1",
        status: "Hỏng Hóc",
        license: "Hết Hạn",
    },
    {
        id: 4,
        imageCar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
        carBrand: "Honda",
        type: "46 Chỗ",
        licensePlates: "65A - 123456",
        numberOfTrips: "20",
        numberOfFailures: "1",
        status: "Ngừng Hoạt Động",
        license: "Còn Hạn",
    },
    {
        id: 5,
        imageCar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBl_xuk80F5PI3pXBK0L45rf652XU583ITA&usqp=CAU",
        carBrand: "Honda",
        type: "46 Chỗ",
        licensePlates: "65A - 123456",
        numberOfTrips: "20",
        numberOfFailures: "1",
        status: "Hoạt Động",
        license: "Còn Hạn",
    },
];

function CarManager() {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [carList, setCarList] = useState([]);
    const [dataInfo, setDataInfo] = useState({
        page: Constants.Common.PAGE,
        pageSize: Constants.Common.LIMIT_ENTRY,
        totalRows: 0,
    });

    const getCarListForAdmin = async (
        page = dataInfo.page,
        pageSize = dataInfo.pageSize
        // status,
        // carType,
        // faculty,
        // infoUser,
        // infoDriver,
        // licensePlates,
        // scheduleCode,
        // address,
        // idWard,
        // startDate,
        // endDate
    ) => {
        const data = {
            page: page,
            limitEntry: pageSize,
            // status,
            // carType,
            // faculty,
            // infoUser,
            // infoDriver,
            // licensePlates,
            // scheduleCode,
            // address,
            // idWard,
            // startDate,
            // endDate,
        };
        const res = await CarManagerServices.getCarListForAdmin({
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
                setCarList(
                    res.data.data.map((item, index) => {
                        return {
                            id:
                                res.data.limitEntry * res.data.page -
                                res.data.limitEntry +
                                index +
                                1,
                            imageCar: item.image,
                            carBrand: item.nameCarBrand,
                            type: `${item.nameCarType} ${item.seatNumber} Chổ`,
                            licensePlates: item.licensePlates,
                            numberOfTrips: item.numberOfTrips,
                            numberOfFailures: item.numberOfFailures,
                            status: item.nameCarStatus,
                            license: item.licenseNumberExpired,
                            carCode: item.idCar,
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

    const run = async () => {
        await setBackDrop(true);
        await getCarListForAdmin();
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
                {Strings.CarManager.TITLE}
            </Typography>

            <Button
                variant="contained"
                size="small"
                sx={{
                    marginBottom: "10px",
                    backgroundColor: theme.palette.success.main,
                }}
                startIcon={<DirectionsCarIcon />}
            >
                {Strings.CarManager.ADD_CAR}
            </Button>

            <DataGridCustom
                columns={col()}
                rows={carList}
                {...dataInfo}
                // onChangePage={(e) => {
                //     handleChangePage(e);
                // }}
                // onChangeRowsPerPage={(e) => {
                //     handleChangeRowsPerPage(e);
                // }}
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

export default CarManager;
