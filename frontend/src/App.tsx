import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import UsersTable from "./components/UsersTable";
import VehiclesTable from "./components/VehiclesTable";

function Home() {
  return (
    <div>
      <h1>Welcome to Vehicle Platform</h1>
      <p>Select "Users" or "Vehicles" from the menu to get started.</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          <Button color="inherit" component={Link} to="/vehicles">
            Vehicles
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersTable />} />
          <Route path="/vehicles" element={<VehiclesTable />} />
        </Routes>
      </Container>
    </Router>
  );
}
