import { Button, Fab, styled } from "@mui/material";

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
        transform: "scale(0.75)",
    },
    [theme.breakpoints.up("xl")]: {
        transform: "scale(0.8)",
    },
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
    marginBottom: 5,
    backgroundColor: theme.palette.success.main,
    [theme.breakpoints.up("mobileS")]: {
        fontSize: 10,
        ".MuiSvgIcon-root": {
            fontSize: 14,
        },
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: 11,
        ".MuiSvgIcon-root": {
            fontSize: 16,
        },
    },
    [theme.breakpoints.up("lg")]: {
        fontSize: 12,
        ".MuiSvgIcon-root": {
            fontSize: 18,
        },
    },
}));

export { FabStyle, ButtonStyle };
