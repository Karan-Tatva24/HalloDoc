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
import { useFormik } from "formik";
import { viewNotesSchema } from "../../ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  viewNotes,
  viewNotesPost,
} from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/viewNotesAPI";
import { toast } from "react-toastify";
import { updateProviderNotes } from "../../redux/halloAPIs/providerAPIs/dashboardAPIs/updateProviderNotesAPI";

const ViewNotes = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state.root.viewNotes);
  const data = state?.notes;
  const dispatch = useDispatch();
  const id = data?.id;
  const { accountType } = useSelector((state) => state?.root.loggedUserData);

  const formik = useFormik({
    initialValues: {
      isAdmin: accountType === "Admin",
      adminNotes: "",
    },
    onSubmit: (values, onSubmitProps) => {
      {
        accountType === "Admin"
          ? dispatch(viewNotesPost({ id, value: values.adminNotes })).then(
              (response) => {
                if (response.type === "viewNotesPost/fulfilled") {
                  toast.success(response.payload.message);
                  onSubmitProps.resetForm();
                  dispatch(viewNotes(id));
                } else {
                  toast.error(response?.error?.message);
                }
              },
            )
          : dispatch(
              updateProviderNotes({ id, value: values.adminNotes }),
            ).then((response) => {
              if (response.type === "updateProviderNotes/fulfilled") {
                toast.success(response.payload.message);
                onSubmitProps.resetForm();
                dispatch(viewNotes(id));
              } else {
                toast.error(response?.error?.message);
              }
            });
      }
    },
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
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
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
                    {data?.["Transfer Notes"]}
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
                    <b>Physician Notes</b>
                  </Typography>
                  <Typography className="caption-txt">
                    {data?.["Physician Notes"]}
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
                    <b>Admin Notes</b>
                  </Typography>
                  <Typography className="caption-txt">
                    {data?.["Admin Notes"]}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12}>
              <form onSubmit={formik.handleSubmit}>
                <Paper className="input-notes-container">
                  <Input
                    label={
                      accountType === "Admin" ? "Admin Notes" : "Provider Notes"
                    }
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
    </>
  );
};

export default ViewNotes;
