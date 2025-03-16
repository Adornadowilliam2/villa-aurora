import { Box, Button, Dialog, DialogActions, DialogContent, Table, TableHead, DialogTitle, TextField, Typography, Grid, Paper, TableContainer, TableRow, TableCell, TableBody } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import $ from "jquery";
import { toast } from "react-toastify";
import { addRoom, deleteRoom, showAllRooms, updateRoom } from "../../api/room";

export function RoomDialog({
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
    // For Rooms
    const [roomRows, setRoomRows] = useState([]);
 

    const refreshData = () => {
        showAllRooms(cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                setRoomRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    const onEdit = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            updateRoom(
                {
                    id: editDialog.id,
                    name: editDialog.name,
                    price: editDialog.price,
                },
                cookies.AUTH_TOKEN
            )
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Room has updated");
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

    useEffect(refreshData, []);

    const onCreate = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                name: $("#name").val(),
                price: $("#price").val(),
            };

            addRoom(body, cookies.AUTH_TOKEN)
                .then((res) => {
                    console.log(res);
                    if (res?.ok) {
                        toast.success(res?.message ?? "Room has been created");
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
            deleteRoom(deleteDialog, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Room has deleted");
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
    return (
        <Box className="mt-2" id="section3">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 2,
                }}
            >
                <Typography variant="h2">Rooms</Typography>
                <Button
                    variant="contained"
                    color="info"
                    sx={{ mr: 5 }}
                    onClick={() => setCreateDialog(true)}
                >
                    Create Room
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
                        {roomRows.map((row) => (
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
                {roomRows.map((row) => (
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
            {/* Create Room */}
            <Dialog open={!!createDialog}>
                <DialogTitle>Create Room Form</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={onCreate}>
                        <Box>
                            <TextField
                                id="name"
                                label="Room Name"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                errors={!!warnings?.name}
                                helperText={warnings?.name}
                            />
                        </Box>
                        <Box>
                            <TextField
                                id="price"
                                label="Price"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                errors={!!warnings?.price}
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
                        style={{ border: "2px solid green", color: "green" }}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Delete Room */}
            <Dialog open={!!deleteDialog}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Do you want to delete this Room ID: {deleteDialog}
                    </Typography>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: !!deleteDialog ? "flex" : "none",
                    }}
                >
                    <Button
                        onClick={() => setDeleteDialog(null)}
                        style={{ border: "2px solid #077bff" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={onDelete}
                        style={{ border: "2px solid red", color: "red" }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Room */}
            <Dialog open={!!editDialog}>
                <DialogTitle>Edit Room</DialogTitle>
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
                                label="Room name"
                                type="text"
                                fullWidth
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
                            />
                        </Box>
                        <Button
                            id="room-btn"
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
                        style={{ border: "2px solid #077bff" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={() => {
                            $("#room-btn").trigger("click");
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
