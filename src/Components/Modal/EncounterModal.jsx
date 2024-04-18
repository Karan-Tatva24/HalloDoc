import React from "react";
import Modal from "./Modal";
import { Box, Typography } from "@mui/material";
import { Button } from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { download } from "../../redux/halloAPIs/providerAPIs/dashboardAPIs/encounterAPI";
import { toast } from "react-toastify";

const EncounterModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.root.patientName);

  const handleDownload = () => {
    dispatch(download(id))
      .then((response) => {
        if (response.type === "download/fulfilled") {
          const blob = new Blob([response.payload], {
            type: "application/pdf",
          });

          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, `encounter_form.pdf`);
          } else {
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = `encounter_form.pdf`;
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
    handleClose();
  };

  return (
    <Modal open={open} handleClose={handleClose} header="Encounter Form">
      <Typography p={2}>Encounter form is finalize successfully</Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        pt={2}
        pb={4}
      >
        <Button name="Download" onClick={handleDownload} />
      </Box>
    </Modal>
  );
};

export default EncounterModal;
