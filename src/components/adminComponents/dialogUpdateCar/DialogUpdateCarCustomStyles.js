import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    List,
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
                maxWidth: "750px !important",
                margin: 0,
            },
        },
    },
    [theme.breakpoints.up("xl")]: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "fit-content",
                maxWidth: "740px !important",
                margin: 0,
            },
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

const Img = styled("img")(({ theme }) => ({
    borderRadius: 10,
    objectFit: "cover",
    width: "100%",
    height: "100%",
    // [theme.breakpoints.up("mobileS")]: {
    //     width: 265,
    // },
    // [theme.breakpoints.up("mobileM")]: {
    //     width: 240,
    // },
    // [theme.breakpoints.up("mobileL")]: {
    //     width: 240,
    // },
    // [theme.breakpoints.up("sm")]: {
    //     width: 210,
    // },
    // [theme.breakpoints.up("md")]: {
    //     width: 210,
    // },
    // [theme.breakpoints.up("lg")]: {
    //     width: 250,
    // },
    // [theme.breakpoints.up("xl")]: {
    //     width: 250,
    // },
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
    margin: "auto",
    [theme.breakpoints.up("mobileS")]: {
        width: 260,
        height: 160,
    },
    [theme.breakpoints.up("mobileM")]: {
        width: 260,
        height: 160,
    },
    [theme.breakpoints.up("mobileL")]: {
        width: 260,
        height: 160,
    },
    [theme.breakpoints.up("sm")]: {
        width: 240,
        height: 160,
    },
    [theme.breakpoints.up("md")]: {
        width: 240,
        height: 160,
    },
    [theme.breakpoints.up("lg")]: {
        width: 250,
        height: 160,
    },
    [theme.breakpoints.up("xl")]: {
        width: 250,
        height: 160,
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

const TextError = styled(Typography)(({ theme }) => ({
    color: theme.palette.error.main,
    fontWeight: 400,
    marginTop: 5,
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
        fontSize: 12,
    },
    [theme.breakpoints.up("md")]: {
        fontSize: 12,
    },
    [theme.breakpoints.up("lg")]: {
        fontSize: 12,
    },
    [theme.breakpoints.up("xl")]: {
        fontSize: 12,
    },
}));

const ListStyle = styled(List)(({ theme }) => ({
    width: "100%",
    bgcolor: "background.paper",
    padding: "0px",
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

const BoxHelperDisable = styled(Box)(({ theme }) => ({
    // margin: 0,
    fontSize: "12px",
    color: theme.palette.text.disabled,
    overflow: "hidden",
    textOverflow: "ellipsis",
    [theme.breakpoints.up("mobileS")]: {
        whiteSpace: "normal",
    },
    [theme.breakpoints.up("md")]: {
        whiteSpace: "nowrap",
    },
}));

export {
    AutocompleteStyle,
    BoxContent,
    ButtonFeatures,
    DialogContainer,
    TextInput,
    TextStyle,
    Title,
    BoxLeft,
    BoxRight,
    Img,
    BoxImg,
    ButtonStyled,
    TextError,
    ListStyle,
    BoxHelperDisable,
};
