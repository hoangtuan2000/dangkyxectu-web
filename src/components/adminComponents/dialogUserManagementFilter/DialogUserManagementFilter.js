import { useState, useEffect } from "react";
import {
    Box,
    DialogActions,
    DialogContent,
    InputAdornment,
    TextField,
    useTheme,
} from "@mui/material";
import {
    AutocompleteStyle,
    BoxContent,
    ButtonFeatures,
    DialogContainer,
    TextInput,
    TextStyle,
    Title,
} from "./DialogUserManagementFilterCustomStyles";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import EmailIcon from "@mui/icons-material/Email";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import QrCodeIcon from "@mui/icons-material/QrCode";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Strings from "../../../constants/Strings";
import ModalError from "../../modalError/ModalError";
import ModalSuccess from "../../modalSuccess/ModalSuccess";
import BackDrop from "../../backDrop/BackDrop";
import Constants from "../../../constants/Constants";
import { GlobalService } from "../../../services/GlobalServices";
import helper from "../../../common/helper";

function DialogUserManagementFilter({
    open,
    handleClose,
    onSubmit = () => {},
    handleRefreshDataFilter,
    defaultUserStatus,
    defaultFaculty,
    defaultCode,
    defaultFullName,
    defaultEmail,
    defaultPhone,
}) {
    const theme = useTheme();

    const [backDrop, setBackDrop] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });
    const [userStatusList, setUserStatusList] = useState([]);
    const [facultyList, setFacultyList] = useState([]);

    const [dataSendApi, setDataSendApi] = useState({
        userStatus: defaultUserStatus ? [...defaultUserStatus] : [],
        faculty: defaultFaculty ? [...defaultFaculty] : [],
        code: defaultCode || null,
        fullName: defaultFullName || null,
        email: defaultEmail || null,
        phone: defaultPhone || null,
    });

    const getCommon = async () => {
        const res = await GlobalService.getCommon({
            group: "user_status, faculty",
        });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setUserStatusList(res.data.data.user_status);
                setFacultyList(res.data.data.faculty);
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

    const handleChangeCode = (e) => {
        setDataSendApi({
            ...dataSendApi,
            code: e.target.value ? e.target.value : null,
        });
    };

    const handleChangeFullName = (e) => {
        setDataSendApi({
            ...dataSendApi,
            fullName: e.target.value ? e.target.value : null,
        });
    };

    const handleChangeEmail = (e) => {
        setDataSendApi({
            ...dataSendApi,
            email: e.target.value ? e.target.value : null,
        });
    };

    const handleChangePhone = (e) => {
        setDataSendApi({
            ...dataSendApi,
            phone: e.target.value ? e.target.value : null,
        });
    };

    const handleSelectFaculty = (valueArray) => {
        setDataSendApi({
            ...dataSendApi,
            faculty: [...valueArray],
        });
    };

    const handleSelectUserStatus = (valueArray) => {
        setDataSendApi({
            ...dataSendApi,
            userStatus: [...valueArray],
        });
    };

    const handleRefreshFilter = () => {
        let data = {
            faculty: [],
            userStatus: [],
            code: null,
            fullName: null,
            email: null,
            phone: null,
        }
        // call function => return submit
        onSubmit(data);
        //refresh data
        setDataSendApi(data);
        //call function
        handleRefreshDataFilter();
    };

    const handleSubmit = () => {
        onSubmit(dataSendApi);
        handleClose();
    };

    const run = async () => {
        await setBackDrop(true);
        await getCommon();
        await setTimeout(() => {
            setBackDrop(false);
        }, 1000);
    };

    useEffect(() => {
        run();
    }, []);

    return (
        <DialogContainer
            open={open}
            onClose={handleClose}
            scroll="body"
            fullWidth={true}
        >
            {/* FORM */}
            <DialogContent>
                {/* TITLE */}
                <Title>{Strings.DialogUserManagementFilter.TITLE}</Title>

                {/* CODE */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogUserManagementFilter.USER_CODE}
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings.DialogUserManagementFilter
                                .ENTER_USER_CODE
                        }
                        variant="outlined"
                        size="small"
                        value={dataSendApi.code || ""}
                        onChange={(e) => handleChangeCode(e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <QrCodeIcon
                                        sx={{
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </BoxContent>

                {/* FULLNAME */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogUserManagementFilter.FULL_NAME}
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings.DialogUserManagementFilter.ENTER_FULL_NAME
                        }
                        variant="outlined"
                        size="small"
                        value={dataSendApi.fullName || ""}
                        onChange={(e) => handleChangeFullName(e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon
                                        sx={{
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </BoxContent>

                {/* EMAIL */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogUserManagementFilter.EMAIL}
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings.DialogUserManagementFilter.ENTER_EMAIL
                        }
                        variant="outlined"
                        size="small"
                        value={dataSendApi.email || ""}
                        onChange={(e) => handleChangeEmail(e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon
                                        sx={{
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </BoxContent>

                {/* PHONE */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogUserManagementFilter.PHONE}
                    </TextStyle>
                    <TextInput
                        placeholder={
                            Strings.DialogUserManagementFilter.ENTER_PHONE
                        }
                        variant="outlined"
                        size="small"
                        value={dataSendApi.phone || ""}
                        onChange={(e) => handleChangePhone(e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <PhoneEnabledIcon
                                        sx={{
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </BoxContent>

                {/* SELECT FACULTY */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogUserManagementFilter.FACULTY}
                    </TextStyle>
                    <AutocompleteStyle
                        disablePortal={false}
                        multiple
                        disableCloseOnSelect
                        size="small"
                        sx={{ marginBottom: 1 }}
                        noOptionsText={Strings.Common.NO_DATA}
                        options={facultyList}
                        getOptionLabel={(option) => `${option.name}`}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={
                                    Strings.DialogUserManagementFilter
                                        .CHOOSE_FACULTY 
                                }
                            />
                        )}
                        onChange={(event, newValue) => {
                            handleSelectFaculty(newValue);
                        }}
                        value={dataSendApi.faculty || null}
                        isOptionEqualToValue={(option, value) =>
                            option.idFaculty === value.idFaculty
                        }
                    />
                </BoxContent>

                {/* SELECT STATUS */}
                <BoxContent>
                    <TextStyle>
                        {Strings.DialogUserManagementFilter.STATUS}
                    </TextStyle>
                    <AutocompleteStyle
                        disablePortal={false}
                        multiple
                        disableCloseOnSelect
                        size="small"
                        sx={{ marginBottom: 1 }}
                        noOptionsText={Strings.Common.NO_DATA}
                        options={userStatusList}
                        getOptionLabel={(option) => `${option.name}`}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={
                                    Strings.DialogUserManagementFilter
                                        .CHOOSE_STATUS
                                }
                            />
                        )}
                        onChange={(event, newValue) => {
                            handleSelectUserStatus(newValue);
                        }}
                        value={dataSendApi.userStatus || null}
                        isOptionEqualToValue={(option, value) =>
                            option.idUserStatus === value.idUserStatus
                        }
                    />
                </BoxContent>
            </DialogContent>

            {/* BUTTON */}
            <DialogActions>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
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

                    {/* REFRESH BUTTON */}
                    <ButtonFeatures
                        size="small"
                        variant="contained"
                        endIcon={<RestartAltIcon />}
                        color="warning"
                        sx={{ marginRight: 1 }}
                        onClick={handleRefreshFilter}
                    >
                        {Strings.Common.REFRESH}
                    </ButtonFeatures>

                    {/* SEARCH BUTTON / SUBMIT BUTTON */}
                    <ButtonFeatures
                        size="small"
                        variant="contained"
                        endIcon={<CheckCircleIcon />}
                        color="primary"
                        sx={{ marginRight: 1 }}
                        onClick={() => handleSubmit()}
                    >
                        {Strings.Common.SEARCH}
                    </ButtonFeatures>
                </Box>
            </DialogActions>

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

export default DialogUserManagementFilter;
