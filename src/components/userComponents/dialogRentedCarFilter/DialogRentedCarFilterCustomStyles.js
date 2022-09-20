import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    FormGroup,
    styled,
    TextField,
    Typography,
} from "@mui/material";

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

const FormGroupStyle = styled(FormGroup)(({ theme }) => ({
    marginLeft: 10,
    [theme.breakpoints.up("mobileS")]: {
        ".MuiSvgIcon-root": {
            fontSize: 12,
        },
        ".MuiTypography-root": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("mobileM")]: {
        ".MuiSvgIcon-root": {
            fontSize: 12,
        },
        ".MuiTypography-root": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("mobileL")]: {
        ".MuiSvgIcon-root": {
            fontSize: 12,
        },
        ".MuiTypography-root": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("sm")]: {
        ".MuiSvgIcon-root": {
            fontSize: 14,
        },
        ".MuiTypography-root": {
            fontSize: 14,
        },
    },
    [theme.breakpoints.up("md")]: {
        ".MuiSvgIcon-root": {
            fontSize: 14,
        },
        ".MuiTypography-root": {
            fontSize: 14,
        },
    },
    [theme.breakpoints.up("lg")]: {
        ".MuiSvgIcon-root": {
            fontSize: 14,
        },
        ".MuiTypography-root": {
            fontSize: 14,
        },
    },
    [theme.breakpoints.up("xl")]: {
        ".MuiSvgIcon-root": {
            fontSize: 15,
        },
        ".MuiTypography-root": {
            fontSize: 15,
        },
    },
}));

const BoxContent = styled(Box)(({ theme }) => ({
    marginTop: 5,
    [theme.breakpoints.up("mobileS")]: {},
    [theme.breakpoints.up("mobileM")]: {},
    [theme.breakpoints.up("mobileL")]: {},
    [theme.breakpoints.up("sm")]: {
        display: "flex",
        alignItems: "center",
    },
    [theme.breakpoints.up("md")]: {
        display: "flex",
        alignItems: "center",
    },
    [theme.breakpoints.up("lg")]: {
        display: "flex",
        alignItems: "center",
    },
    [theme.breakpoints.up("xl")]: {
        display: "flex",
        alignItems: "center",
    },
}));

const TextStyle = styled(Typography)(({ theme }) => ({
    width: 90,
    textAlign: 'right',
    [theme.breakpoints.up("mobileS")]: {
        fontSize: 12,
    },
    [theme.breakpoints.up("mobileM")]: {
        fontSize: 13,
    },
    [theme.breakpoints.up("mobileL")]: {
        fontSize: 13,
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: 14,
    },
    [theme.breakpoints.up("md")]: {
        fontSize: 14,
    },
    [theme.breakpoints.up("lg")]: {
        fontSize: 14,
    },
    [theme.breakpoints.up("xl")]: {
        fontSize: 14,
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
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
        fontSize: 10,
    },
    [theme.breakpoints.up("mobileL")]: {
        fontSize: 10,
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: 11,
    },
    [theme.breakpoints.up("md")]: {
        fontSize: 11,
    },
    [theme.breakpoints.up("lg")]: {
        fontSize: 12,
    },
    [theme.breakpoints.up("xl")]: {
        fontSize: 12,
    },
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 10,
    textTransform: "capitalize",
    color: theme.palette.text.disabled,
    borderColor: theme.palette.action.disabled,
    fontWeight: "unset",
    [theme.breakpoints.up("mobileS")]: {
        width: 230,
        fontSize: 12,
    },
    [theme.breakpoints.up("mobileM")]: {
        width: 280,
        fontSize: 12,
    },
    [theme.breakpoints.up("mobileL")]: {
        width: 290,
        fontSize: 12,
    },
    [theme.breakpoints.up("sm")]: {
        width: 400,
        fontSize: 13,
    },
    [theme.breakpoints.up("md")]: {
        width: 420,
        fontSize: 13,
    },
    [theme.breakpoints.up("lg")]: {
        width: 390,
        fontSize: 13,
    },
    [theme.breakpoints.up("xl")]: {
        width: 420,
        fontSize: 13,
    },
}));

const TextInput = styled(TextField)(({ theme }) => ({
    marginLeft: 10,
    ".MuiInputBase-root": {
        paddingRight: 5,
    },
    [theme.breakpoints.up("mobileS")]: {
        width: 230,
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
        width: 280,
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
        width: 290,
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
        width: 400,
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
        width: 420,
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
        width: 390,
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
        width: 420,
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
}));

const AutocompleteStyle = styled(Autocomplete)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 10,
    textTransform: "capitalize",
    color: theme.palette.text.disabled,
    borderColor: theme.palette.action.disabled,
    [theme.breakpoints.up("mobileS")]: {
        width: 230,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("mobileM")]: {
        width: 280,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("mobileL")]: {
        width: 290,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("sm")]: {
        width: 400,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("md")]: {
        width: 420,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("lg")]: {
        width: 390,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("xl")]: {
        width: 420,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
}));

export {
    AutocompleteStyle,
    BoxContent,
    ButtonFeatures,
    ButtonStyled,
    DialogContainer,
    FormGroupStyle,
    TextStyle,
    Title,
    TextInput
};
