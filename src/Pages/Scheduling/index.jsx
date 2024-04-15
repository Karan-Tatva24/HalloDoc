import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import "./scheduling.css";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/TextField/Input";
import { AppRoutes } from "../../constants/routes";
import CreateShiftModal from "../../Components/Modal/CreateShiftModal";
import ViewShiftModal from "../../Components/Modal/ViewShiftModal";
import {
  viewShift,
  viewShiftByDate,
} from "../../redux/halloAPIs/adminAPIs/providerAPIs/viewShiftsAPI";

const Scheduling = () => {
  const navigate = useNavigate();
  const [selectRegion, setSelectRegion] = useState("all");
  const [modalName, setModalName] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { regions } = useSelector((state) => state.root.getRegionPhysician);
  const { viewShiftByDateData } = useSelector((state) => state.root.viewShift);

  useEffect(() => {
    dispatch(
      viewShiftByDate({
        date: "",
        week: "",
        month: "",
        startDate: "",
        endDate: "",
        regions: selectRegion,
      }),
    );
  }, [dispatch, selectRegion]);

  const handleChangeRegion = (e) => {
    setSelectRegion(e.target.value);
  };

  const handleOpen = (name) => {
    setModalName(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalName("");
  };

  const events = viewShiftByDateData?.map((shift) => ({
    id: shift?.id,
    title: `${shift?.id}`,
    start: `${shift?.shiftDate}T${shift?.startTime}`,
    end: `${shift?.shiftDate}T${shift?.endTime}`,
    resourceId: shift?.physician?.id,
    backgroundColor: shift?.isApproved ? "lightgreen" : "lightpink",
  }));

  const resources = viewShiftByDateData?.map((shift) => ({
    id: shift?.physician?.id,
    title: `${shift?.physician?.firstName} ${shift?.physician?.lastName}`,
  }));

  return (
    <>
      <Box className="main-scheduling-container">
        <Container maxWidth="lg" className="scheduling-container-wrapper">
          <Box display="flex" justifyContent="space-between" mb="8px">
            <Box display="flex">
              <Typography variant="h5" gutterBottom>
                <b>Scheduling</b>
              </Typography>
            </Box>
            <Button
              name="back"
              variant="outlined"
              startIcon={<ArrowBackIosOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Input
              className="search-text drop-list"
              select
              value={selectRegion}
              onChange={(e) => handleChangeRegion(e)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="all">All Regions</MenuItem>
              {regions?.map((region) => {
                return (
                  <MenuItem key={region?.id} value={region?.name}>
                    {region?.name}
                  </MenuItem>
                );
              })}
            </Input>
            <Box display="flex" gap={2}>
              <Button
                name="Provider on call"
                onClick={() => navigate(AppRoutes.PROVIDER_ON_CALL)}
              />
              <Button
                name="Shifts For Review"
                onClick={() => navigate(AppRoutes.REQUESTED_SHIFTS)}
              />
              <Button
                name="Add New Shift"
                onClick={() => handleOpen("create shift")}
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
            <Box className="indicators_scheduling pending" />
            Pending Shifts
            <Box className="indicators_scheduling approved" />
            Approved Shifts
          </Box>
          <FullCalendar
            plugins={[dayGridPlugin, resourceTimelinePlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "title prev next",
              center: "",
              right: "resourceTimelineDay resourceTimelineWeek dayGridMonth",
            }}
            events={events}
            resources={resources}
            eventContent={(eventInfo) => {
              return (
                <div
                  style={{
                    width: "100%",
                    backgroundColor: eventInfo.backgroundColor,
                    borderRadius: "0.3rem",
                    cursor: "pointer",
                    height: "auto",
                  }}
                  onClick={() => {
                    dispatch(viewShift(eventInfo.event.id));
                    handleOpen("view shift");
                  }}
                >
                  {eventInfo.timeText}
                </div>
              );
            }}
            droppable={false}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
          />
        </Container>
      </Box>
      <CreateShiftModal
        open={open && modalName === "create shift"}
        handleClose={handleClose}
      />
      <ViewShiftModal
        open={open && modalName === "view shift"}
        handleClose={handleClose}
      />
    </>
  );
};

export default Scheduling;
