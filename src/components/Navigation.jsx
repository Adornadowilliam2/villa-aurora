import React, { useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    useTheme,
    useMediaQuery,
    Box,
    Avatar,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ServicesIcon from "@mui/icons-material/Work";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LoginIcon from "@mui/icons-material/Login";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { logout as logoutApi } from "../api/auth";
import { logout } from "../redux/authSlice";

import { index } from "../api/user";
import MyAccount from "./MyAccount";
import images from "../utils";

const drawerWidth = 240;

function Navigation() {
    const user = useSelector((state) => state.auth.user);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [cookies, setCookie, removeCookie] = useCookies();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [active, setActive] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };
    const handleLogout = () => {
        logoutApi(cookies.AUTH_TOKEN).then((response) => {
            if (response?.ok) {
                toast.success(response?.message);
                removeCookie("AUTH_TOKEN");
                dispatch(logout(cookies.AUTH_TOKEN));
                setActive(false);
                navigate("/login");
            } else {
                toast.error(response?.message);
            }
        });
    };
    

    const checkActive = () => {
        if (cookies.AUTH_TOKEN) {
            index(cookies.AUTH_TOKEN).then((res) => {
                if (res?.ok) {
                    setActive(true);
                } else {
                    setActive(false);
                }
            });
        }
    };

    useEffect(() => {
        checkActive();
    }, []);

    const [editDialog, setEditDialog] = useState(null);

    const drawerItems = (
        <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            style={{ width: drawerWidth, paddingTop: 64 }}
        >
            <IconButton
                edge="end"
                color="inherit"
                aria-label="close"
                onClick={toggleDrawer(false)}
                sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 10,
                }}
            >
                <CloseIcon />
            </IconButton>
            <List>
                <ListItem style={{ cursor: "pointer", display: "block" }}>
                    <img
                        src={images.logo}
                        alt="logo"
                        width={"50px"}
                        style={{
                            boxShadow: " 0px 0px 10px rgba(0, 0, 0, 0.2)",
                        }}
                    />{" "}
                    Villa Aurora
                </ListItem>
                <hr />
                <ListItem>
                    <ListItemIcon>
                        <Avatar
                            src={`https://backend-villa-aurora-production.up.railway.app/storage/${user?.avatar}`}
                            alt={user?.username ?? "User"}
                        />
                    </ListItemIcon>
                    <Typography variant="h6">
                        {user?.username ?? "User"}
                    </Typography>
                </ListItem>
                <hr />
                <a href="#section_1" style={{ textDecoration: "none" }}>
                    <ListItem>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </a>

                <a href="#section_2" style={{ textDecoration: "none" }}>
                    <ListItem>
                        <ListItemIcon>
                            <ServicesIcon />
                        </ListItemIcon>
                        <ListItemText primary="Services" />
                    </ListItem>
                </a>
                <a href="#about-us" style={{ textDecoration: "none" }}>
                    <ListItem>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="About Us" />
                    </ListItem>
                </a>
                <a href="#section_5" style={{ textDecoration: "none" }}>
                    <ListItem>
                        <ListItemIcon>
                            <ContactMailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contact" />
                    </ListItem>
                </a>
                {active ? (
                    <>
                        {user?.role == "admin" ? (
                            <Link
                                to="/admin"
                                style={{ textDecoration: "none" }}
                            >
                                <ListItem>
                                    <ListItemIcon>
                                        <AdminPanelSettingsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Admin" />
                                </ListItem>
                            </Link>
                        ) : (
                            <ListItem
                                onClick={() => setEditDialog(user)}
                                sx={{ cursor: "pointer" }}
                            >
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="My Account" />
                            </ListItem>
                        )}
                    </>
                ) : null}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar
                id="appbar"
                position="fixed"
                sx={{
                    borderBottom: isMobile
                        ? "none"
                        : "1px solid rgba(0, 0, 0, 0.12)",
                    width: "100%",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar>
                    {isMobile ? (
                        <>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(!drawerOpen)}
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                sx={{
                                    flexGrow: 1,
                                    display: "inline",
                                    color: "white",
                                }}
                            ></Typography>
                            <Box display="flex" alignItems="center">
                                <IconButton
                                    edge="end"
                                    color="inherit"
                                    aria-label="sign up"
                                    sx={{ ml: 1 }}
                                >
                                    <LoginIcon />
                                </IconButton>
                                {active ? (
                                    <Button onClick={handleLogout}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                ml: 1,
                                                color: "white",
                                                mr: 2,
                                                cursor: "pointer",
                                            }}
                                        >
                                            Logout
                                        </Typography>
                                    </Button>
                                ) : (
                                    <Link
                                        to="/register"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                ml: 1,
                                                color: "white",
                                                mr: 2,
                                            }}
                                        >
                                            Sign up
                                        </Typography>
                                    </Link>
                                )}
                            </Box>
                            <Drawer
                                anchor="left"
                                open={drawerOpen}
                                sx={{ width: drawerWidth }}
                            >
                                {drawerItems}
                            </Drawer>
                        </>
                    ) : (
                        <>
                            <Typography
                                variant="h6"
                                sx={{
                                    flexGrow: 1,

                                    color: "white",
                                }}
                            >
                                <Button
                                    href="#section_1"
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                        fontFamily: "Playfair Display",
                                    }}
                                >
                                    Villa Aurora
                                </Button>
                            </Typography>
                            <Button
                                color="inherit"
                                startIcon={<HomeIcon />}
                                href="#section_1"
                            >
                                Home
                            </Button>

                            <Button
                                color="inherit"
                                startIcon={<ServicesIcon />}
                                href="#section_2"
                            >
                                Services
                            </Button>
                            <Button
                                color="inherit"
                                startIcon={<InfoIcon />}
                                href="#about-us"
                            >
                                About Us
                            </Button>
                            <Button
                                color="inherit"
                                startIcon={<ContactMailIcon />}
                                href="#section_5"
                            >
                                Contact
                            </Button>
                            {active ? (
                                <>
                                    {user?.role == "admin" ? (
                                        <Link
                                            to="/admin"
                                            style={{
                                                textDecoration: "none",
                                                color: "white",
                                            }}
                                        >
                                            <Button
                                                color="inherit"
                                                startIcon={
                                                    <AdminPanelSettingsIcon />
                                                }
                                            >
                                                Admin
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Button
                                            color="inherit"
                                            startIcon={<AccountCircleIcon />}
                                            onClick={() => setEditDialog(user)}
                                        >
                                            My Account
                                        </Button>
                                    )}
                                </>
                            ) : null}
                            <Box display="flex" alignItems="center">
                                <IconButton
                                    edge="end"
                                    color="inherit"
                                    aria-label="sign up"
                                    sx={{ ml: 1 }}
                                >
                                    <LoginIcon />
                                </IconButton>
                                {active ? (
                                    <Button onClick={handleLogout}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                ml: 1,
                                                color: "white",
                                                mr: 2,
                                                cursor: "pointer",
                                            }}
                                        >
                                            Logout
                                        </Typography>
                                    </Button>
                                ) : (
                                    <Link
                                        to="/register"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                ml: 1,
                                                color: "white",
                                                mr: 2,
                                            }}
                                        >
                                            Sign up
                                        </Typography>
                                    </Link>
                                )}
                            </Box>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Dialog open={!!editDialog}>
                <DialogContent>
                    <MyAccount
                        setEditDialog={setEditDialog}
                        user={user}
                        cookies={cookies}
                        dispatch={dispatch}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Navigation;
