import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useNavigate } from "react-router-dom";
import "./createAccess.css";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/TextField/Input";
import {
  createAccess,
  getRolesByAccountType,
  updateRole,
} from "../../redux/halloAPIs/createAccessAPI";
import { AppRoutes } from "../../constants/routes";
import { toast } from "react-toastify";
import { clearViewRole } from "../../redux/halloSlices/adminSlices/editRoleAccessSlice";

const INITIAL_VALUES = {
  roleName: "",
  role: "All",
  permissionIds: [],
};

const CreateAccess = () => {
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rolesByAccount } = useSelector((state) => state.root.createAccess);
  const { viewRole } = useSelector((state) => state.editRoleAccess);
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
  });

  useEffect(() => {
    setInitialValues({
      roleName: viewRole?.Name || "",
      accountType: viewRole?.accountType || "All",
      permissionIds: viewRole?.permissions?.map((role) => role?.id) || [],
    });
  }, [dispatch, viewRole]);

  useEffect(() => {
    dispatch(getRolesByAccountType(formik.values.accountType));
  }, [dispatch, formik.values.accountType]);

  const handleChangeRoles = (id) => {
    const newRoles = formik.values.permissionIds.includes(id)
      ? formik.values.permissionIds.filter(
          (selectedRoleId) => selectedRoleId !== id,
        )
      : [...formik.values.permissionIds, id];
    formik.setFieldValue("permissionIds", newRoles);
  };

  const handleSave = () => {
    if (viewRole?.id) {
      dispatch(updateRole({ id: viewRole.id, data: formik.values })).then(
        (response) => {
          if (response.type === "updateRole/fulfilled") {
            toast.success(response.payload.message);
            dispatch(clearViewRole());
            navigate(AppRoutes.ACCOUNT_ACCESS);
          }
        },
      );
    } else {
      dispatch(createAccess(formik.values)).then((response) => {
        if (response.type === "createAccess/fulfilled") {
          toast.success(response.payload.message);
          dispatch(clearViewRole());
          navigate(AppRoutes.ACCOUNT_ACCESS);
        }
      });
    }
  };

  return (
    <>
      <Box className="main-create-access-container">
        <form>
          <Container maxWidth="lg" className="create-access-container-wrapper">
            <Box display="flex" justifyContent="space-between" mb="8px">
              <Box display="flex">
                <Typography variant="h5" gutterBottom>
                  <b>Create Access</b>
                </Typography>
              </Box>
              <Button
                name="back"
                variant="outlined"
                startIcon={<ArrowBackIosOutlinedIcon />}
                color="primary"
                onClick={() => {
                  dispatch(clearViewRole());
                  navigate(-1);
                }}
              />
            </Box>
            <Paper className="create-access-full-paper">
              <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
                <Grid item xs={12} md={6} lg={6}>
                  <Input
                    name="roleName"
                    label="Role Name"
                    fullWidth
                    className="form-input"
                    onChange={formik.handleChange}
                    value={formik.values.roleName}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.roleName && Boolean(formik.errors.roleName)
                    }
                    helperText={
                      formik.touched.roleName && formik.errors.roleName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Input
                    name="accountType"
                    label="Account Type"
                    select
                    fullWidth
                    className="form-input"
                    value={formik.values.accountType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.accountType &&
                      Boolean(formik.errors.accountType)
                    }
                    helperText={
                      formik.touched.accountType && formik.errors.accountType
                    }
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Physician">Physician</MenuItem>
                    <MenuItem value="User">Patient</MenuItem>
                  </Input>
                </Grid>
                <Grid item xs={12} md={12}>
                  {rolesByAccount?.map((role) => {
                    return (
                      <FormControlLabel
                        key={role?.id}
                        control={
                          <Checkbox
                            checked={formik.values.permissionIds.includes(
                              role?.id,
                            )}
                            onChange={() => handleChangeRoles(role?.id)}
                          />
                        }
                        label={role?.name}
                      />
                    );
                  })}
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                <Button name="Save" onClick={handleSave} />
                <Button
                  name="Cancel"
                  variant="outlined"
                  onClick={() => {
                    dispatch(clearViewRole());
                    navigate(AppRoutes.ACCOUNT_ACCESS);
                  }}
                />
              </Box>
            </Paper>
          </Container>
        </form>
      </Box>
    </>
  );
};

export default CreateAccess;
