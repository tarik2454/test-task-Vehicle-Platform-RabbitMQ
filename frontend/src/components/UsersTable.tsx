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
import { fetchUsers, createUser, updateUser, deleteUser } from "../api/users";
import { updateVehicle, createVehicle } from "../api/vehicles";
import type { User, Vehicle } from "../types";

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [vehines, setVehines] = useState<Vehicle[]>([]);
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

  async function getUsers() {
    const data = await fetchUsers();
    setUsers(data);
    console.log(data);
  }

  useEffect(() => {
    getUsers();
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
    getUsers();
  }

  async function handleDeleteUser(id: number) {
    await deleteUser(id);
    getUsers();
  }

  /** === INFO DIALOG === */
  function handleOpenInfo(user: User) {
    setEditingUser(user);
    setOpenInfo(true);
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
    if (!editingUser) return;
    if (editingVehicle) {
      await updateVehicle(editingVehicle.id!, formVehicle);
    } else {
      await createVehicle({ ...formVehicle, user_id: editingUser.id });
    }
    setOpenVehicle(false);
    getUsers();
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
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.id}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.name}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpenUser(u)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteUser(u.id!)}>
                  <Delete />
                </IconButton>
                <IconButton onClick={() => handleOpenInfo(u)}>
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
                {editingUser.vehicles && editingUser.vehicles.length > 0 ? (
                  editingUser.vehicles.map((v, idx) => (
                    <ListItem key={idx}>
                      <ListItemText
                        primary={`${v.make ?? "Unknown"} ${
                          v.model ?? "Unknown"
                        }`}
                        secondary={`Year: ${v.year ?? "null"}`}
                      />
                      <Button onClick={() => handleOpenVehicle(editingUser, v)}>
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
