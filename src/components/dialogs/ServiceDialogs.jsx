import { Box, Button, Dialog, DialogActions, DialogContent, Table, TableHead, DialogTitle, TextField, Typography, Grid, Paper, TableContainer, TableRow, TableCell, TableBody } from "@mui/material";
import React, { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import {
    addService,
    deleteService,
    showAllServices,
    updateService,
} from "../../api/service";
import $ from "jquery";
import { toast } from "react-toastify";

export function ServiceDialog({
    createDialog,
    setCreateDialog,
    editDialog,
    setEditDialog,
    deleteDialog,
    setDeleteDialog,
    loading,
    setLoading,
    warnings,
    setWarnings,
    cookies,
}) {
    const [serviceRows, setServiceRows] = useState([]);



    const refreshData = () => {
        showAllServices(cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                setServiceRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    useEffect(refreshData, []);

    const onCreate = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                name: $("#name").val(),
                price: $("#price").val(),
            };

            addService(body, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(
                            res?.message ?? "Service has been created"
                        );
                        setCreateDialog(false);
                        refreshData();
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

    const onDelete = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            deleteService(deleteDialog, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(
                            res?.message ?? "Service has been deleted"
                        );
                        setDeleteDialog(null);
                        refreshData();
                    } else {
                        toast.error(res?.message ?? "Something went wrong.");
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const onEdit = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            updateService(
                {
                    id: editDialog.id,
                    name: editDialog.name,
                    price: editDialog.price,
                },
                cookies.AUTH_TOKEN
            )
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Service has updated");
                        setEditDialog(null);
                        refreshData();
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
        <Box className="mt-2" id="section2">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 2,
                }}
            >
                <Typography variant="h2">Services</Typography>
                <Button
                    variant="contained"
                    color="info"
                    sx={{ mr: 5 }}
                    onClick={() => setCreateDialog(true)}
                >
                    Create Service
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ display: { xs: 'none', md: 'block' } }}>
                <Table sx={{ minWidth: 650 }} aria-label="responsive table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Room name</TableCell>

                            <TableCell>Price</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Updated At</TableCell>

                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {serviceRows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.price}</TableCell>

                                <TableCell>{row.created_at}</TableCell>
                                <TableCell>{row.updated_at}</TableCell>

                                <TableCell>
                                    <Button variant="contained" color="warning">Edit</Button>
                                    <Button variant="contained" color="error">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Card layout for smaller screens */}
            <Grid container spacing={2} sx={{ display: { xs: 'flex', md: 'none' } }}>
                {serviceRows.map((row) => (
                    <Grid item xs={12} sm={6} md={4} key={row.id}>
                        <Paper sx={{ padding: 2, textAlign: 'left' }}>
                            <Typography variant="h6">{row.username}</Typography>
                            <Typography><strong>ID:</strong> {row.id}</Typography>
                            <Typography><strong>Room name:</strong> {row.name}</Typography>
                            <Typography><strong>Price:</strong> {row.price}</Typography>

                            <Typography><strong>Created At:</strong> {row.created_at}</Typography>
                            <Typography><strong>Updated At:</strong> {row.updated_at}</Typography>
                            <Box sx={{ marginTop: 2 }}>
                                <Button variant="contained" color="warning" sx={{ marginRight: 1 }}>Edit</Button>
                                <Button variant="contained" color="error">Delete</Button>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            {/* Create Service */}
            <Dialog open={!!createDialog}>
                <DialogTitle>Create Service Form</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={onCreate}>
                        <Box>
                            <TextField
                                id="name"
                                label="Service Name"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                error={!!warnings?.name}
                                helperText={warnings?.name}
                            />
                        </Box>
                        <Box>
                            <TextField
                                id="price"
                                label="Price"
                                variant="outlined"
                                margin="normal"
                                type="number"
                                fullWidth
                                required
                                error={!!warnings?.price}
                                helperText={warnings?.price}
                            />
                        </Box>
                        <Box>
                            <Button
                                id="submit_btn"
                                disabled={loading}
                                type="submit"
                                sx={{ display: "none" }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="info"
                        onClick={() => {
                            setWarnings({});
                            setCreateDialog(false);
                        }}
                        style={{ border: "2px solid #077bff" }}
                    >
                        Close
                    </Button>
                    <Button
                        onClick={() => {
                            $("#submit_btn").trigger("click");
                        }}
                        id="submitbtn"
                        disabled={loading}
                        color="success"
                        style={{ border: "2px solid green" }}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Service */}
            <Dialog open={!!deleteDialog}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Do you want to delete this Service ID: {deleteDialog}
                    </Typography>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: !!deleteDialog ? "flex" : "none",
                    }}
                >
                    <Button
                        onClick={() => setDeleteDialog(null)}
                        style={{ border: "1px solid #077bff" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={onDelete}
                        style={{ border: "1px solid red", color: "red" }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Service */}
            <Dialog open={!!editDialog}>
                <DialogTitle>Edit Service</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ p: 1 }} onSubmit={onEdit}>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                onChange={(e) =>
                                    setEditDialog({
                                        ...editDialog,
                                        name: e.target.value,
                                    })
                                }
                                value={editDialog?.name ?? ""}
                                size="small"
                                label="Service name"
                                type="text"
                                fullWidth
                                required
                                error={!!warnings?.name}
                                helperText={warnings?.name}
                            />
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                onChange={(e) =>
                                    setEditDialog({
                                        ...editDialog,
                                        price: e.target.value,
                                    })
                                }
                                value={editDialog?.price ?? ""}
                                size="small"
                                label="Price"
                                type="number"
                                fullWidth
                                required
                                error={!!warnings?.price}
                                helperText={warnings?.price}
                            />
                        </Box>
                        <Button
                            id="service-btn"
                            type="submit"
                            sx={{ display: "none" }}
                        >
                            Submit
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setEditDialog(null)}
                        style={{ border: "1px solid #077bff" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={() => {
                            $("#service-btn").trigger("click");
                        }}
                        style={{
                            border: "2px solid orangered",
                            color: "orangered",
                        }}
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
