import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { addVehicle } from "../api/vehicle";
import { useAuth } from "../context/auth";
import type { Vehicle } from "../types/vehicle";
import { useQueryClient } from "@tanstack/react-query";

export const AddVehicleDialog = () => {
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

  return (
    <>
      <Button variant="contained" startIcon={<AddIcon />} color="primary" onClick={handleClickOpen}>
        Adaugă
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const formJson = Object.fromEntries((formData as any).entries());
              setLoading(true);

              addVehicle(user!.userName, formJson as Vehicle)
                .then((vehicles) => {
                  console.log("Vehicul adăugat cu succes:", vehicles);
                  queryClient.setQueryData(["vehicles"], vehicles);

                  handleClose();
                })
                .finally(() => {
                  setLoading(false);
                });
              console.log(formJson);
            },
          },
        }}
      >
        <DialogTitle>Adaugă Vehicul</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField name="regNo" label="Număr de înregistrare" fullWidth />
            <TextField name="brand" label="Brand" fullWidth />
            <TextField name="km" label="Număr de kilometrii" type="number" fullWidth slotProps={{ htmlInput: { min: 0 } }} />
          </Stack>
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
