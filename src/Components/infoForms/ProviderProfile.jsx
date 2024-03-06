import React, { useRef, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { useFormik } from "formik";
import { providerProfileSchema } from "../../ValidationSchema";
import SignatureCanvas from "react-signature-canvas";

const INITIAL_VALUE = {
  businessname: "hbsdjcsdhbvsfbgfhgdfg",
  businesswebsite: "dvgbjksfvbsh",
  adminnotes: "hello",
};

const ProviderProfile = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUE);
  const [openModel, setOpenModal] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const sigCanvas = useRef();

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
