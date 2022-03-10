import NavBar from "../../components/navBar";
import Parser from "react-html-parser";
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
//loading animation
import JobDetails from "../../components/jobDetails";
import { Oval } from "react-loader-spinner";

export default function JobDescription() {
  const router = useRouter();
  const { id } = router.query;
  //state hooks
  interface IUser {
    details_id: string;
    input_id: string;
    input_uid: string;
    job_description: string;
    job_description_html: string;
    job_desk: string;
    job_employer: string;
    job_id: string;
    job_link: string;
    job_location: string;
    job_salary: string;
    job_title: string;
  }
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [jobData, setData] = useState({
    details_id: " ",
    input_id: " ",
    input_uid: " ",
    job_description: " ",
    job_description_html: " ",
    job_desk: " ",
    job_employer: " ",
    job_id: " ",
    job_link: " ",
    job_location: " ",
    job_salary: " ",
    job_title: " ",
  });
  //function to fetch job details runs only once

  useEffect(() => {
    const jobFetch = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        console.log("fetching the specific job");
        const response = fetch(`${process.env.BACKEND_URL}/job/${id}`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        const jsonData = (await response).json();
        setData(await jsonData);
        setIsLoading(false);
      } catch (error) {
        setHasError(true);
        console.log(hasError);
      }
    };
    jobFetch();
  }, [id]);
  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <Oval
            color="#04C6F8"
            secondaryColor="#00bfff"
            height={80}
            width={80}
          />
        </Box>
      ) : (
        //below code will be displayed after loading is completed
        <>
          <NavBar />
          <JobDetails jobData={jobData} />
        </>
      )}
    </>
  );
}
