import { Box, Button, styled, TextField, Typography } from "@mui/material";

const BoxContainerContent = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: 2,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    padding: "10px 20px",
    overflow: "auto",
}));

const BoxLeftContent = styled(Box)(({ theme }) => ({
    float: "left",
    [theme.breakpoints.up("xs")]: {
        width: 230,
    },
    [theme.breakpoints.up("mobileS")]: {
        width: 230,
    },
    [theme.breakpoints.up("mobileM")]: {
        width: 285,
    },
    [theme.breakpoints.up("mobileL")]: {
        width: 335,
    },
    [theme.breakpoints.up("sm")]: {
        width: 240,
    },
    [theme.breakpoints.up("md")]: {
        width: 480,
    },
    [theme.breakpoints.up("lg")]: {
        width: 490,
    },
    [theme.breakpoints.up("xl")]: {
        width: 500,
    },
}));

const BoxRightContent = styled(Box)(({ theme }) => ({
    float: "left",
    [theme.breakpoints.up("xs")]: {
        width: 230,
    },
    [theme.breakpoints.up("mobileS")]: {
        width: 230,
    },
    [theme.breakpoints.up("mobileM")]: {
        width: 285,
    },
    [theme.breakpoints.up("mobileL")]: {
        width: 335,
    },
    [theme.breakpoints.up("sm")]: {
        minWidth: 230,
        width: `calc(100% - 240px)`,
        paddingLeft: 10,
    },
    [theme.breakpoints.up("md")]: {
        minWidth: 230,
        width: `calc(100% - 480px)`,
        paddingLeft: 10,
    },
    [theme.breakpoints.up("lg")]: {
        minWidth: 230,
        width: `calc(100% - 490px)`,
        paddingLeft: 10,
    },
    [theme.breakpoints.up("xl")]: {
        minWidth: 230,
        width: `calc(100% - 500px)`,
        paddingLeft: 10,
    },
}));

const Img = styled("img")(({ theme }) => ({
    objectFit: "cover",
    borderRadius: "10px",
    marginRight: "10px",
    width: "100%",
    [theme.breakpoints.up("xs")]: {
        maxWidth: 235,
    },
    [theme.breakpoints.up("mobileS")]: {
        maxWidth: 235,
    },
    [theme.breakpoints.up("mobileM")]: {
        maxWidth: 310,
    },
    [theme.breakpoints.up("mobileL")]: {
        maxWidth: 315,
        width: 315,
    },
    [theme.breakpoints.up("sm")]: {
        maxWidth: 240,
    },
    [theme.breakpoints.up("md")]: {
        maxWidth: 250,
    },
    [theme.breakpoints.up("lg")]: {
        maxWidth: 250,
    },
    [theme.breakpoints.up("xl")]: {
        maxWidth: 250,
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: theme.palette.primary.main,
    [theme.breakpoints.up("xs")]: {
        fontSize: 14,
    },
    [theme.breakpoints.up("mobileS")]: {
        fontSize: 14,
    },
    [theme.breakpoints.up("mobileM")]: {
        fontSize: 16,
    },
    [theme.breakpoints.up("mobileL")]: {
        fontSize: 16,
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: 20,
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
        fontSize: 15,
    },
    [theme.breakpoints.up("md")]: {
        fontSize: 15,
    },
    [theme.breakpoints.up("lg")]: {
        fontSize: 15,
    },
    [theme.breakpoints.up("xl")]: {
        fontSize: 15,
    },
}));

const TextInput = styled(TextField)(({ theme }) => ({
    margin: 10,
    [theme.breakpoints.up("mobileS")]: {
        width: 230,
        ".MuiInputBase-input": {
            fontSize: 12,
        },
        ".MuiFormLabel-root": {
            fontSize: 12,
        },
        ".MuiSvgIcon-root": {
            fontSize: 18,
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
            fontSize: 18,
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
            fontSize: 18,
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
            fontSize: 22,
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
            fontSize: 22,
        },
    },
}));

const ButtonInput = styled(Button)(({ theme }) => ({
    padding: 0,
    margin: 10,
    textTransform: "capitalize",
    [theme.breakpoints.up("mobileS")]: {
        width: 230,
        "&.MuiButtonBase-root .MuiFormControl-root .MuiInputBase-input": {
            fontSize: 10,
        },
        "&.MuiButtonBase-root .MuiFormControl-root .MuiFormLabel-root": {
            fontSize: 10,
        },
        "&.MuiButtonBase-root .MuiFormControl-root .MuiSvgIcon-root": {
            fontSize: 16,
        },
    },
    [theme.breakpoints.up("mobileM")]: {
        width: 280,
        "&.MuiButtonBase-root .MuiFormControl-root .MuiInputBase-input": {
            fontSize: 11,
        },
        "&.MuiButtonBase-root .MuiFormControl-root .MuiFormLabel-root": {
            fontSize: 11,
        },
        "&.MuiButtonBase-root .MuiFormControl-root .MuiSvgIcon-root": {
            fontSize: 18,
        },
    },
    [theme.breakpoints.up("mobileL")]: {
        width: 290,
        "&.MuiButtonBase-root .MuiFormControl-root .MuiInputBase-input": {
            fontSize: 11,
        },
        "&.MuiButtonBase-root .MuiFormControl-root .MuiFormLabel-root": {
            fontSize: 11,
        },
        "&.MuiButtonBase-root .MuiFormControl-root .MuiSvgIcon-root": {
            fontSize: 20,
        },
    },
    [theme.breakpoints.up("sm")]: {
        width: 400,
        "&.MuiButtonBase-root .MuiFormControl-root .MuiInputBase-input": {
            fontSize: 11,
        },
        "&.MuiButtonBase-root .MuiFormControl-root .MuiFormLabel-root": {
            fontSize: 11,
        },
        "&.MuiButtonBase-root .MuiFormControl-root .MuiSvgIcon-root": {
            fontSize: 22,
        },
    },
    [theme.breakpoints.up("md")]: {
        width: 420,
        "&.MuiButtonBase-root .MuiFormControl-root .MuiInputBase-input": {
            fontSize: 12,
        },
        "&.MuiButtonBase-root .MuiFormControl-root .MuiFormLabel-root": {
            fontSize: 12,
        },
        "&.MuiButtonBase-root .MuiFormControl-root .MuiSvgIcon-root": {
            fontSize: 24,
        },
    },
    [theme.breakpoints.up("lg")]: {
        width: 390,
        "&.MuiButtonBase-root .MuiFormControl-root .MuiInputBase-input": {
            fontSize: 13,
        },
        "&.MuiButtonBase-root .MuiFormControl-root .MuiFormLabel-root": {
            fontSize: 13,
        },
        "&.MuiButtonBase-root .MuiFormControl-root .MuiSvgIcon-root": {
            fontSize: 20,
        },
    },
    [theme.breakpoints.up("xl")]: {
        width: 420,
        "&.MuiButtonBase-root .MuiFormControl-root .MuiInputBase-input": {
            fontSize: 13,
        },
        "&.MuiButtonBase-root .MuiFormControl-root .MuiFormLabel-root": {
            fontSize: 13,
        },
        "&.MuiButtonBase-root .MuiFormControl-root .MuiSvgIcon-root": {
            fontSize: 20,
        },
    },
}));

export {
    Title,
    Img,
    CarTypeTitle,
    TextContent,
    TextInput,
    BoxLeftContent,
    BoxRightContent,
    BoxContainerContent,
    ButtonInput,
};
