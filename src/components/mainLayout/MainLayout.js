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
    Button,
} from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
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
import {
    changeCurrentUser,
    deleteCurrentUser,
} from "../../redux/currentUserSlice";
import Role from "../../constants/Role";
import { changeOpenDrawer } from "../../redux/globalReduxSlice";
import BackDrop from "../backDrop/BackDrop";

const DataListItems = [
    {
        path: RoutesPath.HOME,
        icon: <ListAltIcon />,
        name: "Tất Cả Xe",
        role: Role.ADMIN_USER,
    },
    {
        path: RoutesPath.RENDTED_CAR,
        icon: <FactCheckIcon />,
        name: "Xe Đã Đăng Ký",
        role: Role.USER,
    },
    {
        path: RoutesPath.CAR_RENTAL_MANAGER,
        icon: <FeedIcon />,
        name: "Quản Lý Đăng Ký",
        role: Role.ADMIN,
    },
    {
        path: RoutesPath.CAR_MANAGER,
        icon: <DirectionsCarIcon />,
        name: "Quản Lý Xe",
        role: Role.ADMIN,
    },
    {
        path: RoutesPath.TRIP_MANAGER,
        icon: <CommuteIcon />,
        name: "Quản Lý Chuyến Đi",
        role: Role.ADMIN,
    },
    {
        path: RoutesPath.DRIVER_MANAGEMENT,
        icon: <PeopleAltIcon />,
        name: "Quản Lý Tài Xế",
        role: Role.ADMIN,
    },
    {
        path: RoutesPath.STATISTICAL,
        icon: <InsightsIcon />,
        name: "Thống Kê",
        role: Role.ADMIN,
    },
    {
        path: RoutesPath.HOME,
        icon: <CommuteIcon />,
        name: "Quản Lý Chuyến Đi",
        role: Role.DRIVER,
    },
];

export default function MainLayout() {
    const theme = useTheme();

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

                    <Logo src={LogoCTU} />

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

                    <Tooltip title="Tài Khoản">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 1 }}
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
                            onClick={handleLogout}
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
                            {Strings.Common.LOGOUT}
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
                        {Strings.MainLayout.TEXT_HEADER}
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        <MenuIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <ListFeatures>
                    {DataListItems.map((item, index) => {
                        if (
                            item.role == currentUser.role ||
                            (item.role == Role.ADMIN_USER &&
                                currentUser.role != Role.DRIVER)
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

                <List>
                    <ListItem key={"Dark mode"} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                handleChangeThemeMode();
                            }}
                        >
                            <ListItemIcon>
                                {themeDarkMode ? (
                                    <NightsStayIcon />
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

            <BackDrop open={backDrop} />
        </Box>
    );
}
