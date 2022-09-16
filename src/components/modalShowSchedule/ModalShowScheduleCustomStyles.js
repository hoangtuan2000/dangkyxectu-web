import {
    Box,
    Button,
    DialogTitle,
    List,
    styled,
    TextField,
    Typography,
} from "@mui/material";

const ModalContainer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up("xs")]: {
        width: 315,
    },
    [theme.breakpoints.up("mobileS")]: {
        width: 315,
    },
    [theme.breakpoints.up("mobileM")]: {
        width: 368,
    },
    [theme.breakpoints.up("mobileL")]: {
        width: 410,
    },
    [theme.breakpoints.up("sm")]: {
        width: 600,
    },
    [theme.breakpoints.up("md")]: {
        width: 700,
    },
    [theme.breakpoints.up("lg")]: {
        width: 800,
    },
    [theme.breakpoints.up("xl")]: {
        width: 900,
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

export {
    Title,
    ModalContainer,
    ButtonFeatures,
    BoxLeft,
    Img,
    BoxRight,
    CarTypeTitle,
    TextContent,
    TextInput,
};
