import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { Box } from "@mui/system";
import * as React from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { token } from "../../../store";

const Form = (props) => {
  const userToken = useSelector(token);
  const sendInfo = props.sendInfo;
  const data = {
    employeeName: sendInfo.employeeName ? sendInfo.employeeName : "",
    onBoardingDate: sendInfo.onBoardingDate
      ? sendInfo.onBoardingDate
      : new Date(),
    offBoardingDate: sendInfo.offBoardingDate
      ? sendInfo.offBoardingDate
      : new Date(),
    coordinatorName: sendInfo.coordinatorName ? sendInfo.coordinatorName : "",
    offBoardingCompletionDate: sendInfo.offBoardingCompletionDate
      ? sendInfo.offBoardingCompletionDate
      : new Date(),
    isIBMNewHire: sendInfo.isIBMNewHire ? sendInfo.isIBMNewHire : "",
  };
  const [info, setInfo] = useState(data);
  const [error, setError] = useState("");
  const [errorEmpName, setErrorEmpName] = useState(false);
  const [errorCoOrdinatorName, setErrorCoOrdinatorName] = useState(false);
  const [errorIbmEmployeeOrContractor, setErrorIbmEmployeeOrContractor] = useState(false);
  const handleChange = (e, keyName) => {
    setError("");
    if (keyName === "onBoardingDate")
      return setInfo({ ...info, onBoardingDate: e });
    else if (keyName === "offBoardingDate") {
      return setInfo({ ...info, offBoardingDate: e });
    } else if (keyName === "employeeName") {
      setErrorEmpName(false);
      return setInfo({ ...info, employeeName: e.target.value });
    } else if (keyName === "coordinatorName") {
      setErrorCoOrdinatorName(false);
      return setInfo({ ...info, coordinatorName: e.target.value });
    } else if (keyName === "ibmEmployeeOrContractor") {
      setErrorIbmEmployeeOrContractor(false);
      return setInfo({ ...info, isIBMNewHire: e.target.value });
    } else if (keyName === "offBoardingCompletionDate")
      return setInfo({ ...info, offBoardingCompletionDate: e });
  };
  const handleSubmit = () => {
    if (
      info.employeeName !== "" &&
      info.coordinatorName !== "" &&
      info.isIBMNewHire !== ""
    ) {
      // axios
      //   .get(
      //     "http://localhost:9094/onboarding_checklist/get-all-onboarding-checklist",
      //     { headers: { Authorization: "Bearer " + userToken } }
      //   )
      //   .then((result) => {
      //     props.onInfoSubmit({ info, result: result.data });
      //   });
      
      const data = [
        {"checkListId":"checklisti1001","questions":"Has the PL/PM sent email to Prudential management informing about the release date and user id termination request before the end date and termination of id confirmed?","status":"","comment":"","link":"","linkName":""}
        ];
      props.onInfoSubmit({ info, result: data });
      setError("");
    } else {
      if (info.employeeName === "")
        setErrorEmpName(info.employeeName === "" ? true : false);
      if (info.coordinatorName === "")
        setErrorCoOrdinatorName(info.coordinatorName === "" ? true : false);
      if (info.ibmEmployeeOrContractor === "")
      setErrorIbmEmployeeOrContractor(info.isIBMNewHire === "" ? true : false);
    }
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {error && (
          <Typography component="p" color="red">
            {error}
          </Typography>
        )}
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={8} md={6} lg={3}>
            <Typography
              id="employeeName"
              variant="span"
              style={{
                margin: 0,
                color: errorEmpName ? "red" : "black",
              }}
            >
              <strong>Employee Name</strong>
            </Typography>
            <TextField
              variant="outlined"
              id="employeeName"
              value={info.employeeName}
              style={{ width: "80%" }}
              size="small"
              onChange={(e) => handleChange(e, "employeeName")}
              error={errorEmpName}
              sx={{
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
              }}
            />
          </Grid>
          <Grid item xs={8} md={6} lg={3}>
            <Typography
              id="coordinatorName"
              variant="span"
              style={{
                margin: 0,
                color: errorCoOrdinatorName ? "red" : "black",
              }}
            >
              <strong>Off-Boarding Coordinator Name</strong>
            </Typography>
            <TextField
              id="coordinatorName"
              variant="outlined"
              value={info.coordinatorName}
              style={{ width: "80%" }}
              size="small"
              onChange={(e) => handleChange(e, "coordinatorName")}
              error={errorCoOrdinatorName}
              sx={{
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
              }}
            />
          </Grid>
          <Grid item xs={8} md={6} lg={3}>
            <Typography
              id="ibmEmployeeOrContractor"
              variant="span"
              style={{
                margin: 0,
                color: errorIbmEmployeeOrContractor ? "red" : "black",
              }}
            >
              <strong>IBM Employee/Contractor #</strong>
            </Typography>
            <TextField
              id="ibmEmployeeOrContractor"
              variant="outlined"
              value={info.ibmEmployeeOrContractor}
              style={{ width: "80%" }}
              size="small"
              onChange={(e) => handleChange(e, "ibmEmployeeOrContractor")}
              error={errorIbmEmployeeOrContractor}
              sx={{
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
              }}
            />
          </Grid>
          <Grid item xs={8} md={4} lg={2}>
            <Typography
              id="onBoardingDate"
              variant="span"
              style={{ margin: 0 }}
            >
              <strong>On-Boarding Date</strong>
            </Typography>
            <FormControl style={{ width: "80%" }}>
              <DatePicker
                inputFormat="MM/dd/yyyy"
                value={info.onBoardingDate}
                onChange={(e) => handleChange(e, "onBoardingDate")}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    sx={{
                      "& legend": { display: "none" },
                      "& fieldset": { top: 0 },
                    }}
                    {...params}
                  />
                )}
                minDate={
                  new Date(new Date().setFullYear(new Date().getFullYear() - 1))
                }
                disableFuture
                maxDate={new Date()}
              />
            </FormControl>
          </Grid>
          <Grid item xs={8} md={4} lg={2}>
            <Typography
              id="offBoardingDate"
              variant="span"
              style={{ margin: 0 }}
            >
              <strong>Off-Boarding Date</strong>
            </Typography>
            <FormControl style={{ width: "80%" }}>
              <DatePicker
                inputFormat="MM/dd/yyyy"
                value={info.offBoardingDate}
                onChange={(e) => handleChange(e, "offBoardingDate")}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    sx={{
                      "& legend": { display: "none" },
                      "& fieldset": { top: 0 },
                    }}
                    {...params}
                  />
                )}
                minDate={
                  new Date(new Date().setFullYear(new Date().getFullYear() - 1))
                }
                disableFuture
                maxDate={new Date()}
              />
            </FormControl>
          </Grid>
          <Grid item xs={8} md={4} lg={2}>
            <Typography
              id="offBoardingCompletionDate"
              variant="span"
              style={{ margin: 0 }}
            >
              <strong>Off-Boarding Activities Completion Date</strong>
            </Typography>
            <FormControl style={{ width: "80%" }}>
              <DatePicker
                inputFormat="MM/dd/yyyy"
                value={info.offBoardingCompletionDate}
                onChange={(e) => handleChange(e, "offBoardingCompletionDate")}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    sx={{
                      "& legend": { display: "none" },
                      "& fieldset": { top: 0 },
                    }}
                    {...params}
                  />
                )}
                minDate={
                  new Date(new Date().setFullYear(new Date().getFullYear() - 1))
                }
                disableFuture
                maxDate={new Date()}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <div>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 1, mr: 1 }}
            >
              Continue
            </Button>
          </div>
        </Box>
      </LocalizationProvider>
    </>
  );
};

export default Form;
