import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import type { User } from "../types/user";
import { register } from "../api/user";
import { useAuth } from "../context/auth";

export const RegisterForm = () => {
  const [user, setUser] = useState<User>({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const { doLogin} = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(user).then((registeredUser) => {
      console.log("user? ", registeredUser);
      doLogin(user);
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }} noValidate>
      <TextField label="Username" name="userName" value={user.userName} onChange={handleChange} required />
      <TextField label="Email" name="email" type="email" value={user.email} onChange={handleChange} required />
      <TextField label="Password" name="password" type="password" value={user.password} onChange={handleChange} required />
      <Button type="submit" variant="contained">
        Inregistrare
      </Button>
    </Box>
  );
};
