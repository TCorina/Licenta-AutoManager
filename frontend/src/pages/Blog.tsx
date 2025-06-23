import { Container, Typography, Paper } from "@mui/material";

export const Blog = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Blog
        </Typography>
        <Typography variant="body1">Welcome to the blog page. Stay tuned for updates!</Typography>
      </Paper>
    </Container>
  );
};
