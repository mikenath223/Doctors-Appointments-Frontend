import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "890px",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <Outlet />
    </Container>
  );
};

export default AppLayout;
