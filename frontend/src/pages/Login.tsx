import { Avatar, Box, Grid, Link, Paper, Typography, useTheme } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoginForm } from "../forms/LoginForm";

export const Login = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #1e3c72, #2a5298)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: theme.spacing(4),
          borderRadius: theme.spacing(2),
          width: "100%",
          maxWidth: 480,
          textAlign: "center",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Avatar
          sx={{
            margin: "0 auto",
            backgroundColor: theme.palette.primary.main,
            width: 64,
            height: 64,
          }}
        >
          <LockOutlinedIcon fontSize="large" />
        </Avatar>

        <Typography
          component="h1"
          variant="h5"
          mt={2}
          sx={{ fontWeight: 600 }}
        >
          Conectare
        </Typography>

        <Box mt={3}>
          <LoginForm />
        </Box>

        <Grid container justifyContent="flex-end" mt={2}>
          <Grid>
            <Link href="/register" variant="body2" underline="hover">
              Nu ai cont? Înregistrează-te
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
