import { Typography, Box } from "@mui/material";
import UsersTable from "../components/UsersTable";
import UserForm from "../components/UserForm";

export default function UsersPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Пользователи
      </Typography>
      <Box mb={3}>
        <UserForm />
      </Box>
      <UsersTable />
    </>
  );
}
