import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "../../../Components/Button";
import {
  deleteProviderAccount,
  editProviderProfile,
  physicianProfile,
} from "../../../redux/halloAPIs/adminAPIs/providerAPIs/providerInfoAPI";
import { toast } from "react-toastify";
import { AppRoutes } from "../../../constants/routes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { viewFile } from "../../../redux/halloAPIs/adminAPIs/commonAPIs/viewFileAPI";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../../redux/halloSlices/apiStatusSlice";

const INITIAL_VALUES = {
  IndConAgg: false,
  BacCheck: false,
  HIPAA: false,
  nonDisAgg: false,
  licenseDoc: false,
};

const OnBoarding = ({
  id,
  agreementDoc,
  backgroundDoc,
  nonDisDoc,
  hipaaDoc,
  licenseDoc,
  isAgreementDoc,
  isBackgroundDoc,
  isNonDisclosureDoc,
  isLicenseDoc,
  isHipaaDoc,
}) => {
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const [indConAggFile, setIndConAggFile] = useState(null);
  const [backCheckFile, setBackCheckFile] = useState(null);
  const [hipaaCompFile, setHipaaCompFile] = useState(null);
  const [nonDisAggFile, setNonDisAggFile] = useState(null);
  const [licenseDocFile, setLicenseDocFile] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      dispatch(apiPending());
      const formData = new FormData();
      formData.append("backgroundCheck", backCheckFile);
      formData.append("independentContract", indConAggFile);
      formData.append("hipaaCompliance", hipaaCompFile);
      formData.append("nonDisclosureAgreement", nonDisAggFile);
      formData.append("licenseDoc", licenseDocFile);

      dispatch(editProviderProfile({ id, data: formData })).then((response) => {
        if (response.type === "editProviderProfile/fulfilled") {
          dispatch(physicianProfile(id));
          dispatch(apiSuccess());
          toast.success(response.payload.message);
        } else if (response.type === "editProviderProfile/rejected")
          dispatch(apiFails());
      });
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    setInitialValues({
      IndConAgg: isAgreementDoc,
      BacCheck: isBackgroundDoc,
      HIPAA: isHipaaDoc,
      nonDisAgg: isNonDisclosureDoc,
      licenseDoc: isLicenseDoc,
    });
  }, [
    isAgreementDoc,
    isBackgroundDoc,
    isHipaaDoc,
    isLicenseDoc,
    isNonDisclosureDoc,
  ]);

  const getMimeType = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    const mimeTypes = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      pdf: "application/pdf",
    };
    return mimeTypes[extension] || "application/octet-stream";
  };

  const handleViewFile = (fileName) => {
    dispatch(viewFile(fileName)).then((response) => {
      if (response.type === "viewFile/fulfilled") {
        const mimeType = getMimeType(fileName);
        const blob = new Blob([response.payload], { type: mimeType });

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
          const link = document.createElement("a");
          const url = URL.createObjectURL(blob);
          link.href = url;
          window.open(url, "_blank");
        }
      } else {
        toast.error("File not found");
      }
    });
  };

  const handelDeleteAccount = () => {
    dispatch(apiPending());
    dispatch(deleteProviderAccount(id)).then((response) => {
      if (response.type === "deleteProviderAccount/fulfilled") {
        toast.success(response.payload.message);
        navigate(AppRoutes.PROVIDER);
        dispatch(apiSuccess());
      }
    });
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap={3}
        >
          <Typography variant="h6" mb={3}>
            <b>Onboarding</b>
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <Box display="none">
              <input
                type="file"
                id="IndConAggFileInput"
                onChange={(e) => {
                  formik.setFieldValue("IndConAgg", true);
                  setIndConAggFile(e.target.files[0]);
                }}
              />

              <input
                type="file"
                id="BacCheckFileInput"
                onChange={(e) => {
                  formik.setFieldValue("BacCheck", true);
                  setBackCheckFile(e.target.files[0]);
                }}
              />

              <input
                type="file"
                id="HIPAAFileInput"
                onChange={(e) => {
                  formik.setFieldValue("HIPAA", true);
                  setHipaaCompFile(e.target.files[0]);
                }}
              />

              <input
                type="file"
                id="NonDisAggFileInput"
                onChange={(e) => {
                  formik.setFieldValue("nonDisAgg", true);
                  setNonDisAggFile(e.target.files[0]);
                }}
              />

              <input
                type="file"
                id="LicenseDocFileInput"
                onChange={(e) => {
                  formik.setFieldValue("licenseDoc", true);
                  setLicenseDocFile(e.target.files[0]);
                }}
              />
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  name="IndConAgg"
                  checked={formik.values.IndConAgg}
                  onChange={formik.handleChange}
                />
              }
              label="Independent Contractor Agreement"
              sx={{ width: "310px" }}
            />
            <Button
              name="Upload"
              onClick={() =>
                document.getElementById("IndConAggFileInput").click()
              }
            />
            {isAgreementDoc ? (
              <Button
                name="View"
                onClick={() => handleViewFile(agreementDoc)}
              />
            ) : null}
          </Box>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <FormControlLabel
              control={
                <Checkbox
                  name="BacCheck"
                  checked={formik.values.BacCheck}
                  onChange={formik.handleChange}
                />
              }
              label="Background Check"
              sx={{ width: "310px" }}
            />
            <Button
              name="Upload"
              onClick={() =>
                document.getElementById("BacCheckFileInput").click()
              }
            />
            {isBackgroundDoc ? (
              <Button
                name="View"
                onClick={() => handleViewFile(backgroundDoc)}
              />
            ) : null}
          </Box>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <FormControlLabel
              control={
                <Checkbox
                  name="HIPAA"
                  checked={formik.values.HIPAA}
                  onChange={formik.handleChange}
                />
              }
              label="HIPAA Compliance"
              sx={{ width: "310px" }}
            />
            <Button
              name="Upload"
              onClick={() => document.getElementById("HIPAAFileInput").click()}
            />
            {isHipaaDoc ? (
              <Button name="View" onClick={() => handleViewFile(hipaaDoc)} />
            ) : null}
          </Box>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <FormControlLabel
              control={
                <Checkbox
                  name="nonDisAgg"
                  checked={formik.values.nonDisAgg}
                  onChange={formik.handleChange}
                />
              }
              label="Non-Disclosure Agreement"
              sx={{ width: "310px" }}
            />
            <Button
              name="Upload"
              onClick={() =>
                document.getElementById("NonDisAggFileInput").click()
              }
            />
            {isNonDisclosureDoc ? (
              <Button name="View" onClick={() => handleViewFile(nonDisDoc)} />
            ) : null}
          </Box>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <FormControlLabel
              control={
                <Checkbox
                  name="licenseDoc"
                  checked={formik.values.licenseDoc}
                  onChange={formik.handleChange}
                />
              }
              label="License Document"
              sx={{ width: "310px" }}
            />
            <Button
              name="Upload"
              onClick={() =>
                document.getElementById("LicenseDocFileInput").click()
              }
            />
            {isLicenseDoc ? (
              <Button name="View" onClick={() => handleViewFile(licenseDoc)} />
            ) : null}
          </Box>
        </Box>
        <Divider sx={{ backgroundColor: "#1f1e1e86", marginTop: "1rem" }} />
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap={2}
          mt={3}
        >
          <Button name="Save" type="submit" />
          <Button
            color="error"
            name="Delete Account"
            onClick={handelDeleteAccount}
          />
        </Box>
      </form>
    </>
  );
};

export default OnBoarding;
