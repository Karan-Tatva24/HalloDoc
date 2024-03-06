import React from "react";
import { Box, MenuItem, Typography } from "@mui/material";
import { useFormik } from "formik";
import Modal from "./Modal";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { cancleModalSchema } from "../../ValidationSchema";

const CancelModal = ({ open, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      additionalnotes: "",
      canelReason: "",
    },
    validationSchema: cancleModalSchema,
    onSubmit: (values, onSubmitProps) => {
      console.log("submmitted", values);
      onSubmitProps.resetForm();
      handleClose();
    },
  });
  return (
    <Modal open={open} handleClose={handleClose} header="Confirm Cancellation">
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography>
            Patient Name :<span style={{ color: "aqua" }}>test test</span>
          </Typography>
          <Input
            fullWidth
            label="Reason for Cancellation"
            select
            name="canelReason"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.canelReason}
            error={
              formik.touched.canelReason && Boolean(formik.errors.canelReason)
            }
            helperText={formik.touched.canelReason && formik.errors.canelReason}
          >
            <MenuItem value="Service not Availabel">
              Service not Availabel
            </MenuItem>
            <MenuItem value="Doctor are not Availabel">
              Doctor are not Availabel
            </MenuItem>
            <MenuItem value="Slots are nbot free">Slots are nbot free</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Input>
          <Input
            name="additionalnotes"
            label="Provide Addtional Notes"
            fullWidth
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.additionalnotes}
            error={
              formik.touched.additionalnotes &&
              Boolean(formik.errors.additionalnotes)
            }
            helperText={
              formik.touched.additionalnotes && formik.errors.additionalnotes
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
