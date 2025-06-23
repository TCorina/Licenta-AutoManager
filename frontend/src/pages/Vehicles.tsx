import { Box, Button, Container, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { deleteVehicle, getVehicles } from "../api/vehicle";
import { useAuth } from "../context/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { DataGrid, GridActionsCellItem, type GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useMemo } from "react";
import type { Vehicle } from "../types/vehicle";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router";
import { AddVehicleDialog } from "../components/AddVehicleDialog";

function flattenVehicle(vehicle: Vehicle) {
  return {
    ...vehicle,
    itpStartDate: vehicle.itp?.startDate || "",
    itpEndDate: vehicle.itp?.endDate || "",
    rcaEndDate: vehicle.rca?.endDate || "",
    vignetteEndDate: vehicle.vignette?.endDate || "",
    oilChangeEndDate: vehicle.oilChange?.endDate || "",
  };
}

export const Vehicles = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => getVehicles(user!.userName),
    enabled: !!user,
  });

  const columns = useMemo<GridColDef<Vehicle>[]>(
    () => [
      { field: "regNo", headerName: "Reg No", flex: 1 },
      { field: "brand", headerName: "Brand", flex: 1 },
      { field: "km", headerName: "KM", type: "number", flex: 1 },
      {
        field: "itpEndDate",
        headerName: "ITP Expiry",
        type: "date",
        valueGetter: (value: string) => (value ? new Date(value) : null),
        valueFormatter: (value: Date) => (value ? format(value, "dd/MM/yy") : " - "),
      },
      {
        field: "rcaEndDate",
        headerName: "RCA Expiry",
        type: "date",
        valueGetter: (value: string) => (value ? new Date(value) : null),
        valueFormatter: (value: Date) => (value ? format(value, "dd/MM/yy") : " - "),
      },
      {
        field: "vignetteEndDate",
        headerName: "Vignette Expiry",
        type: "date",
        valueGetter: (value: string) => (value ? new Date(value) : null),
        valueFormatter: (value: Date) => (value ? format(value, "dd/MM/yy") : " - "),
      },
      {
        field: "oilChangeEndDate",
        headerName: "Oil Change Expiry",
        type: "date",
        valueGetter: (value: string) => (value ? new Date(value) : null),
        valueFormatter: (value: Date) => (value ? format(value, "dd/MM/yy") : " - "),
      },
      {
        field: "actions",
        type: "actions",
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem color="primary" icon={<InfoIcon />} label="Info" onClick={() => navigate(`./${params.row.regNo}`)} />,
          <GridActionsCellItem
            icon={<DeleteIcon color="error" />}
            label="Delete"
            onClick={() =>
              deleteVehicle(user!.userName, params.row.regNo).then(() => {
                queryClient.invalidateQueries({ queryKey: ["vehicles"] });
              })
            }
          />,
        ],
      },
    ],
    [navigate, queryClient, user]
  );

  const rows = data?.map((v, idx) => ({
    id: idx, // required by DataGrid
    ...flattenVehicle(v),
  }));

  return (
    <Box sx={{ flex: 1, paddingTop: 2, paddingBottom: 2 }}>
      <Container maxWidth="lg">
        <Stack spacing={2}>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <AddVehicleDialog />
          </Box>

          <DataGrid
            rows={rows}
            columns={columns}
            slots={{
              toolbar: GridToolbar,
            }}
            slotProps={{
              loadingOverlay: {
                variant: "skeleton",
                noRowsVariant: "skeleton",
              },
              toolbar: {
                showQuickFilter: true,
              },
            }}
            disableRowSelectionOnClick
            loading={isLoading}
            showToolbar={true}
          />
        </Stack>
      </Container>
    </Box>
  );
};
