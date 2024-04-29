import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { Button } from "../../Components/Button";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./mySchedule.css";
import CreateShiftModal from "../../Components/Modal/CreateShiftModal";
import ViewShiftModal from "../../Components/Modal/ViewShiftModal";
import { viewShift } from "../../redux/halloAPIs/adminAPIs/providerAPIs/viewShiftsAPI";
import { useDispatch, useSelector } from "react-redux";
import { mySchedule } from "../../redux/halloAPIs/providerAPIs/scheduleAPIs/myScheduleAPI";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const formatDateTime = (date, time) => {
  return `${date}T${time}:00`;
};

const MySchedule = () => {
  const [events, setEvents] = useState([]);
  const [modalName, setModalName] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { myScheduleData } = useSelector((state) => state.root.mySchedule);

  useEffect(() => {
    dispatch(apiPending());
    dispatch(mySchedule({})).then((response) => {
      if (response.type === "mySchedule/fulfilled") dispatch(apiSuccess());
      else if (response.type === "mySchedule/rejected") dispatch(apiFails());
    });
  }, [dispatch]);

  const handleOpen = (name) => {
    setModalName(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalName("");
  };

  useEffect(() => {
    if (myScheduleData) {
      const processedEvents = [];

      myScheduleData.forEach((shift) => {
        const event = {
          id: shift.id,
          title: `${shift?.physician?.firstName} ${shift?.physician?.lastName}`,
          start: formatDateTime(shift.shiftDate, shift.startTime),
          end: formatDateTime(shift.shiftDate, shift.endTime),
          backgroundColor: shift.isApproved ? "lightgreen" : "lightpink",
        };
        processedEvents.push(event);

        if (shift.isRepeat) {
          const daysOfWeek = [
            "sunday",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
          ];
          const repeatCount = shift.repeatUpto || 1;

          for (let i = 1; i <= repeatCount; i++) {
            daysOfWeek.forEach((day, index) => {
              if (shift[day]) {
                const date = addDays(
                  new Date(shift.shiftDate),
                  i * 7 + index - new Date(shift.shiftDate).getDay(),
                );
                const repeatedEvent = {
                  ...event,
                  id: `${shift.id}-repeat-${i}-${day}`,
                  title: `${shift?.physician?.firstName} ${shift?.physician?.lastName} (Repeated)`,
                  start: formatDateTime(
                    date.toISOString().split("T")[0],
                    shift.startTime,
                  ),
                  end: formatDateTime(
                    date.toISOString().split("T")[0],
                    shift.endTime,
                  ),
                  backgroundColor: shift.isApproved
                    ? "lightgreen"
                    : "lightpink",
                };
                processedEvents.push(repeatedEvent);
              }
            });
          }
        }
      });

      setEvents(processedEvents);
    }
  }, [myScheduleData]);

  const resources = myScheduleData?.map((shift) => ({
    id: shift?.physician?.id,
    title: `${shift?.physician?.firstName} ${shift?.physician?.lastName}`,
  }));

  return (
    <>
      <Box className="mySchedule-main-container">
        <Container maxWidth="md" className="mySchedule-container-wrapper">
          <Box display="flex" justifyContent="space-between" mb="8px">
            <Box display="flex">
              <Typography variant="h5" gutterBottom>
                <b>My Schedule</b>
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
          <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
            <Box className="indicators_scheduling pending" />
            Pending Shifts
            <Box className="indicators_scheduling approved" />
            Approved Shifts
          </Box>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            customButtons={{
              myCustomButton: {
                text: "Add New Shift",
                click: () => {
                  handleOpen("create shift");
                },
              },
            }}
            views={{
              dayGridMonth: {
                type: "dayGrid",
                duration: { months: 1 },
                buttonText: "Month",
              },
            }}
            headerToolbar={{
              left: "title prev next",
              center: "",
              right: "myCustomButton",
            }}
            events={events}
            resources={resources}
            eventClick={(eventInfo) => {
              dispatch(viewShift(eventInfo.event.id));
              handleOpen("view shift");
            }}
            eventContent={(eventInfo) => {
              return {
                html: `
                  <Box class="mySchedule-custom-event" style="background-color: ${eventInfo.event.backgroundColor}; color: white;">
                    <Box>${eventInfo.timeText}</Box>
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

export default MySchedule;
