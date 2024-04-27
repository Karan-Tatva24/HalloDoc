import React from "react";
import * as Yup from "yup";
import Modal from "./Modal";
import { useFormik } from "formik";
import { Box, Typography } from "@mui/material";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { useDispatch } from "react-redux";
import { requestToAdmin } from "../../redux/halloAPIs/providerAPIs/profileAPIs/requestToAdminAPI";
import { toast } from "react-toastify";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";

const validationSchema = Yup.object({
  message: Yup.string().required("Please provide message for Administrator"),
});

const RequestToAdminModal = ({ id, open, handleClose }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(apiPending());
      dispatch(requestToAdmin({ id, message: values.message })).then(
        (response) => {
          if (response.type === "requestToAdmin/fulfilled") {
            toast.success(response?.payload?.message);
            formik.resetForm();
            dispatch(apiSuccess());
            handleClose();
          } else if (response.type === "requestToAdmin/rejected")
            dispatch(apiFails());
        },
      );
    },
  });

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      header="Request To Administrator"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography>Need to send message to edit</Typography>
          <Input
            name="message"
            label="Message"
            multiline
            rows={3}
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Save" type="submit" variant="contained" />
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

export default RequestToAdminModal;
