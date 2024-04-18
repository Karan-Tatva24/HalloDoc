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

const MySchedule = () => {
  const [modalName, setModalName] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { myScheduleData } = useSelector((state) => state.root.mySchedule);

  useEffect(() => {
    dispatch(mySchedule({}));
  }, [dispatch]);

  const handleOpen = (name) => {
    setModalName(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalName("");
  };

  const events = myScheduleData?.map((shift) => ({
    id: shift?.id,
    title: `${shift?.id}`,
    start: `${shift?.shiftDate}T${shift?.startTime}`,
    end: `${shift?.shiftDate}T${shift?.endTime}`,
    resourceId: shift?.physician?.id,
    backgroundColor: shift?.isApproved ? "lightgreen" : "lightpink",
  }));

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
            headerToolbar={{
              left: "title prev next",
              center: "",
              right: "myCustomButton",
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

export default MySchedule;
