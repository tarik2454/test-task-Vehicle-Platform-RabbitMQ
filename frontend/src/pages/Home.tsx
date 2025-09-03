import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Добро пожаловать в Vehicle App 🚗
      </Typography>
      <Typography>
        Перейдите в раздел "Пользователи" или "Машины", чтобы управлять данными.
      </Typography>
    </Container>
  );
}
