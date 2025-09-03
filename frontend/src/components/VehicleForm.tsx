import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { createVehicle } from "../api/vehicles";
import { fetchUsers } from "../api/users";
import type { User } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function VehicleForm({ open, onClose, onCreated }: Props) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number | undefined>(undefined);
  const [userId, setUserId] = useState<number | "">("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function loadUsers() {
      const data = await fetchUsers();
      setUsers(data);
    }
    loadUsers();
  }, []);

  async function handleSubmit() {
    if (!make || !model || !year || !userId) return;

    await createVehicle({ make, model, year, userId });
    onCreated();
    onClose();
    setMake("");
    setModel("");
    setYear(undefined);
    setUserId("");
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Vehicle</DialogTitle>
      <DialogContent>
        <TextField
          label="Make"
          fullWidth
          margin="normal"
          value={make}
          onChange={(e) => setMake(e.target.value)}
        />
        <TextField
          label="Model"
          fullWidth
          margin="normal"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <TextField
          label="Year"
          type="number"
          fullWidth
          margin="normal"
          value={year ?? ""}
          onChange={(e) => setYear(Number(e.target.value))}
        />
        <TextField
          select
          label="User"
          fullWidth
          margin="normal"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        >
          {users.map((u) => (
            <MenuItem key={u.id} value={u.id}>
              {u.name ?? u.email}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
