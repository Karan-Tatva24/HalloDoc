import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button";
import {
  Box,
  Container,
  Paper,
  TableSortLabel,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import "./viewUpload.css";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadFile,
  viewUpload,
} from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/viewUploadAPI";
import { downloadFile } from "../../redux/halloAPIs/adminAPIs/commonAPIs/downloadFileAPI";
import { deleteFile } from "../../redux/halloAPIs/adminAPIs/commonAPIs/deleteFileAPI";
import { sendMail } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/sendMailAPI";
import { toast } from "react-toastify";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";

const ViewUpload = () => {
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [selectedFile, setSelectedFile] = useState(null);
  const state = useSelector((state) => state.root.viewUpload);
  const rows = state?.viewUploadData;
  const [filterData, setFilterData] = useState(rows);
  const {
    patientFirstName,
    confirmationNumber,
    patientLastName,
    id,
    patientEmail,
  } = useSelector((state) => state.root.patientName);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiPending());
    dispatch(viewUpload({ id, sortBy: "createdAt", orderBy: "DESC" })).then(
      (response) => {
        if (response.type === "viewUpload/rejected") {
          setFilterData([]);
          dispatch(apiFails());
        } else if (response.type === "viewUpload/fulfilled") {
          dispatch(apiSuccess());
        }
      },
    );
  }, [dispatch, id]);

  useEffect(() => {
    setFilterData(rows);
  }, [rows]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows?.map((row) => row?.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = (e) => {
    dispatch(apiPending());
    e.preventDefault();
    const formData = new FormData();
    formData.append("document", selectedFile);
    dispatch(uploadFile({ id, formData })).then((response) => {
      if (response.type === "uploadFile/fulfilled") {
        dispatch(viewUpload({ id, sortBy: "createAt", orderBy: "DESC" }));
        dispatch(apiSuccess());
        toast.success(response.payload?.message);
      } else if (response.type === "uploadFile/rejected") {
        dispatch(apiFails());
        toast.error(response.payload?.data?.message);
      }
    });
    setSelectedFile(null);
  };

  const handleDownload = (fileName) => {
    dispatch(downloadFile({ fileNames: [fileName] }))
      .then((response) => {
        if (response.type === "downloadFile/fulfilled") {
          const blob = new Blob([response.payload], {
            type: "application/zip",
          });

          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, `${fileName}.zip`);
          } else {
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = `downloaded-files.zip`;
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(link);
          }
          toast.success(response.payload.message);
        } else {
          toast.error("No files selected!");
        }
      })
      .catch((error) => {
        toast.error("Error downloading file:", error);
      });
  };

  const handleDownloadAll = () => {
    const selectedFiles = rows?.filter((row) => selected?.includes(row.id));
    const selectedFileNames = selectedFiles?.map((file) => file?.fileName);
    dispatch(downloadFile({ fileNames: selectedFileNames }))
      .then((response) => {
        if (response.type === "downloadFile/fulfilled") {
          const blob = new Blob([response.payload], {
            type: "application/zip",
          });

          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, `${selectedFileNames}.zip`);
          } else {
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = `downloaded-files.zip`;
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(link);
          }
          toast.success(response.payload.message);
        } else {
          toast.error("No files selected!");
        }
      })
      .catch((error) => {
        toast.error("Error downloading file:", error);
      });
  };

  const handleDelete = (document) => {
    dispatch(apiPending());
    dispatch(deleteFile({ fileNames: [document], id })).then((response) => {
      if (response.type === "deleteFile/fulfilled") {
        dispatch(viewUpload({ id, sortBy: "createAt", orderBy: "DESC" }));
        dispatch(apiSuccess());
        toast.success(response.payload.message);
      } else if (response.type === "deleteFile/rejected") {
        dispatch(apiFails());
        toast.error(response?.payload?.data.message);
      }
    });
  };

  const handleDeleteAll = () => {
    dispatch(apiPending());
    const selectedFiles = rows?.filter((row) => selected?.includes(row?.id));
    const selectedFileNames = selectedFiles?.map((file) => file?.fileName);
    dispatch(deleteFile({ fileNames: selectedFileNames, id })).then(
      (response) => {
        if (response.type === "deleteFile/fulfilled") {
          dispatch(viewUpload({ id, sortBy: "createAt", orderBy: "DESC" }));
          dispatch(apiSuccess());
          toast.success(response.payload.message);
        } else if (response.type === "deleteFile/rejected") {
          dispatch(apiFails());
          toast.error(response?.payload?.data.error);
        }
      },
    );
  };

  const handleSendMail = () => {
    dispatch(apiPending());
    const selectedFiles = rows?.filter((row) => selected?.includes(row?.id));
    const selectedFileNames = selectedFiles?.map((file) => file?.fileName);
    dispatch(
      sendMail({
        email: patientEmail,
        files: selectedFileNames,
      }),
    ).then((response) => {
      if (response.type === "sendMail/fulfilled") {
        dispatch(apiSuccess());
        toast.success(response.payload.message);
      } else if (response.type === "sendMail/rejected") {
        dispatch(apiFails());
        toast.error(response.payload?.data.message);
      }
    });
  };

  return (
    <>
      <Box className="upload-main-container">
        <Container maxWidth="lg" className="upload-main-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={2}
            pb={2}
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Documents</b>
              </Typography>
            </Box>
            <Button
              name="Back"
              variant="outlined"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
            />
          </Box>
          <Paper>
            <Typography variant="caption" pl={2} mt={2}>
              Patient Name
            </Typography>
            <Typography variant="h6" pl={2}>
              <b className="patient-name">
                {patientFirstName} {patientLastName}
              </b>
              ({confirmationNumber})
            </Typography>
            <Typography variant="body2" pl={2}>
              Check here to review and add files that you or the Client/Member
              has attached to the Request.
            </Typography>
            <form onSubmit={handleUpload}>
              <Box display="flex" position="relative" mb={2} mt={2} p={2}>
                <Button
                  style={{
                    color: "#000000",
                    display: "flex",
                    justifyContent: "flex-start",
                    backgroundColor: "#f6f6f6",
                  }}
                  fullWidth
                  variant="outlined"
                  component="label"
                  title="Upload-files"
                >
                  <input
                    onChange={handleFileChange}
                    type="file"
                    id="selectFile"
                    hidden
                  />
                  <label htmlFor="selectFile">
                    {selectedFile !== null ? selectedFile?.name : "Select File"}
                  </label>
                </Button>

                <Button
                  name="Upload"
                  variant="contained"
                  size="large"
                  startIcon={<CloudUploadOutlinedIcon />}
                  type="submit"
                />
              </Box>
            </form>
            <Box
              display="flex"
              justifyContent="space-between"
              p={2}
              flexWrap="wrap"
              gap={2}
            >
              <Box display="flex" flexWrap="wrap">
                <Typography variant="h6" gutterBottom>
                  <b>Documents</b>
                </Typography>
              </Box>
              <Box display="flex" gap={1} flexWrap="wrap">
                <Button
                  name="Download Selected"
                  variant="outlined"
                  color="primary"
                  onClick={handleDownloadAll}
                />
                <Button
                  name="Delete Selected"
                  variant="outlined"
                  color="primary"
                  onClick={handleDeleteAll}
                />
                <Button
                  name="Send Mail"
                  variant="outlined"
                  color="primary"
                  onClick={handleSendMail}
                />
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead style={{ backgroundColor: "#f6f6f6" }}>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={
                          selected?.length > 0 &&
                          selected?.length < rows?.length
                        }
                        checked={selected?.length === rows?.length}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    <TableCell className="document-cl">Documents</TableCell>
                    <TableCell className="date-cl">
                      <TableSortLabel
                        active={orderBy === "createdAt"}
                        direction={order}
                        onClick={() => handleRequestSort("createdAt")}
                      >
                        Upload Date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterData?.length === 0 ? (
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell
                        style={{
                          color: "red",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "flex-start",
                          marginLeft: "5rem",
                          width: "100%",
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                        }}
                      >
                        &emsp;&emsp;&emsp;&emsp;File Not Found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filterData?.map((row) => (
                      <TableRow key={row?.id} hover>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected(row?.id)}
                            onClick={(event) => handleClick(event, row?.id)}
                          />
                        </TableCell>
                        <TableCell>{row?.fileName}</TableCell>
                        <TableCell>{row?.createdAt}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => handleDownload(row?.fileName)}
                            size="large"
                            className="icon-btn"
                          >
                            <CloudDownloadOutlinedIcon size="large" />
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            variant="outlined"
                            onClick={() => handleDelete(row?.fileName)}
                            className="icon-btn"
                            size="large"
                          >
                            <DeleteOutlinedIcon size="large" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ViewUpload;
