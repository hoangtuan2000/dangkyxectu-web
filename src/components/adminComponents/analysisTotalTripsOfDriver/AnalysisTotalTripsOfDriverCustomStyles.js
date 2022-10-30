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

const ButtonFeatures = styled(Button)(({ theme }) => ({
    padding: 1,
    paddingLeft: 5,
    paddingRight: 5,
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
        fontSize: 11,
    },
    [theme.breakpoints.up("xl")]: {
        fontSize: 11,
    },
}));

const BoxContainerCount = styled(Box)(({ theme }) => ({
    width: "calc(90% / 5)",
    // width: "220px",
    height: "100px",
    backgroundColor: theme.palette.action.selected,
    boxShadow: `${theme.palette.text.disabled} 0px 5px 15px`,
    borderRadius: "10px",
    borderLeft: `5px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(2),
    margin: theme.spacing(1),
}));

const BoxTextCount = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "25px",
    fontWeight: "bold",
    color: theme.palette.text.primary,
}));

const TypographyHeaderCount = styled(Typography)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: 15,
}));

const BoxContainerChart = styled(Box)(({ theme }) => ({
    // width: "calc(96% / 2)",
    width: "100%",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    boxShadow: `${theme.palette.text.disabled} 0px 5px 15px`,
}));

const TitleChart = styled(Typography)(({ theme }) => ({
    fontSize: 16,
    fontWeight: "bold",
    color: theme.palette.primary.main,
    // textAlign: 'center'
}));

const BoxTitleChart = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: "relative",
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
        transform: "scale(0.6)",
    },
    [theme.breakpoints.up("md")]: {
        transform: "scale(0.6)",
    },
    [theme.breakpoints.up("lg")]: {
        transform: "scale(0.6)",
    },
    [theme.breakpoints.up("xl")]: {
        transform: "scale(0.6)",
    },
}));

export {
    BoxContainerCount,
    ButtonStyle,
    TypographyHeaderCount,
    BoxTextCount,
    BoxContainerChart,
    TitleChart,
    FabStyle,
    BoxTitleChart,
    ButtonFeatures
};
