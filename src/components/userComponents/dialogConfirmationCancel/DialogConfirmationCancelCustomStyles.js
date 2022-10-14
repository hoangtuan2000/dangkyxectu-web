import { Button, Dialog, RadioGroup, styled, TextField, Typography } from "@mui/material";

const DialogContainer = styled(Dialog)(({ theme }) => ({
    [theme.breakpoints.up("mobileS")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "fit-content",
                maxWidth: "310px !important",
                margin: 0,
            },
        },
    },
    [theme.breakpoints.up("mobileM")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "fit-content",
                maxWidth: "368px !important",
                margin: 0,
            },
        },
    },
    [theme.breakpoints.up("mobileL")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "fit-content",
                maxWidth: "410px !important",
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
                maxWidth: "700px !important",
                margin: 0,
            },
        },
    },
    [theme.breakpoints.up("lg")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "fit-content",
                maxWidth: "800px !important",
                margin: 0,
            },
        },
    },
    [theme.breakpoints.up("xl")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "fit-content",
                maxWidth: "900px !important",
                margin: 0,
            },
        },
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    fontWeight: "bold",
    marginBottom: 10,
    [theme.breakpoints.up("mobileS")]: {
        fontSize: 14,
    },
    [theme.breakpoints.up("mobileM")]: {
        fontSize: 14,
    },
    [theme.breakpoints.up("mobileL")]: {
        fontSize: 15,
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: 17,
    },
    [theme.breakpoints.up("md")]: {
        fontSize: 19,
    },
    [theme.breakpoints.up("lg")]: {
        fontSize: 19,
    },
    [theme.breakpoints.up("xl")]: {
        fontSize: 19,
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

const MultipleTextInput = styled(TextField)(({ theme }) => ({
    marginTop: 8,
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
        width: 280,
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
        width: 280,
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
        width: 300,
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
        width: 300,
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

const RadioGroupStyle = styled(RadioGroup)(({ theme }) => ({
    "& .MuiSvgIcon-root": {
        fontSize: 15,
    },
    "& .MuiFormControlLabel-label": {
        fontSize: 15,
    },
}));

export { DialogContainer, Title, ButtonFeatures, MultipleTextInput, RadioGroupStyle };
