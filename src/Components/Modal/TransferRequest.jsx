import { Box, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import Modal from "./Modal";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { transferModalSchema } from "../../ValidationSchema";

const TransferRequest = ({ open, handleClose, handleOpen }) => {
  const formik = useFormik({
    initialValues: {
      searchRegion: "",
      description: "",
      physician: "",
    },
    validationSchema: transferModalSchema,
    onSubmit: (values) => {
      console.log("submmitted", values);
    },
  });
  return (
    <Modal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      header="Transfer Request"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography variant="caption">
            To transfer this request, searach and select another Physician
          </Typography>
          <Input
            fullWidth
            label="Nerrow Search By Region"
            select
            name="searchRegion"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.searchRegion}
            error={
              formik.touched.searchRegion && Boolean(formik.errors.searchRegion)
            }
          >
            <MenuItem value="all">Service not Availabel</MenuItem>
            <MenuItem value="all">Doctor are not Availabel</MenuItem>
            <MenuItem value="all">Slots are nbot free</MenuItem>
            <MenuItem value="all">Other</MenuItem>
          </Input>
          <Input
            fullWidth
            label="Select Physician"
            select
            name="physician"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.physician}
            error={formik.touched.physician && Boolean(formik.errors.physician)}
          >
            <MenuItem value="all">Service not Availabel</MenuItem>
            <MenuItem value="all">Doctor are not Availabel</MenuItem>
            <MenuItem value="all">Slots are nbot free</MenuItem>
            <MenuItem value="all">Other</MenuItem>
          </Input>
          <Input
            name="description"
            label="Provide Addtional Notes"
            fullWidth
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              name="Submit"
              type="submit"
              variant="contained"
              className="modal-btn"
            />
            <Button name="Cancel" variant="outlined" onClick={handleClose} />
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default TransferRequest;
