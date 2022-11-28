import { useEffect, useState } from "react";
import { Box, Checkbox, Grid, IconButton, InputAdornment } from "@mui/material";
import {
    AccountCircle,
    VisibilityOff,
    Key,
    Visibility,
} from "@mui/icons-material";
import {
    GridContainer,
    BoxLogin,
    Logo,
    Title,
    TextLogin,
    FormCheckBox,
    ButtonLogin,
    AlertError,
} from "./LoginCustomStyles";
import Strings from "../../constants/Strings";
import logoCTU from "../../assets/logoCTU.png";
import { LoginService } from "../../services/LoginServices";
import ModalError from "../../components/modalError/ModalError";
import Constants from "../../constants/Constants";
import helper from "../../common/helper";
import BackDrop from "../../components/backDrop/BackDrop";
import { useNavigate } from "react-router-dom";
import RoutesPath from "../../constants/RoutesPath";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../../redux/currentUserSlice";
import { changeErrorAuthencationToken } from "../../redux/globalReduxSlice";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.currentUser.user);

    const errorAuthencationToken = useSelector(
        (state) => state.globalRedux.errorAuthencationToken
    );

    const [showPass, setShowPassword] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const [inputLogin, setInputLogin] = useState({
        code: null,
        pass: null,
        helperCode: null,
        helperPass: null,
    });

    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const handleChangeCode = (e) => {
        setInputLogin({
            ...inputLogin,
            code: e.target.value,
            helperCode: null,
        });
    };

    const handleChangePassword = (e) => {
        setInputLogin({
            ...inputLogin,
            pass: e.target.value,
            helperPass: null,
        });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        if (
            helper.isNullOrEmpty(inputLogin.code) ||
            helper.isNullOrEmpty(inputLogin.pass)
        ) {
            // code login null or empty => set error help text
            helper.isNullOrEmpty(inputLogin.code) &&
                setInputLogin({
                    ...inputLogin,
                    helperCode: Strings.Login.PLEASE_ENTER_CODE,
                });
            // pass login null or empty => set error help text
            helper.isNullOrEmpty(inputLogin.pass) &&
                setInputLogin({
                    ...inputLogin,
                    helperPass: Strings.Login.PLEASE_ENTER_PASSWORD,
                });
        } else {
            await setBackDrop(true);
            const res = await LoginService.Login({
                code: inputLogin.code,
                pass: inputLogin.pass
            });
            // axios success
            if (res.data) {
                // login success
                if (res.data.status == Constants.ApiCode.OK) {
                    await dispatch(
                        changeUser({
                            fullName: res.data.data.fullName,
                            code: res.data.data.code,
                            phone: res.data.data.phone,
                            role: res.data.data.role,
                            token: res.data.data.token,
                            accessToken: res.data.data.access_token,
                        })
                    );
                    await dispatch(changeErrorAuthencationToken(null));
                    navigate(RoutesPath.HOME);
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
                    title: (res.request && `${Strings.Common.AN_ERROR_OCCURRED} (${res.request.status})`) || Strings.Common.ERROR,
                    content: res.name || null,
                });
            }
            await setBackDrop(false);
        }
    };

    useEffect(() => {
        // If you just opened the app and the token has not expired, go to the home page
        if (currentUser.token && currentUser.accessToken) {
            navigate(RoutesPath.HOME);
        }
    }, []);

    return (
        <>
            <GridContainer container p={2}>
                <Grid item xs={12} sm={8} md={4}>
                    <BoxLogin>
                        <Logo src={logoCTU} alt="Logo CTU" />
                        <Title component="h1" variant="h5">
                            {Strings.App.TITLE}
                        </Title>
                        {errorAuthencationToken && (
                            <AlertError severity="error">
                                {errorAuthencationToken &&
                                    errorAuthencationToken}
                            </AlertError>
                        )}

                        <Box component="form" onSubmit={handleLogin}>
                            <TextLogin
                                onChange={(e) => handleChangeCode(e)}
                                error={inputLogin.helperCode && true}
                                helperText={inputLogin.helperCode}
                                margin="normal"
                                fullWidth
                                label={Strings.Login.LOGIN_CODE}
                                placeholder={Strings.Login.LOGIN_CODE}
                                autoFocus
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextLogin
                                onChange={(e) => handleChangePassword(e)}
                                error={inputLogin.helperPass && true}
                                helperText={inputLogin.helperPass}
                                margin="normal"
                                fullWidth
                                size="small"
                                label={Strings.Login.PASSWORD}
                                placeholder={Strings.Login.PASSWORD}
                                type={showPass ? "text" : "password"}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Key />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton
                                                onClick={(e) =>
                                                    setShowPassword(
                                                        !showPass
                                                    )
                                                }
                                            >
                                                {showPass ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {/* <FormCheckBox
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label={Strings.Login.REMEMBER_ACCOUNT}
                            /> */}
                            <ButtonLogin
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {Strings.Login.LOGIN}
                            </ButtonLogin>
                        </Box>
                    </BoxLogin>
                </Grid>
            </GridContainer>

            <ModalError
                open={modalError.open}
                handleClose={() =>
                    setModalError({ ...modalError, open: false })
                }
                content={modalError.content}
                title={modalError.title}
            />

            <BackDrop open={backDrop} />
        </>
    );
}
