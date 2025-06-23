import { useParams } from "react-router";
import { useAuth } from "../context/auth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, Typography, Grid, Box, CircularProgress, Container } from "@mui/material";
import { getVehicle } from "../api/vehicle";
import { VehicleAttributeCard } from "../components/VehicleAttributeCard";

export const VehicleDetails = () => {
  const { regNo } = useParams();
  const { user } = useAuth();

  const { data: vehicle, isLoading } = useQuery({
    queryKey: ["vehicles", regNo],
    queryFn: () => getVehicle(user!.userName, regNo!),
    enabled: !!(user && regNo),
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (!vehicle) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        paddingY: 4,
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h5" fontWeight={600}>
                  {vehicle.brand} ({vehicle.regNo})
                </Typography>
                <Typography variant="subtitle1" mt={1}>
                  Număr kilometri: <strong>{vehicle.km}</strong>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <VehicleAttributeCard type="itp" attr={vehicle.itp} regNo={vehicle.regNo} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <VehicleAttributeCard type="rca" attr={vehicle.rca} regNo={vehicle.regNo} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <VehicleAttributeCard type="vignette" attr={vehicle.vignette} regNo={vehicle.regNo} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <VehicleAttributeCard type="oilChange" attr={vehicle.oilChange} regNo={vehicle.regNo} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
