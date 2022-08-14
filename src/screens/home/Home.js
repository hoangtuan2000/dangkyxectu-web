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
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LogoCTU from "../../assets/logoCTU.png";
import Strings from "../../commons/Strings";

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

export default function Home() {
    const theme = useTheme();

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
                                    padding: 0,
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
                        <MenuItem sx={{ fontSize: "12px" }}>
                            <LogoutIcon
                                sx={{ marginRight: "5px", fontSize: "16px" }}
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
                    <h2>Quản Lý</h2>
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
                    {["Tất Cả Xe", "Xe Đã Đăng Ký"].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </ListFeatures>
                <Divider />
                <List>
                    <ListItem key={"Dark mode"} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Dark mode"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>

            <Main open={drawerOpen}>
                <DrawerHeader />
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Rhoncus dolor purus non enim praesent elementum
                    facilisis leo vel. Risus at ultrices mi tempus imperdiet.
                    Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id
                    donec ultrices. Odio morbi quis commodo odio aenean sed
                    adipiscing. Amet nisl suscipit adipiscing bibendum est
                    ultricies integer quis. Cursus euismod quis viverra nibh
                    cras. Metus vulputate eu scelerisque felis imperdiet proin
                    fermentum leo. Mauris commodo quis imperdiet massa
                    tincidunt. Cras tincidunt lobortis feugiat vivamus at augue.
                    At augue eget arcu dictum varius duis at consectetur lorem.
                    Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla
                    est ullamcorper eget nulla facilisi etiam dignissim diam.
                    Pulvinar elementum integer enim neque volutpat ac tincidunt.
                    Ornare suspendisse sed nisi lacus sed viverra tellus. Purus
                    sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate
                    odio. Morbi tincidunt ornare massa eget egestas purus
                    viverra accumsan in. In hendrerit gravida rutrum quisque non
                    tellus orci ac. Pellentesque nec nam aliquam sem et tortor.
                    Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod
                    elementum nisi quis eleifend. Commodo viverra maecenas
                    accumsan lacus vel facilisis. Nulla posuere sollicitudin
                    aliquam ultrices sagittis orci a.
                </Typography>
            </Main>
        </Box>
    );
}
