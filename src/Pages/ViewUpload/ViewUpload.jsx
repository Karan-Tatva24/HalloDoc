import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button/Button";
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
import Header from "../../Components/Header/Header";
import "./viewUpload.css";

let rows = [
  { id: 1, document: "Document 1", uploadDate: "2024-02-20" },
  { id: 2, document: "Document 2", uploadDate: "2024-02-21" },
  { id: 3, document: "Document 3", uploadDate: "2024-02-22" },
];

const ViewUpload = () => {
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("uploadDate");
  const [filterData, setFilterData] = useState(rows);
  const [selectedFile, setSelectedFile] = useState([]);
  const navigate = useNavigate();

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
        selected.slice(selectedIndex + 1)
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
    setSelectedFile(event.target.files);
  };

  const handleUpload = () => {
    // Handle the upload functionality here with the selected file
    if (selectedFile) {
      for (let i = 0; i < selectedFile.length; i++) {
        const newFile = {
          id: filterData.length + 1,
          document: selectedFile[i].name,
          uploadDate: new Date().toISOString().split("T")[0],
        };
        console.log("New file", newFile);
        filterData.push(newFile);
      }
      setSelectedFile([]); // Reset selected file after upload
    }
  };

  const handleDownload = (document) => {
    console.log("Download : ", document);
  };

  const handleDownloadAll = () => {
    selected.forEach((id) => {
      const file = rows.find((row) => row.id === id);
      if (file) {
        handleDownload(file.document);
      }
    });
  };

  const handleDelete = (id) => {
    id === "all"
      ? setFilterData([])
      : setFilterData(filterData.filter((row) => id !== row.id));
  };

  let printFileName = "";
  for (let i = 0; i < selectedFile.length; i++) {
    printFileName += `${selectedFile[i].name}, `;
  }

  return (
    <>
      <Header />
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
              <b className="patient-name">Bhoomi Prajapati</b>(MD101819PRBH0005)
            </Typography>
            <Typography variant="body2">
              Check here to review and add files that you or the Client/Member
              has attached to the Request.
            </Typography>
            <form>
              <Box position="relative" mb={2} mt={2}>
                <Box display="flex">
                  <Box position="absolute" className="file-select">
                    <label htmlFor="selectfile">
                      {selectedFile.length > 0 ? printFileName : "Select Files"}
                    </label>
                  </Box>

                  <Button
                    fullWidth
                    variant="outlined"
                    component="label"
                    title="Upload-files"
                  >
                    <input
                      // accept="image/*"
                      onChange={handleFileChange}
                      multiple
                      type="file"
                      id="selectfile"
                    />
                  </Button>

                  <Button
                    name="Upload"
                    variant="contained"
                    size="large"
                    startIcon={<CloudUploadOutlinedIcon />}
                    onClick={handleUpload}
                    className="upload-btn"
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
                        active={orderBy === "uploadDate"}
                        direction={order}
                        onClick={() => handleRequestSort("uploadDate")}
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
                        <TableCell>{row.document}</TableCell>
                        <TableCell>{row.uploadDate}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => handleDownload(row.document)}
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
                    )
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
