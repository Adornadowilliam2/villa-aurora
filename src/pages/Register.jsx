import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    LinearProgress,
    IconButton,
    InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import Phone from "@mui/icons-material/Phone";
import Email from "@mui/icons-material/Email";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import $ from "jquery";
import images from "../utils/index";

export default function Register() {
    const [warnings, setWarnings] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();
    const dispatch = useDispatch();
    const [createDialog, setCreateDialog] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                username: $("#username").val(),
                password: $("#password").val(),
                password_confirmation: $("#password_confirmation").val(),
                mobile: $("#mobile").val(),
                email: $("#email").val(),
            };

            setLoading(true);
            register(body)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(
                            res?.message ?? "Account has been registered."
                        );
                        setCookie("AUTH_TOKEN", res.data.token);
                        navigate("/");
                        dispatch(login(res.data));
                        setWarnings({});
                    } else {
                        toast.error(res?.message ?? "Something went wrong.");
                        setWarnings(res?.errors);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <Box
            id="auth-bg"
            className="d-flex flex-column justify-content-center align-items-center"
        >
            <Box
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}
            >
                <Box
                    component="form"
                    onSubmit={onSubmit}
                    className="login-form"
                    position="relative"
                    sx={{
                        animation: "moveFromLeft 1s ease-in-out",
                    }}
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
                    <Typography
                        variant="h2"
                        style={{ fontFamily: "Lobster", textAlign: "center" }}
                    >
                        Register
                    </Typography>
                    <Box>
                        <TextField
                            id="username"
                            name="username"
                            label="Username"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={!!warnings.username}
                            helperText={warnings.username}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            variant="outlined"
                            margin="normal"
                            type="password"
                            fullWidth
                            required
                            error={!!warnings.password}
                            helperText={warnings.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Lock />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            id="password_confirmation"
                            name="password_confirmation"
                            label="Repeat Password"
                            variant="outlined"
                            margin="normal"
                            type="password"
                            fullWidth
                            required
                            error={!!warnings.password_confirmation}
                            helperText={warnings.password_confirmation}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Lock />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            id="mobile"
                            name="mobile"
                            label="Mobile No."
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={!!warnings.mobile}
                            helperText={warnings.mobile}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Phone />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={!!warnings.email}
                            helperText={warnings.email}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Email />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <Box>
                        {loading ? <LinearProgress sx={{ mb: 2 }} /> : null}
                        <Button
                            disabled={loading}
                            type="submit"
                            id="submit-button"
                            fullWidth
                        >
                            {loading ? "Loading..." : "Register"}
                        </Button>
                    </Box>

                    <Box sx={{ textAlign: "center", cursor: "pointer" }}>
                        <Typography className="register-link pt-3">
                            Already have an account?{" "}
                            <Link to="/login" id="link">
                                Login
                            </Link>
                        </Typography>
                    </Box>
                </Box>
                <Box className="pose-image">
                    <img
                        src={images.person}
                        alt="person"
                        width={"500px"}
                        style={{
                            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1), 0px 4px 4px gold, 0px 4px 4px gold)",
                            animation: "moveFromRight 2s ease-in-out",
                        }}
                        title="Villa Aurora Owner doing Saranghe"
                    />
                </Box>
            </Box>
        </Box>
    );
}
