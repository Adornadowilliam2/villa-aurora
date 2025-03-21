import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { toast } from "react-toastify";
import $ from "jquery";

import { DataGrid } from "@mui/x-data-grid";
import { destroy, index, store, update } from "../../api/user";

export function UserDialogs({
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
  user,
}) {
  const [rows, setRows] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onCreate = (e) => {
    e.preventDefault();
    if (!loading) {
      const body = {
        username: $("#username").val(),
        password: $("#password").val(),
        password_confirmation: $("#password_confirmation").val(),
        mobile: $("#mobile").val(),
        email: $("#email").val(),
      };

      store(body, cookies.AUTH_TOKEN)
        .then((res) => {
          if (res?.ok) {
            toast.success(res?.message ?? "Account has been created");
            setCreateDialog(false);
            setWarnings({});
            refreshData();
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

  const refreshData = () => {
    index(cookies.AUTH_TOKEN).then((res) => {
      if (res?.ok) {
        setRows(res.data);
      } else {
        toast.error(res?.message ?? "Something went wrong.");
      }
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  const onDelete = (e) => {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      destroy(deleteDialog, cookies.AUTH_TOKEN)
        .then((res) => {
          if (res?.ok) {
            toast.success(res?.message ?? "Account has deleted");
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

      const body = new FormData();
      body.append("id", editDialog.id);
      body.append("username", editDialog.username);
      body.append("mobile", editDialog.mobile);
      body.append("email", editDialog.email);
      body.append("role", editDialog.role);

      if (file) {
        body.append("avatar", file);
      }
      update(body, cookies.AUTH_TOKEN)
        .then((res) => {
          if (res?.ok) {
            toast.success(res?.message ?? "Account has been updated");
            setEditDialog(null);
            refreshData();
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setPreview(fileReader.result);
    };
    if (selectedFile) {
      fileReader.readAsDataURL(selectedFile);
    }
  };

  return (
    <Box className="mt-2" id="section1">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 2,
        }}
      >
        <Typography variant="h2">Users</Typography>
        <Button
          sx={{ mr: 5 }}
          variant="contained"
          color="info"
          onClick={() => setCreateDialog(true)}
        >
          Create User
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Table sx={{ minWidth: 650 }} aria-label="responsive table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.mobile}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.created_at}</TableCell>
                <TableCell>{row.updated_at}</TableCell>
                <TableCell><Avatar src={row.avatar} alt={row.username} /></TableCell>
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
        {rows.map((row) => (
          <Grid item xs={12} sm={6} md={4} key={row.id}>
            <Paper sx={{ padding: 2, textAlign: 'left' }}>
              <Typography variant="h6">{row.username}</Typography>
              <Typography><strong>ID:</strong> {row.id}</Typography>
              <Typography><strong>Mobile:</strong> {row.mobile}</Typography>
              <Typography><strong>Email:</strong> {row.email}</Typography>
              <Typography><strong>Role:</strong> {row.role}</Typography>
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

      {/* CREATE USER FORM DIALOG */}
      <Dialog
        open={!!createDialog}
        style={{ maxWidth: "400px", display: "block", margin: "auto" }}
      >
        <DialogTitle>Create Form</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={onCreate}>
            <Box>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                error={!!warnings?.username}
                helperText={warnings?.username}
              />
            </Box>
            <Box>
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                margin="normal"
                type="password"
                fullWidth
                required
                error={!!warnings?.password}
                helperText={warnings?.password}
              />
            </Box>
            <Box>
              <TextField
                id="password_confirmation"
                label="Repeat Password"
                variant="outlined"
                margin="normal"
                type="password"
                fullWidth
                required
                error={!!warnings?.password_confirmation}
                helperText={warnings?.password_confirmation}
              />
            </Box>
            <Box>
              <TextField
                id="mobile"
                label="Mobile No."
                variant="outlined"
                margin="normal"
                fullWidth
                required
                error={!!warnings?.mobile}
                helperText={warnings?.mobile}
              />
            </Box>
            <Box>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                error={!!warnings?.email}
                helperText={warnings?.email}
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
              setCreateDialog(false);
              setWarnings({});
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

      {/* DELETE USER FORM DIALOG */}
      <Dialog open={!!deleteDialog}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>
            Do you want to delete this user ID: {deleteDialog}
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
            color="error"
            style={{ border: "2px solid red" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* EDIT USER FORM DIALOG */}
      <Dialog
        open={!!editDialog}
        style={{ maxWidth: "400px", display: "block", margin: "auto" }}
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ p: 1 }} onSubmit={onEdit}>
            <Box>
              <label htmlFor="avatar" style={{ display: "block" }}>
                Profile Picture:
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="avatar">
                <Avatar
                  src={
                    preview ??
                    `http://localhost:8000/storage/${editDialog?.avatar}`
                  }
                  alt="Avatar"
                />
              </label>
            </Box>
            <Box sx={{ mt: 1 }}>
              <TextField
                onChange={(e) =>
                  setEditDialog({
                    ...editDialog,
                    username: e.target.value,
                  })
                }
                value={editDialog?.username ?? ""}
                size="small"
                label="Username"
                type="text"
                fullWidth
                error={!!warnings?.username}
                helperText={warnings?.username}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <TextField
                onChange={(e) =>
                  setEditDialog({
                    ...editDialog,
                    mobile: e.target.value,
                  })
                }
                value={editDialog?.mobile ?? ""}
                size="small"
                label="Mobile"
                type="mobile"
                fullWidth
                error={!!warnings?.mobile}
                helperText={warnings?.mobile}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <TextField
                onChange={(e) =>
                  setEditDialog({
                    ...editDialog,
                    email: e.target.value,
                  })
                }
                value={editDialog?.email ?? ""}
                size="small"
                label="Email"
                type="email"
                fullWidth
                error={!!warnings?.email}
                helperText={warnings?.email}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  value={editDialog?.role ?? ""}
                  onChange={(e) =>
                    setEditDialog({
                      ...editDialog,
                      role: e.target.value,
                    })
                  }
                  label="Role"
                  required
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="guest">Guest</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button id="edit-btn" type="submit" sx={{ display: "none" }}>
              Submit
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ border: "2px solid #077bff" }}
            onClick={() => {
              setEditDialog(null);
              setWarnings({});
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={() => {
              $("#edit-btn").trigger("click");
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
