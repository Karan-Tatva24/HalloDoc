import { Box, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import Modal from "./Modal";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { transferModalSchema } from "../../ValidationSchema";
import { transferRequest } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/transferRequestAPI";
import { dashboardCount } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/dashboardCountAPI";
import { getPhysician } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/getRegionPhysicianAPI";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { providerTransferRequest } from "../../redux/halloAPIs/providerAPIs/dashboardAPIs/transferRequestAPI";
import { getProviderDashboardCount } from "../../redux/halloAPIs/providerAPIs/dashboardAPIs/getProviderDashboardCount";

const TransferRequest = ({ isAdmin, open, handleClose }) => {
  const dispatch = useDispatch();
  const { regions, physicians } = useSelector(
    (state) => state.root.getRegionPhysician,
  );
  const { id } = useSelector((state) => state.root.patientName);
  const { accountType } = useSelector((state) => state?.root.loggedUserData);
  const [phyId, setPhyId] = useState(-1);

  const formik = useFormik({
    initialValues: {
      isAdmin,
      searchRegion: "",
      description: "",
      physician: "",
    },
    validationSchema: transferModalSchema,
    onSubmit: (values, onSubmitProps) => {
      if (accountType === "Admin") {
        dispatch(
          transferRequest({
            id: id,
            physicianId: phyId,
            transferNote: values.description,
          }),
        ).then((response) => {
          if (response.type === "transferRequest/fulfilled") {
            toast.success(response.payload.message);
            onSubmitProps.resetForm();
            dispatch(dashboardCount());
            handleClose();
          } else if (response.type === "transferRequest/rejected") {
            toast.error(response.payload.data.validation.body.message);
          }
        });
      } else if (accountType === "Physician") {
        dispatch(
          providerTransferRequest({ id: id, description: values.description }),
        ).then((response) => {
          if (response.type === "providerTransferRequest/fulfilled") {
            toast.success(response?.payload.message);
            dispatch(getProviderDashboardCount());
            handleClose();
          }
        });
      }
    },
  });

  return (
    <Modal open={open} handleClose={handleClose} header="Transfer Request">
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography variant="caption">
            {accountType === "Admin"
              ? "To transfer this request, search and select another Physician"
              : "This request will be transferred to admin"}
          </Typography>
          {accountType === "Admin" ? (
            <>
              <Input
                fullWidth
                label="Narrow Search By Region"
                select
                name="searchRegion"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.searchRegion}
                error={
                  formik.touched.searchRegion &&
                  Boolean(formik.errors.searchRegion)
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
                error={
                  formik.touched.physician && Boolean(formik.errors.physician)
                }
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
            </>
          ) : null}
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
                handleClose();
              }}
            />
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default TransferRequest;
