import React from "react";
import Modal from "./Modal";
import { Box, MenuItem } from "@mui/material";
import { Input } from "../TextField/Input";
import { useDispatch, useSelector } from "react-redux";
import { getPhysician } from "../../redux/halloAPIs/getRegionPhysicianAPI";
import { useFormik } from "formik";
import { Button } from "../Button";

const ViewShiftModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { regions, physicians } = useSelector(
    (state) => state.root.getRegionPhysician,
  );
  const formik = useFormik({
    initialValues: {
      searchRegion: "",
      physician: "",
      shiftDate: "",
      startTime: "",
      endTime: "",
    },
    onSubmit: (values, onSubmitProps) => {
      onSubmitProps.resetForm();
      handleClose();
    },
  });
  return (
    <Modal open={open} handleClose={handleClose} header="View Shift">
      <form>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Input
            fullWidth
            label="Narrow Search By Region"
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
            {regions?.map((region) => {
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
              physicians?.map((physician) => {
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
            label="Shift Date"
            type="date"
            name="shiftDate"
            fullWidth
            value={formik.values.shiftDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.shiftDate && Boolean(formik.errors.shiftDate)}
            helperText={formik.touched.shiftDate && formik.errors.shiftDate}
          />
          <Box display="flex" justifyContent="space-between" gap={1.5}>
            <Input
              label="Start"
              name="startTime"
              type="time"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startTime}
              error={
                formik.touched.startTime && Boolean(formik.errors.startTime)
              }
              helperText={formik.touched.startTime && formik.errors.startTime}
            />
            <Input
              label="End"
              name="endTime"
              type="time"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endTime}
              error={formik.touched.endTime && Boolean(formik.errors.endTime)}
              helperText={formik.touched.endTime && formik.errors.endTime}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={1.5}
          >
            <Button name="Return" />
            <Button name="Edit" />
            <Button name="Delete" color="error" />
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default ViewShiftModal;
