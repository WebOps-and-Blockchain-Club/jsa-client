import { Box, Typography } from "@mui/material";
import { useReducer, useState } from "react";
import { Button } from "@mui/material";

const JobDescription = ({ jobData }) => {
  //  const classes = useStyles;
  return <>{jobData}</>;
}
//const useStyles = makeStyles((theme) => ({
//   container: {
//     position: "sticky",
//     top: "20px",
//     marginLeft: "50px",
//     alignSelf: "flex-start",
//     border: "1px solid black",
//     padding: "20px",
//     flex: "1",
//     borderRadius: "10px ",
//   },
//   link: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: "10px",
//     height: "53px",
//     padding: "0 25px",
//     fontSize: "20px",
//     color: "white",

//     backgroundColor: theme.palette.primary.main,
//     "&:hover": {
//       color: theme.palette.primary.main,
//       backgroundColor: "white",
//       border: `1px solid ${theme.palette.primary.main}`,
//     },
//   },
// }));

export default JobDescription;