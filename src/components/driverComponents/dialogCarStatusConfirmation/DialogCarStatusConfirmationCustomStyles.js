import {
    Box,
    Button,
    Dialog,
    FormGroup,
    RadioGroup,
    styled,
    TextField,
    Typography,
} from "@mui/material";

const DialogContainer = styled(Dialog)(({ theme }) => ({
    [theme.breakpoints.up("mobileS")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "fit-content",
                maxWidth: "300px !important",
                margin: 0,
            },
        },
    },
    [theme.breakpoints.up("mobileM")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "fit-content",
                maxWidth: "350px !important",
                margin: 0,
            },
        },
    },
    [theme.breakpoints.up("mobileL")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "fit-content",
                maxWidth: "390px !important",
                margin: 0,
            },
        },
    },
    [theme.breakpoints.up("sm")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "fit-content",
                maxWidth: "600px !important",
                margin: 0,
            },
        },
    },
    [theme.breakpoints.up("md")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "fit-content",
                maxWidth: "900px !important",
                margin: 0,
            },
        },
    },
    [theme.breakpoints.up("lg")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "fit-content",
                maxWidth: "1200px !important",
                margin: 0,
            },
        },
    },
    [theme.breakpoints.up("xl")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "fit-content",
                maxWidth: "1200px !important",
                margin: 0,
            },
        },
    },
}));

const BoxFloatLeft = styled(Box)(({ theme }) => ({
    float: "left",
    [theme.breakpoints.up("mobileS")]: {
        width: "100%",
    },
    [theme.breakpoints.up("mobileM")]: {
        width: "100%",
    },
    [theme.breakpoints.up("mobileL")]: {
        width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
        width: 270,
    },
    [theme.breakpoints.up("md")]: {
        width: 270,
    },
    [theme.breakpoints.up("lg")]: {
        width: 280,
    },
    [theme.breakpoints.up("xl")]: {
        width: 280,
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.palette.primary.main,
    [theme.breakpoints.up("mobileS")]: {
        fontSize: 15,
    },
    [theme.breakpoints.up("mobileM")]: {
        fontSize: 15,
    },
    [theme.breakpoints.up("mobileL")]: {
        fontSize: 16,
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: 18,
    },
    [theme.breakpoints.up("md")]: {
        fontSize: 20,
    },
    [theme.breakpoints.up("lg")]: {
        fontSize: 20,
    },
    [theme.breakpoints.up("xl")]: {
        fontSize: 20,
    },
}));

const ButtonFeatures = styled(Button)(({ theme }) => ({
    [theme.breakpoints.up("xs")]: {
        fontSize: 9,
    },
    [theme.breakpoints.up("mobileS")]: {
        fontSize: 9,
    },
    [theme.breakpoints.up("mobileM")]: {
        fontSize: 12,
    },
    [theme.breakpoints.up("mobileL")]: {
        fontSize: 12,
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: 13,
    },
    [theme.breakpoints.up("md")]: {
        fontSize: 13,
    },
    [theme.breakpoints.up("lg")]: {
        fontSize: 13,
    },
    [theme.breakpoints.up("xl")]: {
        fontSize: 13,
    },
}));

const RadioGroupStyle = styled(RadioGroup)(({ theme }) => ({
    "& .MuiSvgIcon-root": {
        fontSize: 15,
    },
    "& .MuiFormControlLabel-label": {
        fontSize: 15,
    },
}));

const FormGroupStyle = styled(FormGroup)(({ theme }) => ({
    "& .MuiSvgIcon-root": {
        fontSize: 15,
    },
    "& .MuiFormControlLabel-label": {
        fontSize: 15,
    },
}));

const BoxImg = styled(Box)(({ theme }) => ({
    borderRadius: 11,
    padding: 1,
    paddingTop: 2,
    border: "1px solid #c2c0c0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    [theme.breakpoints.up("mobileS")]: {
        width: 250,
        height: 160,
    },
    [theme.breakpoints.up("mobileM")]: {
        width: 300,
        height: 180,
    },
    [theme.breakpoints.up("mobileL")]: {
        width: 340,
        height: 190,
    },
    [theme.breakpoints.up("sm")]: {
        width: 260,
        height: 160,
    },
    [theme.breakpoints.up("md")]: {
        width: 250,
        height: 160,
    },
    [theme.breakpoints.up("lg")]: {
        width: 260,
        height: 160,
    },
    [theme.breakpoints.up("xl")]: {
        width: 260,
        height: 160,
    },
}));

const Img = styled("img")(({ theme }) => ({
    borderRadius: 10,
    objectFit: "cover",
    width: "100%",
    height: "100%",
}));

const TextInput = styled(TextField)(({ theme }) => ({
    ".MuiInputBase-root": {
        padding: 10,
    },
    [theme.breakpoints.up("mobileS")]: {
        width: 250,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
        ".MuiFormLabel-root": {
            fontSize: 12,
        },
        ".MuiSvgIcon-root": {
            fontSize: 20,
        },
    },
    [theme.breakpoints.up("mobileM")]: {
        width: 300,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
        ".MuiFormLabel-root": {
            fontSize: 12,
        },
        ".MuiSvgIcon-root": {
            fontSize: 20,
        },
    },
    [theme.breakpoints.up("mobileL")]: {
        width: 340,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
        ".MuiFormLabel-root": {
            fontSize: 12,
        },
        ".MuiSvgIcon-root": {
            fontSize: 20,
        },
    },
    [theme.breakpoints.up("sm")]: {
        width: 250,
        ".MuiInputBase-input": {
            fontSize: 13,
        },
        ".MuiFormLabel-root": {
            fontSize: 13,
        },
        ".MuiSvgIcon-root": {
            fontSize: 20,
        },
    },
    [theme.breakpoints.up("md")]: {
        width: 250,
        ".MuiInputBase-input": {
            fontSize: 13,
        },
        ".MuiFormLabel-root": {
            fontSize: 13,
        },
        ".MuiSvgIcon-root": {
            fontSize: 20,
        },
    },
    [theme.breakpoints.up("lg")]: {
        width: 260,
        ".MuiInputBase-input": {
            fontSize: 13,
        },
        ".MuiFormLabel-root": {
            fontSize: 13,
        },
        ".MuiSvgIcon-root": {
            fontSize: 20,
        },
    },
    [theme.breakpoints.up("xl")]: {
        width: 260,
        ".MuiInputBase-input": {
            fontSize: 14,
        },
        ".MuiFormLabel-root": {
            fontSize: 14,
        },
        ".MuiSvgIcon-root": {
            fontSize: 20,
        },
    },
}));

export {
    Title,
    DialogContainer,
    ButtonFeatures,
    BoxFloatLeft,
    // BoxLeft,
    // BoxRight,
    RadioGroupStyle,
    FormGroupStyle,
    BoxImg,
    Img,
    TextInput,
};
