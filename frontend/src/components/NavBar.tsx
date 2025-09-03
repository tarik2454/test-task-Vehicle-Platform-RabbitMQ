import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Vehicle App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Главная
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Пользователи
        </Button>
        <Button color="inherit" component={Link} to="/vehicles">
          Машины
        </Button>
      </Toolbar>
    </AppBar>
  );
}
