import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Box, MenuItem } from "@mui/material";
import { Input } from "../TextField/Input";
import { useDispatch, useSelector } from "react-redux";
import { getPhysician } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/getRegionPhysicianAPI";
import { useFormik } from "formik";
import { Button } from "../Button";
import { deleteShift } from "../../redux/halloAPIs/adminAPIs/providerAPIs/schedulingAPI";
import { toast } from "react-toastify";
import {
  editShift,
  toggleApproved,
  viewShiftByDate,
} from "../../redux/halloAPIs/adminAPIs/providerAPIs/viewShiftsAPI";
import { viewShiftModalSchema } from "../../ValidationSchema";
import { mySchedule } from "../../redux/halloAPIs/providerAPIs/scheduleAPIs/myScheduleAPI";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const INITIAL_VALUES = {
  searchRegion: "",
  physician: "",
  shiftDate: null,
  startTime: "",
  endTime: "",
};

const ViewShiftModal = ({ open, handleClose }) => {
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();
  const { regions } = useSelector((state) => state.root.getRegionPhysician);
  const { viewShiftData } = useSelector((state) => state.root.viewShift);
  const { accountType } = useSelector((state) => state.root.loggedUserData);

  const formik = useFormik({
    initialValues,
    onSubmit: (values, onSubmitProps) => {
      onSubmitProps.resetForm();
      handleClose();
    },
    validationSchema: viewShiftModalSchema,
    enableReinitialize: true,
  });

  const handleSave = () => {
    dispatch(apiPending());
    dispatch(
      editShift({
        id: viewShiftData.id,
        shiftDate: formik.values.shiftDate.format("MM-DD-YYYY"),
        startTime: formik.values.startTime,
        endTime: formik.values.endTime,
      }),
    ).then((response) => {
      if (response.type === "editShift/fulfilled") {
        toast.success(response.payload.message);
        setIsDisabled(true);
        handleClose();
        accountType === "Admin"
          ? dispatch(viewShiftByDate({ regions: "all" }))
          : dispatch(mySchedule({}));
        dispatch(apiSuccess());
      } else if (response.type === "editShift/rejected") dispatch(apiFails());
    });
  };

  useEffect(() => {
    setInitialValues({
      searchRegion: viewShiftData?.region,
      physician: `${viewShiftData?.physician?.firstName} ${viewShiftData?.physician?.lastName}`,
      shiftDate: dayjs(viewShiftData?.shiftDate),
      startTime: viewShiftData?.startTime,
      endTime: viewShiftData?.endTime,
    });
  }, [viewShiftData]);

  const checkShift = (shiftDate) => {
    const today = new Date();
    return shiftDate < today;
  };

  return (
    <Modal open={open} handleClose={handleClose} header="View Shift">
      <form>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Input
            fullWidth
            label="Narrow Search By Region"
            select
            disabled
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
              disabled
              name="physician"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.physician}
              error={
                formik.touched.physician && Boolean(formik.errors.physician)
              }
              helperText={formik.touched.physician && formik.errors.physician}
            />
          ) : null}
          <DatePicker
            name="shiftDate"
            label="Shift Date"
            fullWidth
            inputFormat="DD/MM/YYYY"
            disabled={isDisabled}
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
              label="Start"
              name="startTime"
              type="time"
              fullWidth
              disabled={isDisabled}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startTime}
              error={
                formik.touched.startTime && Boolean(formik.errors.startTime)
              }
              helperText={formik.touched.startTime && formik.errors.startTime}
            />
            <Input
              label="End"
              name="endTime"
              type="time"
              fullWidth
              disabled={isDisabled}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endTime}
              error={formik.touched.endTime && Boolean(formik.errors.endTime)}
              helperText={formik.touched.endTime && formik.errors.endTime}
            />
          </Box>
          {!checkShift(formik.values.shiftDate) ? (
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap={1.5}
            >
              <Button
                name="Return"
                onClick={() => {
                  dispatch(toggleApproved(viewShiftData?.id)).then(
                    (response) => {
                      if (response.type === "toggleApproved/fulfilled") {
                        toast.success(response.payload.message);
                        setIsDisabled(true);
                        handleClose();
                        accountType === "Admin"
                          ? dispatch(viewShiftByDate({ regions: "all" }))
                          : dispatch(mySchedule({}));
                      }
                    },
                  );
                }}
              />
              <Button
                name={isDisabled ? "Edit" : "Save"}
                onClick={
                  isDisabled ? () => setIsDisabled(false) : () => handleSave()
                }
              />
              <Button
                name="Delete"
                color="error"
                onClick={() => {
                  dispatch(apiPending());
                  dispatch(deleteShift({ shiftIds: [viewShiftData?.id] })).then(
                    (response) => {
                      if (response.type === "deleteShift/fulfilled") {
                        toast.success(response.payload.message);
                        setIsDisabled(true);
                        handleClose();
                        accountType === "Admin"
                          ? dispatch(viewShiftByDate({ regions: "all" }))
                          : dispatch(mySchedule({}));
                        dispatch(apiSuccess());
                      } else if (response.type === "deleteShift/rejected")
                        dispatch(apiFails());
                    },
                  );
                }}
              />
            </Box>
          ) : null}
        </Box>
      </form>
    </Modal>
  );
};

export default ViewShiftModal;
