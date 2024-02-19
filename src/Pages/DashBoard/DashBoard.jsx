import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { Box, Grid, Typography } from "@mui/material";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import "./dashboard.css";
import { Button } from "../../Components/Button/Button";
import MyTable from "../../Components/Table/MyTable";
import {
  rows,
  newColumns,
  newDropdown,
  indicator,
  pendingColumns,
  pendingDropdown,
  activeColumns,
  activeDropdown,
  concludeColumns,
  concludeDropdown,
  toCloseColumns,
  toCloseDropdown,
  unpaidColumns,
  unpaidDropdown,
} from "../../constants/tableData";
import {
  primaryTriangle,
  secondaryTriangle,
  successTriangle,
  warningTriangle,
  errorTriangle,
  infoTriangle,
} from "../../assets/Images";

const cards = [
  {
    applicationState: "New",
    figure: "1452",
    icon: <NewReleasesOutlinedIcon />,
    color: "primary",
    toolTip: primaryTriangle,
  },
  {
    applicationState: "Pending",
    figure: "266",
    icon: <PendingOutlinedIcon />,
    color: "secondary",
    toolTip: secondaryTriangle,
  },
  {
    applicationState: "Active",
    figure: "26",
    icon: <CheckCircleOutlineOutlinedIcon />,
    color: "success",
    toolTip: successTriangle,
  },
  {
    applicationState: "Conclude",
    figure: "1078",
    icon: <CodeOutlinedIcon />,
    color: "error",
    toolTip: errorTriangle,
  },
  {
    applicationState: "To Close",
    figure: "519",
    icon: <CancelOutlinedIcon />,
    color: "info",
    toolTip: infoTriangle,
  },
  {
    applicationState: "Upload",
    figure: "16",
    icon: <PaidOutlinedIcon />,
    color: "warning",
    toolTip: warningTriangle,
  },
];

const DashBoard = () => {
  const [isActive, setIsActive] = useState(true);
  const [activeButton, setActiveButton] = useState(0);
  const [columns, setColumns] = useState(newColumns);
  const [dropDown, setDropDown] = useState(newDropdown);

  const handleClick = (index) => {
    setActiveButton(index);
    setIsActive(true);
  };

  useEffect(() => {
    switch (activeButton) {
      case 0:
        setColumns(newColumns);
        setDropDown(newDropdown);
        break;
      case 1:
        setColumns(pendingColumns);
        setDropDown(pendingDropdown);
        break;
      case 2:
        setColumns(activeColumns);
        setDropDown(activeDropdown);
        break;
      case 3:
        setColumns(concludeColumns);
        setDropDown(concludeDropdown);
        break;
      case 4:
        setColumns(toCloseColumns);
        setDropDown(toCloseDropdown);
        break;
      case 5:
        setColumns(unpaidColumns);
        setDropDown(unpaidDropdown);
        break;
      default:
        setColumns(newColumns);
        setDropDown(newDropdown);
    }
  }, [activeButton]);

  return (
    <Box>
      <Header />
      <Box className="dashboard-container">
        <Grid container spacing={{ xs: 2, sm: 3, md: 3, lg: 4 }}>
          {cards.map((card, index) => {
            return (
              <Grid
                key={index}
                container
                justifyContent="center"
                item
                xs={12}
                sm={6}
                md={4}
                lg={2}
              >
                <Button
                  color={card.color}
                  variant={
                    isActive && activeButton === index
                      ? "contained"
                      : "outlined"
                  }
                  className="card-btn"
                  fullWidth
                  onClick={() => handleClick(index)}
                >
                  <Box className="card-content-heading">
                    {card.icon}
                    <Typography variant="body1">
                      {card.applicationState}
                    </Typography>
                  </Box>
                  <Typography variant="h5">
                    <b>{card.figure}</b>
                  </Typography>
                </Button>
                {isActive && activeButton === index ? (
                  <img
                    src={card.toolTip}
                    alt="triangle"
                    className="btn-triangle"
                  />
                ) : null}
              </Grid>
            );
          })}
        </Grid>
        <Box className="dashboard-text-btn">
          <Grid
            container
            justifyContent="space-between"
            alignItems="baseline"
            spacing={{ xs: 2, sm: 3, md: 3, lg: 4 }}
          >
            <Grid item xs={12} lg={5}>
              <Typography variant="h5">
                Patients<span className="state">(New)</span>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={7}>
              <Box className="deshboard-btn">
                <Button
                  name="Send Link"
                  variant="contained"
                  startIcon={<SendOutlinedIcon />}
                  className="btn"
                />
                <Button
                  name="Create Request"
                  variant="contained"
                  startIcon={<RequestPageOutlinedIcon />}
                  className="btn"
                />
                <Button
                  name="Export"
                  variant="contained"
                  startIcon={<SendOutlinedIcon />}
                  className="btn"
                />
                <Button
                  name="Export All"
                  variant="contained"
                  startIcon={<SendOutlinedIcon />}
                  className="btn"
                />
                <Button
                  name="Request DTY Support"
                  variant="contained"
                  startIcon={<SendOutlinedIcon />}
                  className="btn"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <MyTable
          rows={rows}
          columns={columns}
          dropDown={dropDown}
          indicator={indicator}
        />
      </Box>
    </Box>
  );
};

export default DashBoard;
