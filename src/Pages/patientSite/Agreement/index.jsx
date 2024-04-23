import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Button } from "../../../Components/Button";

const Agreement = () => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        pt={20}
      >
        <Container maxWidth="md">
          <Typography variant="h6">
            To provide the best medical service, we cannot determine the cost
            right away. If you agree to our service, we will provide care and
            follow-up until all care is completed. So with these points, if you
            would like us to provide care to you, click on &quot;Agree&quot; and
            we will get started immediately, if you do not agree, simply click
            &quot;Cancel&quot;.
          </Typography>
          <Box display="flex" justifyContent="space-around" pt={8}>
            <Button name="I Agree" color="success" size="large" />
            <Button name="Cancel" color="error" size="large" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Agreement;
