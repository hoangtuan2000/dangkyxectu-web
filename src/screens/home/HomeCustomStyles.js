import {
    Card,
    styled,
} from "@mui/material";

const CardContainer = styled(Card)(({ theme }) => ({
    float: "left",
    margin: "5px",
    height: 350,
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
        maxWidth: 200,
    },
}));

export {
    CardContainer
}