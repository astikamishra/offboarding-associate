import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store";
import "../styles/login.css";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [empId, setEmpId] = useState("");
  const [pswd, setPswd] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e, type) => {
    setError(false);
    if (type === "empId") setEmpId(e.target.value);
    else if (type === "pswd") setPswd(e.target.value);
  };

  const handleLogin = () => {
    const requestBody = {
      empId: empId,
      password: pswd,
    };


    axios
      .post("http://localhost:9099/loginuser/user", requestBody)
      .then((result) => {
        // console.log("result >>>"+JSON.stringify(result))
        if (result.data.token) {
          dispatch(
            login({
              token: result.data.token,
              userDetails: {
                name: result.data.name,
                role: result.data.role,
                reviewer: result.data.reviewer,
                manager: result.data.manager,
                empId: empId,
              },
            })
          );
          navigate("/");
        } else setError(true);
      });


    //if(empId==="u2a744"){
      dispatch(
        login({
          token: result.token,
          userDetails: {
            name: result.data.associateName,
            role: result.data.associateRole,
            reviewer: result.data.reviewer,
            manager: result.data.manager,
            empId: empId,
          },
        })
      );
      navigate("/");
    // } else if(empId==="u2m744"){
    //   dispatch(
    //     login({
    //       token: result.token,
    //       userDetails: {
    //         name: result.data.managerName,
    //         role: result.data.managerRole,
    //         reviewer: null,
    //         manager: null,
    //         empId: empId,
    //       },
    //     })
    //   );
    //   navigate("/");
    // } else if(empId==="u2r744"){
    //   dispatch(
    //     login({
    //       token: result.token,
    //       userDetails: {
    //         name: result.data.reviewerName,
    //         role: result.data.reviewerRole,
    //         reviewer: null,
    //         manager: result.data.manager,
    //         empId: empId,
    //       },
    //     })
    //   );
    //   navigate("/");
    // } else setError(true);

    
  };

  return (
    <div className="login-wrapper">
      <Grid
        className=""
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h6" color="#fff">
            <strong>Prudential Retirement</strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              {error && (
                <p style={{ color: "red" }}>UserName or Password incorrect.</p>
              )}
              <TextField
                className="btn-color"
                autoFocus
                margin="dense"
                label="Employee id"
                type="text"
                fullWidth
                variant="standard"
                value={empId}
                onChange={(e) => handleChange(e, "empId")}
              />
              <Typography variant="body2" color="text.secondary">
                Please enter your IBM employee ID in 6 character. Eg: xxxxxx
              </Typography>
              <TextField
                className="btn-color"
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                value={pswd}
                onChange={(e) => handleChange(e, "pswd")}
              />
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                className="login-btn"
                onClick={handleLogin}
              >
                Login
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginComponent;
