import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Snackbar, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { host } from '../hosts';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found');
                return;
            }
            const response = await axios.get(host + '/userService/getUsers', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleEditClick = (user) => {
        setEditUserId(user._id);
        setEditFormData({
            _id: user._id,
            privileges: user.privileges,
            name: user.name,
            college: user.college,
            course: user.course,
            phone: user.phone,
        });
    };


    const handleSaveClick = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found');
                return;
            }
            await axios.put(host + '/userService/updateUser', {
                userDetails: editFormData
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            await fetchUsers();
            setSnackbarMessage('User updated successfully');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setEditUserId(null);
        } catch (error) {
            console.error('Error updating user:', error);
            setSnackbarMessage('Failed to update user');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleEditFormChange = (event) => {
        setEditFormData({
            ...editFormData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div>
            <h1>Userbase</h1>
            <TableContainer component={Paper}>
                <Table aria-label="editable user table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell align="right">Privileges</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">College</TableCell>
                            <TableCell align="right">Course</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user._id}
                                sx={{
                                    '&:nth-of-type(odd)': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)', // Light grey for odd rows
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.username}
                                </TableCell>
                                <TableCell align="right">
                                    {editUserId === user._id ? (
                                        <TextField
                                            size="small"
                                            name="privileges"
                                            value={editFormData.privileges}
                                            onChange={handleEditFormChange}
                                        />
                                    ) : (
                                        user.privileges
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {editUserId === user._id ? (
                                        <TextField
                                            size="small"
                                            name="name"
                                            value={editFormData.name}
                                            onChange={handleEditFormChange}
                                        />
                                    ) : (
                                        user.name
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {editUserId === user._id ? (
                                        <TextField
                                            size="small"
                                            name="college"
                                            value={editFormData.college}
                                            onChange={handleEditFormChange}
                                        />
                                    ) : (
                                        user.college
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {editUserId === user._id ? (
                                        <TextField
                                            size="small"
                                            name="course"
                                            value={editFormData.course}
                                            onChange={handleEditFormChange}
                                        />
                                    ) : (
                                        user.course
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {editUserId === user._id ? (
                                        <TextField
                                            size="small"
                                            name="phone"
                                            value={editFormData.phone}
                                            onChange={handleEditFormChange}
                                        />
                                    ) : (
                                        user.phone
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {editUserId === user._id ? (
                                        <IconButton onClick={handleSaveClick}>
                                            <SaveIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick={() => handleEditClick(user)}>
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Users;
