import {
    Alert,
    Box,
    Button,
    FormControlLabel,
    Grid,
    styled,
    TextField,
    Typography,
} from "@mui/material";

const GridContainer = styled(Grid)(({ theme }) => ({
    direction: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    [theme.breakpoints.up("sm")]: {
        backgroundColor: "rgb(211 234 255)",
        overflow: "auto",
    },
}));

const BoxLogin = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
        backgroundColor: "white",
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        WebkitBoxShadow:
            "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
        boxShadow:
            "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
        borderRadius: 15,
    },
}));

const Logo = styled("img")({
    width: "40%",
    marginBottom: 15,
});

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    fontFamily: "serif",
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up("xs")]: {
        fontSize: "18px",
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: "23px",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "24px",
    },
}));

const AlertError = styled(Alert)(({ theme }) => ({
    width: "95%",
    borderRadius: 15,
    padding: 1,
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    alignItems: "center",
    color: theme.palette.error.main,
    [theme.breakpoints.up("xs")]: {
        fontSize: "11px",
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: "12px",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "14px",
    },
}));

const TextLogin = styled(TextField)(({ theme }) => ({
    [theme.breakpoints.up("xs")]: {
        ".MuiInputBase-input": {
            fontSize: "12px",
        },
        ".MuiFormLabel-root": {
            fontSize: "13px",
        },
        ".MuiSvgIcon-root": {
            fontSize: "20px",
        },
    },
    [theme.breakpoints.up("sm")]: {
        ".MuiInputBase-input": {
            fontSize: "15px",
        },
        ".MuiFormLabel-root": {
            fontSize: "16px",
        },
        ".MuiSvgIcon-root": {
            fontSize: "25px",
        },
    },
    [theme.breakpoints.up("md")]: {
        ".MuiInputBase-input": {
            fontSize: "15px",
        },
        ".MuiFormLabel-root": {
            fontSize: "16px",
        },
        ".MuiSvgIcon-root": {
            fontSize: "26px",
        },
    },
}));

const FormCheckBox = styled(FormControlLabel)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    fontStyle: "italic",
    [theme.breakpoints.up("xs")]: {
        ".MuiFormControlLabel-label": {
            fontSize: "12px",
        },
        ".MuiSvgIcon-root": {
            fontSize: "15px",
        },
    },
    [theme.breakpoints.up("sm")]: {
        ".MuiFormControlLabel-label": {
            fontSize: "14px",
        },
        ".MuiSvgIcon-root": {
            fontSize: "16px",
        },
    },
    [theme.breakpoints.up("md")]: {
        ".MuiFormControlLabel-label": {
            fontSize: "15px",
        },
        ".MuiSvgIcon-root": {
            fontSize: "16px",
        },
    },
}));

const ButtonLogin = styled(Button)(({ theme }) => ({
    [theme.breakpoints.up("xs")]: {
        fontSize: "12px",
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: "14px",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "15px",
    },
}));

export {
    GridContainer,
    BoxLogin,
    Logo,
    Title,
    TextLogin,
    FormCheckBox,
    ButtonLogin,
    AlertError,
};
