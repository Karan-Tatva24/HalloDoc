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
import { uploadFile, viewUpload } from "../../redux/halloAPIs/viewUploadAPI";

const ViewUpload = () => {
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("uploadDate");
  const [selectedFile, setSelectedFile] = useState(null);
  const state = useSelector((state) => state.root.viewUpload);
  const rows = state.viewUpload;
  const [filterData, setFilterData] = useState(rows);
  const { patientFirstName, confirmationNumber, patientLastName, id } =
    useSelector((state) => state.root.patientName);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setFilterData(rows);
  }, [rows]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.id);
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

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a[orderBy], b[orderBy])
      : (a, b) => -descendingComparator(a[orderBy], b[orderBy]);
  };

  const descendingComparator = (a, b) => {
    if (b < a) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  };

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
    e.preventDefault();
    const formData = new FormData();
    formData.append("document", selectedFile);
    dispatch(uploadFile({ id, formData })).then((response) => {
      if (response.type === "uploadFile/fulfilled") {
        dispatch(viewUpload(id));
      }
    });
    setSelectedFile(null);
  };

  const handleDownload = (document) => {
    console.log("Download : ", document);
  };

  const handleDownloadAll = () => {
    selected.forEach((id) => {
      const file = rows.find((row) => row.id === id);
      if (file) {
        handleDownload(file.fileName);
      }
    });
  };

  const handleDelete = (id) => {
    id === "all"
      ? setFilterData([])
      : setFilterData(filterData.filter((row) => id !== row.id));
  };

  return (
    <>
      <Box className="upload-main-container">
        <Container maxWidth="lg" className="upload-main-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Documents</b>
              </Typography>
            </Box>
            <Button
              name="Back"
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
              className="back-btn"
            />
          </Box>
          <Paper className="upload-container">
            <Typography variant="caption">Patient Name</Typography>
            <Typography variant="h6">
              <b className="patient-name">
                {patientFirstName}
                {patientLastName}
              </b>
              ({confirmationNumber})
            </Typography>
            <Typography variant="body2">
              Check here to review and add files that you or the Client/Member
              has attached to the Request.
            </Typography>
            <form onSubmit={handleUpload}>
              <Box position="relative" mb={2} mt={2}>
                <Box display="flex">
                  <Box position="absolute" className="file-select">
                    <label htmlFor="selectfile">
                      {selectedFile !== null
                        ? selectedFile.name
                        : "Select File"}
                    </label>
                  </Box>

                  <Button
                    fullWidth
                    variant="outlined"
                    component="label"
                    title="Upload-files"
                  >
                    <input
                      onChange={handleFileChange}
                      type="file"
                      id="selectfile"
                    />
                  </Button>

                  <Button
                    name="Upload"
                    variant="contained"
                    size="large"
                    startIcon={<CloudUploadOutlinedIcon />}
                    type="submit"
                  />
                </Box>
              </Box>
            </form>
            <Box
              display="flex"
              justifyContent="space-between"
              mb={2}
              flexWrap="wrap"
            >
              <Box display="flex" flexWrap="wrap">
                <Typography variant="h6" gutterBottom>
                  <b>Documents</b>
                </Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Button
                  name="Download All"
                  variant="outlined"
                  color="primary"
                  onClick={handleDownloadAll}
                />
                <Button
                  name="Delete All"
                  variant="outlined"
                  color="primary"
                  onClick={() => handleDelete("all")}
                />
                <Button name="Send Mail" variant="outlined" color="primary" />
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead style={{ backgroundColor: "#f6f6f6" }}>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={
                          selected.length > 0 && selected.length < rows.length
                        }
                        checked={selected.length === rows.length}
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
                  {stableSort(filterData, getComparator(order, orderBy)).map(
                    (row) => (
                      <TableRow key={row.id} hover>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected(row.id)}
                            onClick={(event) => handleClick(event, row.id)}
                          />
                        </TableCell>
                        <TableCell>{row.fileName}</TableCell>
                        <TableCell>{row.createdAt}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => handleDownload(row.fileName)}
                            size="large"
                            className="icon-btn"
                          >
                            <CloudDownloadOutlinedIcon size="large" />
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            variant="outlined"
                            onClick={() => handleDelete(row.id)}
                            className="icon-btn"
                            size="large"
                          >
                            <DeleteOutlinedIcon size="large" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ),
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
