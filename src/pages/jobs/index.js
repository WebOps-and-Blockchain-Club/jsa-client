import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import NavBar from "../../components/navBar.tsx";
import SearchBar from "../../components/searchBar.tsx";
import JobListing from "../../components/jobListing.tsx";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
//loading animation
import { Oval } from "react-loader-spinner";
//imports from mui
import { Box } from "@mui/system";
import axios from "axios";

export default function Job() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  //job fetch function
  console.log(isLoading);
  //jobFetch was previously here
  //fetch whenever query is changed
  useEffect(() => {
    if (!router.isReady) return;
    const { jobName, jobLocation } = router.query;
    const jobFetch = async () => {
      setIsLoading(true);

      try {
        console.log("fetching from backend");
        var config = {
          method: "get",
          url: `${process.env.BACKEND_URL}/jobs?location=${jobLocation}&title=${jobName}`,
        };

        await axios(config).then(async (response) => {
          if (response.data) {
            setData(response.data);
            setIsLoading(false);
          }
        });
      } catch (error) {
        console.log(error);
      }

      // try {
      //   console.log("fetching from backend");
      //   const response = await fetch(
      //     `${process.env.BACKEND_URL}/jobs?location=${jobLocation}&title=${jobName}`,
      //     {
      //       method: "GET",
      //       // mode: "cors",
      //       // headers: {
      //       //   "Content-Type": "application/json",
      //       // },
      //     }
      //   );
      //   console.log(response);
      //   const jsonData = await response.json();
      //   setData(jsonData);
      //   setIsLoading(false);
      // } catch (error) {
      //   setHasError(true);
      //   console.log(hasError);
      // }
    };

    jobFetch();
  }, [router.isReady]);

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
        <div className={styles.container}>
          <Head>
            <title>Jobs | JSA</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <NavBar />
          <SearchBar />
          <JobListing results={data} />
        </div>
      )}
    </>
  );
}
