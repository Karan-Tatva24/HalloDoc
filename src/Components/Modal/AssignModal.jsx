import { Box, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import Modal from "./Modal";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { assignModalSchema } from "../../ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { getPhysician } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/getRegionPhysicianAPI";
import { assignCase } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/assignCaseAPI";
import { dashboardCount } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/dashboardCountAPI";
import { toast } from "react-toastify";
import { clearPhysician } from "../../redux/halloSlices/adminSlices/getRegionPhysicianSlice";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";

const AssignModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { regions, physicians } = useSelector(
    (state) => state.root.getRegionPhysician,
  );
  const { id } = useSelector((state) => state.root.patientName);
  const [phyId, setPhyId] = useState(-1);

  const formik = useFormik({
    initialValues: {
      searchRegion: "",
      description: "",
      physician: "",
    },
    validationSchema: assignModalSchema,
    onSubmit: (values, onSubmitProps) => {
      dispatch(apiPending());
      dispatch(
        assignCase({
          id: id,
          physicianId: phyId,
          transferNote: values.description,
        }),
      ).then((response) => {
        if (response.type === "assignCase/fulfilled") {
          toast.success(response?.payload?.message);
          onSubmitProps.resetForm();
          dispatch(clearPhysician());
          dispatch(dashboardCount());
          dispatch(apiSuccess());
        } else if (response.type === "assignCase/rejected") {
          dispatch(apiFails());
          toast.error(response.payload?.data?.validation?.body?.message);
        }
        handleClose();
      });
    },
  });
  return (
    <Modal
      open={open}
      handleClose={() => {
        formik.resetForm();
        dispatch(clearPhysician());
        handleClose();
      }}
      header="Assign Request"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography variant="caption">
            To assign this request, search and select another Physician
          </Typography>
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
                  key={region?.id}
                  value={region?.name}
                  onClick={() => dispatch(getPhysician(region?.id))}
                >
                  {region?.name}
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
                    key={physician?.id}
                    value={`${physician?.firstName} ${physician?.lastName}`}
                    onClick={() => setPhyId(physician?.id)}
                  >
                    {`${physician?.firstName} ${physician?.lastName}`}
                  </MenuItem>
                );
              })}
          </Input>
          <Input
            name="description"
            label="Provide Additional Notes"
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
            <Button
              name="Cancel"
              variant="outlined"
              onClick={() => {
                formik.resetForm();
                dispatch(clearPhysician());
                handleClose();
              }}
            />
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default AssignModal;
