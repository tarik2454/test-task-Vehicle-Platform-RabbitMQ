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
import { fetchUsers, createUser, updateUser, deleteUser } from "../api/users";
import type { User } from "../types";

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState<{ email: string; name?: string }>({
    email: "",
    name: "",
  });

  async function load() {
    const data = await fetchUsers();
    setUsers(data);
  }

  useEffect(() => {
    load();
  }, []);

  function handleOpen(user?: User) {
    if (user) {
      setEditingUser(user);
      setForm({ email: user.email, name: user.name });
    } else {
      setEditingUser(null);
      setForm({ email: "", name: "" });
    }
    setOpen(true);
  }

  async function handleSave() {
    if (editingUser) {
      await updateUser(editingUser.id!, form);
    } else {
      await createUser(form);
    }
    setOpen(false);
    load();
  }

  async function handleDelete(id: number) {
    await deleteUser(id);
    load();
  }

  return (
    <div>
      <h2>Users</h2>
      <Button variant="contained" onClick={() => handleOpen()}>
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
                <IconButton onClick={() => handleOpen(u)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(u.id!)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
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
