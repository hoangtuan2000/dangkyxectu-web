import { Box, Button, DialogTitle, List, styled, Typography } from "@mui/material";

const ModalContainer = styled(Box)(({ theme }) => ({
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    // fontWeight: "bold",
    // marginBottom: 10,
    // color: theme.palette.primary.main,
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
        width: 500,
    },
    [theme.breakpoints.up("md")]: {
        width: 500,
    },
    [theme.breakpoints.up("lg")]: {
        width: 500,
    },
    [theme.breakpoints.up("xl")]: {
        width: 500,
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.palette.primary.main,
    [theme.breakpoints.up("xs")]: {
        fontSize: 17,
    },
    [theme.breakpoints.up("mobileS")]: {
        fontSize: 17,
    },
    [theme.breakpoints.up("mobileM")]: {
        fontSize: 18,
    },
    [theme.breakpoints.up("mobileL")]: {
        fontSize: 18,
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: 22,
    },
    [theme.breakpoints.up("md")]: {
        fontSize: 22,
    },
    [theme.breakpoints.up("lg")]: {
        fontSize: 22,
    },
    [theme.breakpoints.up("xl")]: {
        fontSize: 22,
    },
}));

export {Title, ModalContainer };