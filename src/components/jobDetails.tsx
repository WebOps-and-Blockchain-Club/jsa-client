import Parser from "react-html-parser";

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
const JobDetails = ({ jobData }) => {
    const isPhone = useMediaQuery("(max-width:600px)");
return (
    <Card
            style={{
              position: "sticky",
              top: "20px",
              height: isPhone ?  "88vh":"95vh",
              width: isPhone ? "97vw" : "50%",
              marginLeft: isPhone ? "1.5vw" : "50px",
              marginRight: isPhone ? "1.5vw" : "0px",
              marginTop:"10px",
              alignSelf: "flex-start",
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
                <a href={jobData.job_link} target="__blank">
                  <Button
                    variant="contained"
                    style={{ fontFamily: "Calibri", fontWeight: "700" }}
                  >
                    Apply
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
              {jobData.job_salary!="NA" && jobData.job_salary!="Not Disclosed" ? jobData.job_salary : null }

              </Typography>
              {Parser(jobData.job_description_html)}
            </CardContent>
          </Card>
)
}

export default JobDetails;