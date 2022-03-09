import Parser from "react-html-parser";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Container,
  Box,
  Pagination,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  useMediaQuery,
} from "@mui/material";

const JobListing = ({ results }) => {
  const isPhone = useMediaQuery("(max-width:600px)");
  const descriptionOfFirstJob = results[0];
  let [jobData, setJobData] = useState(descriptionOfFirstJob);
  const router = useRouter();

  //function to set job description
  const getJobDescription = (job: any) => {
    if (isPhone) {
      router.push(`/jobs/${job.job_id}`);
      return;
    }
    console.log("setting job description");
    setJobData(job);
    console.log(job);
  };

  return (
    <>
      <Box
        style={{
          display: "flex",
          width: "100vw",
          flexDirection: "row",
          padding: "10px",
          justifyContent: "center",
        }}
      >
        <Box
          className="container"
          sx={{ display: "flex", flexDirection: "column", boxShadow: 3, p: 1, }}
        >
          {/*container for left side cards*/}
          {results.length === 0 ? (
            <p>no jobs found</p>
          ) : (
            results.map((job: any, index: any) => {
              return (
                <Card sx={{ m: 0.5, maxWidth: "520px" }} key={index}>
                  <Box
                    onClick={() => getJobDescription(job)}
                    sx={{ cursor: "pointer" }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="space-between"
                      >
                        <Typography
                          color="#3BA0FD"
                          variant="h5"
                          style={{ fontFamily: "Noto Sans", fontSize: "16px" }}
                        >
                          {job.job_title}
                        </Typography>
                        <a href={job.job_link}>
                          <Button
                            variant="contained"
                            style={{ fontFamily: "Calibri", fontWeight: "700" }}
                            size="small"
                          >
                            {job.job_desk}
                          </Button>
                        </a>
                      </Stack>
                      <Typography
                        color="black"
                        style={{ fontFamily: "Montserrat", fontWeight: "700" }}
                      >
                        {job.job_employer}
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Calibri",
                          fontWeight: "550",
                          fontSize: "16px",
                        }}
                      >
                        {job.job_location}
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Calibri",
                          fontWeight: "550",
                          fontSize: "16px",
                        }}
                      >
                        {job.job_salary}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              );
            }) //closing the mapping loop
          )}
        </Box>
        {/* container for the description */}
        {!isPhone && (
          <Card
            sx={{
              width: "50%",
            }}
            style={{
              position: "sticky",
              top: "20px",
              height: "100vh",
              marginLeft: "50px",
              marginTop: "10px",
              alignSelf: "flex-start",
              padding: "0px",
              overflowY: "scroll",
            }}
          >
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography
                  color="#3BA0FD"
                  variant="h5"
                  style={{ fontFamily: "Noto Sans" }}
                >
                  {jobData.job_title}
                </Typography>
                <a href={jobData.job_link}>
                  <Button
                    variant="contained"
                    style={{ fontFamily: "Calibri", fontWeight: "700" }}
                  >
                    {jobData.job_desk}
                  </Button>
                </a>
              </Stack>
              <Typography
                color="black"
                style={{ fontFamily: "Montserrat", fontWeight: "700" }}
              >
                {jobData.job_employer}
              </Typography>
              <Typography style={{ fontFamily: "Calibri", fontWeight: "550" }}>
                {jobData.job_location}
              </Typography>
              <Typography style={{ fontFamily: "Calibri", fontWeight: "550" }}>
                {jobData.job_salary}
              </Typography>
              {Parser(jobData.job_description_html)}
            </CardContent>
          </Card>
        )}
      </Box>
    </>
  );
}
//<JobDescription description={jobData} />

export default JobListing;