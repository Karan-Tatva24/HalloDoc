import React from "react";
import { Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import Modal from "./Modal";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { blockModalSchema } from "../../ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { blockCase } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/blockCaseAPI";
import { dashboardCount } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/dashboardCountAPI";
import { toast } from "react-toastify";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";

const ConfirmBlockModal = ({ open, handleClose }) => {
  const { patientFirstName, patientLastName, id } = useSelector(
    (state) => state.root.patientName,
  );
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      blockRequest: "",
    },
    validationSchema: blockModalSchema,
    onSubmit: (values, onSubmitProps) => {
      dispatch(apiPending());
      dispatch(
        blockCase({ id, reasonForCancellation: values.blockRequest }),
      ).then((response) => {
        if (response.type === "blockCase/fulfilled") {
          onSubmitProps.resetForm();
          dispatch(dashboardCount());
          dispatch(apiSuccess());
          toast.success(response.payload.message);
          handleClose();
        } else if (response.type === "blockCase/rejected") {
          dispatch(apiFails());
          toast.error(response.payload.data.validation.body.message);
        }
      });
    },
  });
  return (
    <Modal
      open={open}
      handleClose={() => {
        formik.resetForm();
        handleClose();
      }}
      header="Confirm Block"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography>
            Patient Name :
            <span style={{ color: "#01bce9" }}>
              {`${patientFirstName} ${patientLastName}`}
            </span>
          </Typography>
          <Input
            name="blockRequest"
            label="Provide Additional Notes"
            fullWidth
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.blockRequest}
            error={
              formik.touched.blockRequest && Boolean(formik.errors.blockRequest)
            }
            helperText={
              formik.touched.blockRequest && formik.errors.blockRequest
            }
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Confirm" variant="contained" type="submit" />
            <Button
              name="Cancel"
              variant="outlined"
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

export default ConfirmBlockModal;
