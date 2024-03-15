import React from "react";
import { Box, Container, MenuItem, Typography } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./scheduling.css";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/TextField/Input";

const Scheduling = () => {
  const navigate = useNavigate();
  const { regions } = useSelector((state) => state.getRegionPhysician);
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

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
              placeholder="All Regions"
              //   value={additionalFilter}
              //   onChange={handleAdditionalFilterChange}
              //   InputProps={{
              //     startAdornment: (
              //       <InputAdornment position="start">
              //         <SearchOutlinedIcon />
              //       </InputAdornment>
              //     ),
              //   }}
            >
              <MenuItem value="all">All Regions</MenuItem>
              {regions.map((region, index) => {
                return (
                  <MenuItem key={index} value={region.region_name}>
                    {region.region_name}
                  </MenuItem>
                );
              })}
            </Input>
            <Box display="flex" gap={2}>
              <Button name="Provider on call"></Button>
              <Button name="Shifts For Review"></Button>
              <Button name="Add New Shift"></Button>
            </Box>
          </Box>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            dateClick={handleDateClick}
            initialView="timeGridDay"
            headerToolbar={{
              left: "title prev next",
              right: "timeGridDay timeGridWeek dayGridMonth",
            }}
            events={[
              { title: "event 1", date: "2024-03-15" },
              { title: "event 2", date: "2019-04-02" },
            ]}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
          />
        </Container>
      </Box>
    </>
  );
};

export default Scheduling;
