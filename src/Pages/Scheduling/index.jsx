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
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";

const formatDateTime = (date, time) => {
  return `${date}T${time}:00`;
};

const Scheduling = () => {
  const [events, setEvents] = useState([]);
  const [selectRegion, setSelectRegion] = useState("all");
  const [modalName, setModalName] = useState("");
  const [open, setOpen] = useState(false);

  const { regions } = useSelector((state) => state.root.getRegionPhysician);
  const { viewShiftByDateData } = useSelector((state) => state.root.viewShift);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(apiPending());
    dispatch(
      viewShiftByDate({
        regions: selectRegion,
      }),
    ).then((response) => {
      if (response.type === "viewShiftByDate/fulfilled") dispatch(apiSuccess());
      else if (response.type === "viewShiftByDate/rejected")
        dispatch(apiFails());
    });
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

  useEffect(() => {
    if (viewShiftByDateData) {
      const processedEvents = [];

      viewShiftByDateData.forEach((shift) => {
        const event = {
          id: shift.id,
          title: `${shift?.physician?.firstName} ${shift?.physician?.lastName}`,
          start: formatDateTime(shift.shiftDate, shift.startTime),
          end: formatDateTime(shift.shiftDate, shift.endTime),
          resourceId: shift?.physician?.id,
          backgroundColor: shift.isApproved ? "#2f6b2f" : "#fca2b0",
        };
        processedEvents.push(event);
      });

      setEvents(processedEvents);
    }
  }, [viewShiftByDateData]);

  const resources = viewShiftByDateData?.map((shift) => ({
    id: shift?.physician?.id,
    title: `${shift?.physician?.firstName} ${shift?.physician?.lastName}`,
  }));

  return (
    <>
      <Box className="main-scheduling-container">
        <Container maxWidth="xl" className="scheduling-container-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb="8px"
            flexWrap="wrap"
          >
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
          <Box
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={2}
          >
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
            <Box display="flex" gap={2} flexWrap="wrap">
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
            plugins={[dayGridPlugin, interactionPlugin, resourceTimelinePlugin]}
            initialView="dayGridMonth"
            views={{
              resourceTimelineDay: {
                type: "resourceTimeline",
                duration: { days: 1 },
                buttonText: "Day",
              },
              resourceTimelineWeek: {
                type: "resourceTimeline",
                duration: { weeks: 1 },
                buttonText: "Week",
              },
              dayGridMonth: {
                type: "dayGrid",
                duration: { months: 1 },
                buttonText: "Month",
              },
            }}
            headerToolbar={{
              left: "title prev customIcon next",
              center: "",
              right: "resourceTimelineDay resourceTimelineWeek dayGridMonth",
            }}
            customButtons={{
              customIcon: {
                text: " ",
                icon: "gg-calendar-dates",
              },
            }}
            resourceAreaHeaderContent="Physicians"
            events={events}
            resources={resources}
            eventClick={(eventInfo) => {
              dispatch(viewShift(eventInfo.event.id));
              handleOpen("view shift");
            }}
            eventContent={(eventInfo) => {
              return {
                html: `
                  <Box class="custom-event" style="background-color: ${eventInfo.event.backgroundColor}; color: white;">
                    <Box>${eventInfo.timeText}</Box>
                    <Box>${eventInfo.event.title}</Box>
                  </Box>
                `,
              };
            }}
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
