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
import { getPhysician } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/getRegionPhysicianAPI";
import { Button } from "../Button";
import {
  addNewShift,
  viewShiftByDate,
} from "../../redux/halloAPIs/adminAPIs/providerAPIs/viewShiftsAPI";
import { toast } from "react-toastify";
import { createShiftModalSchema } from "../../ValidationSchema";
import { mySchedule } from "../../redux/halloAPIs/providerAPIs/scheduleAPIs/myScheduleAPI";
import { clearPhysician } from "../../redux/halloSlices/adminSlices/getRegionPhysicianSlice";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const CreateShiftModal = ({ open, handleClose }) => {
  const [checked, setChecked] = React.useState(false);
  const dispatch = useDispatch();

  const { regions, physicians } = useSelector(
    (state) => state.root.getRegionPhysician,
  );
  const { accountType } = useSelector((state) => state.root.loggedUserData);

  const today = dayjs().startOf("day");

  const getMinTime = () => {
    const today = dayjs().startOf("day");
    const selectedDate = dayjs(formik.values.shiftDate);
    return selectedDate.isSame(today, "day") ? dayjs() : null;
  };

  const handleTimeChange = (event) => {
    const minTime = getMinTime();
    const selectedTime = dayjs(event.target.value, "HH:mm");

    if (minTime && selectedTime.isBefore(minTime, "minute")) {
      formik.setFieldError(
        event.target.name,
        "Cannot select a past time for today.",
      );
      formik.setFieldValue(event.target.name, "");
    } else {
      formik.setFieldValue(event.target.name, event.target.value);
      formik.setFieldError(event.target.name, "");
    }
  };

  const formik = useFormik({
    initialValues: {
      isAdmin: accountType === "Admin",
      searchRegion: "",
      physician: "",
      shiftDate: null,
      startTime: "",
      endTime: "",
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      repeatUpto: "",
    },
    validationSchema: createShiftModalSchema,
    onSubmit: (values) => {
      dispatch(apiPending());
      dispatch(
        addNewShift({
          region: values.searchRegion,
          physicianId: values.physician,
          shiftDate: values.shiftDate.format("MM-DD-YYYY"),
          startTime: values.startTime,
          endTime: values.endTime,
          isRepeat: checked,
          sunday: values.sunday,
          monday: values.monday,
          tuesday: values.tuesday,
          wednesday: values.wednesday,
          thursday: values.thursday,
          friday: values.friday,
          saturday: values.saturday,
          repeatUpto: values.repeatUpto,
          accountType: accountType,
        }),
      ).then((response) => {
        if (response.type === "addNewShift/fulfilled") {
          toast.success(response.payload.message);
          formik.resetForm();
          dispatch(clearPhysician());
          accountType === "Admin"
            ? dispatch(viewShiftByDate({ regions: "all" }))
            : dispatch(mySchedule({}));
          setChecked(false);
          dispatch(apiSuccess());
          handleClose();
        } else if (response.type === "addNewShift/rejected")
          dispatch(apiFails());
      });
    },
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    formik.setFieldValue(name, checked);
  };

  return (
    <Modal
      open={open}
      handleClose={() => {
        formik.resetForm();
        dispatch(clearPhysician());
        setChecked(false);
        handleClose();
      }}
      header="Create Shift"
    >
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
                  key={region?.id}
                  value={region?.name}
                  onClick={() => dispatch(getPhysician(region?.id))}
                >
                  {region?.name}
                </MenuItem>
              );
            })}
          </Input>
          {accountType === "Admin" ? (
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
                    <MenuItem key={physician?.id} value={physician?.id}>
                      {`${physician?.firstName} ${physician?.lastName}`}
                    </MenuItem>
                  );
                })}
            </Input>
          ) : null}
          <DatePicker
            name="shiftDate"
            label="Shift Date"
            fullWidth
            inputFormat="DD/MM/YYYY"
            minDate={today}
            value={
              formik.values.shiftDate ? dayjs(formik.values.shiftDate) : null
            }
            onChange={(newValue) => {
              const formattedDate = newValue ? newValue : null;
              formik.setFieldValue("shiftDate", formattedDate);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.shiftDate && Boolean(formik.errors.shiftDate)}
            helperText={formik.touched.shiftDate && formik.errors.shiftDate}
          />
          <Box display="flex" justifyContent="space-between" gap={1.5}>
            <Input
              name="startTime"
              label="Start"
              type="time"
              fullWidth
              value={formik.values.startTime}
              onChange={handleTimeChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.startTime && Boolean(formik.errors.startTime)
              }
              helperText={formik.touched.startTime && formik.errors.startTime}
              InputProps={{
                inputProps: {
                  min: getMinTime() ? getMinTime().format("HH:mm") : "",
                },
              }}
            />
            <Input
              name="endTime"
              label="End"
              type="time"
              fullWidth
              value={formik.values.endTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.endTime && Boolean(formik.errors.endTime)}
              helperText={formik.touched.endTime && formik.errors.endTime}
            />
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
          {checked ? (
            <>
              <Grid item xs={12} md={6}>
                <Typography>
                  <b>Repeat Days</b>
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="sunday"
                      disabled={!checked}
                      checked={formik.values.sunday}
                      onChange={handleCheckboxChange}
                      size="medium"
                    />
                  }
                  label="Every Sunday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="monday"
                      disabled={!checked}
                      checked={formik.values.monday}
                      onChange={handleCheckboxChange}
                      size="medium"
                    />
                  }
                  label="Every Monday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="tuesday"
                      disabled={!checked}
                      checked={formik.values.tuesday}
                      onChange={handleCheckboxChange}
                      size="medium"
                    />
                  }
                  label="Every Tuesday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="wednesday"
                      disabled={!checked}
                      size="medium"
                      checked={formik.values.wednesday}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Every Wednesday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="thursday"
                      disabled={!checked}
                      size="medium"
                      checked={formik.values.thursday}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Every thursday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="friday"
                      disabled={!checked}
                      size="medium"
                      checked={formik.values.friday}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Every Friday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="saturday"
                      disabled={!checked}
                      size="medium"
                      checked={formik.values.saturday}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Every Saturday"
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Input
                  name="repeatUpto"
                  label="Repeat End"
                  fullWidth
                  disabled={!checked}
                  select
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.repeatUpto}
                  error={
                    formik.touched.repeatUpto &&
                    Boolean(formik.errors.repeatUpto)
                  }
                  helperText={
                    formik.touched.repeatUpto && formik.errors.repeatUpto
                  }
                >
                  <MenuItem value="2">2-times</MenuItem>
                  <MenuItem value="3">3-times</MenuItem>
                  <MenuItem value="4">4-times</MenuItem>
                </Input>
              </Grid>
            </>
          ) : null}
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Save" type="submit" variant="contained" />
            <Button
              name="Cancel"
              variant="outlined"
              onClick={() => {
                formik.resetForm();
                dispatch(clearPhysician());
                setChecked(false);
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
