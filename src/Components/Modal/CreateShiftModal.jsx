import React from "react";
import Modal from "./Modal";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Switch,
  Typography,
} from "@mui/material";
import { Input } from "../TextField/Input";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { getPhysician } from "../../redux/halloAPIs/getRegionPhysicianAPI";
import { Button } from "../Button";

const CreateShiftModal = ({ open, handleClose }) => {
  const [checked, setChecked] = React.useState(false);
  const dispatch = useDispatch();
  const { regions, physicians } = useSelector(
    (state) => state.root.getRegionPhysician,
  );
  const formik = useFormik({
    initialValues: {
      searchRegion: "",
      physician: "",
      shiftDate: "",
    },
  });

  return (
    <Modal open={open} handleClose={handleClose} header="Create Shift">
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
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
                  key={region.id}
                  value={region.name}
                  onClick={() => dispatch(getPhysician(region.id))}
                >
                  {region.name}
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
                    key={physician.id}
                    value={`${physician.firstName} ${physician.lastName}`}
                  >
                    {`${physician.firstName} ${physician.lastName}`}
                  </MenuItem>
                );
              })}
          </Input>
          <Input
            label="Shift Date"
            type="date"
            name="shiftDate"
            fullWidth
            value={formik.values.shiftDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.shiftDate && Boolean(formik.errors.shiftDate)}
            helperText={formik.touched.shiftDate && formik.errors.shiftDate}
          />
          <Box display="flex" justifyContent="space-between" gap={1.5}>
            <Input label="Start" type="time" fullWidth />
            <Input label="End" type="time" fullWidth />
          </Box>
          <Box display="flex">
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={(event) => {
                    setChecked(event.target.checked);
                  }}
                />
              }
              label="Repeat"
              labelPlacement="top"
            />
          </Box>
          <Grid item xs={12} md={6}>
            <Typography>
              <b>Repeat Days</b>
            </Typography>
            <FormControlLabel
              control={<Checkbox disabled={!checked} size="medium" />}
              label="Every Sunday"
            />
            <FormControlLabel
              control={<Checkbox disabled={!checked} size="medium" />}
              label="Every Monday"
            />
            <FormControlLabel
              control={<Checkbox disabled={!checked} size="medium" />}
              label="Every Tuesday"
            />
            <FormControlLabel
              control={<Checkbox disabled={!checked} size="medium" />}
              label="Every Wednesday"
            />
            <FormControlLabel
              control={<Checkbox disabled={!checked} size="medium" />}
              label="Every thursday"
            />
            <FormControlLabel
              control={<Checkbox disabled={!checked} size="medium" />}
              label="Every Friday"
            />
            <FormControlLabel
              control={<Checkbox disabled={!checked} size="medium" />}
              label="Every Saturday"
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Input
              label="Repeat End"
              fullWidth
              disabled={!checked}
              select
              // name="dob"
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // value={formik.values.dob}
              // error={formik.touched.dob && Boolean(formik.errors.dob)}
              // helperText={formik.touched.dob && formik.errors.dob}
            >
              <MenuItem>2-times</MenuItem>
              <MenuItem>1-times</MenuItem>
              <MenuItem>0-times</MenuItem>
            </Input>
          </Grid>
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

export default CreateShiftModal;
