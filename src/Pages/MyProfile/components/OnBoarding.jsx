import React from "react";
import { Box, Typography } from "@mui/material";
import { Button } from "../../../Components/Button";
import { viewFile } from "../../../redux/halloAPIs/adminAPIs/commonAPIs/viewFileAPI";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const OnBoarding = ({
  id,
  agreementDoc,
  backgroundDoc,
  nonDisDoc,
  hipaaDoc,
  licenseDoc,
}) => {
  const dispatch = useDispatch();

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

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={3}
      pt={2}
      width={350}
    >
      <Box
        display="flex"
        gap={4}
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Typography variant="subtitle2">
          Independent Contractor Agreement
        </Typography>
        {agreementDoc ? (
          <Button name="View" onClick={() => handleViewFile(agreementDoc)} />
        ) : null}
      </Box>
      <Box
        display="flex"
        gap={6}
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Typography variant="subtitle2">Background Check</Typography>
        {backgroundDoc ? (
          <Button name="View" onClick={() => handleViewFile(backgroundDoc)} />
        ) : null}
      </Box>
      <Box
        display="flex"
        gap={6}
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Typography variant="subtitle2">HIPAA Compliance</Typography>
        {hipaaDoc ? (
          <Button name="View" onClick={() => handleViewFile(hipaaDoc)} />
        ) : null}
      </Box>
      <Box
        display="flex"
        gap={6}
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Typography variant="subtitle2">Non-Disclosure Agreement</Typography>
        {nonDisDoc ? (
          <Button name="View" onClick={() => handleViewFile(nonDisDoc)} />
        ) : null}
      </Box>
      <Box
        display="flex"
        gap={6}
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Typography variant="subtitle2">License Document</Typography>
        {licenseDoc ? (
          <Button name="View" onClick={() => handleViewFile(licenseDoc)} />
        ) : null}
      </Box>
    </Box>
  );
};

export default OnBoarding;
