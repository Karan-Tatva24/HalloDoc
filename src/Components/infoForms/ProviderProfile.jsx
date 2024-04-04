import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { useFormik } from "formik";
import { providerProfileSchema } from "../../ValidationSchema";
import SignatureCanvas from "react-signature-canvas";
import {
  editProviderProfile,
  physicianProfile,
} from "../../redux/halloAPIs/providerInfoAPI";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const INITIAL_VALUE = {
  businessName: "",
  businessWebsite: "",
  adminNotes: "Hello",
};

const ProviderProfile = ({ id, businessName, businessWebsite }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUE);
  const [openModel, setOpenModal] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const sigCanvas = useRef();
  const dispatch = useDispatch();

  const create = () => {
    const URL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setImageURL(URL);
    setOpenModal(false);
  };

  const download = () => {
    const dlink = document.createElement("a");
    dlink.setAttribute("href", imageURL);
    dlink.setAttribute("download", "signature.png");
    dlink.click();
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (value) => {
      console.log("Address Values", value);
    },
    validationSchema: providerProfileSchema,
    enableReinitialize: true,
  });

  useEffect(() => {
    setInitialValues({
      businessName,
      businessWebsite,
    });
  }, [businessName, businessWebsite]);

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
        <Grid item xs={12} md={6}>
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
                // onChange={handleFileChange}
                type="file"
                id="photo"
                hidden
              />
              <label htmlFor="photo">
                {/* {selectedFile !== null ? selectedFile.name : "Select File"} */}
                Select File
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
        </Grid>
        <Grid item xs={10} md={4}>
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
                // onChange={handleFileChange}
                type="file"
                id="signature"
                hidden
              />
              <label htmlFor="signature">
                {/* {selectedFile !== null ? selectedFile.name : "Select File"} */}
                Select File
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
        </Grid>
        <Grid item xs={2}>
          <Button
            name="Create"
            variant="contained"
            size="large"
            startIcon={<EditIcon />}
            onClick={() => setOpenModal(true)}
          />
        </Grid>
        <Grid item xs={4}>
          {openModel && (
            <div className="modalContainer">
              <div className="modal">
                <div className="sigPadContainer">
                  <SignatureCanvas
                    penColor="black"
                    canvasProps={{ className: "sigCanvas" }}
                    ref={sigCanvas}
                  />
                  <hr />
                  <button onClick={() => sigCanvas.current.clear()}>
                    Clear
                  </button>
                </div>
                <div className="modal__bottom">
                  <button onClick={() => setOpenModal(false)}>Cancel</button>
                  <button className="create" onClick={create}>
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}
          {imageURL && (
            <>
              <img src={imageURL} alt="signature" className="signature" />
              <br />
              <button
                onClick={download}
                style={{ padding: "5px", marginTop: "5px" }}
              >
                Download
              </button>
            </>
          )}
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
        {isDisabled ? (
          <Button name="Edit" onClick={() => setIsDisabled(false)} />
        ) : (
          <>
            <Button
              name="Save"
              type="submit"
              onClick={() => {
                dispatch(editProviderProfile({ id, data: formik.values })).then(
                  (response) => {
                    if (response.type === "editProviderProfile/fulfilled") {
                      dispatch(physicianProfile(id));
                      toast.success(response.payload.message);
                    } else if (
                      response.type === "editProviderProfile/rejected"
                    ) {
                      toast.error(
                        response.payload.data.validation.body.message,
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
        )}
      </Box>
    </form>
  );
};

export default ProviderProfile;
