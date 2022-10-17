import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    List,
    RadioGroup,
    styled,
    TextField,
    Typography,
} from "@mui/material";

const DialogContainer = styled(Dialog)(({ theme }) => ({
    [theme.breakpoints.up("mobileS")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "310px !important",
                margin: 0,
            },
        },
    },
    [theme.breakpoints.up("mobileM")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "368px !important",
                margin: 0,
            },
        },
    },
    [theme.breakpoints.up("mobileL")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "410px !important",
                margin: 0,
            },
        },
    },
    [theme.breakpoints.up("sm")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "600px !important",
                margin: 0,
            },
        },
    },
    [theme.breakpoints.up("md")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "700px !important",
                margin: 0,
            },
        },
    },
    [theme.breakpoints.up("lg")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "800px !important",
                margin: 0,
            },
        },
    },
    [theme.breakpoints.up("xl")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "900px !important",
                margin: 0,
            },
        },
    },
}));

const BoxLeft = styled(Box)(({ theme }) => ({
    textAlign: "center",
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
        width: 210,
    },
    [theme.breakpoints.up("md")]: {
        width: 210,
    },
    [theme.breakpoints.up("lg")]: {
        width: 250,
    },
    [theme.breakpoints.up("xl")]: {
        width: 250,
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
        width: `calc(100% - 210px)`,
        paddingLeft: 20,
    },
    [theme.breakpoints.up("md")]: {
        width: `calc(100% - 210px)`,
        paddingLeft: 20,
    },
    [theme.breakpoints.up("lg")]: {
        width: `calc(100% - 250px)`,
        paddingLeft: 20,
    },
    [theme.breakpoints.up("xl")]: {
        width: `calc(100% - 250px)`,
        paddingLeft: 20,
    },
}));

const Img = styled("img")(({ theme }) => ({
    borderRadius: 10,
    objectFit: "cover",
    [theme.breakpoints.up("mobileS")]: {
        width: 265,
    },
    [theme.breakpoints.up("mobileM")]: {
        width: 240,
    },
    [theme.breakpoints.up("mobileL")]: {
        width: 240,
    },
    [theme.breakpoints.up("sm")]: {
        width: 210,
    },
    [theme.breakpoints.up("md")]: {
        width: 210,
    },
    [theme.breakpoints.up("lg")]: {
        width: 250,
    },
    [theme.breakpoints.up("xl")]: {
        width: 250,
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

const CarTypeTitle = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    [theme.breakpoints.up("xs")]: {
        fontSize: 14,
    },
    [theme.breakpoints.up("mobileS")]: {
        fontSize: 14,
    },
    [theme.breakpoints.up("mobileM")]: {
        fontSize: 14,
    },
    [theme.breakpoints.up("mobileL")]: {
        fontSize: 14,
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: 17,
    },
    [theme.breakpoints.up("md")]: {
        fontSize: 17,
    },
    [theme.breakpoints.up("lg")]: {
        fontSize: 17,
    },
    [theme.breakpoints.up("xl")]: {
        fontSize: 17,
    },
}));

const TextContent = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.up("xs")]: {
        fontSize: 12,
    },
    [theme.breakpoints.up("mobileS")]: {
        fontSize: 12,
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
        fontSize: 15,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    [theme.breakpoints.up("lg")]: {
        fontSize: 15,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    [theme.breakpoints.up("xl")]: {
        fontSize: 15,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
}));

const TextInput = styled(TextField)(({ theme }) => ({
    marginTop: 5,
    ".MuiInputBase-root": {
        paddingRight: 5,
    },
    [theme.breakpoints.up("mobileS")]: {
        width: 260,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
        ".MuiFormLabel-root": {
            fontSize: 12,
        },
        ".MuiSvgIcon-root": {
            fontSize: 15,
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
            fontSize: 16,
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
            fontSize: 16,
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
            fontSize: 18,
        },
    },
    [theme.breakpoints.up("md")]: {
        width: 410,
        ".MuiInputBase-input": {
            fontSize: 13,
        },
        ".MuiFormLabel-root": {
            fontSize: 13,
        },
        ".MuiSvgIcon-root": {
            fontSize: 18,
        },
    },
    [theme.breakpoints.up("lg")]: {
        width: 430,
        ".MuiInputBase-input": {
            fontSize: 13,
        },
        ".MuiFormLabel-root": {
            fontSize: 13,
        },
        ".MuiSvgIcon-root": {
            fontSize: 19,
        },
    },
    [theme.breakpoints.up("xl")]: {
        width: 450,
        ".MuiInputBase-input": {
            fontSize: 13,
        },
        ".MuiFormLabel-root": {
            fontSize: 13,
        },
        ".MuiSvgIcon-root": {
            fontSize: 19,
        },
    },
}));

const ListStyle = styled(List)(({ theme }) => ({
    width: "100%",
    bgcolor: "background.paper",
    padding: "0px",
    marginLeft: 15,
    ".MuiListItem-root": {
        padding: "0px",
    },
    ".MuiSvgIcon-root": {
        color: theme.palette.primary.main,
        marginRight: 5,
        [theme.breakpoints.up("mobileS")]: {
            fontSize: 15,
        },
        [theme.breakpoints.up("sm")]: {
            fontSize: 16,
        },
        [theme.breakpoints.up("md")]: {
            fontSize: 18,
        },
    },
    ".MuiTypography-body1": {
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontWeight: "bold",
        color: theme.palette.primary.main,
        [theme.breakpoints.up("mobileS")]: {
            whiteSpace: "normal",
            fontSize: 12,
        },
        [theme.breakpoints.up("sm")]: {
            fontSize: 13,
        },
        [theme.breakpoints.up("md")]: {
            whiteSpace: "nowrap",
            fontSize: 13,
        },
    },
    ".MuiTypography-body2": {
        overflow: "hidden",
        textOverflow: "ellipsis",
        [theme.breakpoints.up("mobileS")]: {
            whiteSpace: "normal",
            fontSize: 12,
        },
        [theme.breakpoints.up("sm")]: {
            fontSize: 13,
        },
        [theme.breakpoints.up("md")]: {
            whiteSpace: "nowrap",
            fontSize: 14,
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
        width: 220,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("mobileM")]: {
        width: 250,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("mobileL")]: {
        width: 250,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("sm")]: {
        width: 250,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("md")]: {
        width: 250,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("lg")]: {
        width: 250,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
    [theme.breakpoints.up("xl")]: {
        width: 250,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
    },
}));

const MultipleTextInput = styled(TextField)(({ theme }) => ({
    marginTop: 8,
    marginLeft: 10,
    ".MuiInputBase-root": {
        paddingTop: 5,
    },
    [theme.breakpoints.up("mobileS")]: {
        width: 220,
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
    [theme.breakpoints.up("mobileL")]: {
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
    [theme.breakpoints.up("xl")]: {
        width: 250,
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

const BoxComment = styled(Box)(({ theme }) => ({
    display: "block",
    marginLeft: 1,
    marginBottom: 5,
    [theme.breakpoints.up("mobileS")]: {
        width: 250,
    },
    [theme.breakpoints.up("mobileM")]: {
        width: 290,
    },
    [theme.breakpoints.up("mobileL")]: {
        width: 330,
    },
    [theme.breakpoints.up("sm")]: {
        width: 310,
    },
    [theme.breakpoints.up("md")]: {
        width: 380,
    },
    [theme.breakpoints.up("lg")]: {
        width: 450,
    },
    [theme.breakpoints.up("xl")]: {
        width: 520,
    },
}));

const RadioGroupStyle = styled(RadioGroup)(({ theme }) => ({
    marginLeft: 10,
    "& .MuiSvgIcon-root": {
        fontSize: 15,
    },
    "& .MuiFormControlLabel-label": {
        fontSize: 15,
    },
}));

export {
    Title,
    DialogContainer,
    ButtonFeatures,
    BoxLeft,
    Img,
    BoxRight,
    CarTypeTitle,
    TextContent,
    TextInput,
    ListStyle,
    AutocompleteStyle,
    MultipleTextInput,
    RadioGroupStyle,
    BoxComment,
};
