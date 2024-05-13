import React, { useState } from "react";
import Modal from "./Modal";
import { Box, Typography } from "@mui/material";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routes";
import { useDispatch } from "react-redux";
import { selectRequestType } from "../../redux/halloSlices/patientSlices/commonSlice";
import { toast } from "react-toastify";

const CreateNewRequestModal = ({ open, handleClose }) => {
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Modal
      open={open}
      handleClose={() => {
        setSelectedType("");
        handleClose();
      }}
      header="Create New Request"
    >
      <Typography variant="body1" p={2}>
        Here, I want to create new request for ...
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" gap={3}>
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
        p={2}
      >
        <Button
          name="Continue"
          onClick={() => {
            if (selectedType !== "") {
              dispatch(selectRequestType(selectedType));
              setSelectedType("");
              navigate(AppRoutes.SUBMIT_INFORMATION);
            } else toast.error("Please select any one type.");
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
