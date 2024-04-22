import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { infoImage } from "../../assets/Images";
import { Button } from "../Button";

const InformationModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        className="modal-container"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={8}
      >
        <img src={infoImage} alt="alter info" width={100} height={100} />
        <Typography variant="h5" mt={3}>
          <b>Information</b>
        </Typography>
        <Typography variant="body2" mt={3}>
          When submitting the request, you must provide correct contact
          information for the patient or the responsibly party. Failure to
          provide correct email and phone number will delay service or declined.
        </Typography>
        <Box mt={5}>
          <Button name="Ok" onClick={handleClose} />
        </Box>
      </Box>
    </Modal>
  );
};

export default InformationModal;
