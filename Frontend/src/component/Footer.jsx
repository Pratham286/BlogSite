import React from "react";
import { Box, Typography } from "@mui/material";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 2,
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        color: '#555',
        borderTop: '1px solid #ddd'
      }}
    >
      <Typography variant="body2">
        © {currentYear} Blogging Site
      </Typography>
    </Box>
  );
}

export default Footer;