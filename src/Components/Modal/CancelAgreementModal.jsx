import React from "react";
import Modal from "./Modal";
import { useFormik } from "formik";
import { Box, Typography } from "@mui/material";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { useDispatch } from "react-redux";
import { cancelAgreement } from "../../redux/halloAPIs/patientAPIs/agreementAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";

const CancelAgreementModal = ({ id, open, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { reasonForCancellation: "" },
    onSubmit: (values) => {
      dispatch(apiPending());
      dispatch(
        cancelAgreement({
          id,
          reasonForCancellation: values.reasonForCancellation,
        }),
      ).then((res) => {
        if (res.type === "cancelAgreement/fulfilled") {
          toast.success(res.payload.message);
          dispatch(apiSuccess());
          handleClose();
          navigate(-1);
        } else if (res.type === "cancelAgreement/rejected") {
          toast.error(res.payload?.data?.validation?.message);
          dispatch(apiFails());
          toast.error(res.payload?.data?.message);
        }
      });
    },
  });
  return (
    <Modal open={open} handleClose={handleClose} header="Cancel Confirmation">
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography variant="h6">Test, test</Typography>
          <Input
            name="reasonForCancellation"
            label="Provide Additional Notes"
            fullWidth
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.reasonForCancellation}
            error={
              formik.touched.reasonForCancellation &&
              Boolean(formik.errors.reasonForCancellation)
            }
            helperText={
              formik.touched.reasonForCancellation &&
              formik.errors.reasonForCancellation
            }
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Confirm" variant="contained" type="submit" />
            <Button
              name="Cancel"
              variant="outlined"
              type="reset"
              onClick={() => {
                formik.resetForm();
                handleClose();
              }}
            />
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default CancelAgreementModal;
