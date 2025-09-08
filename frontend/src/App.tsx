import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import UsersTable from "./components/UsersTable";
import VehiclesTable from "./components/VehiclesTable";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Router>
      <Header />

      <Container
        sx={{
          marginTop: 4,
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersTable />} />
          <Route path="/vehicles" element={<VehiclesTable />} />
        </Routes>
      </Container>
    </Router>
  );
}
