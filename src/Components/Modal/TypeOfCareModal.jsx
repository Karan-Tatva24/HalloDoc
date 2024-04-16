import React, { useState } from "react";
import Modal from "./Modal";
import { Box } from "@mui/material";
import { Button } from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { typeOfCare } from "../../redux/halloAPIs/providerAPIs/dashboardAPIs/encounterAPI";
import { getProviderDashboardCount } from "../../redux/halloAPIs/providerAPIs/dashboardAPIs/getProviderDashboardCount";

const TypeOfCareModal = ({ open, handleClose }) => {
  const [selectedType, setSelectedType] = useState("");
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.root.patientName);

  return (
    <Modal open={open} handleClose={handleClose} header="Select Type Of Care">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={3}
        pt={4}
      >
        <Button
          name="HouseCall"
          variant={selectedType === "HouseCall" ? "contained" : "outlined"}
          size="large"
          onClick={() => setSelectedType("HouseCall")}
        />
        <Button
          name="Consult"
          variant={selectedType === "Consult" ? "contained" : "outlined"}
          size="large"
          onClick={() => setSelectedType("Consult")}
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
          name="Save"
          onClick={() => {
            dispatch(typeOfCare({ id, typeOfCare: selectedType })).then(
              (response) => {
                if (response.type === "typeOfCare/fulfilled") {
                  dispatch(getProviderDashboardCount());
                  handleClose();
                }
              },
            );
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

export default TypeOfCareModal;
