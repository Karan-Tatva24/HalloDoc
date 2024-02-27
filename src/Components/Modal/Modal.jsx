import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiModal from "@mui/material/Modal";

import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import "./modal.css";

const Modal = ({ open, handleClose, children, header }) => {
  return (
    <MuiModal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-container">
        <Box className="modal-header">
          <Typography variant="h6">{header}</Typography>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
