import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Collapse,
  CardMedia,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

const articole = [
  {
    id: "itp",
    titlu: "Ce trebuie să știi despre ITP",
    descriere: "Inspecția Tehnică Periodică este obligatorie...",
    continut:
      "ITP-ul se face la 2 ani pentru mașinile personale. În caz de neprezentare, poți primi amendă și suspendarea înmatriculării.",
    imagine: "/images/statie-itp-scaled-e1723488071491-1200x675.webp",
  },
  {
    id: "rca",
    titlu: "Ghid RCA: Asigurarea de răspundere civilă auto",
    descriere: "Asigurarea RCA este obligatorie...",
    continut:
      "RCA-ul acoperă daunele produse altor participanți în trafic. Nu include daunele proprii.",
    imagine: "/images/Tarife-de-referinta-RCA-decembrie-2024-PF-scaled.webp",
  },
  {
    id: "ulei",
    titlu: "Când trebuie schimbat uleiul la motor?",
    descriere: "Un schimb regulat de ulei prelungește viața motorului...",
    continut:
      "La benzină: la 10.000-15.000 km. La diesel: mai devreme. Folosește un ulei de calitate.",
    imagine: "/images/dc11c6cd-9303-4c42-870d-6acb72b28f69.png",
  },
  {
    id: "rovinieta",
    titlu: "Totul despre rovinietă",
    descriere: "Ce este rovinieta și ce amenzi riști...",
    continut:
      "Rovinieta se poate cumpăra online, prin SMS sau de la benzinării. Amenzile sunt peste 250 lei.",
    imagine: "/images/Cand-trebuie-platita-rovinieta-1.jpg",
  },
];

export const InformatiiUtile = () => {
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const toggleExpand = (index: number) => {
    setExpandedCardIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #1e3c72, #2a5298)",
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ color: theme.palette.text.primary, fontWeight: "bold", mb: 4 }}
        >
          Informații utile
        </Typography>

        <Grid container spacing={4}>
          {articole.map((articol, index) => (
            <Grid size = {{xs : 12, sm : 6, md : 6}} key={index}>
              <Card
                elevation={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={articol.imagine}
                  alt={articol.titlu}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {articol.titlu}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {articol.descriere}
                  </Typography>
                  <Collapse in={expandedCardIndex === index}>
                    <Box mt={2}>
                      <Typography variant="body2" color="text.primary">
                        {articol.continut}
                      </Typography>
                    </Box>
                  </Collapse>
                </CardContent>
                <CardActions sx={{ mt: "auto", justifyContent: "space-between", px: 2, pb: 2 }}>
                  <Button size="small" onClick={() => toggleExpand(index)}>
                    {expandedCardIndex === index ? "Ascunde" : "Citește mai mult"}
                  </Button>
                  <Button
                    size="small"
                    onClick={() => navigate(`/information/${articol.id}`)}
                  >
                    Vezi detalii
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default InformatiiUtile;
