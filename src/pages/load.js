import { Oval } from "react-loader-spinner";
import { Box } from "@mui/material";
export default function Job() {
  return (
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
      <Oval color="#04C6F8" secondaryColor="#00bfff" height={80} width={80} />
    </Box>
  );
}
