import React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import MultipleStopOutlinedIcon from "@mui/icons-material/MultipleStopOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import "./viewNotes.css";
import { Input } from "../../Components/TextField/Input";
import Footer from "../../Components/Footer";
import { useFormik } from "formik";
import { viewNotesSchema } from "../../ValidationSchema";

const onSubmit = (values) => {
  console.log(values);
};

const ViewNotes = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      adminNotes: "",
    },
    onSubmit,
    validationSchema: viewNotesSchema,
  });
  return (
    <>
      <Box className="main-notes-container">
        <Container maxWidth="md" className="main-notes-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Notes</b>
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
          <Grid container spacing={{ xs: 1, md: 2 }}>
            <Grid item xs={12} md={6}>
              <Paper className="transfer-container">
                <Box>
                  <MultipleStopOutlinedIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle1">
                    <b>Transfer Notes</b>
                  </Typography>
                  <Typography className="caption-txt">
                    Admin Transferred to Dr.AGOLA on 27/09/2023 at 9:38:04 AM:
                    test assign
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className="transfer-container">
                <Box>
                  <PermIdentityOutlinedIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle1">
                    <b>Transfer Notes</b>
                  </Typography>
                  <Typography className="caption-txt">
                    test add, conclude
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className="transfer-container">
                <Box>
                  <PersonOutlineOutlinedIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle1">
                    <b>Transfer Notes</b>
                  </Typography>
                  <Typography className="caption-txt">-</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12}>
              <form onSubmit={formik.handleSubmit}>
                <Paper className="input-notes-container">
                  <Input
                    label="Admin Notes"
                    name="adminNotes"
                    value={formik.values.adminNotes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.adminNotes && formik.errors.adminNotes
                    }
                    error={
                      formik.touched.adminNotes &&
                      Boolean(formik.errors.adminNotes)
                    }
                    multiline
                    rows={5}
                    fullWidth
                  />
                  <Button name="Save Changes" type="submit" />
                </Paper>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default ViewNotes;
