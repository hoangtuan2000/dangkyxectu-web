import {
    Card,
    Fab,
    styled,
} from "@mui/material";

const CardContainer = styled(Card)(({ theme }) => ({
    float: "left",
    margin: "5px",
    height: 330,
    [theme.breakpoints.up("xs")]: {
        maxWidth: 240,
    },
    [theme.breakpoints.up("mobileS")]: {
        maxWidth: 250,
    },
    [theme.breakpoints.up("mobileM")]: {
        maxWidth: 310,
    },
    [theme.breakpoints.up("mobileL")]: {
        // maxWidth: 365,
        width: 365,
    },
    [theme.breakpoints.up("sm")]: {
        maxWidth: 230,
    },
    [theme.breakpoints.up("md")]: {
        maxWidth: 234,
    },
    [theme.breakpoints.up("lg")]: {
        maxWidth: 267,
    },
    [theme.breakpoints.up("xl")]: {
        maxWidth: 235,
    },
}));

const FabStyle = styled(Fab)(({ theme }) => ({
    marginBottom: 5,
    color: "white",
    [theme.breakpoints.up("mobileS")]: {
        transform: "scale(0.6)",
    },
    [theme.breakpoints.up("mobileM")]: {
        transform: "scale(0.6)",
    },
    [theme.breakpoints.up("mobileL")]: {
        transform: "scale(0.6)",
    },
    [theme.breakpoints.up("sm")]: {
        transform: "scale(0.65)",
    },
    [theme.breakpoints.up("md")]: {
        transform: "scale(0.7)",
    },
    [theme.breakpoints.up("lg")]: {
        transform: "scale(0.7)",
    },
    [theme.breakpoints.up("xl")]: {
        transform: "scale(0.7)",
    },
}));


export {
    CardContainer,
    FabStyle
}