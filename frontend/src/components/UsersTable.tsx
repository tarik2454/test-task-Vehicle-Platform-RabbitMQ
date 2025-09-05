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
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Edit, Delete, Info } from "@mui/icons-material";
import { getUsers, createUser, updateUser, deleteUser } from "../api/users";
import { updateVehicle, createVehicle, getVehicles } from "../api/vehicles";

import type { User, Vehicle } from "../types";

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formUser, setFormUser] = useState<{ email: string; name?: string }>({
    email: "",
    name: "",
  });

  const [openInfo, setOpenInfo] = useState(false);
  const [openVehicle, setOpenVehicle] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formVehicle, setFormVehicle] = useState<{
    make: string;
    model: string;
    year?: number;
  }>({
    make: "",
    model: "",
    year: undefined,
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  async function fetchUsers() {
    const data = await getUsers();
    setUsers(data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  /** === USER DIALOG === */
  function handleOpenUser(user?: User) {
    if (user) {
      setEditingUser(user);
      setFormUser({ email: user.email, name: user.name });
    } else {
      setEditingUser(null);
      setFormUser({ email: "", name: "" });
    }
    setOpenUserDialog(true);
  }

  async function handleSaveUser() {
    if (editingUser) {
      await updateUser(editingUser.id!, formUser);
    } else {
      await createUser(formUser);
    }
    setOpenUserDialog(false);
    fetchUsers();
  }

  async function handleDeleteUser(id: number) {
    await deleteUser(id);
    fetchUsers();
  }

  /** === INFO DIALOG === */
  async function loadVehiclesUserId(userId: number) {
    const data = await getVehicles();

    const result = data.filter((item) => item.userId === userId);

    setVehicles(result);
  }

  function handleOpenInfo(user: User, userId: number) {
    setEditingUser(user);
    setOpenInfo(true);

    loadVehiclesUserId(userId);
  }

  /** === VEHICLE DIALOG === */
  function handleOpenVehicle(user: User, vehicle?: Vehicle | null) {
    setEditingUser(user);

    if (vehicle) {
      setEditingVehicle(vehicle);
      setFormVehicle({
        make: vehicle.make ?? "",
        model: vehicle.model ?? "",
        year: vehicle.year ?? undefined,
      });
    } else {
      setEditingVehicle(null);
      setFormVehicle({ make: "", model: "", year: undefined });
    }
    setOpenVehicle(true);
  }

  async function handleSaveVehicle() {
    if (!editingUser || editingUser.id === undefined) return;
    if (editingVehicle) {
      await updateVehicle(editingVehicle.id!, formVehicle);
    } else {
      await createVehicle({ ...formVehicle, userId: editingUser.id });
    }
    setOpenVehicle(false);
    fetchUsers();
  }

  return (
    <div>
      <h2>Users</h2>
      <Button variant="contained" onClick={() => handleOpenUser()}>
        Add User
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpenUser(user)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteUser(user.id!)}>
                  <Delete />
                </IconButton>
                <IconButton
                  onClick={() =>
                    user.id !== undefined && handleOpenInfo(user, user.id)
                  }
                  disabled={user.id === undefined}
                >
                  <Info />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* === USER CREATE/EDIT DIALOG === */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openUserDialog}
        onClose={() => setOpenUserDialog(false)}
      >
        <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent dividers>
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={formUser.email}
            onChange={(e) =>
              setFormUser({ ...formUser, email: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={formUser.name}
            onChange={(e) => setFormUser({ ...formUser, name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUserDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveUser}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* === USER INFO DIALOG === */}
      <Dialog
        fullWidth
        maxWidth="md"
        open={openInfo}
        onClose={() => setOpenInfo(false)}
      >
        <DialogTitle>User Info</DialogTitle>
        <DialogContent dividers>
          {editingUser && (
            <>
              <Typography variant="subtitle1">
                Пользователь: {editingUser.name}
              </Typography>
              <Typography>Email: {editingUser.email}</Typography>
              <Typography sx={{ mt: 2 }}>Автомобили:</Typography>
              <List>
                {vehicles && vehicles.length > 0 ? (
                  vehicles.map((vehicle, idx) => (
                    <ListItem key={idx}>
                      <ListItemText
                        primary={`${vehicle.make ?? "Unknown"} ${
                          vehicle.model ?? "Unknown"
                        }`}
                        secondary={`Year: ${vehicle.year ?? "null"}`}
                      />
                      <Button
                        onClick={() => handleOpenVehicle(editingUser, vehicle)}
                      >
                        Редактировать авто
                      </Button>
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="Нет автомобилей" />
                    <Button
                      onClick={() => handleOpenVehicle(editingUser, null)}
                    >
                      Добавить авто
                    </Button>
                  </ListItem>
                )}
              </List>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInfo(false)}>Закрыть</Button>
        </DialogActions>
      </Dialog>

      {/* === VEHICLE EDIT DIALOG === */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openVehicle}
        onClose={() => setOpenVehicle(false)}
      >
        <DialogTitle>
          {editingVehicle ? "Edit Vehicle" : "Add Vehicle"}
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            margin="dense"
            label="Make"
            fullWidth
            value={formVehicle.make}
            onChange={(e) =>
              setFormVehicle({ ...formVehicle, make: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Model"
            fullWidth
            value={formVehicle.model}
            onChange={(e) =>
              setFormVehicle({ ...formVehicle, model: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Year"
            type="number"
            fullWidth
            value={formVehicle.year ?? ""}
            onChange={(e) =>
              setFormVehicle({
                ...formVehicle,
                year: e.target.value ? +e.target.value : undefined,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenVehicle(false)}>Cancel</Button>
          <Button onClick={handleSaveVehicle}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
