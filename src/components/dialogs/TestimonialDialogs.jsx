import { Box, Button, Dialog, DialogActions, DialogContent, Table, TableHead, DialogTitle, TextField, Typography, Grid, Paper, TableContainer, TableRow, TableCell, TableBody, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import $ from "jquery";
import { toast } from "react-toastify";
import {
    addTestimonial,
    deleteTestimonial,
    showAllTestimonials,
    updateTestimonial,
} from "../../api/testimonial";

export function TestimonialDialogs({
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
    const [testimonialRows, setTestimonialRows] = useState([]);
    const [rating, setRating] = useState(0);

    // For Testimonials
    const testimonialcolumns = [
        { field: "id", headerName: "Transaction ID", width: 200 },
        { field: "feedback", headerName: "Feedback", width: 200 },
        {
            field: "rating",
            headerName: "Rating",
            width: 150,
            renderCell: (params) => (
                <Rating
                    name="read-only"
                    value={params.value}
                    readOnly
                    precision={0.5}
                />
            ),
        },
        { field: "created_at", headerName: "Create At", width: 200 },
        { field: "updated_at", headerName: "Update At", width: 200 },
    ];

    const refreshData = () => {
        showAllTestimonials(cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                setTestimonialRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };
    useEffect(refreshData, []);

    const onEdit = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            updateTestimonial(
                {
                    id: editDialog.id,
                    feedback: editDialog.feedback,
                    rating: editDialog.rating,
                },
                cookies.AUTH_TOKEN
            )
                .then((res) => {
                    if (res?.ok) {
                        toast.success(
                            res?.message ?? "Testimonial has updated"
                        );
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

    const onDelete = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            deleteTestimonial(deleteDialog, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(
                            res?.message ?? "Testimonial has deleted"
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

    const onCreate = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                transaction_id: $("#transaction_id").val(),
                feedback: $("#feedback").val(),
                rating: rating,
            };

            addTestimonial(body, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(
                            res?.message ?? "Service has been created"
                        );
                        setCreateDialog(false);
                        refreshData();
                        setWarnings({});
                        setRating(0);
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
        <Box className="mt-2" id="section5">
            <Box
                sx={{ display: "flex", justifyContent: "space-between", py: 2 }}
            >
                <Typography variant="h2">Testimonials</Typography>
                <Button
                    sx={{ mr: 5, display: "none" }}
                    variant="contained"
                    color="info"
                    onClick={() => setCreateDialog(true)}
                >
                    Create Testimonial
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ display: { xs: 'none', md: 'block' } }}>
                <Table sx={{ minWidth: 650 }} aria-label="responsive table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Feedback</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Updated At</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {testimonialRows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.feedback}</TableCell>
                                
                                <TableCell><Rating
                                    name="read-only"
                                    value={row.rating}
                                    readOnly
                                    precision={0.5}
                                /></TableCell>

                                <TableCell>{row.created_at}</TableCell>
                                <TableCell>{row.updated_at}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Card layout for smaller screens */}
            <Grid container spacing={2} sx={{ display: { xs: 'flex', md: 'none' } }}>
                {testimonialRows.map((row) => (
                    <Grid item xs={12} sm={6} md={4} key={row.id}>
                        <Paper sx={{ padding: 2, textAlign: 'left' }}>
                            <Typography variant="h6">{row.username}</Typography>
                            <Typography><strong>ID:</strong> {row.id}</Typography>
                            <Typography><strong>Feedback:</strong> {row.feedback}</Typography>
                            <Typography><strong>Rating:</strong> <Rating name="read-only" value={row.rating} readOnly precision={0.5} /></Typography>

                            <Typography><strong>Created At:</strong> {row.created_at}</Typography>
                            <Typography><strong>Updated At:</strong> {row.updated_at}</Typography>
                
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={!!createDialog}>
                <DialogTitle>Create Testimonial Form</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={onCreate}>
                        <Box>
                            <TextField
                                id="transaction_id"
                                label="Transaction ID"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                error={!!warnings?.transaction_id}
                                helperText={warnings?.transaction_id}
                            />
                        </Box>
                        <Box>
                            <TextField
                                id="feedback"
                                label="Feedback"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                error={!!warnings?.feedback}
                                helperText={warnings?.feedback}
                            />
                        </Box>
                        <Box>
                            <Typography>Rating</Typography>
                            <Rating
                                name="simple-controlled"
                                value={rating}
                                onChange={(e, newValue) => {
                                    setRating(newValue);
                                }}
                            />
                            {warnings?.rating ? (
                                <Typography component="small" color="error">
                                    {warnings.rating}
                                </Typography>
                            ) : null}
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
                            setRating(0);
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
            {/* Delete Testimonial */}
            <Dialog open={!!deleteDialog}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Do you want to delete this Testimonial ID:{" "}
                        {deleteDialog}
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
                        style={{ border: "2px solid red", color: "red" }}
                        disabled={loading}
                        onClick={onDelete}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            {/* EDIT Testimonial */}
            <Dialog open={!!editDialog}>
                <DialogTitle>Edit Testimonial</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ p: 1 }} onSubmit={onEdit}>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                onChange={(e) =>
                                    setEditDialog({
                                        ...editDialog,
                                        feedback: e.target.value,
                                    })
                                }
                                value={editDialog?.feedback ?? ""}
                                size="small"
                                label="Feedback"
                                type="text"
                                fullWidth
                            />
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Typography>Rating</Typography>
                            <Rating
                                name="rating-edit"
                                value={editDialog?.rating ?? 0}
                                onChange={(e, newValue) =>
                                    setEditDialog({
                                        ...editDialog,
                                        rating: newValue,
                                    })
                                }
                            />
                        </Box>
                        <Button
                            id="testimonial-btn"
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
                            $("#testimonial-btn").trigger("click");
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
