import {
    Autocomplete,
    Box,
    Button,
    Dialog,
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
                maxWidth: "360px !important",
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
                maxWidth: "700px !important",
                margin: 0,
            },
        },
    },
    [theme.breakpoints.up("md")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "fit-content",
                maxWidth: "750px !important",
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

const TextStyle = styled(Typography)(({ theme }) => ({
    width: 125,
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

const TextInput = styled(TextField)(({ theme }) => ({
    marginBottom: 5,
    // ".MuiInputBase-root": {
    //     // paddingRight: 5,
    // },
    [theme.breakpoints.up("mobileS")]: {
        width: 260,
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
        width: 320,
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
        width: 360,
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
    [theme.breakpoints.up("md")]: {
        width: 330,
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
        width: 330,
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
        width: 330,
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
    // marginLeft: 10,
    textTransform: "capitalize",
    color: theme.palette.text.disabled,
    borderColor: theme.palette.action.disabled,
    [theme.breakpoints.up("mobileS")]: {
        width: 260,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("mobileM")]: {
        width: 320,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("mobileL")]: {
        width: 360,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("sm")]: {
        width: 300,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("md")]: {
        width: 330,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("lg")]: {
        width: 330,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("xl")]: {
        width: 330,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
}));

const BoxLeft = styled(Box)(({ theme }) => ({
    float: "left",
    [theme.breakpoints.up("mobileS")]: {
        width: 265,
    },
    [theme.breakpoints.up("mobileM")]: {
        width: 320,
    },
    [theme.breakpoints.up("mobileL")]: {
        width: 360,
    },
    [theme.breakpoints.up("sm")]: {
        width: 320,
    },
    [theme.breakpoints.up("md")]: {
        width: 340,
    },
    [theme.breakpoints.up("lg")]: {
        width: 350,
    },
    [theme.breakpoints.up("xl")]: {
        width: 340,
    },
}));

const BoxRight = styled(Box)(({ theme }) => ({
    float: "left",
    [theme.breakpoints.up("mobileS")]: {
        width: 265,
    },
    [theme.breakpoints.up("mobileM")]: {
        width: 320,
    },
    [theme.breakpoints.up("mobileL")]: {
        width: 360,
    },
    [theme.breakpoints.up("sm")]: {
        // width: `calc(100% - 250px)`,
        width: `calc(100% - 320px)`,
        // width: 320,
        paddingLeft: 20,
    },
    [theme.breakpoints.up("md")]: {
        // width: `calc(100% - 250px)`,
        width: `calc(100% - 340px)`,
        // width: 320,
        paddingLeft: 20,
    },
    [theme.breakpoints.up("lg")]: {
        // width: `calc(100% - 250px)`,
        width: `calc(100% - 350px)`,
        // width: 370,
        paddingLeft: 20,
    },
    [theme.breakpoints.up("xl")]: {
        // width: `calc(100% - 250px)`,
        width: `calc(100% - 340px)`,
        // width: 420,
        paddingLeft: 20,
    },
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    // marginLeft: 10,
    textTransform: "capitalize",
    color: theme.palette.text.disabled,
    borderColor: theme.palette.action.disabled,
    fontWeight: "unset",
    [theme.breakpoints.up("mobileS")]: {
        width: 260,
        fontSize: 12,
    },
    [theme.breakpoints.up("mobileM")]: {
        width: 320,
        fontSize: 12,
    },
    [theme.breakpoints.up("mobileL")]: {
        width: 360,
        fontSize: 12,
    },
    [theme.breakpoints.up("sm")]: {
        width: 300,
        fontSize: 13,
    },
    [theme.breakpoints.up("md")]: {
        width: 330,
        fontSize: 13,
    },
    [theme.breakpoints.up("lg")]: {
        width: 330,
        fontSize: 13,
    },
    [theme.breakpoints.up("xl")]: {
        width: 330,
        fontSize: 13,
    },
}));

export {
    AutocompleteStyle,
    BoxLeft,
    BoxRight,
    ButtonFeatures,
    ButtonStyled,
    DialogContainer,
    TextInput,
    TextStyle,
    Title,
};
