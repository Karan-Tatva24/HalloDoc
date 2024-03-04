import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { Button } from "../Button";
import { infoImage } from "../../assets/Images";
import "./modal.css";

const ClearCaseModal = ({ open, handleClose, handleClear, rowId }) => {
  const handleClearButton = () => {
    handleClear(rowId);
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      <Box
        className="modal-container"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={8}
      >
        <img src={infoImage} alt="alert info" width={100} height={100} />
        <Typography variant="h5" mt={3}>
          Confirmation for clear case
        </Typography>
        <Typography variant="body2" mt={3}>
          Are sure you want to clear this request? Once clear this
          &emsp;&emsp;request then you are not able to see this request
        </Typography>
        <Box display="flex" gap={2} mt={5}>
          <Button
            name="Clear"
            variant="contained"
            onClick={handleClearButton}
          />
          <Button name="Cancel" variant="outlined" onClick={handleClose} />
        </Box>
      </Box>
    </Modal>
  );
};

export default ClearCaseModal;
