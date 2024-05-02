import React, { Fragment, useEffect, useState } from "react";
import BuildHeader from "../../component/BuildHeader";
import "../buildForm/build.css";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import BtnLoader from "../../component/BtnLoader";
import axios from "axios";
import { useParams } from "react-router-dom";

const FormSetting = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const { id } = useParams();

  const addFormEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formEmail = Object.fromEntries(new FormData(e.target));
    const { data } = await axios.put(`/api/v1/form/addEmail/${id}`, formEmail);
    console.log(data);
    setLoading(false);
  };

  const getformEmail = async() =>{
    const { data } = await axios.get(`/api/v1/form/email/${id}`);
    console.log(data)
    setEmail(data.data.email)

  }

  const handleChange = (e) =>{
    setEmail(e.target.value)
  }

  useEffect(() =>{
    getformEmail()
  },[])

  return (
    <Fragment>
      <BuildHeader />
      <div
        style={{
          position: "relative",
          top: "10rem",
          width: "100vw",
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f3f3fe",
          paddingTop: "2rem",
        }}
      >
        <div
          style={{
            width: "50%",
            minHeight: "90vh",
            // backgroundColor: "white",
            borderRadius: "10px",
            padding: "2rem",
            display:'flex',
            flexDirection:'column',
            gap:'1rem'
          }}
        >
          <Card sx={{ minWidth: 275 }}>
            <form onSubmit={(e) => addFormEmail(e)}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ textAlign: "start", fontWeight: "600" }}
                >
                  Connect Email
                </Typography>
                <Typography variant="body2" sx={{ textAlign: "start" }}>
                  <TextField
                    id="outlined-basic"
                    type="email"
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={email}
                    onChange={(e)=>{handleChange(e)}}
                    sx={{ width: "100%", fontWeight: "700" }}
                  />
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  type="submit"
                >
                  {
                    loading ? <BtnLoader /> : 'Save'
                  }
                  {/* <BtnLoader /> */}
                </Button>
              </CardActions>
            </form>
          </Card>

          <Card sx={{ minWidth: 275}}>
            <form onSubmit={(e) => addFormEmail(e)}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ textAlign: "start", fontWeight: "600" }}
                >
                  Publish
                </Typography>

              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="warning"
                  type="submit"
                >
                  {
                    loading ? <BtnLoader /> : 'Save'
                  }
                  {/* <BtnLoader /> */}
                </Button>
              </CardActions>
            </form>
          </Card>
        </div>
      </div>
    </Fragment>
  );
};

export default FormSetting;
