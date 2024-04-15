import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";
import { Button } from "../../../Components/Button";

// const initialValue = {
//   IndConAgg: false,
//   BacCheck: false,
//   HIPAA: false,
//   nonDisAgg: false,
//   licDoc: false,
// };

const OnBording = ({
  isAgreementDoc,
  isBackgroundDoc,
  isNonDisclosureDoc,
  isLicenseDoc,
  isHipaaDoc,
}) => {
  // const [checked, setChecked] = useState(initialValue);
  // const handleCheckBox = (e) => {
  //   const name = e.target.name;
  //   const checked = e.target.checked;
  //   setChecked((prev) => ({
  //     ...prev,
  //     [name]: checked,
  //   }));
  // };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" gap={3}>
      <Typography variant="h6" mb={3}>
        <b>Onboarding</b>
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        <FormControlLabel
          control={
            <Checkbox
              name="IndConAgg"
              checked={isAgreementDoc}
              // onChange={handleCheckBox}
            />
          }
          label="Independent Contractor Agreement"
          sx={{ width: "310px" }}
        />
        <Button name="Upload" />
        {isAgreementDoc ? <Button name="View" /> : null}
      </Box>
      <Box display="flex" flexWrap="wrap" gap={2}>
        <FormControlLabel
          control={
            <Checkbox
              name="BacCheck"
              checked={isBackgroundDoc}
              // onChange={handleCheckBox}
            />
          }
          label="Background Check"
          sx={{ width: "310px" }}
        />
        <Button name="Upload" />
        {isBackgroundDoc ? <Button name="View" /> : null}
      </Box>
      <Box display="flex" flexWrap="wrap" gap={2}>
        <FormControlLabel
          control={
            <Checkbox
              name="HIPAA"
              checked={isHipaaDoc}
              // onChange={handleCheckBox}
            />
          }
          label="HIPAA Compliance"
          sx={{ width: "310px" }}
        />
        <Button name="Upload" />
        {isHipaaDoc ? <Button name="View" /> : null}
      </Box>
      <Box display="flex" flexWrap="wrap" gap={2}>
        <FormControlLabel
          control={
            <Checkbox
              name="nonDisAgg"
              checked={isNonDisclosureDoc}
              // onChange={handleCheckBox}
            />
          }
          label="Non-Disclosure Agreement"
          sx={{ width: "310px" }}
        />
        <Button name="Upload" />
        {isNonDisclosureDoc ? <Button name="View" /> : null}
      </Box>
      <Box display="flex" flexWrap="wrap" gap={2}>
        <FormControlLabel
          control={
            <Checkbox
              name="licDoc"
              checked={isLicenseDoc}
              // onChange={handleCheckBox}
            />
          }
          label="License Document"
          sx={{ width: "310px" }}
        />
        <Button name="Upload" />
        {isLicenseDoc ? <Button name="View" /> : null}
      </Box>
    </Box>
  );
};

export default OnBording;
