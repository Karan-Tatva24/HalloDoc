import React from "react";
import Modal from "./Modal";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { useFormik } from "formik";
import { contactProviderSchema } from "../../ValidationSchema";
import { useDispatch } from "react-redux";
import { contactProvider } from "../../redux/halloAPIs/adminAPIs/providerAPIs/providerInfoAPI";
import { toast } from "react-toastify";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";

const ContactProviderModal = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      message: "",
      contactMethod: "email",
    },
    onSubmit: (values, onSubmitProps) => {
      dispatch(apiPending());
      dispatch(
        contactProvider({
          id,
          contactMethod: values?.contactMethod,
          messageBody: values?.message,
        }),
      ).then((response) => {
        if (response.type === "contactProvider/fulfilled") {
          onSubmitProps.resetForm();
          dispatch(apiSuccess());
          handleClose();
          toast.success(response.payload.message);
        } else if (response.type === "contactProvider/rejected") {
          dispatch(apiFails());
          toast.error(response.payload.data.validation.body.message);
        }
      });
    },
    validationSchema: contactProviderSchema,
  });
  return (
    <Modal
      open={open}
      handleClose={() => {
        formik.resetForm();
        handleClose();
      }}
      header="Contact Your Provider"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Choose communication to send message
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={formik.values.contactMethod}
              name="contactMethod"
              value={formik.values.contactMethod}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="sms" control={<Radio />} label="SMS" />
              <FormControlLabel
                value="email"
                control={<Radio />}
                label="Email"
              />
              <FormControlLabel value="both" control={<Radio />} label="Both" />
            </RadioGroup>
          </FormControl>
          <Input
            name="message"
            label="Message"
            fullWidth
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Send" type="submit" variant="contained" />
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

export default ContactProviderModal;
