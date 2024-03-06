import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { useFormik } from "formik";
import { providerProfileSchema } from "../../ValidationSchema";

const INITIAL_VALUE = {
  businessname: "hbsdjcsdhbvsfbgfhgdfg",
  businesswebsite: "dvgbjksfvbsh",
  adminnotes: "hello",
};

const ProviderProfile = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUE);
  const formik = useFormik({
    initialValues,
    onSubmit: (value) => {
      console.log("Address Values", value);
    },
    validationSchema: providerProfileSchema,
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h6">
        <b>Provider Profile</b>
      </Typography>
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        justifyContent="center"
        alignItems="center"
        className="profile-input-container"
      >
        <Grid item xs={12} md={6}>
          <Input
            name="businessname"
            label="Business name"
            fullWidth
            disabled={isDisabled}
            value={formik.values.businessname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.businessname && Boolean(formik.errors.businessname)
            }
            helperText={
              formik.touched.businessname && formik.errors.businessname
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            name="businesswebsite"
            label="Business Website"
            fullWidth
            disabled={isDisabled}
            value={formik.values.businesswebsite}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.businesswebsite &&
              Boolean(formik.errors.businesswebsite)
            }
            helperText={
              formik.touched.businesswebsite && formik.errors.businesswebsite
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Box display="flex">
              <Button
                fullWidth
                variant="outlined"
                component="label"
                title="Upload-files"
              >
                <input accept="image/*" type="file" />
              </Button>

              <Button
                name="Upload"
                variant="contained"
                size="large"
                startIcon={<CloudUploadOutlinedIcon />}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={10} md={4}>
          <Box>
            <Box display="flex">
              <Button
                fullWidth
                variant="outlined"
                component="label"
                title="Upload-files"
              >
                <input accept="image/*" type="file" />
              </Button>

              <Button
                name="Upload"
                variant="contained"
                size="large"
                startIcon={<CloudUploadOutlinedIcon />}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Button
            name="Create"
            variant="contained"
            size="large"
            startIcon={<EditIcon />}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            name="adminnotes"
            label="Admin Notes"
            fullWidth
            multiline
            rows={4}
            disabled={isDisabled}
            value={formik.values.adminnotes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.adminnotes && Boolean(formik.errors.adminnotes)
            }
            helperText={formik.touched.adminnotes && formik.errors.adminnotes}
          />
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        gap={2}
        mt={5}
        mb={2}
      >
        {isDisabled ? (
          <Button name="Edit" onClick={() => setIsDisabled(false)} />
        ) : (
          <>
            <Button
              name="Save"
              type="submit"
              onClick={() => {
                setInitialValues(formik.values);
                setIsDisabled(true);
              }}
            />
            <Button
              name="Cancel"
              variant="outlined"
              onClick={() => {
                formik.setValues(initialValues);
                setIsDisabled(true);
              }}
            />
          </>
        )}
      </Box>
    </form>
  );
};

export default ProviderProfile;
