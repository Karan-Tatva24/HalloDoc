import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import "./pageNotFound.css";
import { NavLink } from "react-router-dom";
import { AppRoutes } from "../../constants/routes";

const PageNotFound = () => {
  return (
    <Box className="page_404">
      <Box display="flex" justifyContent="center" alignItems="center" p={10}>
        <Grid container>
          <Grid container>
            <Grid item className="text-center" sm={12}>
              <Box
                className="four_zero_four_bg"
                display="flex"
                justifyContent="center"
              >
                <Typography variant="h1" className="text-center ">
                  404
                </Typography>
              </Box>

              <Box
                className="content_box_404"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Typography variant="h3" className="h2">
                  Look like you are lost
                </Typography>

                <Typography>
                  the page you are looking for not available!
                </Typography>

                <NavLink to={AppRoutes.DASHBOARD} className="link_404">
                  Go to Home
                </NavLink>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PageNotFound;
