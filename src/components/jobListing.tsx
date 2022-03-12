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
  Chip,
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
  const len = results.length;
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
                        {
                          job.similarity ? <Typography
                          color="#3BA0FD"
                          variant="h5"
                          style={{
                            fontFamily: "Noto Sans",
                            fontSize: "10px",
                          }}
                        >
                          {index < len / 4 ? (
                            <Chip label="Most Relevant" size="small" color="success" />
                          ) : null}
                          {index > len / 4 && index < (3 * len) / 4 ? (
                            <Chip label="Relevant" size="small" color="primary" />
                          ) : null}
                          {index > (3 * len) / 4 ? (
                            <Chip label="Less Relevant" size="small" />
                          ) : null}
                        </Typography> : null
                        }
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
                          {job.job_salary!="NA" && job.job_salary!="Not Disclosed" ? job.job_salary : null }
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
