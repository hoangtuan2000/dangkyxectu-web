import React, { useState } from "react";
import {
    Avatar,
    Menu,
    MenuItem,
    Tooltip,
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
} from "@mui/material";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoCTU from "../../assets/logoCTU.png";
import Strings from "../../constants/Strings";
import { useSelector, useDispatch } from "react-redux";
import { changeDarkMode } from "../../redux/themeDarkModeSlice";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import FeedIcon from "@mui/icons-material/Feed";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import InsightsIcon from "@mui/icons-material/Insights";
import CommuteIcon from "@mui/icons-material/Commute";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import {
    Main,
    AppBar,
    DrawerHeader,
    ListFeatures,
    Logo,
    Title,
    drawerWidth,
} from "./MainLayoutCustomStyles";
import RoutesPath from "../../constants/RoutesPath";
import { deleteCurrentUser } from "../../redux/currentUserSlice";
import { changeOpenDrawer } from "../../redux/globalReduxSlice";
import BackDrop from "../backDrop/BackDrop";
import Constants from "../../constants/Constants";

const DataListItems = [
    {
        path: RoutesPath.HOME,
        icon: <ListAltIcon />,
        name: "Tất Cả Xe",
        role: Constants.Role.USER,
    },
    {
        path: RoutesPath.RENDTED_CAR,
        icon: <FactCheckIcon />,
        name: "Xe Đã Đăng Ký",
        role: Constants.Role.USER,
    },
    {
        path: RoutesPath.HOME,
        icon: <FeedIcon />,
        name: "Quản Lý Đăng Ký",
        role: Constants.Role.ADMIN,
    },
    {
        path: RoutesPath.CAR_MANAGER,
        icon: <DirectionsCarIcon />,
        name: "Quản Lý Xe",
        role: Constants.Role.ADMIN,
    },
    {
        path: RoutesPath.CAR_STATUS_OF_TRIP,
        icon: <CommuteIcon />,
        name: "Tình Trạng Xe",
        role: Constants.Role.ADMIN,
    },
    {
        path: RoutesPath.MAINTENANCE_MANAGER,
        icon: <CarCrashIcon />,
        name: "Quản Lý Bảo Trì",
        role: Constants.Role.ADMIN,
    },
    {
        path: RoutesPath.DRIVER_MANAGEMENT,
        icon: <AirlineSeatReclineExtraIcon />,
        name: "Quản Lý Tài Xế",
        role: Constants.Role.ADMIN,
    },
    {
        path: RoutesPath.USER_MANAGEMENT,
        icon: <PeopleAltIcon />,
        name: "Quản Lý Người Dùng",
        role: Constants.Role.ADMIN_SYSTEM,
    },
    {
        path: RoutesPath.STATISTICAL,
        icon: <InsightsIcon />,
        name: "Thống Kê",
        role: Constants.Role.ADMIN,
    },
    {
        path: RoutesPath.HOME,
        icon: <CommuteIcon />,
        name: "Quản Lý Chuyến Đi",
        role: Constants.Role.DRIVER,
    },
];

export default function MainLayout() {
    const theme = useTheme();

    const navigate = useNavigate();

    const dispath = useDispatch();
    const themeDarkMode = useSelector((state) => state.themeDarkMode.darkMode);
    const currentUser = useSelector((state) => state.currentUser.user);
    const openDrawerRedux = useSelector(
        (state) => state.globalRedux.openDrawer
    );

    const [backDrop, setBackDrop] = useState(false);

    // handle drawer open/close
    const [drawerOpen, setDrawerOpen] = useState(
        openDrawerRedux ? openDrawerRedux : false
    );

    const handleDrawerOpen = () => {
        dispath(changeOpenDrawer(true));
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        dispath(changeOpenDrawer(false));
        setDrawerOpen(false);
    };

    // handle open/close avatar account
    const [anchorElAvatar, setAnchorElAvatar] = useState(null);
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

    const handleLogout = async () => {
        await setBackDrop(true);
        await setTimeout(() => {
            dispath(deleteCurrentUser());
            setBackDrop(false);
        }, 700);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            {/* APP BAR */}
            <AppBar position="fixed" open={drawerOpen}>
                <Toolbar>
                    {/* ICON MENU*/}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(drawerOpen && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* LOGO CTU */}
                    <Logo
                        src={LogoCTU}
                        onClick={() => navigate(RoutesPath.HOME)}
                    />

                    {/* TITLE */}
                    <Title
                        variant="h6"
                        noWrap
                        component="div"
                        onClick={() => navigate(RoutesPath.HOME)}
                    >
                        {Strings.App.TITLE}
                    </Title>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* TEXT SHOW FULL NAME AND CODE USER */}
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
                            {currentUser.fullName}
                        </Typography>
                        <Typography
                            variant="p"
                            noWrap
                            component="div"
                            sx={{
                                textAlign: "end",
                            }}
                        >
                            {currentUser.code}
                        </Typography>
                    </Box>

                    {/* TOOLTIP ACCOUNT BUTTON */}
                    <Tooltip title={Strings.Common.LOGOUT}>
                        <IconButton onClick={handleLogout} sx={{ ml: 1 }}>
                            <LogoutIcon
                                sx={{
                                    color: "white",
                                    fontSize: {
                                        xs: "18px",
                                        sm: "25px",
                                        md: "25px",
                                    },
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            {/* DRAWER */}
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
                {/* HEADER OF DRAWER */}
                <DrawerHeader>
                    {/* TEXT HEADER DRAWER */}
                    <Typography
                        variant="h6"
                        component="h6"
                        sx={{
                            width: "100%",
                            textAlign: "center",
                            fontSize: {
                                mobileS: 16,
                                sm: 14,
                                lg: 18,
                            },
                        }}
                    >
                        {Strings.MainLayout.TEXT_HEADER}
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        <MenuIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />

                {/* LIST ITEM BUTTON / CHANGE DARK MODE BUTTON*/}
                <ListFeatures>
                    {DataListItems.map((item, index) => {
                        if (
                            item.role == currentUser.role ||
                            (item.role == Constants.Role.ADMIN &&
                                currentUser.role == Constants.Role.ADMIN_SYSTEM)
                        ) {
                            return (
                                <ListItem disablePadding key={index}>
                                    <NavLink
                                        style={({ isActive }) => {
                                            return {
                                                width: "100%",
                                                borderRadius: "5px",
                                                textDecoration: "none",
                                                backgroundColor: isActive
                                                    ? theme.palette.action
                                                          .selected
                                                    : "",
                                            };
                                        }}
                                        to={item.path}
                                    >
                                        <ListItemButton>
                                            <ListItemIcon
                                                sx={{
                                                    color: theme.palette.primary
                                                        .light,
                                                }}
                                            >
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.name}
                                                sx={{
                                                    color: theme.palette.primary
                                                        .light,
                                                }}
                                            />
                                        </ListItemButton>
                                    </NavLink>
                                </ListItem>
                            );
                        }
                    })}
                </ListFeatures>
                <Divider />

                {/* CHANGE DARK MODE BUTTON */}
                <List
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                    }}
                >
                    <ListItem key={"Dark mode"} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                handleChangeThemeMode();
                            }}
                        >
                            <ListItemIcon>
                                {themeDarkMode ? (
                                    <Brightness7Icon />
                                ) : (
                                    <NightsStayIcon />
                                )}
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    themeDarkMode
                                        ? "Giao diện sáng"
                                        : "Giao diện tối"
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>

            {/* VIEW SHOW PAGE */}
            <Main open={drawerOpen}>
                <DrawerHeader />
                <Outlet />
            </Main>

            <BackDrop open={backDrop} />
        </Box>
    );
}
