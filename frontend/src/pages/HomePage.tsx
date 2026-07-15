import { Box, Stack, Typography } from "@mui/material";
import ReactLogo from "../assets/react.svg?react";

export default function HomePage() {
  return (
    <Stack spacing={2}>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 72,
          height: 72,
          borderRadius: 2,
          bgcolor: "rgba(255,255,255,0.04)",
        }}
      >
        <ReactLogo width={40} height={40} />
      </Box>
      <Typography variant="h4" gutterBottom>
        Добро пожаловать в Vehicle App 🚗
      </Typography>
      <Typography>
        Перейдите в раздел "Пользователи" или "Машины", чтобы управлять данными.
      </Typography>
    </Stack>
  );
}
