import React, { useEffect, useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    IconButton,
    InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import { login as loginAPI } from "../api/auth";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/authSlice";
import images from "../utils/index";
import { index } from "../api/user";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [loading, setLoading] = useState(false);

    const [active, setActive] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (cookies.AUTH_TOKEN) {
            toast.error("You are already logged in.");
            return;
        }

        setLoading(true);

        loginAPI({
            username,
            password,
        })
            .then((res) => {
                setLoading(false);

                if (res?.ok) {
                    setCookie("AUTH_TOKEN", res.data.token);
                    dispatch(login(res.data));
                    navigate("/");
                    toast.success(res?.message ?? "Logged in successfully.");
                } else {
                    toast.error(res?.message ?? "Something went wrong.");
                    setError(true);
                }
            })
            .catch((error) => {
                setLoading(false);
                toast.error("An unexpected error occurred." + error);
                setError(true);
            });
    };

    const checkActive = () => {
        index(cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                setActive(true);
            } else {
                setActive(false);
            }
        });
    };

    useEffect(() => {
        checkActive();
    }, []);

    return (
        <Box
            id="auth-bg"
            className="d-flex flex-column justify-content-center align-items-center"
        >
            <img
                src={images.logo}
                alt="Logo"
                style={{ width: "100px", borderRadius: "10px" }}
            />
            <Typography variant="h1" id="auth-sign">
                Welcome to Villa Aurora
            </Typography>
            <Box
                component="form"
                onSubmit={onSubmit}
                className="login-form"
                position="relative"
            >
                <IconButton
                    onClick={() => {
                        navigate("/");
                    }}
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        color: "text.primary",
                        zIndex: 10,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h2" id="login-text">
                    Login
                </Typography>
                <Box className="input-container">
                    <TextField
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        id="username"
                        label="Username or Email"
                        fullWidth
                        error={error}
                        helperText={error ? "Invalid input" : ""}
                        disabled={active}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box className="input-container">
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        error={error}
                        helperText={error ? "Invalid input" : ""}
                        disabled={active}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Lock />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Button
                    type="submit"
                    id="submit-button"
                    disabled={loading}
                    fullWidth
                >
                    Login
                </Button>
                <Box className="forgot-password">
                    <Link to="/forgotpass" id="link">
                        Forgot Password?
                    </Link>
                </Box>
                <Typography className="register-link">
                    Don't have an account yet?{" "}
                    <Link to="/register" id="link">
                        Register
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}
