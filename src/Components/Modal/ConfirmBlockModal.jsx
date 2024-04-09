import React from "react";
import { Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import BasicModal from "./Modal";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { blockModalSchema } from "../../ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { blockCase } from "../../redux/halloAPIs/blockCaseAPI";
import { dashboardCount } from "../../redux/halloAPIs/dashboardCountAPI";
import { toast } from "react-toastify";

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
      dispatch(
        blockCase({ id, reasonForCancellation: values.blockRequest }),
      ).then((response) => {
        if (response.type === "blockCase/fulfilled") {
          toast.success(response.payload.message);
          onSubmitProps.resetForm();
          dispatch(dashboardCount());
          handleClose();
        } else if (response.type === "blockCase/rejected") {
          toast.error(response.payload.data.validation.body.message);
        }
      });
    },
  });
  return (
    <BasicModal open={open} handleClose={handleClose} header="Confirm Block">
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography>
            Patient Name :
            <span style={{ color: "aqua" }}>
              {patientFirstName}
              {patientLastName}
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
            <Button name="Conform" variant="contained" type="submit" />
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
    </BasicModal>
  );
};

export default ConfirmBlockModal;
