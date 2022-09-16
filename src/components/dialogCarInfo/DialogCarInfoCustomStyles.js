import { Button, DialogTitle, List, styled, Typography } from "@mui/material";

const Img = styled("img")(({ theme }) => ({
    objectFit: "cover",
    borderRadius: "10px",
    marginRight: "10px",
    [theme.breakpoints.up("xs")]: {
        maxWidth: 205,
    },
    [theme.breakpoints.up("mobileS")]: {
        maxWidth: 205,
    },
    [theme.breakpoints.up("mobileM")]: {
        maxWidth: 310,
    },
    [theme.breakpoints.up("mobileL")]: {
        maxWidth: 315,
        width: 315,
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

const ListContainer = styled(List)(({ theme }) => ({
    backgroundColor: "background.paper",
    padding: "0px",
    borderRadius: "10px",
}));

const Title = styled(DialogTitle)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
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

const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.up("xs")]: {
        fontSize: 10,
    },
    [theme.breakpoints.up("mobileS")]: {
        fontSize: 10,
    },
    [theme.breakpoints.up("mobileM")]: {
        fontSize: 10,
    },
    [theme.breakpoints.up("mobileL")]: {
        fontSize: 10,
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

export { Img, ListContainer, Title, CarTypeTitle, TextContent, ButtonStyled };