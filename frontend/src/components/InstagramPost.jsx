import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";

const InstagramEmbed = ({ postUrl }) => {


  const [embedHtml, setEmbedHtml] = useState(null);
    const INSTAGRAM_POST_URL = "https://www.instagram.com/p/DE-OOUDNBLa/"

  useEffect(() => {
    const fetchEmbed = async () => {
      try {
        const response = await fetch(1
          `https://graph.facebook.com/v16.0/instagram_oembed?url=${encodeURIComponent(INSTAGRAM_POST_URL)}&omitscript=true`
        );
        const data = await response.json();
        if (data.html) {
          setEmbedHtml(data.html);
        }
      } catch (error) {
        console.error("Error fetching Instagram embed:", error);
      }
    };

    fetchEmbed();
  }, [postUrl]);

  if (!embedHtml) return null;

  return (
    <Container
      id="section-4"
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        padding: "20px",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Latest Instagram Post
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
    </Container>
  );
};

export default InstagramEmbed;