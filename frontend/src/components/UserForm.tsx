import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { userApi } from "../api";

export default function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await userApi.post("/users", { name, email });
    setName("");
    setEmail("");
    window.location.reload(); // обновляем список
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={2}>
      <TextField
        label="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" variant="contained">
        Добавить
      </Button>
    </Box>
  );
}
