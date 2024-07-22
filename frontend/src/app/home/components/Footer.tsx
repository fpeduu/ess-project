import React from "react";
import { Container, Typography, Box, Grid, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "#333", color: "#fff", padding: "20px 0" }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">
              Engenharia de Software e Sistemas
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
