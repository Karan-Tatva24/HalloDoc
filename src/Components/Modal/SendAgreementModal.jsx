import React from "react";
import Modal from "./Modal";
import { Box, Typography } from "@mui/material";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";
import { sendAgreement } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/sendAgreementAPI";
import { toast } from "react-toastify";

const SendAgreementModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { id, requestType } = useSelector((state) => state.root.patientName);
  const { details } = useSelector((state) => state.sendAgreement);

  return (
    <Modal open={open} handleClose={handleClose} header="Send Agreement">
      <form>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography
            className={`text-dot text-dot-${requestType?.toLowerCase()}`}
          >
            {requestType}
          </Typography>
          <Typography variant="caption">
            To Send Agreement please make sure you are updating the correct
            contact information below for the responsible party.
          </Typography>
          <Input
            name="phone"
            fullWidth
            label="Phone Number"
            disabled
            value={details.patientPhoneNumber}
          />
          <Input
            name="email"
            fullWidth
            label="Email"
            disabled
            value={details.patientEmail}
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              name="Send"
              variant="contained"
              onClick={() => {
                dispatch(sendAgreement(id)).then((response) => {
                  if (response.type === "sendAgreement/fulfilled") {
                    toast.success(response.payload.message);
                    handleClose();
                  } else if (response.type === "sendAgreement/rejected") {
                    toast.error(response.payload.data.validation.body.message);
                  }
                });
              }}
            />
            <Button
              name="Cancel"
              variant="outlined"
              onClick={handleClose}
              type="reset"
            />
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default SendAgreementModal;
