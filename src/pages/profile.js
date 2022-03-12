//importing modules
import NavBar from "../components/navBar";
import React, { useRef, useState } from "react";
import styles from "../styles/Profile.module.css";
//imports from mui
import { Radio, RadioGroup, FormControlLabel, Box, Input } from "@mui/material";
import { FormLabel, TextField, FormControl } from "@mui/material";
import { Typography, Button, InputLabel, OutlinedInput } from "@mui/material";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
var axios = require("axios");

const Profile = () => {
  const [file, setFile] = useState(""); // storing the uploaded file
  // storing the recived file from backend
  const [data, getFile] = useState({ name: "", path: "" });
  const [progress, setProgess] = useState(0); // progess bar
  const el = useRef(); // accesing input element

  const handleChange = (e) => {
    setProgess(0);
    const file = e.target.files[0]; // accessing file
    console.log(file);
    setFile(file); // storing file
  };
  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file); // appending file
    axios
      .post(`${process.env.BACKEND_URL}/upload`, formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress =
            Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
            "%";
          setProgess(progress);
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <NavBar />
      {/* flex used for centering the inside box */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'NTR', sans-serif",
            marginTop: "10px",
            fontWeight: "600",
          }}
        >
          PROFILE
        </Typography>

        {/* flex container for inputs */}

        <form
          method="post"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            width: "80vw",
            padding: "40px 0",
            marginBottom: "40px",
            borderRadius: "10px",
          }}
        >
          <TextField
            label={"Full Name"}
            sx={{ width: "50vw", height: "50px", marginBottom: "20px" }}
          />
          <TextField
            label="Age"
            type="number"
            sx={{
              width: "50vw",
              height: "50px",
              marginBottom: "20px",
            }}
            className={styles.greyback}
          />
          <TextField
            label="Email"
            type="email"
            sx={{ width: "50vw", height: "50px", marginBottom: "30px" }}
          />

          <FormControl sx={{ marginBottom: "20px", width: "50vw" }}>
            <FormLabel
              sx={{
                color: "black",
                fontWeight: "500",
                labelPlacement: "top",
              }}
              className="robo"
            >
              Gender
            </FormLabel>
            <RadioGroup row>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>

          {/* resume file upload */}
          <Box
            className={styles.resume}
            sx={{
              margin: "10px 0",
              width: "50vw",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              sx={{ fontWeight: "500", margin: "auto 0", textAlign: "left" }}
            >
              Resume
            </Typography>
            <div sx={{ width: "50px" }}>
              <input
                type="file"
                ref={el}
                onChange={handleChange}
                id="cv"
                className={styles.resumefile}
                style={{ outline: "none", width: "200px" }}
              />
            </div>
          </Box>
          {/* experience edit text field */}
          <Box sx={{ display: "flex", margin: "15px 0px", width: "50vw" }}>
            <Typography variant="body1" sx={{ fontWeight: "500" }}>
              Experience
            </Typography>
            <ModeEditRoundedIcon
              onClick={function openEditor() {
                const formId = window.document.getElementById("editor");
                formId.style.display = "block";
              }}
              sx={{ marginLeft: "5px" }}
            />
          </Box>
          {/* text editor field for editing their experience description */}
          <Box
            id="editor"
            sx={{
              display: "flex",
            }}
          >
            <TextField
              placeholder="type here ... "
              sx={{ width: "45vw", height: "250px" }}
            />
            <CancelRoundedIcon
              color="error"
              onClick={function closeEditor() {
                const formId = window.document.getElementById("editor");
                formId.style.display = "none";
              }}
              sx={{ marginLeft: "2px" }}
            />
          </Box>
          <Button type="submit" variant="contained" onSubmit={uploadFile}>
            SAVE
          </Button>
        </form>
      </Box>
    </>
  );
};
export default Profile;
