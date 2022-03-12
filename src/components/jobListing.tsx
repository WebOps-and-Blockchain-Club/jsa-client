import { useState } from "react";
import { useRouter } from "next/router";
import JobDetails from "../components/jobDetails";

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
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {/*container for left side cards*/}
          {results.length === 0 ? (
            <p>no jobs found</p>
          ) : (
            results.map((job: any, index: any) => {
              if (job) {
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
                            style={{
                              fontFamily: "Noto Sans",
                              fontSize: "16px",
                            }}
                          >
                            {job.job_title}
                          </Typography>
                          <a href={job.job_link} target="__blank">
                            <Button
                              variant="contained"
                              style={{
                                fontFamily: "Calibri",
                                fontWeight: "700",
                              }}
                              size="small"
                            >
                              {job.job_desk}
                            </Button>
                          </a>
                        </Stack>
                        <Typography
                          color="black"
                          style={{
                            fontFamily: "Montserrat",
                            fontWeight: "700",
                          }}
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
              }
            }) //closing the mapping loop
          )}
        </Box>
        {/* container for the description */}
        {!isPhone && <JobDetails jobData={jobData} />}
      </Box>
    </>
  );
};
//<JobDescription description={jobData} />

export default JobListing;