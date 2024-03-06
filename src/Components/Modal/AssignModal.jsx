import { Box, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import Modal from "./Modal";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { assignModalSchema } from "../../ValidationSchema";

const AssignModal = ({ open, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      searchRegion: "",
      description: "",
      physician: "",
    },
    validationSchema: assignModalSchema,
    onSubmit: (values, onSubmitProps) => {
      console.log("submmitted", values);
      onSubmitProps.resetForm();
      handleClose();
    },
  });
  return (
    <Modal open={open} handleClose={handleClose} header="Assign Request">
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography variant="caption">
            To assign this request, searach and select another Physician
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
            helperText={
              formik.touched.searchRegion && formik.errors.searchRegion
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
            helperText={formik.touched.physician && formik.errors.physician}
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
            helperText={formik.touched.description && formik.errors.description}
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Submit" type="submit" variant="contained" />
            <Button name="Cancel" variant="outlined" onClick={handleClose} />
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default AssignModal;
