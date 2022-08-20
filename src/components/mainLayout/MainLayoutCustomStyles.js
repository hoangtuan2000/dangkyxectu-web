import { styled, Typography, List } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        height: "80px",
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme, bgColor }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    height: "80px",
    paddingBottom: "0px",
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
    backgroundColor: bgColor ? theme.palette.primary.main : "none",
    [theme.breakpoints.up("xs")]: {
        fontSize: "10px",
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: "12px",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "15px",
    },
}));

const ListFeatures = styled(List)(({ theme }) => ({
    [theme.breakpoints.up("xs")]: {
        ".MuiSvgIcon-root": {
            fontSize: "20px",
        },
        ".MuiTypography-root": {
            fontSize: "13px",
        },
    },
    [theme.breakpoints.up("sm")]: {
        ".MuiSvgIcon-root": {
            fontSize: "22px",
        },
        ".MuiTypography-root": {
            fontSize: "14px",
        },
    },
    [theme.breakpoints.up("md")]: {
        ".MuiSvgIcon-root": {
            fontSize: "23px",
        },
        ".MuiTypography-root": {
            fontSize: "15px",
        },
    },
}));

const Logo = styled("img")(({ theme }) => ({
    width: "80px",
    padding: "5px",
    marginRight: "10px",
    [theme.breakpoints.up("xs")]: { display: "none" },
    [theme.breakpoints.up("sm")]: { display: "block" },
    [theme.breakpoints.up("md")]: { display: "block" },
}));

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    fontFamily: "serif",
    [theme.breakpoints.up("xs")]: {
        fontSize: "13px",
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: "23px",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "24px",
    },
}));

export { Main, AppBar, DrawerHeader, ListFeatures, Logo, Title, drawerWidth };
