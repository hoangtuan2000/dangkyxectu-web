import { DialogTitle, styled } from "@mui/material";

const Title = styled(DialogTitle)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
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

export { Title };
