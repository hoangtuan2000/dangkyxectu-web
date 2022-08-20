import * as React from "react";
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
import { NavLink, Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoCTU from "../../assets/logoCTU.png";
import Strings from "../../commons/Strings";
import { useSelector, useDispatch } from "react-redux";
import { changeDarkMode } from "../../redux/themeDarkModeSlice";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import FeedIcon from "@mui/icons-material/Feed";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import InsightsIcon from "@mui/icons-material/Insights";
import {
    Main,
    AppBar,
    DrawerHeader,
    ListFeatures,
    Logo,
    Title,
    drawerWidth,
} from "./MainLayoutCustomStyles";

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
                                    <ListAltIcon
                                        sx={{
                                            color: theme.palette.primary.light,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={"Tất Cả Xe"}
                                    sx={{ color: theme.palette.primary.light }}
                                />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
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
                            to="/rented-car"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <FactCheckIcon
                                        sx={{
                                            color: theme.palette.primary.light,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={"Xe Đã Đăng Ký"}
                                    sx={{ color: theme.palette.primary.light }}
                                />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                </ListFeatures>
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
                            to="/car-rental-manager"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <FeedIcon
                                        sx={{
                                            color: theme.palette.primary.light,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={"Quản Lý Đăng Ký"}
                                    sx={{ color: theme.palette.primary.light }}
                                />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
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
                            to="/car-manager"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <DirectionsCarIcon
                                        sx={{
                                            color: theme.palette.primary.light,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={"Quản Lý Xe"}
                                    sx={{ color: theme.palette.primary.light }}
                                />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
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
                            to="/driver-management"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <PeopleAltIcon
                                        sx={{
                                            color: theme.palette.primary.light,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={"Quản Lý Tài Xế"}
                                    sx={{ color: theme.palette.primary.light }}
                                />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
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
                            to="/statistical"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <InsightsIcon
                                        sx={{
                                            color: theme.palette.primary.light,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={"Thống Kê"}
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
        </Box>
    );
}
