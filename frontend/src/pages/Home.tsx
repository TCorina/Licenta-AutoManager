import { Box, Button, Container, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useNavigate } from "react-router";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* 🎥 Fundal video */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        src="/images/3121459-uhd_3840_2160_24fps.webm"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
      />

      {/* 🌫️ Overlay vertical pentru lizibilitate */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)",
          zIndex: -1,
        }}
      />

      {/* 📄 Conținut */}
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100vh",
          textAlign: "left",
          animation: `${fadeIn} 1s ease-out`,
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}>
          Auto Manager
        </Typography>

        <Typography
          variant="h6"
          mb={4}
          sx={{
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.9)",
            textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
          }}
        >
          Simplifică gestionarea documentelor pentru flota ta auto. Administrează înmatriculările, asigurările, reviziile și toate actele importante — într-un
          singur loc sigur și eficient.
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<DirectionsCarIcon />}
          onClick={() => navigate("/register")}
          sx={{
            backgroundColor: "#f06292",
            "&:hover": {
              backgroundColor: "#ec407a",
            },
            fontWeight: "bold",
            borderRadius: 2,
            px: 4,
            py: 1.5,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          Începe acum
        </Button>
      </Container>
    </Box>
  );
};
