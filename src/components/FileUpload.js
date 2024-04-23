import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import { CloudDownload, Delete } from '@mui/icons-material';
import { host } from '../hosts';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const FileUpload = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileDetails, setFileDetails] = useState({});
    const [files, setFiles] = useState([]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    useEffect(() => {
        fetchFiles();
    }, [fileDetails]);

    const fetchFiles = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('Access token not found');
            return;
        }
        try {
            const response = await axios.get(host + '/fileService/getFiles', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            });
            setFiles(response.data.data);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
        setFileDetails({});
    };

    const handleDownload = async (filename) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('Access token not found');
            return;
        }

        try {
            const response = await axios.get(host + `/fileService/downloadFile/${filename}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                responseType: 'blob', // Important: This tells Axios to handle the response as a Blob
            });

            // Create a URL for the blob
            const fileURL = window.URL.createObjectURL(new Blob([response.data]));

            // Create a temporary link to trigger the download
            const fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', filename); // Set the file name for the download
            document.body.appendChild(fileLink);

            fileLink.click(); // Trigger the download

            // Clean up by revoking the Blob URL and removing the temporary link
            window.URL.revokeObjectURL(fileURL);
            fileLink.remove();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };


    const handleUpload = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('Access token not found');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            const response = await axios.post(host + '/fileService/uploadFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`
                },
            });
            // Assuming the response contains file details
            setFileDetails(response.data.data.data);

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleDelete = async (filename) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('Access token not found');
            return;
        }
        try {
            await axios.delete(host + `/fileService/removeFile/${filename}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            });
            // Refresh the file list after deletion
            fetchFiles();
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="file tabs">
                    <Tab label="Upload File" />
                    <Tab label="View Files" />
                </Tabs>
            </Box>
            <TabPanel value={selectedTab} index={0}>
                <h1>Upload Files Here</h1>
                <input type="file" onChange={handleFileSelect} />
                <button onClick={handleUpload}>Upload</button>
                {fileDetails && (
                    <div>
                        <p>File Size: {fileDetails.size}</p>
                        <p>Upload Time: {fileDetails.uploadTime}</p>
                        <p>File Extension: {fileDetails.extension}</p>
                        <p>File Path: {fileDetails.path}</p>
                    </div>
                )}
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>File Name</TableCell>
                                <TableCell align="right">Size</TableCell>
                                <TableCell align="right">Upload Time</TableCell>
                                <TableCell align="right">Extension</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {files.map((file) => (
                                <TableRow key={file.path}>
                                    <TableCell component="th" scope="row">{file.originalname}</TableCell>
                                    <TableCell align="right">{file.size}</TableCell>
                                    <TableCell align="right">{file.uploadTime}</TableCell>
                                    <TableCell align="right">{file.extension}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            aria-label="download"
                                            onClick={() => handleDownload(file.originalname)}
                                        >
                                            <CloudDownload />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => handleDelete(file.originalname)}
                                            color="error"
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
        </Box>
    );
};

export default FileUpload;
