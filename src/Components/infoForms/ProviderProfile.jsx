import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { useFormik } from "formik";
import { providerProfileSchema } from "../../ValidationSchema";
import {
  editProviderProfile,
  physicianProfile,
} from "../../redux/halloAPIs/adminAPIs/providerAPIs/providerInfoAPI";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";

const INITIAL_VALUE = {
  businessName: "",
  businessWebsite: "",
  adminNotes: "",
};

const ProviderProfile = ({
  id,
  businessName,
  businessWebsite,
  notes,
  photoName,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUE);

  const dispatch = useDispatch();
  const { accountType } = useSelector((state) => state?.root.loggedUserData);

  const formik = useFormik({
    initialValues,
    validationSchema: providerProfileSchema,
    enableReinitialize: true,
  });

  useEffect(() => {
    setInitialValues({
      adminNotes: notes,
      businessName,
      businessWebsite,
    });
  }, [businessName, businessWebsite, notes]);

  const handlePhotoChange = (event) => {
    event.preventDefault();
    setSelectedPhoto(event.target.files[0]);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h6" pb={2} pt={3}>
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
            name="businessName"
            label="Business name"
            fullWidth
            disabled={isDisabled}
            value={formik.values.businessName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.businessName && Boolean(formik.errors.businessName)
            }
            helperText={
              formik.touched.businessName && formik.errors.businessName
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            name="businessWebsite"
            label="Business Website"
            fullWidth
            disabled={isDisabled}
            value={formik.values.businessWebsite}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.businessWebsite &&
              Boolean(formik.errors.businessWebsite)
            }
            helperText={
              formik.touched.businessWebsite && formik.errors.businessWebsite
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" position="relative" mb={2} mt={2}>
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
                disabled={isDisabled}
                onChange={handlePhotoChange}
                type="file"
                id="photo"
                hidden
              />
              <label htmlFor="photo">
                {photoName
                  ? photoName
                  : selectedPhoto !== null
                    ? selectedPhoto.name
                    : "Select Photo"}
              </label>
            </Button>

            <Button
              name="Upload"
              variant="contained"
              size="large"
              startIcon={<CloudUploadOutlinedIcon />}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Input
            name="adminNotes"
            label="Admin Notes"
            fullWidth
            multiline
            rows={4}
            disabled={isDisabled}
            value={formik.values.adminNotes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.adminNotes && Boolean(formik.errors.adminNotes)
            }
            helperText={formik.touched.adminNotes && formik.errors.adminNotes}
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
        {accountType === "Admin" ? (
          isDisabled ? (
            <Button name="Edit" onClick={() => setIsDisabled(false)} />
          ) : (
            <>
              <Button
                name="Save"
                type="submit"
                onClick={() => {
                  dispatch(apiPending());
                  const formData = new FormData();
                  formData.append("businessName", formik.values.businessName);
                  formData.append(
                    "businessWebsite",
                    formik.values.businessWebsite,
                  );
                  formData.append("notes", formik.values.adminNotes);
                  formData.append("Photo", selectedPhoto);
                  dispatch(editProviderProfile({ id, data: formData })).then(
                    (response) => {
                      if (response.type === "editProviderProfile/fulfilled") {
                        dispatch(physicianProfile(id));
                        dispatch(apiSuccess());
                        toast.success(response.payload.message);
                      } else if (
                        response.type === "editProviderProfile/rejected"
                      ) {
                        dispatch(apiFails());
                        toast.error(
                          response.payload?.data?.validation?.message,
                        );
                      }
                    },
                  );
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
          )
        ) : null}
      </Box>
    </form>
  );
};

export default ProviderProfile;
