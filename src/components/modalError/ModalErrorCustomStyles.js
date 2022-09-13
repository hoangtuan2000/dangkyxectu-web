import {
    Box,
    styled,
    Typography,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const BoxContainer = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: 24,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 0,
    border: '1px solid white',
    borderRadius: 10,
    textAlign: "center",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    [theme.breakpoints.up("xs")]: {
        width: 280,
    },
    [theme.breakpoints.up("mobileS")]: {
        width: 280,
    },
    [theme.breakpoints.up("mobileM")]: {
        width: 310,
    },
    [theme.breakpoints.up("mobileL")]: {
        width: 315,
    },
    [theme.breakpoints.up("sm")]: {
        width: 250,
    },
    [theme.breakpoints.up("md")]: {
        width: 280,
    },
    [theme.breakpoints.up("lg")]: {
        width: 300,
    },
    [theme.breakpoints.up("xl")]: {
        width: 300,
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    color: 'red',
    fontWeight: 'bold',
    [theme.breakpoints.up("xs")]: {
        fontSize: 14
    },
    [theme.breakpoints.up("mobileS")]: {
        fontSize: 14
    },
    [theme.breakpoints.up("mobileM")]: {
        fontSize: 14
    },
    [theme.breakpoints.up("mobileL")]: {
        fontSize: 14
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: 15
    },
    [theme.breakpoints.up("md")]: {
        fontSize: 16
    },
    [theme.breakpoints.up("lg")]: {
        fontSize: 17
    },
    [theme.breakpoints.up("xl")]: {
        fontSize: 18
    },
}));

const Content = styled(Typography)(({ theme }) => ({
    color: 'red',
    [theme.breakpoints.up("xs")]: {
        fontSize: 12
    },
    [theme.breakpoints.up("mobileS")]: {
        fontSize: 12
    },
    [theme.breakpoints.up("mobileM")]: {
        fontSize: 12
    },
    [theme.breakpoints.up("mobileL")]: {
        fontSize: 12
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: 13
    },
    [theme.breakpoints.up("md")]: {
        fontSize: 13
    },
    [theme.breakpoints.up("lg")]: {
        fontSize: 14
    },
    [theme.breakpoints.up("xl")]: {
        fontSize: 15
    },
}));

const ErrorOutlineIconCustom = styled(ErrorOutlineIcon)(({ theme }) => ({
    color: 'red',
    [theme.breakpoints.up("xs")]: {
        fontSize: 25
    },
    [theme.breakpoints.up("mobileS")]: {
        fontSize: 25
    },
    [theme.breakpoints.up("mobileM")]: {
        fontSize: 25
    },
    [theme.breakpoints.up("mobileL")]: {
        fontSize: 25
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: 30
    },
    [theme.breakpoints.up("md")]: {
        fontSize: 35
    },
    [theme.breakpoints.up("lg")]: {
        fontSize: 35
    },
    [theme.breakpoints.up("xl")]: {
        fontSize: 40
    },
}));

export { BoxContainer, Title, Content, ErrorOutlineIconCustom };
