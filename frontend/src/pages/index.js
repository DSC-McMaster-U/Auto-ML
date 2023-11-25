import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import "@fontsource/public-sans";
import Image from "next/image";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import UploadIcon from "@mui/icons-material/Upload";
import BarChartIcon from "@mui/icons-material/BarChart";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
`;

const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  padding: 20px;
`;

const Element = styled.div`
  padding: 10px;
  text-align: center;
`;

const Picture = styled.div`
  padding: 10px;
  background-color: #fff;

  text-align: center;
  left: 10;
`;

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/python");
        const data = await res.json();
        setMessage(data.message);
      } catch {
        console.error("API Endpoint Not Working");
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <BoxContainer>
        <Element>
          <Typography
            variant="h1"
            sx={{
              mt: 5,
              fontFamily: "Public Sans",
              fontWeight: 700,
              letterSpacing: "0.05rem",
              color: "#4285f4",
            }}
          >
            Welcome to
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontFamily: "Public Sans",
              fontWeight: 700,
              letterSpacing: "0.05rem",
              color: "#34A853",
            }}
          >
            AutoMate!
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mt: 5,
              fontFamily: "Public Sans",
              fontWeight: 100,
              letterSpacing: ".05rem",
            }}
          >
            An intuitive platform to streamline your data exploration.
          </Typography>
          <Element style={{ marginTop: 10 }}>
            <Button
              style={{
                "background-color": "#34A853",
                border: "1px solid #333",
                width: 150,
                height: 55,
                fontFamily: "Public Sans",
                color: "white",
                marginRight: 10,
              }}
            >
              <BarChartIcon style={{ border: "black" }} /> Auto-EDA
            </Button>

            <Button
              style={{
                "background-color": "white",
                border: "1px solid #333",
                width: 150,
                height: 55,
                fontFamily: "Public Sans",
                color: "#EA4335",
              }}
            >
              <UploadIcon />
              Dataset
            </Button>
          </Element>
        </Element>
        <Picture>
          <Image
            width={500}
            height={500}
            alt="AutoMate Logo"
            src="/AutoMate_logo.png"
          />
        </Picture>
      </BoxContainer>
    </Container>
  );
}
