import { useEffect, useRef, useState } from "react";
import {
    Badge,
    Box,
    Button,
    IconButton,
    Rating,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DataGridCustom from "../../../components/dataGridCustom/DataGridCustom";
import Strings from "../../../constants/Strings";
import col from "./columnsUserManagement";
import BackupIcon from "@mui/icons-material/Backup";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import BackDrop from "../../../components/backDrop/BackDrop";
import ModalSuccess from "../../../components/modalSuccess/ModalSuccess";
import ModalError from "../../../components/modalError/ModalError";
import Constants from "../../../constants/Constants";
import { ButtonStyle, FabStyle } from "./UserManagementCustomStyles";
import { UserManagementServices } from "../../../services/adminServices/UserManagementServices";
import DialogCarRegistrationManagementFilter from "../../../components/adminComponents/dialogCarRegistrationManagementFilter/DialogCarRegistrationManagementFilter";
import helper from "../../../common/helper";
import DialogUpdateDriver from "../../../components/adminComponents/dialogUpdateDriver/DialogUpdateDriver";
import * as XLSX from "xlsx";
import DialogShowDataFileImport from "../../../components/adminComponents/dialogShowDataFileImport/DialogShowDataFileImport";
import DialogUserManagementFilter from "../../../components/adminComponents/dialogUserManagementFilter/DialogUserManagementFilter";
import DialogCreateUser from "../../../components/adminComponents/dialogCreateUser/DialogCreateUser";
import DialogUpdateUser from "../../../components/adminComponents/dialogUpdateUser/DialogUpdateUser";

function UserManagement() {
    const theme = useTheme();

    const inputImport = useRef();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [dialogCreateUser, setDialogCreateUser] = useState(false);
    const [dialogUpdateUser, setDialogUpdateUser] = useState({
        open: false,
        idUser: null,
    });
    const [dialogShowDataFileImport, setDialogShowDataFileImport] = useState({
        open: false,
        data: null,
        nameFile: null,
    });

    const [dataInfo, setDataInfo] = useState({
        page: Constants.Common.PAGE,
        pageSize: Constants.Common.LIMIT_ENTRY,
        totalRows: 0,
    });

    const [fileDataCreateMultiUser, setFileDataCreateMultiUser] = useState(
        []
    );

    const [dialogUserManagementFilter, setDialogUserManagementFilter] =
        useState(false);
    const [dataFilter, setDataFilter] = useState({
        userStatus: [],
        faculty: [],
        code: null,
        fullName: null,
        email: null,
        phone: null,
    });
    const [totalDataFilter, setTotalDataFilter] = useState(null);

    const [userList, setUserList] = useState([]);

    const getUserList = async (
        page = dataInfo.page,
        pageSize = dataInfo.pageSize,
        userStatus,
        faculty,
        code,
        fullName,
        email,
        phone
    ) => {
        const data = {
            page: page,
            limitEntry: pageSize,
            userStatus: userStatus,
            faculty: faculty,
            code: code,
            fullName: fullName,
            email: email,
            phone: phone,
        };

        const res = await UserManagementServices.getUserList({
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
                setUserList(
                    res.data.data.map((item, index) => {
                        return {
                            id:
                                res.data.limitEntry * res.data.page -
                                res.data.limitEntry +
                                index +
                                1,
                            fullName: item.fullName,
                            code: item.code,
                            email: item.email,
                            phone: item.phone,
                            status: item.nameUserStatus,
                            faculty: item.nameFaculty,
                            update: item.idUser,
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

    const createMultipleUser = async () => {
        await setBackDrop(true);
        const res = await UserManagementServices.createMultipleUser({
            fileData: fileDataCreateMultiUser,
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                await setModalSuccess(true);
                await getUserList();
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
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    const getUserListToExport = async () => {
        const data = await handleFormatDataFilterSendApi(dataFilter);
        const objData = {
            getAllData: true,
            userStatus: data.userStatus,
            faculty: data.faculty,
            code: data.code,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
        };

        const res = await UserManagementServices.getUserList({
            ...objData,
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                return res.data.data;
            } else {
                setModalError({
                    ...modalError,
                    open: true,
                    title: res.data.message,
                    content: null,
                });
                return false;
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
            return false;
        }
    };

    const handleFormatDataFilterSendApi = (data) => {
        //format data to send API
        let userStatus = [];
        let faculty = [];
        if (helper.isArray(data.userStatus) && data.userStatus.length > 0) {
            userStatus = data.userStatus.map((item) => {
                return item.idUserStatus;
            });
        }
        if (helper.isArray(data.faculty) && data.faculty.length > 0) {
            faculty = data.faculty.map((item) => {
                return item.idFaculty;
            });
        }
        return {
            userStatus,
            faculty,
            code: data.code,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
        };
    };

    const handleChangePage = async (e) => {
        setDataInfo({ ...dataInfo, page: e });
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getUserList(
            e,
            dataInfo.pageSize,
            data.userStatus,
            data.faculty,
            data.code,
            data.fullName,
            data.email,
            data.phone
        );
    };

    const handleChangeRowsPerPage = async (e) => {
        setDataInfo({ ...dataInfo, pageSize: e });
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getUserList(
            dataInfo.page,
            e,
            data.userStatus,
            data.faculty,
            data.code,
            data.fullName,
            data.email,
            data.phone
        );
    };

    const handleFilter = (e) => {
        //format data to send API
        let userStatus = [];
        let faculty = [];
        if (helper.isArray(e.userStatus) && e.userStatus.length > 0) {
            userStatus = e.userStatus.map((item) => {
                return item.idUserStatus;
            });
        }
        if (helper.isArray(e.faculty) && e.faculty.length > 0) {
            faculty = e.faculty.map((item) => {
                return item.idFaculty;
            });
        }
        //reset page and pageSize => call getUserList function
        getUserList(
            Constants.Common.PAGE,
            dataInfo.pageSize,
            userStatus,
            faculty,
            e.code,
            e.fullName,
            e.email,
            e.phone
        );
        // save data filter in dialogCarManagerFilter => default value in dialogCarManagerFilter
        setDataFilter({
            userStatus: [...e.userStatus],
            faculty: [...e.faculty],
            code: e.code,
            fullName: e.fullName,
            email: e.email,
            phone: e.phone,
        });
        // show total data to filter in UI => button filter
        let total = userStatus.length + faculty.length;
        if (e.code) total += 1;
        if (e.fullName) total += 1;
        if (e.email) total += 1;
        if (e.phone) total += 1;
        setTotalDataFilter(total > 0 ? total : null);
    };

    const handleRefreshDataFilter = () => {
        setDataFilter({
            userStatus: [],
            faculty: [],
            code: null,
            fullName: null,
            email: null,
            phone: null,
        });
    };

    const handleGetUserListForAdminWithFilter = async () => {
        const data = await handleFormatDataFilterSendApi(dataFilter);
        await getUserList(
            dataInfo.page,
            dataInfo.pageSize,
            data.userStatus,
            data.faculty,
            data.code,
            data.fullName,
            data.email,
            data.phone
        );
    };

    const handleOpenDialogUpdateUser = (e) => {
        setDialogUpdateUser({
            ...dialogUpdateUser,
            open: true,
            idUser: e,
        });
    };

    const exportExcel = async () => {
        let getData = await getUserListToExport();
        if (getData) {
            let dataExport = [
                ...getData.map((item) => {
                    return {
                        code: item.code,
                        fullName: item.fullName,
                        phone: item.phone,
                        email: item.email,
                        faculty: item.nameFaculty,
                        userStatus: item.nameUserStatus,
                    };
                }),
            ];
            let wb = XLSX.utils.book_new(),
                ws = XLSX.utils.json_to_sheet(dataExport);
            XLSX.utils.book_append_sheet(wb, ws, "MySheet");
            XLSX.utils.sheet_add_aoa(
                ws,
                [["Mã Tài Xế", "Họ Tên", "Điện Thoại", "Email", "Thuộc Khoa", "Trạng Thái"]],
                {
                    origin: "A1",
                }
            );
            XLSX.writeFile(wb, "Danh_Sach_Nguoi_Dung.xlsx");
        }
    };

    const handleOpenChooseFileImport = () => {
        inputImport.current.click();
    };

    const handleCloseDialogShowDataFileImport = () => {
        setDialogShowDataFileImport({
            ...dialogShowDataFileImport,
            open: false,
            data: null,
            nameFile: null,
        });
        handleRefreshChooseFile();
    };

    const handleRefreshChooseFile = () => {
        // refresh file in input choose file
        inputImport.current.value = null;
        inputImport.current.files = null;
    };

    const importExcel = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const bstr = event.target.result;
            const workBook = XLSX.read(bstr, { type: "binary" });
            const workSheetName = workBook.SheetNames[0];
            const workSheet = workBook.Sheets[workSheetName];
            const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
            const headers = fileData[0];

            let errorData = false;
            headers[0] != "Mã Người Dùng" && (errorData = true);
            headers[1] != "Họ Tên" && (errorData = true);
            headers[2] != "Email" && (errorData = true);
            headers[3] != "Điện Thoại" && (errorData = true);
            headers[4] != "Địa Chỉ" && (errorData = true);
            headers[5] != "Mã Xã Phường" && (errorData = true);
            headers[6] != "Mật Khẩu" && (errorData = true);
            headers[7] != "Mã Khoa" && (errorData = true);

            if (errorData || fileData.length < 1) {
                setModalError({
                    ...modalError,
                    open: true,
                    title: Strings.UserManagement.INVALID_DATA_FROM_FILE,
                    content:
                        Strings.UserManagement.SUPPORT_INVALID_DATA_FROM_FILE,
                });
            } else {
                let fileDataValid = [];
                // DELETE fileData CHILDREN IF ARRAY EMPTY
                for (let i = 0; i < fileData.length; i++) {
                    if (!helper.isArrayEmpty(fileData[i])) {
                        fileDataValid.push(fileData[i]);
                    }
                }
                let fileNotHeader = [...fileDataValid].slice(1);
                setFileDataCreateMultiUser([
                    ...fileNotHeader.map((item) => {
                        return {
                            code: item[0] || null,
                            fullName: item[1] || null,
                            email: item[2] || null,
                            phone: item[3] || null,
                            address: item[4] || null,
                            idWard: item[5] || null,
                            pass: item[6] || null,
                            idFaculty: item[7] || null,
                        };
                    }),
                ]);
                setDialogShowDataFileImport({
                    ...dialogShowDataFileImport,
                    open: true,
                    data: fileDataValid,
                    nameFile: file.name,
                });
            }
        };
        reader.readAsBinaryString(file);
        // REFRESH INPUT CHOOSE FILE
        handleRefreshChooseFile();
    };

    const handleCreateMultiUserFromFile = () => {
        if (fileDataCreateMultiUser.length > 1) {
            createMultipleUser();
        } else {
            setModalError({
                ...modalError,
                open: true,
                title: Strings.UserManagement.INVALID_DATA_FROM_FILE,
                content: Strings.UserManagement.SUPPORT_INVALID_DATA_FROM_FILE,
            });
        }
    };

    const run = async () => {
        await setBackDrop(true);
        await getUserList();
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
                {Strings.UserManagement.TITLE}
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* FILTER BUTTON */}
                <Tooltip title={Strings.Common.FILTER}>
                    <FabStyle
                        color="primary"
                        size="small"
                        onClick={() => setDialogUserManagementFilter(true)}
                    >
                        <Badge badgeContent={totalDataFilter} color="error">
                            <FilterAltIcon />
                        </Badge>
                    </FabStyle>
                </Tooltip>

                <Box>
                    {/* IMPORT BUTTON */}
                    <ButtonStyle
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: theme.palette.primary.main }}
                        endIcon={<BackupIcon />}
                        onClick={handleOpenChooseFileImport}
                    >
                        {Strings.Common.IMPORT}
                    </ButtonStyle>
                    <input
                        ref={inputImport}
                        type="file"
                        style={{ display: "none" }}
                        onChange={importExcel}
                        accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    />

                    {/* EXPORT BUTTON */}
                    <ButtonStyle
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: "#02b6d6" }}
                        endIcon={<FileDownloadIcon />}
                        onClick={() => exportExcel()}
                    >
                        {Strings.Common.EXPORT}
                    </ButtonStyle>

                    {/* BUTTON ADD CAR */}
                    <ButtonStyle
                        variant="contained"
                        size="small"
                        startIcon={<PersonAddIcon />}
                        onClick={() => setDialogCreateUser(true)}
                    >
                        {Strings.UserManagement.ADD_USER}
                    </ButtonStyle>
                </Box>
            </Box>

            <DataGridCustom
                columns={col((e) => handleOpenDialogUpdateUser(e))}
                rows={userList}
                {...dataInfo}
                onChangePage={(e) => {
                    handleChangePage(e);
                }}
                onChangeRowsPerPage={(e) => {
                    handleChangeRowsPerPage(e);
                }}
            />

            <DialogCreateUser
                open={dialogCreateUser}
                handleClose={() => setDialogCreateUser(false)}
                handleGetDriverListForAdminWithFilter={
                    handleGetUserListForAdminWithFilter
                }
            />

            <DialogUpdateUser
                open={dialogUpdateUser.open}
                handleClose={() =>
                    setDialogUpdateUser({
                        ...dialogUpdateUser,
                        open: false,
                    })
                }
                handleGetDriverListForAdminWithFilter={
                    handleGetUserListForAdminWithFilter
                }
                idUser={dialogUpdateUser.idUser}
            />

            <DialogUserManagementFilter
                open={dialogUserManagementFilter}
                handleClose={() => setDialogUserManagementFilter(false)}
                handleRefreshDataFilter={handleRefreshDataFilter}
                onSubmit={(e) => handleFilter(e)}
                defaultUserStatus={dataFilter.userStatus}
                defaultCode={dataFilter.code}
                defaultFullName={dataFilter.fullName}
                defaultEmail={dataFilter.email}
                defaultPhone={dataFilter.phone}
                defaultFaculty={dataFilter.faculty}
            />

            <DialogShowDataFileImport
                open={dialogShowDataFileImport.open}
                handleClose={handleCloseDialogShowDataFileImport}
                data={dialogShowDataFileImport.data}
                nameFile={dialogShowDataFileImport.nameFile}
                onSubmit={handleCreateMultiUserFromFile}
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

export default UserManagement;
