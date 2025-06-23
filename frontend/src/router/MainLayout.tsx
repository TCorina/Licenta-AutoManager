import { Stack } from "@mui/material";
import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { AuthProvider } from "../context/auth";

const MainLayout = () => (
  <AuthProvider>
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />
      <Stack component={"main"} flex={1}>
        <Outlet />
      </Stack>
    </Stack>
  </AuthProvider>
);

export default MainLayout;
