import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, TextField } from "@mui/material";
import type { VehicleAttribute } from "../types/vehicleAttribute";
import { useAuth } from "../context/auth";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { adjustITP, adjustOilChange, adjustRCA, adjustVignette } from "../api/vehicle";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface EditVehicleAttributeCardProps {
  type: "itp" | "rca" | "vignette" | "oilChange";
  title: string;
  regNo: string;
  attribute?: VehicleAttribute;
}

function parseDate(dateString: string): Date {
  const dateArray = dateString.split(".");
  const day = parseInt(dateArray[0], 10);
  const month = parseInt(dateArray[1], 10);
  const year = parseInt(dateArray[2], 10);

  return new Date(year, month - 1, day);
}

export const EditVehicleAttributeCard = ({ attribute, regNo, type, title }: EditVehicleAttributeCardProps) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modifyFunction = {
    itp: adjustITP,
    rca: adjustRCA,
    vignette: adjustVignette,
    oilChange: adjustOilChange,
  }[type];

  return (
    <>
      <Button size="small" onClick={handleClickOpen}>
        Modifică
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              width: "100%",
              maxWidth: "sm",
            },
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());

              formJson.startDate = parseDate(formJson.startDate).toISOString();
              formJson.endDate = parseDate(formJson.endDate).toISOString();

              setLoading(true);
              modifyFunction(user!.userName, regNo, formJson as VehicleAttribute)
                .then((vehicles) => {
                  console.log("Vehicul modificat cu succes:", vehicles);
                  const myVehicle = vehicles.find((v) => v.regNo === regNo);
                  queryClient.setQueryData(["vehicles", regNo], myVehicle);

                  handleClose();
                })
                .finally(() => {
                  setLoading(false);
                });
            },
          },
        }}
      >
        <DialogTitle>Modifică {title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker name="startDate" label="Dată start" sx={{ width: "100%" }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker name="endDate" label="Dată expirare" sx={{ width: "100%" }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField name="startKm" label="Km la start" type="number" fullWidth slotProps={{ htmlInput: { min: 0 } }} />
            </Grid>

            {type === "oilChange" && (
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField name="endKm" label="Km la sfârșit" type="number" fullWidth slotProps={{ htmlInput: { min: 0 } }} />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anulează</Button>
          <Button type="submit" disabled={loading}>
            Adaugă
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
