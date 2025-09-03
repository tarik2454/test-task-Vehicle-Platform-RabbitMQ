import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { fetchVehicles } from "../api/vehicles";
import { fetchUsers } from "../api/users";
import VehicleForm from "../components/VehicleForm";
import type { User, Vehicle } from "../types";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [v, u] = await Promise.all([fetchVehicles(), fetchUsers()]);
    setVehicles(v);
    setUsers(u);
  }

  function getUserName(userId: number): string {
    const user = users.find((u) => u.id === userId);
    return user ? user.name ?? user.email : `User #${userId}`;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Vehicles
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Vehicle
      </Button>

      <Paper sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Make</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((v) => (
              <TableRow key={v.id}>
                <TableCell>{v.make}</TableCell>
                <TableCell>{v.model}</TableCell>
                <TableCell>{v.year}</TableCell>
                <TableCell>{getUserName(v.userId)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <VehicleForm
        open={open}
        onClose={() => setOpen(false)}
        onCreated={loadData}
      />
    </Container>
  );
}
