//footer component for the home page

//importing modules
import Image from "next/image";
//mui imports
import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Box
        component="footer"
        sx={{ bgcolor: "background.paper", py: 6, bottom: 0 }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="subtitle1"
            color="black"
            align="center"
            component="p"
          >
            Developed by cfi webops team
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
