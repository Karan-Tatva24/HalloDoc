import React, { useRef, useState } from "react";
import {
  Box,
  Container,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import "./scheduling.css";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/TextField/Input";
import { AppRoutes } from "../../constants/routes";

const Scheduling = () => {
  const navigate = useNavigate();
  const [selectRegion, setSelectRegion] = useState("all");
  const calendarRef = useRef(null);
  const { regions } = useSelector((state) => state.root.getRegionPhysician);
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  const handleChangeRegion = (e) => {
    setSelectRegion(e.target.value);
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
                  <MenuItem key={region.id} value={region.name}>
                    {region.name}
                  </MenuItem>
                );
              })}
            </Input>
            <Box display="flex" gap={2}>
              <Button name="Provider on call"></Button>
              <Button
                name="Shifts For Review"
                onClick={() => navigate(AppRoutes.REQUESTED_SHIFTS)}
              ></Button>
              <Button name="Add New Shift"></Button>
            </Box>
          </Box>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, resourceTimelinePlugin]}
            dateClick={handleDateClick}
            initialView="resourceTimelineWeek"
            headerToolbar={{
              left: "title prev next",
              right: "resourceTimelineDay resourceTimelineWeek dayGridMonth",
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
