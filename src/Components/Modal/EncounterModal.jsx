import React from "react";
import Modal from "./Modal";
import { Box, Typography } from "@mui/material";
import { Button } from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { download } from "../../redux/halloAPIs/providerAPIs/dashboardAPIs/encounterAPI";
import { toast } from "react-toastify";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";

const EncounterModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { id, patientFirstName } = useSelector(
    (state) => state.root.patientName,
  );

  const handleDownload = () => {
    dispatch(apiPending());
    dispatch(download(id))
      .then((response) => {
        if (response.type === "download/fulfilled") {
          const blob = new Blob([response.payload], {
            type: "application/pdf",
          });

          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(
              blob,
              `${patientFirstName}_encounter_form.pdf`,
            );
          } else {
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = `${patientFirstName}_encounter_form.pdf`;
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(link);
          }
          toast.success(response.payload.message);
          dispatch(apiSuccess());
        } else {
          dispatch(apiFails());
          toast.error("No files selected!");
        }
      })
      .catch((error) => {
        dispatch(apiFails());
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
