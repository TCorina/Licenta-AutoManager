import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import type { User } from "../types/user";
import { useAuth } from "../context/auth";

export const LoginForm = () => {
  const [user, setUser] = useState<Omit<User, "email">>({
    userName: "",
    password: "",
  });
  const { doLogin} = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doLogin(user);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }} noValidate>
      <TextField label="Username" name="userName" value={user.userName} onChange={handleChange} required />
      <TextField label="Password" name="password" type="password" value={user.password} onChange={handleChange} required />
      <Button type="submit" variant="contained">
        Conectare
      </Button>
    </Box>
  );
};
