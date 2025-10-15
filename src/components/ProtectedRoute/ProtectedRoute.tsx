import React from "react";
import { Navigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { playerName, playerEmail } = useGameStore();

  // If user isn't signed up, redirect to /signup
  if (!playerName || !playerEmail) {
    return <Navigate to="/signup" replace />;
  }

  return <>{children}</>;
}
