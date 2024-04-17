import React from "react";
import { Box, Typography } from "@mui/material";
import { Button } from "../../../Components/Button";

const OnBoarding = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={3}
      pt={2}
      width={350}
    >
      <Box
        display="flex"
        gap={4}
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Typography variant="subtitle2">
          Independent Contractor Agreement
        </Typography>
        <Button name="View" />
      </Box>
      <Box
        display="flex"
        gap={6}
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Typography variant="subtitle2">Background Check</Typography>
        <Button name="View" />
      </Box>
      <Box
        display="flex"
        gap={6}
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Typography variant="subtitle2">HIPAA Compliance</Typography>
        <Button name="View" />
      </Box>
      <Box
        display="flex"
        gap={6}
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Typography variant="subtitle2">Non-Disclosure Agreement</Typography>
        <Button name="View" />
      </Box>
      <Box
        display="flex"
        gap={6}
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Typography variant="subtitle2">License Document</Typography>
        <Button name="View" />
      </Box>
    </Box>
  );
};

export default OnBoarding;
