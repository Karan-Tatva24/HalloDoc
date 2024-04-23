import React, { useState } from "react";
import Modal from "./Modal";
import { Box } from "@mui/material";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routes";
import { useDispatch } from "react-redux";
import { selectRequestType } from "../../redux/halloSlices/patientSlices/commonSlice";

const CreateNewRequestModal = ({ open, handleClose }) => {
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Modal open={open} handleClose={handleClose} header="Create New Request">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={3}
        pt={4}
      >
        <Button
          name="Me"
          variant={selectedType === "Patient" ? "contained" : "outlined"}
          size="large"
          onClick={() => setSelectedType("Patient")}
        />
        <Button
          name="Some One Else"
          variant={selectedType === "SomeoneElse" ? "contained" : "outlined"}
          size="large"
          onClick={() => setSelectedType("SomeoneElse")}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        gap={2}
        p={4}
      >
        <Button
          name="Continue"
          onClick={() => {
            dispatch(selectRequestType(selectedType));
            navigate(AppRoutes.SUBMIT_INFORMATION);
          }}
        />
        <Button
          name="Cancel"
          variant="outlined"
          onClick={() => {
            setSelectedType("");
            handleClose();
          }}
        />
      </Box>
    </Modal>
  );
};

export default CreateNewRequestModal;
