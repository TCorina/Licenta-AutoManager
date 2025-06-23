import { AppBar, Box, Button, Link, Stack, Toolbar, Typography } from "@mui/material";
import { ProfileMenu } from "./ProfileMenu";
import { useAuth } from "../context/auth";

export const Header = () => {
  const { isAuth } = useAuth();

  return (
    <AppBar position="static" enableColorOnDark>
      <Toolbar>
        <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
          <Link href={"/"} color="inherit" underline="none">
            <Typography variant="h6" component="div">
              Auto Manager
            </Typography>
          </Link>

          <Box>
            {isAuth && <ProfileMenu />}
            {!isAuth && (
              <Stack direction="row" spacing={2}>
                <Button href="/register" color="inherit" variant="outlined">
                  înregistrare
                </Button>
                <Button href="/login" color="inherit" variant="outlined">
                  Conectare
                </Button>
              </Stack>
            )}
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
