// pages/Articol.tsx
import { useParams, useNavigate } from "react-router";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Chip,
  Card,
  CardContent,
  Stack,
  IconButton,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const articole = [
  {
    id: "itp",
    titlu: "Ce trebuie să știi despre ITP",
    descriere: "Inspecția Tehnică Periodică este obligatorie...",
    continut: [
      {
        intrebare: "Ce se verifică la ITP?",
        raspuns: [
          "Sistemul de frânare (eficiență și funcționalitate)",
          "Sistemul de direcție și suspensie",
          "Luminile și semnalizările",
          "Starea anvelopelor",
          "Emisiile de gaze și nivelul de zgomot",
        ],
      },
      {
        intrebare: "Cât de des se face ITP-ul?",
        raspuns: [
          "Autoturisme sub 8 ani: la fiecare 2 ani",
          "Autoturisme peste 8 ani: anual",
          "Taxiuri și autoutilitare: anual sau la 6 luni",
        ],
      },
      {
        intrebare: "Ce riști dacă circuli fără ITP?",
        raspuns: [
          "Amendă între 1305 și 2900 lei",
          "Ridicarea certificatului de înmatriculare",
          "Interzicerea circulației până la reînnoirea inspecției",
        ],
      },
      {
        intrebare: "Recomandare",
        raspuns: [
          "Programează ITP-ul cu cel puțin o săptămână înainte de expirare pentru a evita riscurile.",
        ],
      },
    ],
    categorie: "Tehnic",
    autor: "Admin Auto",
    data: "20 iunie 2025",
  },
  {
    id: "rca",
    titlu: "Ghid RCA: Asigurarea de răspundere civilă auto",
    descriere: "Asigurarea RCA este obligatorie...",
    continut: [
      {
        intrebare: "Ce acoperă RCA-ul?",
        raspuns: [
          "Daune materiale provocate altor vehicule",
          "Vătămări corporale cauzate altor persoane",
          "Pagube produse bunurilor terților (clădiri, garduri etc.)",
        ],
      },
      {
        intrebare: "Ce NU acoperă RCA-ul?",
        raspuns: [
          "Daunele propriei mașini",
          "Furtul sau incendiul vehiculului tău",
          "Defecțiuni mecanice sau daune vechi",
        ],
      },
      {
        intrebare: "Ce se întâmplă fără RCA?",
        raspuns: [
          "Amendă între 1000–2000 lei",
          "Ridicarea certificatului de înmatriculare",
          "Ești obligat să plătești toate daunele din buzunar",
        ],
      },
      {
        intrebare: "Cum alegi o poliță bună?",
        raspuns: [
          "Compară prețuri pe platforme autorizate",
          "Verifică dacă asiguratorul este de încredere",
          "Asigură-te că include Carte Verde pentru călătorii externe",
        ],
      },
    ],
    categorie: "Asigurări",
    autor: "Mihaela Popescu",
    data: "15 iunie 2025",
  },
  {
    id: "rovinieta",
    titlu: "Totul despre rovinietă",
    descriere: "Ce este rovinieta și ce amenzi riști...",
    continut: [
      {
        intrebare: "Ce este rovinieta?",
        raspuns: [
          "Este taxa pentru utilizarea drumurilor naționale din România",
          "Este obligatorie pentru toate vehiculele înmatriculate care circulă în afara orașelor",
        ],
      },
      {
        intrebare: "De unde se poate cumpăra?",
        raspuns: [
          "Online (roviniete.ro, e-rovinieta.ro etc.)",
          "La benzinării partenere",
          "Prin SMS (pentru unele categorii de vehicule)",
        ],
      },
      {
        intrebare: "Ce riști dacă nu ai rovinietă?",
        raspuns: [
          "Amendă între 250 și 450 lei pentru autoturisme",
          "Se aplică chiar dacă ai circulat doar câțiva metri pe drum național",
        ],
      },
      {
        intrebare: "Recomandare",
        raspuns: [
          "Verifică valabilitatea rovinietei periodic și păstrează dovada achiziției",
        ],
      },
    ],
    categorie: "Drumuri",
    autor: "Radu Mihai",
    data: "5 iunie 2025",
  },
  {
    id: "ulei",
    titlu: "Când trebuie schimbat uleiul la motor?",
    descriere: "Un schimb regulat de ulei prelungește viața motorului...",
    continut: [
      {
        intrebare: "Când trebuie schimbat uleiul?",
        raspuns: [
          "Motoare pe benzină: la fiecare 10.000–15.000 km",
          "Motoare diesel: la fiecare 7.000–12.000 km",
          "Conform specificațiilor din cartea tehnică",
        ],
      },
      {
        intrebare: "Ce implică un schimb corect?",
        raspuns: [
          "Scurgerea completă a uleiului vechi",
          "Înlocuirea filtrului de ulei",
          "Adăugarea uleiului potrivit pentru motorul tău",
        ],
      },
      {
        intrebare: "Semne că trebuie schimbat uleiul",
        raspuns: [
          "Motorul devine zgomotos",
          "Martor aprins în bord",
          "Ulei închis la culoare sau vâscos",
        ],
      },
      {
        intrebare: "Recomandare",
        raspuns: [
          "Notează kilometrajul la fiecare schimb și folosește ulei de calitate (ACEA/API)",
        ],
      },
    ],
    categorie: "Întreținere",
    autor: "George Ionescu",
    data: "10 iunie 2025",
  },
];

export const Articol = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const theme = useTheme();

  const articol = articole.find((a) => a.id === id);

  if (!articol) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom right, #1e3c72, #2a5298)",
          py: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h5" color="white">
            Articolul nu a fost găsit.
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #1e3c72, #2a5298)",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <IconButton onClick={() => navigate("/information")} sx={{ mb: 2, color: "white" }}>
          <ArrowBackIcon />
        </IconButton>

        <Chip
          label={articol.categorie}
          variant="outlined"
          sx={{
            mb: 2,
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.light,
          }}
        />

        <Typography variant="h4" gutterBottom sx={{ color: "white", fontWeight: "bold" }}>
          {articol.titlu}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <Avatar>{articol.autor[0]}</Avatar>
          <Typography variant="body2" color="text.secondary">
            {articol.autor} • {articol.data}
          </Typography>
        </Box>

        <Stack spacing={3}>
          {articol.continut.map((sectiune, idx) => (
            <Card
              key={idx}
              elevation={3}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 1, color: theme.palette.text.primary }}
                >
                  {sectiune.intrebare}
                </Typography>
                {sectiune.raspuns.map((linie, i) => (
                  <Typography
                    key={i}
                    variant="body1"
                    sx={{ mb: 0.5, color: theme.palette.text.secondary }}
                  >
                    • {linie}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Articol;
