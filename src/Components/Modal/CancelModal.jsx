import React from "react";
import { Box, MenuItem, Typography } from "@mui/material";
import { useFormik } from "formik";
import Modal from "./Modal";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { cancelModalSchema as cancelModalSchema } from "../../ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { cancelCase } from "../../redux/halloAPIs/cancelCaseAPI";
import { dashboardCount } from "../../redux/halloAPIs/dashboardCountAPI";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routes";

const CancelModal = ({ open, handleClose }) => {
  const { patientFirstName, patientLastName, id } = useSelector(
    (state) => state.root.patientName,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      additionalNotes: "",
      cancelReason: "",
    },
    validationSchema: cancelModalSchema,
    onSubmit: (values, onSubmitProps) => {
      dispatch(
        cancelCase({
          id,
          reasonForCancellation: values.cancelReason,
          adminNotes: values.additionalNotes,
        }),
      );
      dispatch(dashboardCount());
      onSubmitProps.resetForm();
      handleClose();
      navigate(AppRoutes.DASHBOARD);
    },
  });

  return (
    <Modal open={open} handleClose={handleClose} header="Confirm Cancellation">
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography>
            Patient Name :
            <span style={{ color: "aqua" }}>
              {patientFirstName} {patientLastName}
            </span>
          </Typography>
          <Input
            fullWidth
            label="Reason for Cancellation"
            select
            name="cancelReason"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cancelReason}
            error={
              formik.touched.cancelReason && Boolean(formik.errors.cancelReason)
            }
            helperText={
              formik.touched.cancelReason && formik.errors.cancelReason
            }
          >
            <MenuItem value="Service not Available">
              Service not Available
            </MenuItem>
            <MenuItem value="Doctor are not Available">
              Doctor are not Available
            </MenuItem>
            <MenuItem value="Slots are not free">Slots are not free</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Input>
          <Input
            name="additionalNotes"
            label="Provide Additional Notes"
            fullWidth
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.additionalNotes}
            error={
              formik.touched.additionalNotes &&
              Boolean(formik.errors.additionalNotes)
            }
            helperText={
              formik.touched.additionalNotes && formik.errors.additionalNotes
            }
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Conform" variant="contained" type="submit" />
            <Button name="Cancel" variant="outlined" onClick={handleClose} />
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default CancelModal;
