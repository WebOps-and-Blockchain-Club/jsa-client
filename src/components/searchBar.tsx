import Link from "next/link";
import { useState } from "react";
//imports from material ui
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
const SearchBar = () => {
  const router = useRouter();
  const [job_name, set_job_name] = useState<string>("-1");
  const [job_location, set_job_location] = useState<string>("-1");
  function submitEvent(e) {
    e.preventDefault();
    console.log("call started");
    if (job_location === "-1" || job_name == "-1") 
    {window.alert("Enter job name and location");
      router.push("/");
  }
    else {
      router.push(`/jobs?jobName=${job_name}&jobLocation=${job_location}`);
    }
  }
  return (
    <>
      <form
        method="POST"
        action={`/jobs?jobName=${job_name}&jobLocation=${job_location}`}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row", md: "row", lg: "row" }}
          justifyContent="center"
          alignItems="center"
          className="flex2"
          m={1}
        >
          <TextField
            onChange={(e: React.ChangeEvent<any>) => {
              set_job_name(e.target.value);
            }}
            value={job_name === "-1" ? "" : job_name}
            label={"Job Title"}
            sx={{
              width: { xs: "80vw", sm: "250px", md: "250px" },
              height: { xs: "44px", sm: "50px" },
              m: "10px",
            }}
          ></TextField>

          <TextField
            onChange={(e: React.ChangeEvent<any>) => {
              set_job_location(e.target.value);
            }}
            value={job_location === "-1" ? "" : job_location}
            label={"Job Location"}
            sx={{
              width: { xs: "80vw", sm: "250px", md: "250px" },
              height: { xs: "44px", sm: "50px" },
              m: "10px",
            }}
            className="searchbox"
          ></TextField>
          {/* 
          <Link
            href={`/jobs?jobName=${job_name}&jobLocation=${job_location}`}
            passHref
          > */}
          <Button
            onClick={submitEvent}
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<SearchIcon />}
            sx={{
              width: { xs: "80vw", sm: "200px", md: "170px" },
              height: { xs: "44px", sm: "50px" },
              fontSize: "24",
              m: "10px",
            }}
          >
            Search
          </Button>
        </Box>
      </form>
    </>
  );
};
export default SearchBar;
