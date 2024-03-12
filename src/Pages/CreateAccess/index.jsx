import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useNavigate } from "react-router-dom";
import "./createAccess.css";
import { useFormik } from "formik";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/TextField/Input";

const CreateAccess = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      rolename: "",
      role: "all",
    },
  });
  return (
    <>
      <Box className="main-createaccess-container">
        <form>
          <Container maxWidth="lg" className="createacess-conatiner-wrapper">
            <Box display="flex" justifyContent="space-between" mb="8px">
              <Box display="flex">
                <Typography variant="h5" gutterBottom>
                  <b>Create Access</b>
                </Typography>
              </Box>
              <Button
                name="back"
                variant="outlined"
                startIcon={<ArrowBackIosOutlinedIcon />}
                color="primary"
                onClick={() => navigate(-1)}
              />
            </Box>
            <Paper className="createacces-full-paper">
              <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
                <Grid item xs={12} md={6} lg={6}>
                  <Input
                    name="rolename"
                    label="Role Name"
                    fullWidth
                    className="form-input"
                    onChange={formik.handleChange}
                    value={formik.values.rolename}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.rolename && Boolean(formik.errors.rolename)
                    }
                    helperText={
                      formik.touched.rolename && formik.errors.rolename
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Input
                    name="role"
                    label="Account Type"
                    select
                    fullWidth
                    className="form-input"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="physician">Physician</MenuItem>
                    <MenuItem value="patient">Patient</MenuItem>
                  </Input>
                </Grid>
                <Grid item xs={12} md={12}>
                  {formik.values.role !== "patient" && (
                    <>
                      {formik.values.role !== "admin" && (
                        <FormControlLabel
                          control={<Checkbox size="medium" />}
                          label="Regions"
                        />
                      )}
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="Scheduling"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="History"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="Accounts"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="MyProfile"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="Dashboard"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="History"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="MySchedule"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="MyProfile"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="Role"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="Provider"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="RequestData"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="SendOrder"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="vendorsinfo"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="Profession"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="SendOrder"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="EmailLogs"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="HaloAdministrators"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="HaloUsers"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="Dashboard"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="CancelledHistory"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="ProviderLocation"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="HaloEmployee"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="HaloWorkPlace"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="Chat"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="PatientRecords"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="BlockedHistory"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="Invoicing"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="SMSLogs"
                      />
                    </>
                  )}
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                <Button name="Save" />
                <Button name="Cancel" variant="outlined" />
              </Box>
            </Paper>
          </Container>
        </form>
      </Box>
    </>
  );
};

export default CreateAccess;
