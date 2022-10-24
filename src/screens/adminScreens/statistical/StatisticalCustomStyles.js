import { Box, Button, Fab, styled, Typography } from "@mui/material";

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

const BoxContainerCount = styled(Box)(({ theme }) => ({
    width: "280px",
    height: "130px",
    backgroundColor: theme.palette.action.selected,
    boxShadow: `${theme.palette.text.disabled} 0px 5px 15px`,
    borderRadius: "10px",
    borderLeft: `5px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    float: "left",
}));

const BoxTextCount = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "40px",
    color: theme.palette.text.primary
}));

const TypographyHeaderCount = styled(Typography)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    color: theme.palette.primary.main,
    fontWeight: "bold",
}));

export { BoxContainerCount, ButtonStyle, TypographyHeaderCount, BoxTextCount };
