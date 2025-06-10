import React from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import { GitHub, LinkedIn, Twitter, Favorite } from "@mui/icons-material";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 3,
        px: 2,
        width: "100%",
        background:
          "linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.9) 100%)",
        backdropFilter: "blur(15px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        color: "white",
      }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        maxWidth="lg"
        mx="auto"
        gap={2}
      >
        {/* Creator Info */}
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "grey.300",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            Made with <Favorite sx={{ fontSize: 16, color: "#f87171" }} /> by
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              background: "linear-gradient(45deg, #60a5fa 30%, #a78bfa 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Pratham Chaurasiya
          </Typography>
        </Box>

        {/* Social Links */}
        <Box display="flex" gap={1}>
          <a
            href="https://github.com/Pratham286"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              size="small"
              sx={{
                color: "grey.400",
                "&:hover": {
                  color: "#60a5fa",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <GitHub fontSize="small" />
            </IconButton>
          </a>
          <a
            href="https://www.linkedin.com/in/pratham-chaurasiya-a3a96a251/"
            target="_blank"
            rel="noopener noreferrer"
          >

          <IconButton
            size="small"
            sx={{
              color: "grey.400",
              "&:hover": {
                color: "#0077b5",
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s ease",
            }}
            >
            <LinkedIn fontSize="small" />
          </IconButton>
          </a>
        </Box>

        {/* Copyright */}
        <Typography
          variant="body2"
          sx={{
            color: "grey.400",
            textAlign: { xs: "center", md: "right" },
          }}
        >
          © {currentYear} Blogging Site. All rights reserved.
        </Typography>
      </Box>

      <Divider sx={{ my: 2, bgcolor: "rgba(255, 255, 255, 0.1)" }} />

      {/* Additional Info */}
      <Box textAlign="center">
        <Typography
          variant="caption"
          sx={{
            color: "grey.500",
            fontSize: "0.75rem",
          }}
        >
          Built with React & Material-UI
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
