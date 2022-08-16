import * as React from "react";
import {
    Avatar,
    Menu,
    MenuItem,
    Tooltip,
    styled,
    useTheme,
    Box,
    Drawer,
    CssBaseline,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Switch,
} from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LogoCTU from "../../assets/logoCTU.png";
import Strings from "../../commons/Strings";
import { useSelector, useDispatch } from "react-redux";
import { changeDarkMode } from "../../redux/themeDarkModeSlice";

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

export default function MainLayout() {
    const theme = useTheme();

    const dispath = useDispatch();

    const themeDarkMode = useSelector((state) => state.themeDarkMode.darkMode);

    // handle drawer open/close
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    // handle open/close avatar account
    const [anchorElAvatar, setAnchorElAvatar] = React.useState(null);
    const openAccount = Boolean(anchorElAvatar);

    const handleClick = (e) => {
        setAnchorElAvatar(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorElAvatar(null);
    };

    // handle theme dark mode
    const handleChangeThemeMode = () => {
        dispath(changeDarkMode());
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <AppBar position="fixed" open={drawerOpen}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(drawerOpen && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* {!open && ( */}
                    <Logo src={LogoCTU} />
                    {/* )} */}
                    <Title variant="h6" noWrap component="div">
                        {Strings.App.TITLE}
                    </Title>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                sm: "block",
                            },
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="p" noWrap component="div">
                            Dương Hoàng Tuấn
                        </Typography>
                        <Typography
                            variant="p"
                            noWrap
                            component="div"
                            sx={{
                                textAlign: "end",
                            }}
                        >
                            B1809315
                        </Typography>
                    </Box>

                    <Tooltip title="Tài Khoản">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 1 }}
                            // aria-controls={
                            //     openAccount ? "account-menu" : undefined
                            // }
                            // aria-haspopup="true"
                            // aria-expanded={openAccount ? "true" : undefined}
                        >
                            <Avatar
                                alt="avatar"
                                src="/static/images/avatar/1.jpg"
                                sx={{
                                    width: {
                                        xs: 30,
                                        sm: 40,
                                        md: 50,
                                    },
                                    height: {
                                        xs: 30,
                                        sm: 40,
                                        md: 50,
                                    },
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorElAvatar}
                        open={openAccount}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: "visible",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 1.5,
                                "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                "& .MuiList-root": {
                                    padding: "2px",
                                },
                                "& .MuiButtonBase-root": {
                                    padding: "4px 8px",
                                },
                                "&:before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                        }}
                        anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                        }}
                    >
                        <MenuItem
                            sx={{
                                fontSize: {
                                    xs: "12px",
                                    sm: "14px",
                                    md: "16px",
                                },
                            }}
                        >
                            <LogoutIcon
                                sx={{
                                    marginRight: "5px",
                                    fontSize: {
                                        xs: "14px",
                                        sm: "16px",
                                        md: "18px",
                                    },
                                }}
                            />
                            Đăng Xuất
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={drawerOpen}
            >
                <DrawerHeader>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            width: "100%",
                            textAlign: "center",
                        }}
                    >
                        Công Cụ Quản Lý
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        <MenuIcon />
                    </IconButton>
                    {/* <img
                            src={LogoCTU}
                            style={{ width: "50px", padding: "5px" }}
                        /> */}
                </DrawerHeader>
                <Divider />
                <ListFeatures>
                    <ListItem disablePadding>
                        <NavLink
                            style={({ isActive }) => {
                                return {
                                    width: "100%",
                                    borderRadius: "5px",
                                    textDecoration: "none",
                                    backgroundColor: isActive
                                        ? theme.palette.action.selected
                                        : "",
                                };
                            }}
                            to="/"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon
                                        sx={{
                                            color: theme.palette.primary.light,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={"sdfsdfdfsd"}
                                    sx={{ color: theme.palette.primary.light }}
                                />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                </ListFeatures>
                <Divider />
                <List>
                    <ListItem key={"Dark mode"} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                handleChangeThemeMode();
                            }}
                        >
                            <ListItemIcon>
                                {themeDarkMode ? (
                                    <Brightness4Icon />
                                ) : (
                                    <Brightness7Icon />
                                )}
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    themeDarkMode
                                        ? "Giao diện tối"
                                        : "Giao diện sáng"
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>

            <Main open={drawerOpen}>
                <DrawerHeader />
                <Outlet />
            </Main>
        </Box>
    );
}
