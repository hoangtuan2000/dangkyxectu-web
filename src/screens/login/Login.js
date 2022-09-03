import { useState } from "react";
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
} from "./LoginCustomStyles";
import Strings from "../../constants/Strings";
import Constants from "../../constants/Constants";
import logoCTU from "../../assets/logoCTU.png";
import { LoginService } from "../../services/LoginServices";
import axios from "axios";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [inputLogin, setInputLogin] = useState({
        code: null,
        password: null,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await LoginService(inputLogin)
        console.log("res89", res);
        if(res.status != Constants.ApiCode.SUCCESS){
            console.log("lỗi liền2");
        }else{
            console.log("ok2");
        }
    };

    return (
        <GridContainer container p={2}>
            <Grid item xs={12} sm={8} md={5}>
                <BoxLogin>
                    <Logo src={logoCTU} alt="Logo CTU" />
                    <Title component="h1" variant="h5">
                        {Strings.App.TITLE}
                    </Title>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextLogin
                            onChange={(e) =>
                                setInputLogin({
                                    ...inputLogin,
                                    code: e.target.value,
                                })
                            }
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
                            onChange={(e) =>
                                setInputLogin({
                                    ...inputLogin,
                                    password: e.target.value,
                                })
                            }
                            margin="normal"
                            fullWidth
                            size="small"
                            label={Strings.Login.PASSWORD}
                            placeholder={Strings.Login.PASSWORD}
                            type={showPassword ? "text" : "password"}
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
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FormCheckBox
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label={Strings.Login.REMEMBER_ACCOUNT}
                        />
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
    );
}
