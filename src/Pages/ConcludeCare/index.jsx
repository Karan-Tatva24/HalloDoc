import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import React, { useEffect, useState } from "react";
import { Button } from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import "./concludeCare.css";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadFile,
  viewUpload,
} from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/viewUploadAPI";
import { downloadFile } from "../../redux/halloAPIs/adminAPIs/commonAPIs/downloadFileAPI";
import { deleteFile } from "../../redux/halloAPIs/adminAPIs/commonAPIs/deleteFileAPI";
import { toast } from "react-toastify";
import { Input } from "../../Components/TextField/Input";
import { useFormik } from "formik";
import { concludeCare } from "../../redux/halloAPIs/providerAPIs/dashboardAPIs/encounterAPI";
import { AppRoutes } from "../../constants/routes";
import { concludeCareSchema } from "../../ValidationSchema";

const ConcludeCare = () => {
  const [tableData, setTableData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      providerNotes: "",
    },
    validationSchema: concludeCareSchema,
    onSubmit: (values) => {
      dispatch(concludeCare({ id, providerNotes: values.providerNotes })).then(
        (response) => {
          if (response.type === "concludeCare/fulfilled") {
            toast.success(response.payload?.message);
          } else if (response.type === "concludeCare/rejected") {
            toast.error(response?.payload?.data?.message);
          }
        },
      );
      navigate(AppRoutes.DASHBOARD);
    },
  });

  const { patientFirstName, patientLastName, id } = useSelector(
    (state) => state.root.patientName,
  );
  const { viewUploadData } = useSelector((state) => state.root.viewUpload);
  useEffect(() => setTableData(viewUploadData), [viewUploadData]);

  useEffect(() => {
    dispatch(viewUpload({ id, sortBy: "createdAt", orderBy: "ASC" }));
  }, [dispatch, id]);

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("document", file);
    dispatch(uploadFile({ id, formData })).then((response) => {
      if (response.type === "uploadFile/fulfilled") {
        toast.success(response.payload.message);
        dispatch(viewUpload({ id, sortBy: "createAt", orderBy: "ASC" }));
      } else if (response.type === "uploadFile/rejected") {
        toast.error(response.payload?.data?.error);
      }
    });
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

  const handleDelete = (document) => {
    dispatch(deleteFile({ fileNames: [document], id })).then((response) => {
      if (response.type === "deleteFile/fulfilled") {
        toast.success(response.payload.message);
        dispatch(viewUpload({ id, sortBy: "createAt", orderBy: "ASC" }));
      } else if (response.type === "deleteFile/rejected") {
        toast.error(response.payload.data.validation.body.message);
        navigate(AppRoutes.DASHBOARD);
      }
    });
  };

  return (
    <>
      <Box className="conclude-care-main-container">
        <Container maxWidth="md" className="conclude-care-main-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Conclude Care</b>
              </Typography>
            </Box>
            <Button
              name="Back"
              variant="outlined"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
              className="back-btn"
            />
          </Box>
          <Paper className="conclude-care-container">
            <Typography variant="caption">Patient Name</Typography>
            <Typography variant="h6">
              <b className="patient-name">
                {patientFirstName} {patientLastName}
              </b>
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              pb={3}
            >
              <Typography variant="h5">
                <b>Encounter Form</b>
              </Typography>
              <Box display="none">
                <input type="file" id="fileUpload" onChange={handleUpload} />
              </Box>
              <Button
                name="Upload"
                variant="outlined"
                size="large"
                startIcon={<CloudUploadOutlinedIcon />}
                type="submit"
                onClick={() => document.getElementById("fileUpload").click()}
              />
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead style={{ backgroundColor: "#f6f6f6" }}>
                  <TableRow>
                    <TableCell className="document-cl">Documents</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData?.map((row) => (
                    <TableRow key={row?.id}>
                      <TableCell>{row?.fileName}</TableCell>
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
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box pt={4}>
              <Typography variant="subtitle2">Provider Notes</Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Input
                label="Provider Notes"
                name="providerNotes"
                value={formik.values.providerNotes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.providerNotes && formik.errors.providerNotes
                }
                error={
                  formik.touched.providerNotes &&
                  Boolean(formik.errors.providerNotes)
                }
                multiline
                rows={3}
                fullWidth
                className="form-input"
              />
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                gap={2}
                pt={3}
              >
                <Button name="Conclude Care" type="submit" />
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ConcludeCare;
