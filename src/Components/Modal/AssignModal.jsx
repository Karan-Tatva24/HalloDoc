import { Box, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import Modal from "./Modal";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { assignModalSchema } from "../../ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { getPhysician } from "../../redux/halloAPIs/getRegionPhysicianAPI";

const AssignModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { regions } = useSelector((state) => state.getRegionPhysician);
  const { physicians } = useSelector((state) => state.getRegionPhysician);

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
            {regions.map((region) => {
              return (
                <MenuItem
                  key={region.id}
                  value={region.name}
                  onClick={() => dispatch(getPhysician(region.id))}
                >
                  {region.name}
                </MenuItem>
              );
            })}
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
            {physicians &&
              physicians.map((physician) => {
                return (
                  <MenuItem
                    key={physician.id}
                    value={`${physician.firstName} ${physician.lastName}`}
                  >
                    {`${physician.firstName} ${physician.lastName}`}
                  </MenuItem>
                );
              })}
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
