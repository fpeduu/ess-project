import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "Fácil de usar",
    description: "Sistema intuitivo e simples de utilizar.",
  },
  {
    title: "Diversas opções de salas",
    description: "Encontre a sala perfeita para sua necessidade.",
  },
  {
    title: "Equipamentos disponíveis",
    description: "Salas com projetores disponíveis",
  },
];

const Features: React.FC = () => {
  return (
    <Box sx={{ padding: "50px 0" }}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Vantagens
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <CheckCircle color="primary" fontSize="large" />
              <Typography variant="h6">{feature.title}</Typography>
              <Typography>{feature.description}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
