import React from "react";
import "./App.css";
import TypingGame from "./components/TypingGame/TypingGame";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import SignUpPage from "./components/SignUp/SignUp";
import Background from "./components/Background/Background";
import { Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useGameStore } from "./store/gameStore"; // ✅ import the store

export default function App() {
  const { playerName } = useGameStore(); // ✅ access global username
  const isSignedIn = playerName.trim() !== "";


  return (
    <div className="app-container">
      <Background />
      {/* <header className="app-header">
        <div className="header-content">
          <div className="header-title">Baskin Day — TypeRacer</div>
          <nav className="header-buttons">
            <Link className="header-button" to="/leaderboard">
              Leaderboard
            </Link>
          </nav>
        </div>
      </header> */}

            <header className="app-header">
        <div className="header-content">
          <div className="header-title">Baskin Day — TypeRacer</div>

          <nav className="header-buttons">
            <Link className="header-button" to="/leaderboard">
              Leaderboard
            </Link>

            {isSignedIn && (
              <div className="header-username">
                👤 {playerName}
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={
                <SignUpPage />
            }
          />
          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <TypingGame />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
                <SignUpPage />
            }
          />
        </Routes>
      </main>

      <footer className="app-footer">
        Built for Baskin Engineering · frontend-first MVP
      </footer>
    </div>
  );
}
