import { Card, CardActions, CardContent, Typography } from "@mui/material";
import type { VehicleAttribute } from "../types/vehicleAttribute";
import { format } from "date-fns";
import { EditVehicleAttributeCard } from "./EditVehicleAttributeCard";

interface VehicleAttributeCardProps {
  type: "itp" | "rca" | "vignette" | "oilChange";
  regNo: string;
  attr?: VehicleAttribute;
}

export const VehicleAttributeCard = ({ type, attr, regNo }: VehicleAttributeCardProps) => {
  const title = {
    itp: "ITP",
    rca: "RCA",
    vignette: "Rovinietă",
    oilChange: "Schimb Ulei",
  }[type];

  return (
    <Card variant="outlined" sx={{ minWidth: 200, mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2">Dată start: {attr?.startDate ? format(attr.startDate, "dd/MM/yy") : "-"}</Typography>
        <Typography variant="body2">Dată expirare: {attr?.endDate ? format(attr.endDate, "dd/MM/yy") : "-"}</Typography>
        <Typography variant="body2">Km la start: {attr?.startKm}</Typography>
        {attr?.endKm && <Typography variant="body2">Km la sfârșit: {attr?.endKm}</Typography>}
      </CardContent>
      <CardActions>
        <EditVehicleAttributeCard type={type} title={title} regNo={regNo} attribute={attr} />
      </CardActions>
    </Card>
  );
};
