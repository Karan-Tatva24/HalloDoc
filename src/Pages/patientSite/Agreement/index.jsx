import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { Button } from "../../../Components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { acceptAgreement } from "../../../redux/halloAPIs/patientAPIs/agreementAPI";
import CancelAgreementModal from "../../../Components/Modal/CancelAgreementModal";
import { toast } from "react-toastify";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../../redux/halloSlices/apiStatusSlice";
import { AppRoutes } from "../../../constants/routes";

const Agreement = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        pt={15}
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
            <Button
              name="I Agree"
              color="success"
              size="large"
              onClick={() => {
                dispatch(apiPending());
                dispatch(acceptAgreement(id)).then((res) => {
                  if (res.type === "acceptAgreement/fulfilled") {
                    navigate(AppRoutes.LOGIN);
                    dispatch(apiSuccess());
                    toast.success(res.payload.message);
                  } else if (res.type === "acceptAgreement/rejected") {
                    dispatch(apiFails());
                    toast.error(res.payload?.data?.message);
                  }
                });
              }}
            />
            <Button
              name="Cancel"
              color="error"
              size="large"
              onClick={() => setOpen(true)}
            />
          </Box>
        </Container>
      </Box>
      <CancelAgreementModal id={id} open={open} handleClose={handelClose} />
    </>
  );
};

export default Agreement;
