import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  fetchVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../api/vehicles";
import type { Vehicle } from "../types";

export default function VehiclesTable() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [open, setOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [form, setForm] = useState<Partial<Vehicle>>({
    make: "",
    model: "",
    year: 2020,
    userId: 1,
  });

  async function load() {
    const data = await fetchVehicles();
    setVehicles(data);
  }

  useEffect(() => {
    load();
  }, []);

  function handleOpen(vehicle?: Vehicle) {
    if (vehicle) {
      setEditingVehicle(vehicle);
      setForm(vehicle);
    } else {
      setEditingVehicle(null);
      setForm({ make: "", model: "", year: 2020, userId: 1 });
    }
    setOpen(true);
  }

  async function handleSave() {
    if (editingVehicle) {
      await updateVehicle(editingVehicle.id!, form);
    } else {
      await createVehicle(form as Vehicle);
    }
    setOpen(false);
    load();
  }

  async function handleDelete(id: number) {
    await deleteVehicle(id);
    load();
  }

  return (
    <div>
      <h2>Vehicles</h2>
      <Button variant="contained" onClick={() => handleOpen()}>
        Add Vehicle
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Make</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>UserId</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((v) => (
            <TableRow key={v.id}>
              <TableCell>{v.id}</TableCell>
              <TableCell>{v.make}</TableCell>
              <TableCell>{v.model}</TableCell>
              <TableCell>{v.year}</TableCell>
              <TableCell>{v.userId}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpen(v)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(v.id!)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editingVehicle ? "Edit Vehicle" : "Add Vehicle"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Make"
            fullWidth
            value={form.make}
            onChange={(e) => setForm({ ...form, make: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Model"
            fullWidth
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Year"
            fullWidth
            type="number"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="User ID"
            fullWidth
            type="number"
            value={form.userId}
            onChange={(e) =>
              setForm({ ...form, userId: Number(e.target.value) })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
