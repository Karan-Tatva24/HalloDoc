import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { Button } from "../Button";
import { infoImage } from "../../assets/Images";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";
import { clearCase } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/clearCaseAPI";
import { dashboardCount } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/dashboardCountAPI";
import { toast } from "react-toastify";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";

const ClearCaseModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.root.patientName);

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
            onClick={() => {
              dispatch(apiPending());
              dispatch(clearCase(id)).then((response) => {
                if (response.type === "clearCase/fulfilled") {
                  dispatch(dashboardCount());
                  dispatch(apiSuccess());
                  toast.success(response.payload.message);
                  handleClose();
                } else if (response.type === "clearCase/rejected") {
                  dispatch(apiFails());
                  toast.error(response.payload.data.validation.body.message);
                }
              });
            }}
          />
          <Button name="Cancel" variant="outlined" onClick={handleClose} />
        </Box>
      </Box>
    </Modal>
  );
};

export default ClearCaseModal;
